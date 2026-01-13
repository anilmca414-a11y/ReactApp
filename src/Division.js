import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Division.css";

const Division = () => {
  const navigate = useNavigate();
  const [branch, setBranch] = useState("MUMBAI");
  const [division, setDivision] = useState("Export Sea");
  const [financialYear, setFinancialYear] = useState("2025-26");

  const handleSubmit = () => {
    const data = {
      branch,
      division,
      financialYear,
    };

    console.log("Submitted Data:", data);
    navigate("/components/Menu");
    //alert("Selection Saved Successfully!");
  };

  return (
    <div className="dashboard-container">
      <div className="selection-card">
        <h3>Select Branch</h3>
        <input
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />

        <div className="radio-section">
          <div>
            <label>
              <input
                type="radio"
                value="Export Air"
                checked={division === "Export Air"}
                onChange={(e) => setDivision(e.target.value)}
              />
              Export Air
            </label>

            <label>
              <input
                type="radio"
                value="Export Sea"
                checked={division === "Export Sea"}
                onChange={(e) => setDivision(e.target.value)}
              />
              Export Sea
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                value="Import Air"
                checked={division === "Import Air"}
                onChange={(e) => setDivision(e.target.value)}
              />
              Import Air
            </label>

            <label>
              <input
                type="radio"
                value="Import Sea"
                checked={division === "Import Sea"}
                onChange={(e) => setDivision(e.target.value)}
              />
              Import Sea
            </label>
          </div>
        </div>

        <h3>Select Financial Year</h3>
        <div className="fy-row">
          <input
            type="text"
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
          />
          <button onClick={handleSubmit}>✔ OK</button>
        </div>
      </div>
    </div>
  );
};

export default Division;
