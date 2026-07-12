import { motion } from "framer-motion";

export default function StatsCards({
  title,
  value,
  icon: Icon,
  iconColor = "text-[#C9A227]",
  description,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-[#111111]
        p-6
        transition
        hover:border-[#C9A227]/20
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-zinc-600">
              {description}
            </p>
          )}
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-zinc-900
          "
        >
          <Icon
            size={22}
            className={iconColor}
          />
        </div>
      </div>
    </motion.div>
  );
}