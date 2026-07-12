import api from "./api";

export const getHistory = async () => {
  const response = await api.get("/history");
  return response.data;
};

export const clearHistory = async () => {
  const response = await api.delete("/history");
  return response.data;
};
