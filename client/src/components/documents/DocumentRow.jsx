import {
  Eye,
  Trash2,
  RotateCcw,
  Sparkles,
  Download,
  FileText,
  FileSearch,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "./StatusBadge";
import RiskBadge from "./RiskBadge";

export default function DocumentRow({
  document,
  onDelete,
  onAnalyze,
  analyzing,
}) {
  const navigate = useNavigate();

  const fileUrl = document.filePath || null;
  const alreadyAnalyzed = Boolean(document.latestReportId);

  return (
    <tr className="group border-b border-white/6 transition-colors duration-200 hover:bg-white/2.5">

      {/* Contract */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-[#171717]
              transition
              group-hover:border-[#D4AF37]/30
            "
          >
            <FileText
              size={20}
              className="text-[#D4AF37]"
            />
          </div>

          <div className="min-w-0">

            <h3
              className="
                truncate
                font-medium
                text-white
                transition-colors
                group-hover:text-[#F3D97A]
              "
            >
              {document.name}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
              <span>{document.size}</span>

              <span className="text-zinc-700">•</span>

              <span>PDF Document</span>
            </div>

          </div>

        </div>

      </td>

      {/* Risk */}

      <td className="px-6 py-5">
        <RiskBadge risk={document.risk} />
      </td>

      {/* Status */}

      <td className="px-6 py-5">
        <StatusBadge status={document.status} />
      </td>

      {/* Date */}

      <td className="px-6 py-5">
        <span className="text-sm text-zinc-400">
          {document.uploadedAt}
        </span>
      </td>

      {/* Actions */}

      <td className="px-6 py-5">

        <div className="flex items-center justify-end gap-2">

          {/* Preview */}

          <a
            href={fileUrl || undefined}
            target="_blank"
            rel="noreferrer"
            title="Preview"
            className={`
              rounded-xl
              border
              border-white/10
              bg-[#171717]
              p-2.5
              transition-all
              hover:border-[#D4AF37]/30
              hover:bg-[#1d1d1d]

              ${!fileUrl ? "pointer-events-none opacity-40" : ""}
            `}
          >
            <Eye
              size={17}
              className="text-zinc-300"
            />
          </a>

          {/* Download */}

          <a
            href={fileUrl || undefined}
            download={document.name}
            title="Download"
            className={`
              rounded-xl
              border
              border-white/10
              bg-[#171717]
              p-2.5
              transition-all
              hover:border-emerald-500/30
              hover:bg-[#1d1d1d]

              ${!fileUrl ? "pointer-events-none opacity-40" : ""}
            `}
          >
            <Download
              size={17}
              className="text-emerald-400"
            />
          </a>

          {/* Report */}

          {alreadyAnalyzed && (
            <button
              onClick={() =>
                navigate(`/reports/${document.latestReportId}`)
              }
              title="View Report"
              className="
                rounded-xl
                border
                border-white/10
                bg-[#171717]
                p-2.5
                transition-all
                hover:border-violet-500/30
                hover:bg-[#1d1d1d]
              "
            >
              <FileSearch
                size={17}
                className="text-violet-400"
              />
            </button>
          )}

          {/* Analyze */}

          <button
            onClick={() => onAnalyze(document)}
            disabled={analyzing}
            title={
              alreadyAnalyzed
                ? "Re-analyze with AI"
                : "Analyze with AI"
            }
            className="
              rounded-xl
              border
              border-[#D4AF37]/20
              bg-[#D4AF37]/10
              p-2.5
              transition-all
              hover:bg-[#D4AF37]/20
              disabled:opacity-50
            "
          >
            {analyzing ? (
              <Loader2
                size={17}
                className="animate-spin text-[#D4AF37]"
              />
            ) : alreadyAnalyzed ? (
              <RotateCcw
                size={17}
                className="text-[#D4AF37]"
              />
            ) : (
              <Sparkles
                size={17}
                className="text-[#D4AF37]"
              />
            )}
          </button>

          {/* Delete */}

          <button
            onClick={() => onDelete(document)}
            title="Delete"
            className="
              rounded-xl
              border
              border-white/10
              bg-[#171717]
              p-2.5
              transition-all
              hover:border-red-500/30
              hover:bg-red-500/10
            "
          >
            <Trash2
              size={17}
              className="text-red-400"
            />
          </button>

        </div>

      </td>

    </tr>
  );
}