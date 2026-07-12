import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import DocumentsHeader from "@/components/documents/DocumentsHeader";
import DocumentsToolbar from "@/components/documents/DocumentsToolbar";
import DocumentsTable from "@/components/documents/DocumentsTable";
import EmptyDocuments from "@/components/documents/EmptyDocuments";
import DeleteDialog from "@/components/documents/DeleteDialog";

import {
  getDocuments,
  deleteDocument as deleteDocumentAPI,
} from "@/services/documentApi";
import { analyzeDocument } from "@/services/reportApi";

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "—";

  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Maps a raw backend Document (from /api/document) into the shape
// the Documents UI components expect.
function mapDocument(doc) {
  return {
    id: doc._id,
    name: doc.originalName,
    size: formatSize(doc.fileSize),
    // Backend upload status: uploaded | processing | completed | failed
    status: doc.status,
    // Real risk level from the document's latest Report (low/medium/high),
    // or "pending" if no analysis has run yet.
    risk: doc.riskLevel || "pending",
    latestReportId: doc.latestReportId || null,
    uploadedAt: formatDate(doc.createdAt),
    filePath: doc.filePath,
  };
}

export default function Documents() {
  // =========================
  // Real Data (fetched from backend)
  // =========================

  const [documents, setDocuments] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchDocuments = async () => {
    try {
      setFetching(true);

      const data = await getDocuments();

      setDocuments(data.documents.map(mapDocument));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load documents."
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // =========================
  // Toolbar States
  // =========================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [risk, setRisk] = useState("all");
  const [sort, setSort] = useState("newest");

  // =========================
  // Delete Dialog
  // =========================

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // Analyze / Re-analyze
  // =========================

  const navigate = useNavigate();
  const [analyzingId, setAnalyzingId] = useState(null);

  const handleAnalyze = async (doc) => {
    try {
      setAnalyzingId(doc.id);

      const res = await analyzeDocument(doc.id);

      toast.success("AI analysis complete.");

      navigate(`/reports/${res.report.id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Analysis failed. Please try again."
      );
    } finally {
      setAnalyzingId(null);
    }
  };

  // =========================
  // Filters
  // =========================

  const filteredDocuments = useMemo(() => {
    let data = [...documents];

    // Search

    if (search.trim()) {
      data = data.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status

    if (status !== "all") {
      data = data.filter(
        (doc) => doc.status === status
      );
    }

    // Risk

    if (risk !== "all") {
      data = data.filter(
        (doc) => doc.risk === risk
      );
    }

    // Sort

    switch (sort) {
      case "name":
        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "risk": {
        const order = {
          high: 3,
          medium: 2,
          low: 1,
        };

        data.sort(
          (a, b) =>
            order[b.risk] - order[a.risk]
        );

        break;
      }

      case "oldest":
        data.reverse();
        break;

      default:
        break;
    }

    return data;
  }, [documents, search, status, risk, sort]);

  // =========================
  // Delete
  // =========================

  const handleDelete = async () => {
    if (!selectedDoc) return;

    try {
      setLoading(true);

      await deleteDocumentAPI(selectedDoc.id);

      setDocuments((prev) =>
        prev.filter(
          (doc) => doc.id !== selectedDoc.id
        )
      );

      toast.success("Document deleted.");

      setDeleteOpen(false);

      setSelectedDoc(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete document."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <DocumentsHeader />

      {/* Toolbar */}

      <DocumentsToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        risk={risk}
        setRisk={setRisk}
        sort={sort}
        setSort={setSort}
      />

      {/* Table */}

      {fetching ? (
        <div className="rounded-3xl border border-slate-800 bg-[#111111] p-16 text-center text-slate-400">
          Loading documents...
        </div>
      ) : filteredDocuments.length > 0 ? (
        <DocumentsTable
          documents={filteredDocuments}
          onDelete={(doc) => {
            setSelectedDoc(doc);
            setDeleteOpen(true);
          }}
          onAnalyze={handleAnalyze}
          analyzingId={analyzingId}
        />
      ) : (
        <EmptyDocuments />
      )}

      {/* Delete */}

      <DeleteDialog
        open={deleteOpen}
        loading={loading}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedDoc(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
