import React, { useState } from "react";
import "./Consignee.css";

export default function App() {
  const [partyType, setPartyType] = useState("consignee");

  const [form, setForm] = useState({
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setForm({
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
        <input
          name="partyName"
          placeholder="Party Name"
          value={form.partyName}
          onChange={handleChange}
        />
        <input
          name="extendedName"
          placeholder="Extended Name"
          value={form.extendedName}
          onChange={handleChange}
        />
        <input
          name="relatedThirdParty"
          placeholder="Related Third Party"
          value={form.relatedThirdParty}
          onChange={handleChange}
        />
      </div>

      <h4>Address</h4>

      <div className="grid-2">
        <input
          name="contactPerson"
          placeholder="Contact Person"
          value={form.contactPerson}
          onChange={handleChange}
        />
        <input
          name="branchName"
          placeholder="Branch Name"
          value={form.branchName}
          onChange={handleChange}
        />
      </div>

      <div className="grid-3">
        <input
          name="address1"
          placeholder="Address Line 1"
          value={form.address1}
          onChange={handleChange}
        />
        <input
          name="address2"
          placeholder="Address Line 2"
          value={form.address2}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
      </div>

      <div className="grid-3">
        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />
        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />
        <input
          name="pinCode"
          placeholder="Pin Code"
          value={form.pinCode}
          onChange={handleChange}
        />
      </div>

      <div className="grid-3">
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
        />
        <input
          name="fax"
          placeholder="Fax"
          value={form.fax}
          onChange={handleChange}
        />
      </div>

      <div className="grid-3">
        <input
          name="email1"
          placeholder="Email ID 1"
          value={form.email1}
          onChange={handleChange}
        />
        <input
          name="email2"
          placeholder="Email ID 2"
          value={form.email2}
          onChange={handleChange}
        />
        <input
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid-2">
        <input
          name="unlocCity"
          placeholder="UNLOC Code City"
          value={form.unlocCity}
          onChange={handleChange}
        />
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button className="save">Save</button>
        <button className="modify">Modify</button>
        <button className="delete">Delete</button>
        <button className="clear" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
