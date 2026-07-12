import { motion } from "framer-motion";
import {
  Upload,
  BrainCircuit,
  FileText,
  Download,
  RotateCcw,
  Trash2,
  Clock3,
} from "lucide-react";

const TYPE_META = {
  upload: {
    icon: Upload,
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10",
    title: "Contract Uploaded",
  },

  analysis: {
    icon: BrainCircuit,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    title: "AI Analysis Completed",
  },

  reanalysis: {
    icon: RotateCcw,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    title: "Re-analysis Started",
  },

  report_view: {
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    title: "Report Viewed",
  },

  download: {
    icon: Download,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    title: "Report Downloaded",
  },

  delete: {
    icon: Trash2,
    color: "text-red-400",
    bg: "bg-red-500/10",
    title: "Contract Deleted",
  },
};

export default function ActivityTimeline({
  activities = [],
  loading = false,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-[#111111]
        p-7
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            Timeline
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Recent Activity
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Latest actions across your contracts
          </p>
        </div>

        <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/8 p-3">
          <Clock3
            size={20}
            className="text-[#D4AF37]"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">
          Loading activity...
        </p>
      ) : activities.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No recent activity.
        </p>
      ) : (
        <div className="space-y-5">
          {activities.map((activity, index) => {
            const meta =
              TYPE_META[activity.type] || TYPE_META.upload;

            const Icon = meta.icon;

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                  group
                  rounded-2xl
                  border
                  border-white/8
                  bg-[#161616]
                  p-5
                  transition-all
                  duration-300
                  hover:border-[#D4AF37]/30
                  hover:bg-[#1A1A1A]
                "
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}

                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      ${meta.bg}
                    `}
                  >
                    <Icon
                      size={20}
                      className={meta.color}
                    />
                  </div>

                  {/* Content */}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-white">
                          {meta.title}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-500">
                          {activity.fileName}
                        </p>
                      </div>

                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-500">
                        {activity.time}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-zinc-400">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}