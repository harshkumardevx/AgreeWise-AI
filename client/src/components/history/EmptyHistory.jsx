import { History, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EmptyHistory() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-[30px] border border-[#2A2A2A] bg-[#0B0B0B]"
    >
      {/* Background Glow */}

      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#D4AF37]/5 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative flex flex-col items-center px-10 py-20 text-center">
        {/* Floating Icon */}

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="flex h-24 w-24 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/8 shadow-[0_0_50px_rgba(212,175,55,0.08)]"
        >
          <History
            size={42}
            className="text-[#D4AF37]"
          />
        </motion.div>

        {/* Title */}

        <h2 className="mt-10 text-4xl font-semibold tracking-tight text-white">
          No Activity Yet
        </h2>

        {/* Description */}

        <p className="mt-5 max-w-2xl text-[15px] leading-8 text-zinc-400">
          Your activity timeline will automatically record uploads,
          AI analyses, generated reports and downloads.
          Once you begin reviewing agreements, every important action
          will appear here for quick reference.
        </p>

        {/* CTA */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => navigate("/upload-contract")}
          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-[#D4AF37] px-7 py-3 font-medium text-black transition hover:bg-[#E6C65C]"
        >
          Upload Your First Contract

          <ArrowRight size={18} />
        </motion.button>

        {/* Bottom Hint */}

        <p className="mt-8 text-sm text-zinc-600">
          Activity history is generated automatically. No manual setup required.
        </p>
      </div>
    </motion.section>
  );
}