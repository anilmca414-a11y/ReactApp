import React, { useState } from "react";
import "./Shipper.css";

function Shipper() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [shippers, setShippers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address) return;

    const newShipper = {
      id: Date.now(),
      name,
      address
    };

    setShippers([...shippers, newShipper]);
    setName("");
    setAddress("");
  };

  return (
    <div className="container">
      <h2>Shipper Details</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Shipper Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Shipper Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Save Shipper</button>
      </form>

      {/* Table Grid */}
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Shipper Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {shippers.map((shipper, index) => (
            <tr key={shipper.id}>
              <td>{index + 1}</td>
              <td>{shipper.name}</td>
              <td>{shipper.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shipper;
