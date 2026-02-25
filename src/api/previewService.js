const API_URL = "https://localhost:7106/api/DataExcel/preview?page=1&pageSize=1000";

export const getPreviewData = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
};