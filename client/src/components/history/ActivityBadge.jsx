import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  FileText,
  Download,
  RotateCcw,
  Trash2,
  Pencil,
} from "lucide-react";

export default function ActivityBadge({ type }) {
  const variants = {
    upload: {
      label: "Uploaded",
      icon: Upload,
      classes:
        "border border-sky-500/20 bg-sky-500/10 text-sky-400",
    },

    analysis: {
      label: "AI Analysis",
      icon: Brain,
      classes:
        "border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]",
    },

    report: {
      label: "Report Generated",
      icon: FileText,
      classes:
        "border border-violet-500/20 bg-violet-500/10 text-violet-400",
    },

    report_view: {
      label: "Report Viewed",
      icon: FileText,
      classes:
        "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
    },

    download: {
      label: "Downloaded",
      icon: Download,
      classes:
        "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    },

    reanalysis: {
      label: "Re-analysis",
      icon: RotateCcw,
      classes:
        "border border-amber-500/20 bg-amber-500/10 text-amber-400",
    },

    delete: {
      label: "Deleted",
      icon: Trash2,
      classes:
        "border border-red-500/20 bg-red-500/10 text-red-400",
    },

    rename: {
      label: "Renamed",
      icon: Pencil,
      classes:
        "border border-zinc-600 bg-zinc-700/20 text-zinc-300",
    },
  };

  const current = variants[type] || variants.upload;

  const Icon = current.icon;

  return (
    <motion.span
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -2,
        scale: 1.03,
      }}
      transition={{
        duration: 0.18,
      }}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3.5
        py-1.5
        text-xs
        font-medium
        transition-all
        duration-200
        ${current.classes}
      `}
    >
      <motion.div
        whileHover={{
          rotate: 10,
          scale: 1.15,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <Icon size={14} />
      </motion.div>

      {current.label}
    </motion.span>
  );
}