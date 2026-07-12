import { motion } from "framer-motion";
import {
  Upload,
  BrainCircuit,
  FileText,
  History,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Upload Contract",
    description: "Upload and analyze a new agreement",
    icon: Upload,
    route: "/upload-contract",
  },
  {
    title: "AI Analysis",
    description: "Analyze your latest document",
    icon: BrainCircuit,
    route: "/upload-contract",
  },
  {
    title: "Risk Reports",
    description: "View generated reports",
    icon: FileText,
    route: "/reports",
  },
  {
    title: "Activity History",
    description: "Track recent actions",
    icon: History,
    route: "/history",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        rounded-3xl
        border
        border-[#D4AF37]/15
        bg-[#111111]
        p-6
      "
    >
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Frequently used shortcuts
        </p>
      </div>

      {/* Actions */}

      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                x: 6,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => navigate(action.route)}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-[#181818]
                px-5
                py-4
                transition-all
                duration-300
                hover:border-[#D4AF37]/40
                hover:bg-[#1d1d1d]
              "
            >
              <div className="flex items-center gap-4">
                {/* Icon */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#D4AF37]/10
                    transition
                    group-hover:bg-[#D4AF37]/15
                  "
                >
                  <Icon
                    size={22}
                    className="text-[#D4AF37]"
                  />
                </div>

                {/* Text */}

                <div className="text-left">
                  <h3 className="font-semibold text-white transition group-hover:text-[#D4AF37]">
                    {action.title}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Arrow */}

              <ArrowRight
                size={18}
                className="
                  text-zinc-600
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                  group-hover:text-[#D4AF37]
                "
              />
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}