import { motion } from "framer-motion";
import {
  Sparkles,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Clock3,
  BrainCircuit,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UploadActions({
  file,
  loading,
  selectedOptions = [],
  onAnalyze,
  onReset,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212]"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,.08),transparent_60%)]" />

      <div className="relative p-8">

        {/* Header */}

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
            <Sparkles className="h-6 w-6 text-[#D4AF37]" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Ready to Analyze
            </h2>

            <p className="mt-1 text-zinc-400">
              Review your configuration and start AI-powered contract analysis.
            </p>
          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <BrainCircuit className="mb-3 h-6 w-6 text-[#D4AF37]" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              AI Engine
            </p>

            <p className="mt-2 font-semibold text-white">
              GPT OSS 120B
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <Clock3 className="mb-3 h-6 w-6 text-[#D4AF37]" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Estimated Time
            </p>

            <p className="mt-2 font-semibold text-white">
              15–30 Seconds
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <ShieldCheck className="mb-3 h-6 w-6 text-[#D4AF37]" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              AI Modules
            </p>

            <p className="mt-2 font-semibold text-white">
              {selectedOptions.length}/4 Enabled
            </p>
          </div>

        </div>

        {/* Notice */}

        <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-5">

          <h3 className="font-semibold text-white">
            What happens next?
          </h3>

          <ul className="mt-4 space-y-2 text-sm leading-7 text-zinc-400">
            <li>• Upload your contract securely.</li>
            <li>• Extract readable text.</li>
            <li>• Analyze important clauses.</li>
            <li>• Detect legal risks.</li>
            <li>• Generate recommendations.</li>
            <li>• Create a professional AI report.</li>
          </ul>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Button
            onClick={onAnalyze}
            disabled={!file || loading}
            className="
              group
              h-14
              flex-1
              rounded-xl
              border
              border-[#D4AF37]
              bg-[#D4AF37]
              text-black
              font-semibold
              hover:bg-[#E6C86E]
              transition-all
            "
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                  className="mr-3 h-5 w-5 rounded-full border-2 border-black border-t-transparent"
                />

                Analyzing Contract...
              </>
            ) : (
              <>
                Generate AI Analysis

                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>

          <Button
            variant="outline"
            disabled={loading}
            onClick={onReset}
            className="
              h-14
              rounded-xl
              border-white/10
              bg-black/40
              px-8
              text-white
              hover:border-red-400
              hover:text-red-400
            "
          >
            <RotateCcw className="mr-2 h-5 w-5" />

            Reset
          </Button>

        </div>

      </div>
    </motion.section>
  );
}