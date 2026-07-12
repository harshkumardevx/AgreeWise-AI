import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function UploadHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-8 md:p-10"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_45%)]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1.5 text-sm font-medium text-[#E6C86E]">
            <Sparkles className="h-4 w-4" />
            AI Powered Legal Intelligence
          </div>

          <h1 className="font-serif text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Contract Intelligence
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Upload any agreement and receive an AI-powered legal review with
            risk detection, clause explanations, negotiation recommendations,
            and an overall contract health score.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Employment",
              "Rental",
              "NDA",
              "Service",
              "Vendor",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-zinc-300 transition hover:border-[#D4AF37]/40 hover:text-[#E6C86E]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_70%)]" />

          <div className="relative">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/15">
              <ShieldCheck className="h-7 w-7 text-[#D4AF37]" />
            </div>

            <h3 className="text-xl font-semibold text-white">
              Secure AI Analysis
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Your contract is encrypted during upload and analyzed using an
              advanced reasoning model to identify legal risks, obligations,
              and important clauses.
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Supported Format</span>

                <span className="font-medium text-[#E6C86E]">
                  PDF Documents
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-zinc-500">Maximum Size</span>

                <span className="text-white">5 MB</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-zinc-500">AI Engine</span>

                <span className="text-white">
                  GPT-OSS 120B
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}