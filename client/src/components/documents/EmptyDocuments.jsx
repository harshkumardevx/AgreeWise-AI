import { FilePlus2, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EmptyDocuments() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111]"
    >
      {/* Background Accent */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_45%)]" />

      <div className="relative flex flex-col items-center px-8 py-20 text-center">

        {/* Icon */}

        <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">
          <FilePlus2
            size={42}
            className="text-[#D4AF37]"
          />
        </div>

        {/* Badge */}

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1.5 text-sm font-medium text-[#E6C86E]">
          <Sparkles size={14} />
          AI Contract Analysis
        </div>

        {/* Heading */}

        <h2 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-white">
          Your Contract Vault is Empty
        </h2>

        {/* Description */}

        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
          Start building your secure document workspace by uploading your first
          agreement. AgreeWise AI will automatically analyze legal risks,
          summarize important clauses, and generate actionable recommendations.
        </p>

        {/* Features */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171717] px-4 py-3">
            <ShieldCheck
              size={18}
              className="text-emerald-400"
            />
            <span className="text-sm text-zinc-300">
              Risk Detection
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171717] px-4 py-3">
            <Sparkles
              size={18}
              className="text-[#D4AF37]"
            />
            <span className="text-sm text-zinc-300">
              AI Recommendations
            </span>
          </div>

        </div>

        {/* CTA */}

        <button
          onClick={() => navigate("/upload-contract")}
          className="
            mt-12
            inline-flex
            items-center
            justify-center
            rounded-xl
            border
            border-[#D4AF37]
            bg-[#D4AF37]
            px-8
            py-3.5
            font-semibold
            text-black
            transition-all
            duration-200
            hover:scale-[1.02]
            hover:bg-[#E6C86E]
          "
        >
          Upload Your First Contract
        </button>

      </div>
    </motion.section>
  );
}