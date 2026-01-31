import React, { useState } from "react";
import "./Shipper.css";

const Shipper = () => {
  const [shippers, setShippers] = useState([]);
  const [form, setForm] = useState({
    shipperId: "",
    shipperName: "",
    iecNo: "",
    rbiNo: "",
    panNo: "",
    kycStatus: "",
    remarks: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShippers([...shippers, form]);
    setForm({
      shipperId: "",
      shipperName: "",
      iecNo: "",
      rbiNo: "",
      panNo: "",
      kycStatus: "",
      remarks: ""
    });
  };

  return (
    <div className="container">
      <h2>Shippers Master</h2>

      {/* Form */}
      <form className="shipper-form" onSubmit={handleSubmit}>
        <input name="shipperId" placeholder="Shipper ID" value={form.shipperId} onChange={handleChange} required />
        <input name="shipperName" placeholder="Shipper Name" value={form.shipperName} onChange={handleChange} />
        <input name="iecNo" placeholder="IEC No" value={form.iecNo} onChange={handleChange} />
        <input name="rbiNo" placeholder="RBI No" value={form.rbiNo} onChange={handleChange} />
        <input name="panNo" placeholder="PAN No" value={form.panNo} onChange={handleChange} />

        <select name="kycStatus" value={form.kycStatus} onChange={handleChange}>
          <option value="">KYC Status</option>
          <option value="Y">Approved</option>
          <option value="N">Pending</option>
        </select>

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>

      {/* Table */}
      <table className="shipper-table">
        <thead>
          <tr>
            <th>Shipper ID</th>
            <th>Name</th>
            <th>IEC No</th>
            <th>RBI No</th>
            <th>PAN</th>
            <th>KYC</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {shippers.map((s, index) => (
            <tr key={index}>
              <td>{s.shipperId}</td>
              <td>{s.shipperName}</td>
              <td>{s.iecNo}</td>
              <td>{s.rbiNo}</td>
              <td>{s.panNo}</td>
              <td className={s.kycStatus === "Y" ? "kyc-ok" : "kyc-pending"}>
                {s.kycStatus}
              </td>
              <td>{s.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shipper;
