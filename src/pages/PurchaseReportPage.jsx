// import React, { useEffect, useState } from "react";
// import { downloadReport,printReport } from "../api/reportApi";

// const PurchaseReport = () => {
//   const purchaseId = 3;
//   const [iframeUrl, setIframeUrl] = useState(null);

//   const previewReport = async () => {
//     try {
//       const blob = await downloadReport(purchaseId, "html");
//       const url = URL.createObjectURL(blob);
//       setIframeUrl(url);
//     } catch (err) {
//       console.error("Failed to load preview", err);
//     }
//   };

//   const printIframe = () => {
//     const iframe = document.getElementById("reportIframe");
//     iframe.contentWindow.focus();
//     iframe.contentWindow.print();
//   };

//   return (
//     <div>
//       <h2>Purchase Report</h2>

//       <button onClick={() => downloadReport(purchaseId, "pdf")}>
//         Download PDF
//       </button>
//       <button onClick={() => downloadReport(purchaseId, "excel")}>
//         Download Excel
//       </button>

//       <button onClick={() => downloadReport(purchaseId, "word")}>
//         Download Word
//       </button>
//       <button onClick={() => printReport(purchaseId)}>
//         Print
//       </button>
//       <button onClick={previewReport}>
//         Print Preview
//       </button>

//       {iframeUrl && (
//         <>
//           <iframe
//             id="reportIframe"
//             src={iframeUrl}
//             title="Purchase Report Preview"
//             style={{
//               width: "100%",
//               height: "600px",
//               border: "1px solid #ccc",
//               marginTop: "10px",
//             }}
//           />

//           <button onClick={printIframe} style={{ marginTop: "10px" }}>
//             Print
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default PurchaseReport;




import React, { useState } from "react";
import { downloadReport, saveBlob } from "../api/reportApi";

const PurchaseReport = () => {
  const purchaseId = 3; // You can make this dynamic via props or router
  const [iframeUrl, setIframeUrl] = useState(null);

  // ----------------------------
  // PDF Preview in iframe
  // ----------------------------
  const previewReport = async () => {
    try {
      const blob = await downloadReport(purchaseId, "pdf");
      const url = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      setIframeUrl(url);
    } catch (err) {
      console.error("Failed to load preview:", err);
    }
  };

  // ----------------------------
  // Download any format
  // ----------------------------
  const handleDownload = async (format) => {
    try {
      const blob = await downloadReport(purchaseId, format);
      saveBlob(blob, `PurchaseReport_${purchaseId}.${format}`);
    } catch (err) {
      console.error(`Failed to download ${format}:`, err);
    }
  };

  // ----------------------------
  // Print iframe content
  // ----------------------------
  const printIframe = () => {
    const iframe = document.getElementById("reportIframe");
    if (iframe?.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Purchase Report</h2>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => handleDownload("pdf")}>Download PDF</button>{" "}
        <button onClick={() => handleDownload("excel")}>Download Excel</button>{" "}
        <button onClick={() => handleDownload("word")}>Download Word</button>{" "}
        <button onClick={previewReport}>Print Preview (PDF)</button>
      </div>

      {iframeUrl && (
        <div>
          <iframe
            id="reportIframe"
            src={iframeUrl}
            title="Purchase Report Preview"
            style={{
              width: "100%",
              height: "600px",
              border: "1px solid #ccc",
              marginTop: "10px",
            }}
          />
          <div style={{ marginTop: "10px" }}>
            <button onClick={printIframe}>Print</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseReport;

