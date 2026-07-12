import { Sparkles, ArrowUpRight } from "lucide-react";

export default function RecommendationCard({
  recommendation,
}) {
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
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-[#D4AF37]/20
            bg-[#D4AF37]/10
          "
        >
          <Sparkles
            size={22}
            className="text-[#D4AF37]"
          />
        </div>

        {/* Content */}

        <div className="flex-1">

          <div className="flex items-center justify-between gap-3">

            <h3 className="text-lg font-semibold text-white">
              {recommendation.title}
            </h3>

            <ArrowUpRight
              size={18}
              className="
                text-zinc-600
                transition
                group-hover:text-[#D4AF37]
              "
            />

          </div>

          <div className="my-4 h-px bg-white/5" />

          <p className="leading-8 text-zinc-400">
            {recommendation.description}
          </p>

        </div>

      </div>
    </div>
  );
}