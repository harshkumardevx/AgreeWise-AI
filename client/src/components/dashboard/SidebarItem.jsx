import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function SidebarItem({ item, onAction }) {
  const location = useLocation();

  const isActive =
    !item.action &&
    (location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/"));

  const Icon = item.icon;

  const content = (
    <motion.div
      whileHover={{
        x: 3,
        transition: { duration: 0.18 },
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative
        flex
        items-center
        justify-between
        rounded-xl
        px-4
        py-3
        transition-all
        duration-300

        ${
          isActive
            ? `
              border
              border-[#C9A227]/20
              bg-[#C9A227]/8
              text-[#C9A227]
            `
            : `
              border
              border-transparent
              text-zinc-400
              hover:border-zinc-800
              hover:bg-zinc-900/60
              hover:text-white
            `
        }
      `}
    >
      {/* Left Gold Indicator */}

      {isActive && (
        <motion.div
          layoutId="sidebar-indicator"
          className="
            absolute
            left-0
            top-2
            bottom-2
            w-1
            rounded-r-full
            bg-[#C9A227]
          "
        />
      )}

      <div className="flex items-center gap-3">
        <Icon
          size={19}
          className={
            isActive
              ? "text-[#C9A227]"
              : "text-zinc-500 transition group-hover:text-white"
          }
        />

        <span className="text-[15px] font-medium">
          {item.title}
        </span>
      </div>

      <ChevronRight
        size={16}
        className={`
          transition-all
          duration-300

          ${
            isActive
              ? "translate-x-0 text-[#C9A227]"
              : "translate-x-1 text-zinc-700 group-hover:text-zinc-400"
          }
        `}
      />
    </motion.div>
  );

  if (item.action) {
    return (
      <button
        onClick={() => onAction?.(item.action)}
        className="w-full text-left"
      >
        {content}
      </button>
    );
  }

  return (
    <Link to={item.path}>
      {content}
    </Link>
  );
}