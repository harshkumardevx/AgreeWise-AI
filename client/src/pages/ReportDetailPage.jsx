import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import ReportDetails from "@/components/reports/ReportDetails";
import { getReport, downloadReport, analyzeDocument } from "@/services/reportApi";

export default function ReportDetailsPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [reanalyzing, setReanalyzing] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);

        const data = await getReport(reportId);

        setReport(data.report);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load report."
        );
        navigate("/reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const blob = await downloadReport(reportId);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${report.name.replace(/\.pdf$/i, "")}-report.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Report downloaded.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to download report."
      );
    } finally {
      setDownloading(false);
    }
  };

  const handleReanalyze = async () => {
    if (!report?.documentId) return;

    try {
      setReanalyzing(true);

      const res = await analyzeDocument(report.documentId);

      toast.success("Contract re-analyzed successfully.");

      navigate(`/reports/${res.report.id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Re-analysis failed."
      );
    } finally {
      setReanalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-[#111111] p-16 text-center text-slate-400">
        Loading report...
      </div>
    );
  }

  if (!report) return null;

  return (
    <ReportDetails
      report={report}
      onDownload={handleDownload}
      onReanalyze={handleReanalyze}
      downloading={downloading}
      reanalyzing={reanalyzing}
    />
  );
}
