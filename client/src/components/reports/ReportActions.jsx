import {
  Download,
  RotateCcw,
  Share2,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ReportActions({
  onDownload,
  onReanalyze,
  downloading,
  reanalyzing,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111] p-8">

      {/* Header */}

      <div className="mb-8">
        <h2 className="font-serif text-2xl font-semibold text-white">
          Report Actions
        </h2>

        <p className="mt-2 text-zinc-500">
          Export, refresh AI analysis, or share this report.
        </p>
      </div>

      {/* Actions */}

      <div className="flex flex-wrap gap-4">

        {/* Download */}

        <button
          onClick={onDownload}
          disabled={downloading}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-[#D4AF37]
            bg-[#D4AF37]
            px-6
            py-3
            font-semibold
            text-black
            transition-all
            duration-200
            hover:scale-[1.02]
            hover:bg-[#E6C86E]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {downloading ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <Download size={18} />
          )}

          Download Report
        </button>

        {/* Reanalyze */}

        <button
          onClick={onReanalyze}
          disabled={reanalyzing}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-[#171717]
            px-6
            py-3
            font-medium
            text-zinc-300
            transition-all
            duration-200
            hover:border-[#D4AF37]/30
            hover:bg-[#1b1b1b]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {reanalyzing ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <RotateCcw size={18} />
          )}

          Analyze Again
        </button>

        {/* Share */}

        <button
          onClick={() => toast("Sharing is coming soon.")}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-[#171717]
            px-6
            py-3
            font-medium
            text-zinc-300
            transition-all
            duration-200
            hover:border-[#D4AF37]/30
            hover:bg-[#1b1b1b]
            hover:text-white
          "
        >
          <Share2 size={18} />

          Share Report
        </button>

      </div>

    </section>
  );
}