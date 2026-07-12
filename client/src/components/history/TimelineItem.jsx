import { Clock, FileText } from "lucide-react";
import { motion } from "framer-motion";
import ActivityBadge from "./ActivityBadge";

export default function TimelineItem({
  activity,
  isLast,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ x: 6 }}
      className="relative flex gap-6"
    >
      {/* Timeline */}

      <div className="flex flex-col items-center">

        {/* Node */}

        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          className="
            relative
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-[#D4AF37]/30
            bg-[#D4AF37]/10
          "
        >
          <div className="absolute h-14 w-14 rounded-full bg-[#D4AF37]/10 blur-xl" />

          <FileText
            size={22}
            className="relative text-[#D4AF37]"
          />
        </motion.div>

        {!isLast && (
          <div className="mt-3 h-full w-px bg-gradient-to-b from-[#D4AF37]/40 to-transparent" />
        )}
      </div>

      {/* Card */}

      <motion.div
        whileHover={{
          y: -2,
        }}
        className="
          mb-8
          flex-1
          rounded-2xl
          border
          border-[#262626]
          bg-[#121212]
          p-6
          transition-all
          duration-300
          hover:border-[#D4AF37]/25
          hover:shadow-[0_0_30px_rgba(212,175,55,0.06)]
        "
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          {/* Left */}

          <div className="flex-1">

            <ActivityBadge type={activity.type} />

            <h3 className="mt-4 text-lg font-semibold text-white">
              {activity.fileName}
            </h3>

            <p className="mt-3 leading-7 text-zinc-400">
              {activity.description}
            </p>

          </div>

          {/* Time */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/6
              bg-[#181818]
              px-4
              py-2
              text-sm
              text-zinc-500
            "
          >
            <Clock size={15} />

            {activity.time}
          </div>

        </div>
      </motion.div>

    </motion.div>
  );
}