import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentAnalysis from "@/components/dashboard/RecentAnalysis";
import RiskChart from "@/components/dashboard/RiskChart";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

import { getDocuments } from "@/services/documentApi";
import { getReportStats } from "@/services/reportApi";
import { getHistory } from "@/services/historyApi";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);

  const [reportStats, setReportStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoadingDocuments(true);

        const data = await getDocuments();

        setDocuments(data.documents);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load dashboard data."
        );
      } finally {
        setLoadingDocuments(false);
      }
    };

    const fetchStats = async () => {
      try {
        setStatsLoading(true);

        const data = await getReportStats();

        setReportStats(data.stats);
      } catch (error) {
        // Non-blocking — stats widgets just show zero state.
      } finally {
        setStatsLoading(false);
      }
    };

    const fetchActivities = async () => {
      try {
        setActivitiesLoading(true);

        const data = await getHistory();

        setActivities(data.activities.slice(0, 4));
      } catch (error) {
        // Non-blocking — timeline just shows empty state.
      } finally {
        setActivitiesLoading(false);
      }
    };

    fetchDocuments();
    fetchStats();
    fetchActivities();
  }, []);

  return (
    <div className="space-y-8">
      <WelcomeCard />

      <StatsGrid
        documentCount={documents.length}
        loading={loadingDocuments}
        reportStats={reportStats}
        statsLoading={statsLoading}
      />

      <div className="grid gap-8 xl:grid-cols-3">
        {/* Left */}
        <div className="space-y-8 xl:col-span-2">
          <RecentAnalysis
            documents={documents}
            loading={loadingDocuments}
          />
          <ActivityTimeline
            activities={activities}
            loading={activitiesLoading}
          />
        </div>

        {/* Right */}
        <div className="space-y-8">
          <RiskChart stats={reportStats} loading={statsLoading} />
          <QuickActions />
        </div>
      </div>
      
    </div>
  );
}
