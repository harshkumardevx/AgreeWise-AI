import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

export default function RiskScore({ score = 78 }) {
  let color = "#22C55E";
  let bg = "bg-emerald-500/10";
  let border = "border-emerald-500/20";
  let text = "text-emerald-400";
  let label = "Low Risk";
  let Icon = ShieldCheck;

  if (score >= 70) {
    color = "#EF4444";
    bg = "bg-red-500/10";
    border = "border-red-500/20";
    text = "text-red-400";
    label = "High Risk";
    Icon = ShieldX;
  } else if (score >= 40) {
    color = "#D4AF37";
    bg = "bg-[#D4AF37]/10";
    border = "border-[#D4AF37]/20";
    text = "text-[#D4AF37]";
    label = "Medium Risk";
    Icon = ShieldAlert;
  }

  const circumference = 2 * Math.PI * 54;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">

      {/* Circular Score */}

      <div className="relative h-36 w-36">

        <svg
          className="-rotate-90"
          width="144"
          height="144"
        >
          {/* Background */}

          <circle
            cx="72"
            cy="72"
            r="54"
            stroke="#2A2A2A"
            strokeWidth="10"
            fill="transparent"
          />

          {/* Progress */}

          <motion.circle
            cx="72"
            cy="72"
            r="54"
            stroke={color}
            strokeWidth="10"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference,
            }}
            animate={{
              strokeDashoffset: progress,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />

        </svg>

        {/* Center */}

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <Icon
            size={22}
            className={text}
          />

          <motion.span
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="mt-2 text-3xl font-bold text-white"
          >
            {score}
          </motion.span>

          <span className="text-[10px] uppercase tracking-widest text-white">
            Risk Score
          </span>

        </div>

      </div>

      {/* Risk Badge */}

      <div
        className={`
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          px-4
          py-2
          text-sm
          font-semibold
          ${bg}
          ${border}
          ${text}
        `}
      >
        <Icon size={16} />

        {label}

      </div>

    </div>
  );
}