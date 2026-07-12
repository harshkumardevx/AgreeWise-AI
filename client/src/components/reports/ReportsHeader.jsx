import { motion } from "framer-motion";
import {
  FileSearch,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReportsHeader() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#111111]
      "
    >
      {/* Background Accent */}

      <div className="absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="relative flex flex-col gap-10 p-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="max-w-3xl">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#D4AF37]/20
              bg-[#D4AF37]/10
              px-4
              py-2
              text-sm
              font-medium
              text-[#D4AF37]
            "
          >
            <Sparkles size={15} />

            AI Legal Intelligence

          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Contract Analysis Reports
          </h1>

          <p className="mt-5 max-w-2xl leading-8 text-zinc-500">
            Access every AI-generated legal report in one place.
            Review contract summaries, identify high-risk clauses,
            and revisit recommendations before making important
            decisions.
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-col items-start gap-4 lg:items-end">

          <button
            onClick={() => navigate("/upload-contract")}
            className="
              group
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#D4AF37]
              bg-[#D4AF37]
              px-6
              py-3
              font-semibold
              text-black
              transition-all
              duration-200
              hover:scale-[1.02]
              hover:bg-[#E6C86E]
            "
          >
            <FileSearch size={18} />

            Analyze New Contract

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />

          </button>

          <p className="text-sm text-zinc-600">
            Upload • Analyze • Review
          </p>

        </div>

      </div>
    </motion.section>
  );
}