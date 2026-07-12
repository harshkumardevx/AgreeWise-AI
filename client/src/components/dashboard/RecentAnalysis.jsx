import { motion } from "framer-motion";
import {
  FileText,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const badgeColor = {
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  high: "bg-red-500/10 text-red-400 border-red-500/20",
  pending: "bg-zinc-700 text-zinc-400 border-zinc-600",
};

const badgeLabel = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
  pending: "Pending",
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default function RecentAnalysis({
  documents = [],
  loading = false,
}) {
  const navigate = useNavigate();

  const analyses = documents.slice(0, 3).map((doc) => ({
    id: doc._id,
    name: doc.originalName,
    risk: doc.riskLevel || "pending",
    reportId: doc.latestReportId || null,
    date: formatDate(doc.createdAt),
  }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        rounded-3xl
        border
        border-[#D4AF37]/15
        bg-[#111111]
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Analysis
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Your latest analyzed agreements.
          </p>
        </div>

        <button
          onClick={() => navigate("/documents")}
          className="
            rounded-xl
            border
            border-[#D4AF37]/25
            px-4
            py-2
            text-sm
            font-medium
            text-[#D4AF37]
            transition
            hover:bg-[#D4AF37]
            hover:text-black
          "
        >
          View All
        </button>
      </div>

      {/* Body */}

      <div className="p-6">
        {loading ? (
          <p className="text-zinc-500">
            Loading...
          </p>
        ) : analyses.length === 0 ? (
          <p className="text-zinc-500">
            No documents uploaded yet.
          </p>
        ) : (
          <div className="space-y-4">
            {analyses.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-[#181818]
                  p-5
                  transition-all
                  hover:border-[#D4AF37]/30
                "
              >
                {/* Top */}

                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#D4AF37]/10
                      "
                    >
                      <FileText
                        size={22}
                        className="text-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {item.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                        <CalendarDays size={15} />
                        {item.date}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`
                      rounded-full
                      border
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${badgeColor[item.risk]}
                    `}
                  >
                    {badgeLabel[item.risk]}
                  </span>
                </div>

                {/* Footer */}

                <div className="mt-5 border-t border-zinc-800 pt-4">
                  <button
                    onClick={() =>
                      navigate(
                        item.reportId
                          ? `/reports/${item.reportId}`
                          : "/documents"
                      )
                    }
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-[#D4AF37]
                      transition
                    "
                  >
                    {item.reportId
                      ? "View Report"
                      : "View Document"}

                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}