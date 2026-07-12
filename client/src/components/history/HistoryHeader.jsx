import { motion } from "framer-motion";
import {
  History,
  Trash2,
  ShieldCheck,
} from "lucide-react";

export default function HistoryHeader({ onClear }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-[30px] border border-[#2A2A2A] bg-[#0B0B0B]"
    >
      {/* Background */}

      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D4AF37]/6 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative flex flex-col gap-10 p-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-start gap-5">

          {/* Icon */}

          <motion.div
            whileHover={{
              rotate: -8,
              scale: 1.05,
            }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 shadow-[0_0_40px_rgba(212,175,55,0.08)]"
          >
            <History
              size={30}
              className="text-[#D4AF37]"
            />
          </motion.div>

          <div>

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#D4AF37]">
              <ShieldCheck size={14} />
              Activity Audit Trail
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white">
              Activity History
            </h1>

            <p className="mt-4 max-w-2xl text-[15px] leading-8 text-zinc-400">
              Review every important action performed across your contracts,
              including uploads, AI analyses, report generation, downloads,
              and other account activities in one secure timeline.
            </p>

          </div>

        </div>

        {/* Right */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={onClear}
          className="
            inline-flex
            items-center
            gap-3
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            px-6
            py-3
            font-medium
            text-red-400
            transition-all
            duration-300
            hover:border-red-500
            hover:bg-red-500
            hover:text-white
          "
        >
          <Trash2 size={18} />

          Clear History
        </motion.button>

      </div>
    </motion.section>
  );
}