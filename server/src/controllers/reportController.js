import Document from "../models/Document.js";
import Report from "../models/Report.js";
import { analyzeContract } from "../services/groqService.js";
import { logActivity } from "../services/historyService.js";

function formatDateParts(date) {
  const d = new Date(date);
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "—";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

// Shapes a Report (+ its Document) into what the ReportCard/ReportDetails
// components expect: { id, name, size, score, date, time, summary, clauses, recommendations }
function mapReport(report, document) {
  const { date, time } = formatDateParts(report.createdAt);

  return {
    id: report._id,
    documentId: document._id,
    name: document.originalName,
    size: formatSize(document.fileSize),
    score: report.riskScore,
    riskLevel: report.riskLevel,
    date,
    time,
    summary: report.summary,
    clauses: report.clauses.map((c) => ({
      id: c._id,
      title: c.title,
      risk: c.risk,
      description: c.description,
    })),
    recommendations: report.recommendations.map((r) => ({
      id: r._id,
      title: r.title,
      description: r.description,
    })),
  };
}

// POST /api/report/analyze/:documentId
export const analyzeDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const analysisOptions = Array.isArray(req.body.analysisOptions)
      ? req.body.analysisOptions
      : [];

    const isReanalysis = document.status === "completed";

    document.status = "processing";
    await document.save();

    let analysis;
    try {
      analysis = await analyzeContract(document.extractedText, analysisOptions);
    } catch (err) {
      document.status = "failed";
      await document.save();

      return res.status(422).json({
        success: false,
        message: err.message || "AI analysis failed.",
      });
    }

    const report = await Report.create({
      user: req.user._id,
      document: document._id,
      riskScore: analysis.riskScore,
      riskLevel: analysis.riskLevel,
      summary: analysis.summary,
      clauses: analysis.clauses,
      recommendations: analysis.recommendations,
      analysisOptions,
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
    });

    document.status = "completed";
    await document.save();

    await logActivity({
      userId: req.user._id,
      documentId: document._id,
      type: isReanalysis ? "reanalysis" : "analysis",
      fileName: document.originalName,
      description: isReanalysis
        ? "Contract re-analyzed using the latest AI model."
        : "AI completed contract analysis and detected potential risks.",
    });

    return res.status(201).json({
      success: true,
      message: "Analysis complete",
      report: mapReport(report, document),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// GET /api/report
export const getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("document")
      .lean();

    const validReports = reports.filter((r) => r.document); // skip orphaned reports

    return res.status(200).json({
      success: true,
      count: validReports.length,
      reports: validReports.map((r) => mapReport(r, r.document)),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/report/:id
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("document");

    if (!report || !report.document) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await logActivity({
      userId: req.user._id,
      documentId: report.document._id,
      type: "report_view",
      fileName: report.document.originalName,
      description: "Opened the AI analysis report.",
    });

    return res.status(200).json({
      success: true,
      report: mapReport(report, report.document),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/report/:id/download
// Generates a plain-text report file on the fly (no PDF-generation library
// is installed in this project). Swap this for a real PDF export (e.g.
// pdfkit) later if a polished PDF download is needed.
export const downloadReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("document");

    if (!report || !report.document) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const lines = [
      `AgreeWise AI — Contract Analysis Report`,
      `Document: ${report.document.originalName}`,
      `Generated: ${new Date(report.createdAt).toLocaleString("en-IN")}`,
      `Risk Score: ${report.riskScore}% (${report.riskLevel.toUpperCase()} RISK)`,
      ``,
      `SUMMARY`,
      `-------`,
      report.summary,
      ``,
      `DETECTED CLAUSES`,
      `----------------`,
      ...report.clauses.map(
        (c) => `[${c.risk.toUpperCase()}] ${c.title}\n  ${c.description}`
      ),
      ``,
      `RECOMMENDATIONS`,
      `---------------`,
      ...report.recommendations.map((r) => `- ${r.title}: ${r.description}`),
    ];

    const content = lines.join("\n");

    await logActivity({
      userId: req.user._id,
      documentId: report.document._id,
      type: "download",
      fileName: report.document.originalName,
      description: "Analysis report downloaded successfully.",
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${report.document.originalName.replace(
        /\.pdf$/i,
        ""
      )}-report.txt"`
    );

    return res.status(200).send(content);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/report/stats/summary — powers the Dashboard risk-distribution
// chart and stat cards.
export const getReportStats = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id })
      .select("riskScore riskLevel")
      .lean();

    const total = reports.length;

    const counts = { low: 0, medium: 0, high: 0 };
    let scoreSum = 0;

    reports.forEach((r) => {
      counts[r.riskLevel] = (counts[r.riskLevel] || 0) + 1;
      scoreSum += r.riskScore;
    });

    const averageRiskScore = total > 0 ? Math.round(scoreSum / total) : 0;

    return res.status(200).json({
      success: true,
      stats: {
        totalReports: total,
        highRiskCount: counts.high,
        mediumRiskCount: counts.medium,
        lowRiskCount: counts.low,
        averageRiskScore,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
