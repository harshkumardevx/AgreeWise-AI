import { FileText, Upload, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DocumentsHeader() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111]"
    >
      {/* Gold Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.10),transparent_45%)]" />

      <div className="relative flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
        {/* Left */}
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1.5 text-sm font-medium text-[#E6C86E]">
            <Sparkles className="h-4 w-4" />
            AI Powered Contract Vault
          </div>

          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">
              <FileText className="h-8 w-8 text-[#D4AF37]" />
            </div>

            <div>
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Contract Vault
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
                Securely manage every uploaded agreement, review AI-generated
                reports, monitor contract risks, and keep your legal documents
                organized in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-white">
              Quick Action
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Upload a new agreement and let AgreeWise AI analyze risks,
              summarize clauses, and generate recommendations.
            </p>
          </div>

          <button
            onClick={() => navigate("/upload-contract")}
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D4AF37]
              bg-[#D4AF37]
              px-6
              py-3.5
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:bg-[#E6C86E]
            "
          >
            <Upload
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />

            Upload Contract
          </button>
        </div>
      </div>
    </motion.section>
  );
}