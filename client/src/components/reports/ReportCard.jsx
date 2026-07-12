import { motion } from "framer-motion";
import {
  CalendarDays,
  ArrowRight,
  FileText,
  Clock,
} from "lucide-react";

import RiskScore from "./RiskScore";

export default function ReportCard({
  report,
  onViewReport,
}) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="
        group
        rounded-3xl
        border
        border-white/10
        bg-[#111111]
        p-6
        transition-all
        duration-300
        hover:border-[#D4AF37]/25
        hover:bg-[#151515]
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-[#D4AF37]/20
              bg-[#D4AF37]/10
            "
          >
            <FileText
              size={24}
              className="text-[#D4AF37]"
            />
          </div>

          <div>

            <h3 className="text-lg font-semibold text-white">
              {report.name}
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              {report.size}
            </p>

          </div>

        </div>

      </div>

      {/* Risk Score */}

      <div className="my-8 flex justify-center">
        <RiskScore score={report.score} />
      </div>

      {/* Meta */}

      <div className="flex items-center justify-between border-t border-white/5 pt-5 text-sm">

        <div className="flex items-center gap-2 text-zinc-500">
          <CalendarDays size={16} />
          {report.date}
        </div>

        <div className="flex items-center gap-2 text-zinc-500">
          <Clock size={16} />
          {report.time}
        </div>

      </div>

      {/* Button */}

      <button
        onClick={() => onViewReport(report)}
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-[#D4AF37]
          bg-[#D4AF37]
          py-3
          font-semibold
          text-black
          transition-all
          duration-200
          hover:scale-[1.02]
          hover:bg-[#E6C86E]
        "
      >
        View Full Report

        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

    </motion.article>
  );
}