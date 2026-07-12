import {
  FileText,
  ShieldCheck,
  TriangleAlert,
  Activity,
} from "lucide-react";

import StatsCards from "./StatsCards";

export default function StatsGrid({
  documentCount = 0,
  loading = false,
  reportStats = null,
  statsLoading = false,
}) {
  const stats = [
    {
      title: "Documents",
      value: loading ? "—" : documentCount,
      description: "Uploaded agreements",
      icon: FileText,
      iconColor: "text-blue-400",
    },

    {
      title: "Reports",
      value: statsLoading
        ? "—"
        : reportStats?.totalReports ?? 0,
      description: "Generated analyses",
      icon: ShieldCheck,
      iconColor: "text-emerald-400",
    },

    {
      title: "High Risk",
      value: statsLoading
        ? "—"
        : reportStats?.highRiskCount ?? 0,
      description: "Need immediate review",
      icon: TriangleAlert,
      iconColor: "text-red-400",
    },

    {
      title: "Average Score",
      value: statsLoading
        ? "—"
        : `${reportStats?.averageRiskScore ?? 0}%`,
      description: "Overall contract risk",
      icon: Activity,
      iconColor: "text-[#C9A227]",
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatsCards
          key={item.title}
          {...item}
        />
      ))}
    </section>
  );
}