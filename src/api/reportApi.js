//  //const API_URL = "https://localhost:7106/api/Report/";

// // export const downloadReport = async (id, format) => {
// //   const response = await fetch(
// //     `${API_URL}/purchase/${id}?format=${format}`
// //   );
// import axios from "axios";

// // export const downloadReport = async (id, format) => {
// //   const response = await axios.get(
// //     `https://localhost:7106/api/Report/purchase/${id}?format=${format}`,
// //     {
// //       responseType: "blob", // 🔥 IMPORTANT
// //     }
  
// //   );
// //     const pdfUrl=URL.createObjectURL(response.data);
// //   console.log(pdfUrl)
// //   return response.data; // Blob
// // };

// export const downloadReport = async (id, format) => {

//   const response = await fetch(
//     `https://localhost:7106/api/Report/purchase/${id}?format=${format}`
//   );

//   const blob = await response.blob();
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `PurchaseReport_${id}.${format}`;
//   document.body.appendChild(a);
//   a.click();
//   a.remove();
//   window.URL.revokeObjectURL(url);
// };
//  //`${API_URL}/purchase/${id}?format=pdf`
// export const printReport = async (id, format) => {
//   const response = await fetch(
//     `https://localhost:7106/api/Report/purchase/${id}?format=${format}`
//   );

//   const blob = await response.blob();
//   const url = window.URL.createObjectURL(blob);

//   const iframe = document.createElement("iframe");
//   iframe.style.display = "none";
//   iframe.src = url;

//   document.body.appendChild(iframe);

//   iframe.onload = () => {
//     iframe.contentWindow.print();
//   };
// };




import axios from "axios";

// Replace with your backend IP / port
const BASE_URL = "https://localhost:7106"; 

// Fetch report as Blob
export const downloadReport = async (id, format) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/Report/purchase/${id}?format=${format}`,
      { responseType: "blob" } // Important for files
    );
    return response.data; // Blob
  } catch (err) {
    console.error("API download error:", err);
    throw err;
  }
};

// Helper to download/save Blob
export const saveBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
