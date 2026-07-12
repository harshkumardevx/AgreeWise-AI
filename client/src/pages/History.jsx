import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import HistoryHeader from "@/components/history/HistoryHeader";
import Timeline from "@/components/history/Timeline";
import EmptyHistory from "@/components/history/EmptyHistory";
import ClearHistoryDialog from "@/components/history/ClearHistoryDialog";

import { getHistory, clearHistory } from "@/services/historyApi";

export default function History() {
  const [activities, setActivities] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchHistory = async () => {
    try {
      setFetching(true);

      const data = await getHistory();

      setActivities(data.activities);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load history."
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // ====================================
  // Dialog State
  // ====================================

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ====================================
  // Clear History
  // ====================================

  const handleClearHistory = async () => {
    try {
      setLoading(true);

      await clearHistory();

      setActivities([]);

      toast.success("History cleared successfully.");

      setOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to clear history."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <HistoryHeader
        onClear={() => setOpen(true)}
      />

      {/* Timeline */}

      {fetching ? (
        <div className="rounded-3xl border border-slate-800 bg-[#111111] p-16 text-center text-slate-400">
          Loading history...
        </div>
      ) : activities.length ? (
        <Timeline
          activities={activities}
        />
      ) : (
        <EmptyHistory />
      )}

      {/* Dialog */}

      <ClearHistoryDialog
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={handleClearHistory}
      />
    </div>
  );
}
