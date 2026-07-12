import api from "./api";

// Triggers AI analysis (Groq) for an uploaded document and creates a Report.
export const analyzeDocument = async (documentId, analysisOptions = []) => {
  const response = await api.post(`/report/analyze/${documentId}`, {
    analysisOptions,
  });

  return response.data;
};

export const getReports = async () => {
  const response = await api.get("/report");
  return response.data;
};

export const getReport = async (reportId) => {
  const response = await api.get(`/report/${reportId}`);
  return response.data;
};

export const getReportStats = async () => {
  const response = await api.get("/report/stats/summary");
  return response.data;
};

// Downloads the report as a file (returned as a Blob so the browser can
// save it, since this isn't a simple static-file link).
export const downloadReport = async (reportId) => {
  const response = await api.get(`/report/${reportId}/download`, {
    responseType: "blob",
  });

  return response.data;
};
