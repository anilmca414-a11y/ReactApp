import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoSuggestInput from "./AutoSuggestInput";
import "./Division.css";

const Division = () => {
  const navigate = useNavigate();

  const [branch, setBranch] = useState("");
  const [financialYear, setFinancialYear] = useState("");
  const [division, setDivision] = useState("Export Air");

  const handleSubmit = () => {
    console.log({ branch, division, financialYear });
    navigate("/components/Menu");
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Division Selection</h2>

        <AutoSuggestInput
          label="Branch"
          value={branch}
          onChange={setBranch}
          apiUrl="https://localhost:44364/api/autosuggest/office"
          displayKey="name"
          placeholder="Type branch name"
        />

        <div className="radio-grid">
          {["Export Air", "Export Sea", "Import Air", "Import Sea"].map((d) => (
            <label key={d}>
              <input
                type="radio"
                value={d}
                checked={division === d}
                onChange={(e) => setDivision(e.target.value)}
              />
              {d}
            </label>
          ))}
        </div>

        <AutoSuggestInput
          label="Financial Year"
          value={financialYear}
          onChange={setFinancialYear}
          apiUrl="https://localhost:44364/api/autosuggest/financialyear"
          displayKey="year"
          placeholder="Type financial year"
        />

        <button className="btn" onClick={handleSubmit}>
          ✔ Submit
        </button>
      </div>
    </div>
  );
};

export default Division;
