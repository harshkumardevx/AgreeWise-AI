// Calls Groq's OpenAI-compatible chat completions endpoint to analyze a
// contract's extracted text and return a structured analysis.
//
// Model: llama-3.3-70b-versatile / llama-3.1-8b-instant were deprecated by
// Groq in June 2026. We default to openai/gpt-oss-120b (Groq's recommended
// replacement for reasoning-heavy tasks). Override with GROQ_MODEL in .env
// if you want a different model (e.g. openai/gpt-oss-20b for a faster/
// cheaper pass).
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

// Free/developer-tier Groq accounts have fairly small tokens-per-minute
// limits, so we cap how much contract text we send. This is generous
// enough for most rental/employment/service agreements while staying
// well inside typical TPM budgets.
const MAX_INPUT_CHARS = 12000;

const OPTION_LABELS = {
  summary: "a concise plain-English summary of the agreement",
  risk: "the risky, unfair, or one-sided clauses",
  recommendation: "concrete recommendations to negotiate or protect the signer",
  highlight: "the most important clauses (termination, payment, liability, deposit)",
};

function buildPrompt(contractText, analysisOptions = []) {
  const focus =
    analysisOptions.length > 0
      ? analysisOptions
          .map((id) => OPTION_LABELS[id])
          .filter(Boolean)
          .join(", ")
      : "a full general analysis";

  return `You are AgreeWise AI, a legal-contract analysis assistant. Analyze the following contract text and focus especially on: ${focus}.

Return ONLY a single valid JSON object (no markdown fences, no commentary) with this exact shape:

{
  "summary": string (3-5 sentences, plain English, no legal jargon),
  "riskScore": integer 0-100 (0 = completely safe, 100 = extremely risky for the signer),
  "clauses": [
    { "title": string, "risk": "low" | "medium" | "high", "description": string (1-2 sentences) }
  ],
  "recommendations": [
    { "title": string, "description": string (1-2 sentences, actionable) }
  ]
}

Rules:
- Identify 3 to 6 of the most important clauses (payment terms, termination, security deposit/liability, penalties, renewal, confidentiality, indemnity — whichever actually appear).
- Give 2 to 5 practical recommendations.
- riskScore should reflect the overall balance of the contract: >=70 means high risk to the signer, 40-69 medium, below 40 low.
- Base everything strictly on the contract text below. Do not invent clauses that aren't present.

CONTRACT TEXT:
"""
${contractText.slice(0, MAX_INPUT_CHARS)}
"""`;
}

function riskLevelFromScore(score) {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

function safeParseJson(raw) {
  // Strip markdown code fences if the model added them despite instructions.
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned);
}

export const analyzeContract = async (contractText, analysisOptions = []) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured on the server.");
  }

  if (!contractText || !contractText.trim()) {
    throw new Error(
      "No readable text could be extracted from this PDF (it may be a scanned image without a text layer)."
    );
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.3,
      // NOTE: gpt-oss models reject/deprecate `max_tokens` — Groq's own
      // docs and examples use `max_completion_tokens` for these models.
      max_completion_tokens: 4096,
      // gpt-oss models are reasoning models that spend part of the token
      // budget on hidden reasoning before the final answer. "low" keeps
      // that overhead small so there's still room left for the JSON
      // output itself (reasoning tokens land in a separate `reasoning`
      // field, not in `message.content`, but they still count against
      // the completion token budget).
      reasoning_effort: "low",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You are AgreeWise AI.

You must always return ONLY one valid JSON object.

Never return markdown.
Never explain anything outside JSON.
Never wrap the JSON inside code blocks.
Never include additional keys.

If some information is unavailable,
return an empty string or empty array.
`,
        },
        {
          role: "user",
          content: buildPrompt(contractText, analysisOptions),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => "");
    throw new Error(
      `Groq API request failed (${response.status}): ${errBody.slice(0, 300)}`
    );
  }

  const data = await response.json();
  const rawContent = data?.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error("Groq API returned an empty response.");
  }

  let parsed;
  try {
    parsed = safeParseJson(rawContent);
  } catch (err) {
    throw new Error("Failed to parse AI response as JSON.");
  }

  const riskScore = Math.max(
    0,
    Math.min(100, Math.round(Number(parsed.riskScore) || 0))
  );

  return {
    summary: String(parsed.summary || "").trim(),
    riskScore,
    riskLevel: riskLevelFromScore(riskScore),
    clauses: Array.isArray(parsed.clauses)
      ? parsed.clauses.map((c) => ({
          title: String(c.title || "Untitled Clause"),
          risk: ["low", "medium", "high"].includes(c.risk) ? c.risk : "medium",
          description: String(c.description || ""),
        }))
      : [],
    recommendations: Array.isArray(parsed.recommendations)
      ? parsed.recommendations.map((r) => ({
          title: String(r.title || "Recommendation"),
          description: String(r.description || ""),
        }))
      : [],
  };
};
