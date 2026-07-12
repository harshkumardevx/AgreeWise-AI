import api from "./api";

// Upload PDF
export const uploadDocument = async (file) => {
  const formData = new FormData();

  formData.append("document", file);

  const response = await api.post(
    "/document/upload",
    formData
  );

  return response.data;
};

// Get User Documents
export const getDocuments = async () => {
  const response = await api.get("/document");

  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/document/${id}`);

  return response.data;
};