import { motion } from "framer-motion";
import {
  FileSearch,
  AlertTriangle,
  Lightbulb,
  ScrollText,
  Sparkles,
} from "lucide-react";

const OPTIONS = [
  {
    id: "summary",
    title: "Executive Summary",
    description:
      "Receive a concise overview of the contract in plain English.",
    icon: FileSearch,
  },
  {
    id: "risk",
    title: "Risk Detection",
    description:
      "Identify unfair clauses, liabilities, penalties, and hidden risks.",
    icon: AlertTriangle,
  },
  {
    id: "highlight",
    title: "Clause Intelligence",
    description:
      "Highlight important legal clauses and explain their impact.",
    icon: ScrollText,
  },
  {
    id: "recommendation",
    title: "Recommendations",
    description:
      "Get actionable suggestions to negotiate safer contract terms.",
    icon: Lightbulb,
  },
];

export default function AnalysisOptions({
  selectedOptions = [],
  onToggleOption,
  disabled = false,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212]"
    >
      {/* Gold Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,.07),transparent_60%)]" />

      <div className="relative p-8">

        {/* Header */}

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
            <Sparkles className="h-6 w-6 text-[#D4AF37]" />
          </div>

          <div>

            <h2 className="text-2xl font-semibold text-white">
              AI Analysis Configuration
            </h2>

            <p className="mt-1 text-zinc-400">
              Choose what AgreeWise AI should focus on during analysis.
            </p>

          </div>

        </div>

        {/* Cards */}

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          {OPTIONS.map((option) => {

            const Icon = option.icon;

            const active = selectedOptions.includes(option.id);

            return (
              <motion.button
                key={option.id}
                type="button"
                whileHover={{
                  y: -3,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                disabled={disabled}
                onClick={() => onToggleOption(option.id)}
                className={`
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  p-6
                  text-left
                  transition-all
                  duration-300

                  ${
                    active
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_25px_rgba(212,175,55,.15)]"
                      : "border-white/10 bg-black/30 hover:border-[#D4AF37]/30"
                  }
                `}
              >
                {/* Active Glow */}

                {active && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,.10),transparent_70%)]" />
                )}

                <div className="relative">

                  <div className="flex items-start justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
                      <Icon className="h-7 w-7 text-[#D4AF37]" />
                    </div>

                    <motion.div
                      animate={{
                        scale: active ? 1 : 0.85,
                      }}
                      className={`
                        h-6
                        w-6
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center

                        ${
                          active
                            ? "border-[#D4AF37] bg-[#D4AF37]"
                            : "border-zinc-600"
                        }
                      `}
                    >
                      {active && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-2.5 w-2.5 rounded-full bg-black"
                        />
                      )}
                    </motion.div>

                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {option.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {option.description}
                  </p>

                </div>

              </motion.button>
            );

          })}

        </div>

        {/* Footer */}

        <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/8 p-5">

          <div className="flex items-center justify-between">

            <div>

              <h4 className="font-medium text-white">
                AI Coverage
              </h4>

              <p className="mt-1 text-sm text-zinc-400">
                {selectedOptions.length} of {OPTIONS.length} capabilities selected
              </p>

            </div>

            <div className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#E6C86E]">
              GPT-OSS 120B
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}