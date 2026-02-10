import React, { useEffect, useState } from "react";
import axios from "axios";

const ExcelPreview = () => {
  const [htmlTable, setHtmlTable] = useState("");

  // Preview Excel
  const handlePreview = async () => {
    try {
      const response = await fetch("https://localhost:7106/api/Excel/preview");
      const html = await response.text();
      setHtmlTable(html);
    } catch (error) {
      console.error("Error fetching preview:", error);
    }
  };

  // Download Excel
  const handleDownload = () => {
    // Just open the download link in a new tab
    window.open("https://localhost:7106/api/Excel/preview?download=true", "_blank");
  };

  // Print Excel preview
  const handlePrint = () => {
    if (!htmlTable) return alert("Load preview first!");
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Excel</title></head><body>");
    printWindow.document.write(htmlTable);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Excel Preview & Download</h2>
      <button onClick={handlePreview} style={{ marginRight: "10px" }}>Preview Excel</button>
      <button onClick={handleDownload} style={{ marginRight: "10px" }}>Download Excel</button>
      <button onClick={handlePrint}>Print Excel</button>

      <div style={{ marginTop: "20px" }} dangerouslySetInnerHTML={{ __html: htmlTable }}></div>
    </div>
   );
 };

// const ExcelPreview = () => {
//   const [previewHtml, setPreviewHtml] = useState("");

//   useEffect(() => {
//     axios.get("https://localhost:7106/api/Excel/preview?download=true")
//       .then(res => setPreviewHtml(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const handlePrint = () => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(previewHtml);
//     printWindow.document.close();
//     //printWindow.print();
//   };

//   const handleDownload = () => {
//     axios.get("https://localhost:7106/api/Excel/preview?download=false", {
//       responseType: "blob"
//     })
//     .then(res => {
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "PaymentSheet.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     })
//     .catch(err => console.error(err));
//   };

//   return (
//     <div>
//       <h2>Excel Print Preview</h2>
//       <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
//       <button onClick={handlePrint}>Print</button>
//       <button onClick={handleDownload}>Download Excel</button>
//     </div>
//   );
// };

export default ExcelPreview;
