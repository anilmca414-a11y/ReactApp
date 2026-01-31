import React, { useState } from "react";
import axios from "axios";
import "./Consignee.css";

const API_BASE = "https://localhost:44364/api/Consignee";

export default function App() {
  const [partyType, setPartyType] = useState("consignee");

  const [form, setForm] = useState({
    action:"",
    partyType:"",
    partyName: "",
    extendedName: "",
    relatedThirdParty: "",
    contactPerson: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phone: "",
    mobile: "",
    fax: "",
    email1: "",
    email2: "",
    website: "",
    unlocCity: "",
    branchName: "",
  });

  const [partyId, setPartyId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setForm({
      partyType:"",
      partyName: "",
      extendedName: "",
      relatedThirdParty: "",
      contactPerson: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      phone: "",
      mobile: "",
      fax: "",
      email1: "",
      email2: "",
      website: "",
      unlocCity: "",
      branchName: "",
    });
    setPartyId("");
  };

  // ✅ SAVE (POST)
  const handleSave = async () => {
    if (!form.partyName.trim()) {
    alert("Party Name is required");
    return;
  }
    try {
      const response = await axios.post(`${API_BASE}/save`, form);
      console.log("Saved Successfully:", response.data);
      handleClear();
    } catch (error) {
      console.error("Save failed:", error.response || error);
    }
  };

  // ✅ MODIFY (PUT)
  const handleModify = async () => {
    if (!partyId) {
      console.error("Party ID is required to modify.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE}/update/${partyId}`,
        form
      );
      console.log("Modified Data:", response.data);
      handleClear();
    } catch (error) {
      console.error("Error modifying data:", error.response || error);
    }
  };

  // ✅ DELETE (DELETE)
  const handleDelete = async () => {
    if (!partyId) {
      console.error("Party ID is required to delete.");
      return;
    }

    try {
      await axios.delete(`${API_BASE}/delete/${partyId}`);
      console.log("Deleted Party:", partyId);
      handleClear();
    } catch (error) {
      console.error("Error deleting data:", error.response || error);
    }
  };

  return (
    <div className="container">
      <h3>Consignee / Buyer / Notify</h3>

      {/* Party Type */}
      <div className="radio-group">
        <label>
          <input
            type="radio"
            checked={partyType === "consignee"}
            onChange={() => setPartyType("consignee")}
          />
          Consignee/Supplier
        </label>

        <label>
          <input
            type="radio"
            checked={partyType === "buyer"}
            onChange={() => setPartyType("buyer")}
          />
          Buyer
        </label>

        <label>
          <input
            type="radio"
            checked={partyType === "notify"}
            onChange={() => setPartyType("notify")}
          />
          Notify
        </label>
      </div>

      {/* Party Info */}
      <div className="grid-3">
        <input name="partyName" placeholder="Party Name" value={form.partyName} onChange={handleChange} />
        <input name="extendedName" placeholder="Extended Name" value={form.extendedName} onChange={handleChange} />
        <input name="relatedThirdParty" placeholder="Related Third Party" value={form.relatedThirdParty} onChange={handleChange} />
      </div>

      <h4>Address</h4>

      <div className="grid-2">
        <input name="contactPerson" placeholder="Contact Person" value={form.contactPerson} onChange={handleChange} />
        <input name="branchName" placeholder="Branch Name" value={form.branchName} onChange={handleChange} />
      </div>

      <div className="grid-3">
        <input name="address1" placeholder="Address Line 1" value={form.address1} onChange={handleChange} />
        <input name="address2" placeholder="Address Line 2" value={form.address2} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      </div>

      <div className="grid-3">
        <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
        <input name="pinCode" placeholder="Pin Code" value={form.pinCode} onChange={handleChange} />
      </div>

      <div className="grid-3">
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
        <input name="fax" placeholder="Fax" value={form.fax} onChange={handleChange} />
      </div>

      <div className="grid-3">
        <input name="email1" placeholder="Email ID 1" value={form.email1} onChange={handleChange} />
        <input name="email2" placeholder="Email ID 2" value={form.email2} onChange={handleChange} />
        <input name="website" placeholder="Website" value={form.website} onChange={handleChange} />
      </div>

      <div className="grid-2">
        <input name="unlocCity" placeholder="UNLOC Code City" value={form.unlocCity} onChange={handleChange} />
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button className="save" onClick={handleSave}>Save</button>
        <button className="modify" onClick={handleModify}>Modify</button>
        <button className="delete" onClick={handleDelete}>Delete</button>
        <button className="clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
