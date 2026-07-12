import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function ClauseCard({ clause }) {
  const variants = {
    low: {
      icon: CheckCircle,
      badge: "Low Risk",
      accent: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
    },

    medium: {
      icon: AlertTriangle,
      badge: "Medium Risk",
      accent: "text-amber-400",
      border: "border-amber-500/20",
      bg: "bg-amber-500/10",
    },

    high: {
      icon: ShieldAlert,
      badge: "High Risk",
      accent: "text-red-400",
      border: "border-red-500/20",
      bg: "bg-red-500/10",
    },
  };

  const current = variants[clause.risk] || variants.medium;
  const Icon = current.icon;

  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-white/10
        bg-[#111111]
        p-6
        transition-all
        duration-300
        hover:border-[#D4AF37]/20
        hover:bg-[#151515]
      "
    >
      <div className="flex items-start gap-5">

        {/* Icon */}

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            ${current.bg}
            ${current.border}
            border
          `}
        >
          <Icon
            size={22}
            className={current.accent}
          />
        </div>

        <div className="flex-1">

          {/* Header */}

          <div className="flex flex-wrap items-center justify-between gap-3">

            <h3 className="text-lg font-semibold text-white">
              {clause.title}
            </h3>

            <span
              className={`
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-medium
                tracking-wide
                ${current.border}
                ${current.bg}
                ${current.accent}
              `}
            >
              {current.badge}
            </span>

          </div>

          {/* Divider */}

          <div className="my-4 h-px bg-white/5" />

          {/* Description */}

          <p className="leading-8 text-zinc-400">
            {clause.description}
          </p>

        </div>

      </div>
    </div>
  );
}