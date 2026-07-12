import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  HardDrive,
  CalendarDays,
  ShieldCheck,
  X,
} from "lucide-react";

function formatSize(bytes) {
  if (!bytes) return "0 KB";

  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export default function SelectedFileCard({
  file,
  onRemove,
  disabled = false,
}) {
  if (!file) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212]"
    >
      {/* Gold Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,.08),transparent_55%)]" />

      <div className="relative p-7">

        {/* Header */}
        <div className="flex items-start justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              <FileText className="h-8 w-8 text-[#D4AF37]" />
            </div>

            <div>

              <h3 className="max-w-xl truncate text-xl font-semibold text-white">
                {file.name}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Ready for AI contract analysis
              </p>

            </div>

          </div>

          {!disabled && (
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRemove}
              className="rounded-xl border border-white/10 p-2 text-zinc-500 transition hover:border-red-500/40 hover:text-red-400"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </div>

        {/* Divider */}

        <div className="my-7 h-px bg-white/10" />

        {/* Metadata */}

        <div className="grid gap-4 md:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

            <HardDrive className="mb-3 h-5 w-5 text-[#D4AF37]" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              File Size
            </p>

            <p className="mt-2 font-semibold text-white">
              {formatSize(file.size)}
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

            <FileText className="mb-3 h-5 w-5 text-[#D4AF37]" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Format
            </p>

            <p className="mt-2 font-semibold text-white">
              PDF Document
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

            <CalendarDays className="mb-3 h-5 w-5 text-[#D4AF37]" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Selected
            </p>

            <p className="mt-2 font-semibold text-white">
              Just Now
            </p>

          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

            <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-400" />

            <p className="text-xs uppercase tracking-wider text-emerald-300">
              Status
            </p>

            <p className="mt-2 font-semibold text-emerald-400">
              Ready
            </p>

          </div>

        </div>

        {/* AI Notice */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .2 }}
          className="mt-7 flex items-start gap-4 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-5"
        >
          <ShieldCheck className="mt-1 h-6 w-6 text-[#D4AF37]" />

          <div>

            <h4 className="font-medium text-white">
              AI Analysis Ready
            </h4>

            <p className="mt-2 text-sm leading-7 text-zinc-400">
              Your contract is ready for intelligent analysis.
              AgreeWise AI will review important clauses,
              detect legal risks, generate an executive summary,
              and provide practical recommendations.
            </p>

          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}