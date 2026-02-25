// import React, { useEffect, useState } from "react";
// import { getPreviewData } from "../../api/previewService";
// import "./Preview.css";

// function Preview() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     getPreviewData()
//       .then(result => setData(result))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div className="preview-container">
//       <h2>Excel Preview</h2>

//       <table>
//         <thead>
//           <tr>
//             {data.length > 0 &&
//               Object.keys(data[0]).map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, i) => (
//             <tr key={i}>
//               {Object.keys(row).map((key) => (
//                 <td key={key}>
//                   {typeof row[key] === "object" ? "" : row[key]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Preview;


import React, { useEffect, useState } from "react";
import { getPreviewData } from "../../api/previewService";
import "./Preview.css";

function Preview() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch preview data
  const handlePreview = () => {
    setLoading(true);
    getPreviewData()
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  // Download Excel file
  const handleDownload = () => {
    window.open("https://localhost:7106/api/DataExcel/download", "_blank");
    // Replace URL with your backend download API
  };

  // Optional: Auto preview on load
  useEffect(() => {
    handlePreview();
  }, []);

  return (
    <div className="preview-container">
      <h2>Excel Preview</h2>

      <div className="button-group">
        <button onClick={handlePreview} disabled={loading}>
          {loading ? "Loading..." : "Preview"}
        </button>

        <button onClick={handleDownload}>
          Download
        </button>
      </div>

      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.keys(row).map((key) => (
                  <td key={key}>
                    {typeof row[key] === "object" ? "" : row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Preview;
