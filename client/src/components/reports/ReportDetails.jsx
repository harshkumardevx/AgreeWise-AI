import {
  FileText,
  ScrollText,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import RiskScore from "./RiskScore";
import ReportActions from "./ReportActions";
import ClauseCard from "./ClauseCard";
import RecommendationCard from "./RecommendationCard";

export default function ReportDetails({
  report,
  onDownload,
  onReanalyze,
  downloading,
  reanalyzing,
}) {
  return (
    <div className="space-y-8">

      {/* ================= Header ================= */}

      <section className="rounded-3xl border border-white/10 bg-[#111111] overflow-hidden">

        <div className="border-b border-white/5 bg-gradient-to-r from-[#D4AF37]/8 to-transparent px-8 py-7">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#D4AF37]">

                <FileText size={15} />

                AI Contract Report

              </div>

              <h1 className="text-4xl font-bold text-white">
                {report.name}
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-zinc-500">
                Comprehensive AI-powered legal analysis highlighting
                contract risks, important clauses and practical
                recommendations.
              </p>

            </div>

            <RiskScore score={report.score} />

          </div>

        </div>

      </section>

      {/* ================= Summary ================= */}

      <section className="rounded-3xl border border-white/10 bg-[#111111] p-8">

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-3">

            <ScrollText
              size={20}
              className="text-[#D4AF37]"
            />

          </div>

          <div>

            <h2 className="text-2xl font-semibold text-white">
              Agreement Summary
            </h2>

            <p className="text-sm text-zinc-500">
              Overall understanding of the uploaded contract
            </p>

          </div>

        </div>

        <div className="rounded-2xl border border-white/5 bg-[#181818] p-6">

          <p className="leading-8 text-zinc-300">
            {report.summary}
          </p>

        </div>

      </section>

      {/* ================= Clauses ================= */}

      <section className="space-y-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-3">

            <ShieldAlert
              size={20}
              className="text-[#D4AF37]"
            />

          </div>

          <div>

            <h2 className="text-2xl font-semibold text-white">
              Important Clauses
            </h2>

            <p className="text-sm text-zinc-500">
              AI detected the following key legal clauses
            </p>

          </div>

        </div>

        <div className="grid gap-5">

          {report.clauses.map((clause) => (
            <ClauseCard
              key={clause.id}
              clause={clause}
            />
          ))}

        </div>

      </section>

      {/* ================= Recommendations ================= */}

      <section className="space-y-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-3">

            <Sparkles
              size={20}
              className="text-[#D4AF37]"
            />

          </div>

          <div>

            <h2 className="text-2xl font-semibold text-white">
              AI Recommendations
            </h2>

            <p className="text-sm text-zinc-500">
              Suggested actions before signing this agreement
            </p>

          </div>

        </div>

        <div className="grid gap-5">

          {report.recommendations.map((item) => (
            <RecommendationCard
              key={item.id}
              recommendation={item}
            />
          ))}

        </div>

      </section>

      {/* ================= Actions ================= */}

      <ReportActions
        onDownload={onDownload}
        onReanalyze={onReanalyze}
        downloading={downloading}
        reanalyzing={reanalyzing}
      />

    </div>
  );
}