import { useState } from "react";

const initialShipperForm = {
  shipperName: "",
  extendedName: "",
  rMercFManuf: "Manufacturer",
  rbiNumber: "",
  marketingPerson2: "",
  branch: "",
  sezWarehouseCode: "",
  remarks: "",
  iecNoReqd: true,
  iecNumber: "",
  class: "Private",
  panNumber: "",
  marketingPerson1: "",
  marketingPerson3: "",
  paymentMethodDeffered: false,
  blackList: false,
  insuranceRate: "",
};

const initialAddress = {
  srNo: "",
  default: false,
  contactPerson: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
  state: "",
  pin: "",
  ctxType: "GSTIN",
  ctxState: "",
  code: "",
  regNo: "",
  phone: "",
  mobile: "",
  fax: "",
  email1: "",
  email2: "",
  website: "",
  tanNo: "",
  unlockCodeCity: "",
  disabled: false,
  sez: false,
  gstExempted: false,
  sezWarehouseCode: "",
  branchName: "",
};

const mockShippers = [
  { name: "CBC INDIA", status: "PENDING" },
  { name: "3232", status: "PENDING" },
  { name: "ABC1212", status: "PENDING" },
  { name: "AJIT HANS TEST SHIPPER", status: "PENDING" },
  { name: "AKASH AGENCY", status: "PENDING" },
  { name: "ARCELORMITTAL NIPPO...", status: "PENDING" },
  { name: "ASD", status: "PENDING" },
  { name: "ASDAS", status: "PENDING" },
  { name: "ASDASDAS", status: "PENDING" },
  { name: "BESTO TRADELINK LIMIT...", status: "RE-APPROVAL" },
  { name: "CLEANMAX HARSHA SO...", status: "RE-APPROVAL" },
  { name: "CMC MACHINERY", status: "APPROVE" },
  { name: "DAS", status: "PENDING" },
  { name: "DASVV", status: "PENDING" },
  { name: "DEF CERAMICS INDIA", status: "RE-APPROVAL" },
  { name: "DEMO LTD 20112024", status: "PENDING" },
  { name: "DEMO12", status: "PENDING" },
  { name: "DEMOLST", status: "PENDING" },
  { name: "DYNASTY INDUSTRIES", status: "RE-APPROVAL" },
  { name: "ENERGYPACK BOILERS ...", status: "RE-APPROVAL" },
  { name: "FRITZ GAITRI CLOTHING...", status: "APPROVE" },
  { name: "GARUDA PUMPS PRIVAT...", status: "RE-APPROVAL" },
  { name: "HINDUSTAN MONOMERS...", status: "RE-APPROVAL" },
  { name: "INNOVATIVE FLEXOTEC...", status: "APPROVE" },
];

const statusColor = (status) => {
  if (status === "APPROVE") return "#166534";
  if (status === "RE-APPROVAL") return "#854d0e";
  return "#1e3a5f";
};

const statusBg = (status) => {
  if (status === "APPROVE") return "#dcfce7";
  if (status === "RE-APPROVAL") return "#fef9c3";
  return "#dbeafe";
};

export default function ShipperMaster() {
  const [activeTab, setActiveTab] = useState("shipper");
  const [form, setForm] = useState(initialShipperForm);
  const [address, setAddress] = useState(initialAddress);
  const [searchName, setSearchName] = useState("");
  const [selectedShipper, setSelectedShipper] = useState(null);
  const [addressRows, setAddressRows] = useState([]);

  const filtered = mockShippers.filter((s) =>
    s.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((a) => ({ ...a, [name]: type === "checkbox" ? checked : value }));
  };

  const handleAddAddress = () => {
    if (!address.address1) return;
    setAddressRows((rows) => [...rows, { ...address, srNo: rows.length + 1 }]);
    setAddress(initialAddress);
  };

  const handleDeleteAddress = (idx) => {
    setAddressRows((rows) => rows.filter((_, i) => i !== idx));
  };

  const inputStyle = {
    width: "100%",
    padding: "4px 8px",
    border: "1px solid #ccc",
    borderRadius: 3,
    fontSize: 13,
    background: "#fff",
    color: "#222",
    outline: "none",
    height: 28,
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: 13,
    color: "#333",
    fontWeight: 500,
    whiteSpace: "nowrap",
  };

  const sectionTitle = {
    background: "#d0e4f7",
    color: "#1a3a5c",
    fontWeight: 700,
    fontSize: 14,
    padding: "6px 14px",
    borderRadius: "4px 4px 0 0",
    marginBottom: 0,
    borderBottom: "2px solid #a8c8e8",
  };

  const FormRow = ({ label, children, span }) => (
    <div style={{ display: "contents" }}>
      <div style={{ ...labelStyle, gridColumn: span ? `span ${span}` : undefined, display: "flex", alignItems: "center" }}>{label}</div>
      <div style={{ gridColumn: span ? `span ${span}` : undefined, display: "flex", alignItems: "center" }}>{children}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "#f0f4f8", fontSize: 13 }}>
      {/* LEFT PANEL */}
      <div style={{ width: 270, background: "#fff", borderRight: "1px solid #d0d7e0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ background: "#1a3a5c", color: "#fff", padding: "10px 14px", fontWeight: 700, fontSize: 15 }}>Search</div>
        <div style={{ padding: "10px 12px", borderBottom: "1px solid #e0e7ef" }}>
          <div style={{ marginBottom: 8 }}>
            <label style={labelStyle}>Class</label>
            <select style={{ ...inputStyle, marginTop: 2 }}>
              <option>Private</option><option>Government</option>
            </select>
          </div>
          <div style={{ marginBottom: 8 }}>
            <select style={{ ...inputStyle }}>
              <option>Exporter</option><option>Importer</option>
            </select>
          </div>
          <input
            style={{ ...inputStyle }}
            placeholder="ENTER EXPORTER NAME"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#e8f0fb", position: "sticky", top: 0 }}>
                <th style={{ padding: "5px 6px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#1a3a5c", borderBottom: "1px solid #c8d8ea" }}>Select</th>
                <th style={{ padding: "5px 6px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#1a3a5c", borderBottom: "1px solid #c8d8ea" }}>Shipper Name</th>
                <th style={{ padding: "5px 6px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#1a3a5c", borderBottom: "1px solid #c8d8ea" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr
                  key={i}
                  style={{ background: selectedShipper === i ? "#dbeafe" : i % 2 === 0 ? "#fff" : "#f7fafd", cursor: "pointer" }}
                  onClick={() => setSelectedShipper(i)}
                >
                  <td style={{ padding: "4px 6px", textAlign: "center" }}>
                    <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: "50%", background: "#22c55e", border: "2px solid #16a34a" }} />
                  </td>
                  <td style={{ padding: "4px 6px", fontSize: 12, color: "#1e3a5f" }}>{s.name}</td>
                  <td style={{ padding: "4px 6px" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: statusColor(s.status), background: statusBg(s.status), borderRadius: 3, padding: "1px 5px" }}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "8px 12px", borderTop: "1px solid #e0e7ef", background: "#f7fafd" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px", alignItems: "center" }}>
            <span style={labelStyle}>Entered By</span>
            <div style={{ display: "flex", gap: 4 }}>
              <input style={{ ...inputStyle, width: 100 }} />
              <input style={{ ...inputStyle, width: 60 }} />
            </div>
            <span style={labelStyle}>Modified By</span>
            <div style={{ display: "flex", gap: 4 }}>
              <input style={{ ...inputStyle, width: 100 }} />
              <input style={{ ...inputStyle, width: 60 }} />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ background: "#1a3a5c", color: "#fff", padding: "8px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Shipper Master</span>
          <span style={{ fontSize: 12 }}>MUMBAI (Export Sell)</span>
        </div>

        {/* Tabs */}
        <div style={{ background: "#e8f0fb", borderBottom: "2px solid #a8c8e8", display: "flex", padding: "0 16px", paddingTop: 6 }}>
          {["shipper", "other", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 18px",
                marginRight: 4,
                border: "1px solid #a8c8e8",
                borderBottom: activeTab === tab ? "2px solid #fff" : "1px solid #a8c8e8",
                background: activeTab === tab ? "#fff" : "#d0e4f7",
                color: "#1a3a5c",
                fontWeight: activeTab === tab ? 700 : 500,
                fontSize: 13,
                borderRadius: "4px 4px 0 0",
                cursor: "pointer",
                outline: "none",
                marginBottom: -2,
              }}
            >
              {tab === "shipper" ? "Shipper" : tab === "other" ? "Other Details" : "Contact Details"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {activeTab === "shipper" && (
            <>
              {/* Shipper Details */}
              <div style={{ background: "#fff", border: "1px solid #c8d8ea", borderRadius: 4, marginBottom: 16 }}>
                <div style={sectionTitle}>Shipper Details</div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 150px 1fr", gap: "10px 14px", alignItems: "center" }}>
                    <span style={labelStyle}>Shipper Name</span>
                    <input style={inputStyle} name="shipperName" value={form.shipperName} onChange={handleFormChange} placeholder="NAME" />
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={labelStyle}>IEC No. Reqd.</span>
                      <input type="checkbox" name="iecNoReqd" checked={form.iecNoReqd} onChange={handleFormChange} />
                    </div>
                    <input style={inputStyle} name="iecNumber" value={form.iecNumber} onChange={handleFormChange} placeholder="IEC NO. REQD." />

                    <span style={labelStyle}>Extended Name</span>
                    <input style={inputStyle} name="extendedName" value={form.extendedName} onChange={handleFormChange} placeholder="NAME" />
                    <span style={labelStyle}>Class</span>
                    <select style={inputStyle} name="class" value={form.class} onChange={handleFormChange}>
                      <option>Private</option><option>Government</option>
                    </select>

                    <span style={labelStyle}>[R]Merc / [F]Manuf</span>
                    <select style={{ ...inputStyle, borderColor: "#ef4444" }} name="rMercFManuf" value={form.rMercFManuf} onChange={handleFormChange}>
                      <option>Manufacturer</option><option>Merchant</option>
                    </select>
                    <span style={labelStyle}>PAN Number</span>
                    <input style={inputStyle} name="panNumber" value={form.panNumber} onChange={handleFormChange} placeholder="PAN NUMBER" />

                    <span style={labelStyle}>RBI Number</span>
                    <input style={inputStyle} name="rbiNumber" value={form.rbiNumber} onChange={handleFormChange} placeholder="RBI NUMBER" />
                    <span style={labelStyle}>Marketing Person1</span>
                    <input style={{ ...inputStyle, background: "#f0fdf4" }} name="marketingPerson1" value={form.marketingPerson1} onChange={handleFormChange} placeholder="MARKETING PERSON1" />

                    <span style={labelStyle}>Marketing Person2</span>
                    <input style={{ ...inputStyle, background: "#f0fdf4" }} name="marketingPerson2" value={form.marketingPerson2} onChange={handleFormChange} placeholder="MARKETING PERSON2" />
                    <span style={labelStyle}>Marketing Person3</span>
                    <input style={{ ...inputStyle, background: "#f0fdf4" }} name="marketingPerson3" value={form.marketingPerson3} onChange={handleFormChange} placeholder="MARKETING PERSON3" />

                    <span style={labelStyle}>Branch</span>
                    <input style={inputStyle} name="branch" value={form.branch} onChange={handleFormChange} placeholder="BRANCH" />
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={labelStyle}>Payment Method Deffered?</span>
                      <input type="checkbox" name="paymentMethodDeffered" checked={form.paymentMethodDeffered} onChange={handleFormChange} />
                      <span style={labelStyle}>Black List</span>
                      <input type="checkbox" name="blackList" checked={form.blackList} onChange={handleFormChange} />
                    </div>
                    <div />

                    <span style={labelStyle}>SEZ Warehouse Code</span>
                    <input style={inputStyle} name="sezWarehouseCode" value={form.sezWarehouseCode} onChange={handleFormChange} placeholder="SEZ WAREHOUSE CODE" />
                    <span style={labelStyle}>Insurance Rate(%)</span>
                    <input style={inputStyle} name="insuranceRate" value={form.insuranceRate} onChange={handleFormChange} placeholder="INSURANCE RATE" />

                    <span style={labelStyle}>Remarks</span>
                    <div style={{ gridColumn: "span 3" }}>
                      <textarea
                        style={{ ...inputStyle, height: 48, resize: "vertical" }}
                        name="remarks"
                        value={form.remarks}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipper Address */}
              <div style={{ background: "#fff", border: "1px solid #c8d8ea", borderRadius: 4 }}>
                <div style={sectionTitle}>Shipper Address</div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "100px 80px 90px 1fr 100px 1fr 80px 1fr", gap: "8px 10px", alignItems: "center", marginBottom: 8 }}>
                    <span style={labelStyle}>Sr. No</span>
                    <input style={inputStyle} name="srNo" value={address.srNo} onChange={handleAddressChange} placeholder="SR. NO" />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={labelStyle}>Default</span>
                      <input type="checkbox" name="default" checked={address.default} onChange={handleAddressChange} />
                    </div>
                    <div />
                    <span style={labelStyle}>Contact Person</span>
                    <input style={{ ...inputStyle, gridColumn: "span 3" }} name="contactPerson" value={address.contactPerson} onChange={handleAddressChange} placeholder="CONTACT PERSON" />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 100px 1fr 80px 1fr", gap: "8px 10px", alignItems: "center" }}>
                    <span style={labelStyle}>Address1</span>
                    <input style={inputStyle} name="address1" value={address.address1} onChange={handleAddressChange} placeholder="ADDRESS LINE 1" />
                    <span style={labelStyle}>Address2</span>
                    <input style={inputStyle} name="address2" value={address.address2} onChange={handleAddressChange} placeholder="ADDRESS LINE 2" />
                    <span style={labelStyle}>City</span>
                    <input style={inputStyle} name="city" value={address.city} onChange={handleAddressChange} placeholder="CITY" />

                    <span style={labelStyle}>Country</span>
                    <input style={inputStyle} name="country" value={address.country} onChange={handleAddressChange} placeholder="COUNTRY" />
                    <span style={labelStyle}>State</span>
                    <input style={inputStyle} name="state" value={address.state} onChange={handleAddressChange} placeholder="STATE" />
                    <span style={labelStyle}>Pin</span>
                    <input style={inputStyle} name="pin" value={address.pin} onChange={handleAddressChange} placeholder="PIN CODE" />

                    <span style={labelStyle}>CTX Type</span>
                    <select style={inputStyle} name="ctxType" value={address.ctxType} onChange={handleAddressChange}>
                      <option>GSTIN</option><option>PAN</option><option>UID</option>
                    </select>
                    <span style={labelStyle}>CTX State</span>
                    <div style={{ display: "flex", gap: 4 }}>
                      <select style={{ ...inputStyle, flex: 1 }} name="ctxState" value={address.ctxState} onChange={handleAddressChange}>
                        <option value="">Select</option>
                        <option>Maharashtra</option><option>Delhi</option><option>Gujarat</option>
                      </select>
                      <input style={{ ...inputStyle, width: 60 }} name="code" value={address.code} onChange={handleAddressChange} placeholder="CODE" />
                    </div>
                    <span style={labelStyle}>Reg. No</span>
                    <input style={{ ...inputStyle, borderColor: "#ef4444" }} name="regNo" value={address.regNo} onChange={handleAddressChange} placeholder="REG. NO" />

                    <span style={labelStyle}>Phone</span>
                    <input style={inputStyle} name="phone" value={address.phone} onChange={handleAddressChange} placeholder="PHONE NO." />
                    <span style={labelStyle}>Mobile</span>
                    <input style={inputStyle} name="mobile" value={address.mobile} onChange={handleAddressChange} placeholder="MOBILE NO." />
                    <span style={labelStyle}>Fax</span>
                    <input style={inputStyle} name="fax" value={address.fax} onChange={handleAddressChange} placeholder="FAX NO." />

                    <span style={labelStyle}>Email1</span>
                    <input style={inputStyle} name="email1" value={address.email1} onChange={handleAddressChange} placeholder="EMAIL ID 1" />
                    <span style={labelStyle}>Email2</span>
                    <input style={inputStyle} name="email2" value={address.email2} onChange={handleAddressChange} placeholder="EMAIL ID 2" />
                    <span style={labelStyle}>Website</span>
                    <input style={inputStyle} name="website" value={address.website} onChange={handleAddressChange} placeholder="WEBSITE" />

                    <span style={labelStyle}>TAN No</span>
                    <input style={inputStyle} name="tanNo" value={address.tanNo} onChange={handleAddressChange} placeholder="PARTY TAN NO" />
                    <span style={labelStyle}>UNLOC Code City</span>
                    <input style={{ ...inputStyle, background: "#f0fdf4" }} name="unlockCodeCity" value={address.unlockCodeCity} onChange={handleAddressChange} placeholder="UNLOC CODE CITY" />
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={labelStyle}>Disabled</span>
                      <input type="checkbox" name="disabled" checked={address.disabled} onChange={handleAddressChange} />
                      <span style={labelStyle}>Sez</span>
                      <input type="checkbox" name="sez" checked={address.sez} onChange={handleAddressChange} />
                    </div>
                    <div />

                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={labelStyle}>GST Exempted</span>
                      <input type="checkbox" name="gstExempted" checked={address.gstExempted} onChange={handleAddressChange} />
                    </div>
                    <div />
                    <span style={labelStyle}>SEZ Warehouse Code</span>
                    <input style={inputStyle} name="sezWarehouseCode" value={address.sezWarehouseCode} onChange={handleAddressChange} placeholder="SEZ WAREHOUSE CODE" />
                    <span style={labelStyle}>Branch Name</span>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input style={inputStyle} name="branchName" value={address.branchName} onChange={handleAddressChange} placeholder="BRANCH NAME" />
                      <button
                        onClick={handleAddAddress}
                        style={{ whiteSpace: "nowrap", background: "#1a3a5c", color: "#fff", border: "none", borderRadius: 4, padding: "5px 14px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                  {/* Address Table */}
                  <div style={{ marginTop: 12, border: "1px solid #c8d8ea", borderRadius: 3, overflow: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead>
                        <tr style={{ background: "#e8f0fb" }}>
                          {["Edit", "Delete", "Sr. No", "Default", "Branch Name", "Address1", "Address2", "City", "SEZ Warehouse Code", "Pin Code", "State", "Country"].map((h) => (
                            <th key={h} style={{ padding: "5px 8px", textAlign: "left", fontWeight: 600, color: "#1a3a5c", borderBottom: "1px solid #c8d8ea", whiteSpace: "nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {addressRows.length === 0 ? (
                          <tr><td colSpan={12} style={{ padding: "20px", textAlign: "center", color: "#aaa" }}>No addresses added yet</td></tr>
                        ) : addressRows.map((row, i) => (
                          <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f7fafd" }}>
                            <td style={{ padding: "4px 8px" }}>
                              <button style={{ fontSize: 11, padding: "2px 8px", cursor: "pointer", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 2 }}>Edit</button>
                            </td>
                            <td style={{ padding: "4px 8px" }}>
                              <button onClick={() => handleDeleteAddress(i)} style={{ fontSize: 11, padding: "2px 8px", cursor: "pointer", background: "#ef4444", color: "#fff", border: "none", borderRadius: 2 }}>Del</button>
                            </td>
                            <td style={{ padding: "4px 8px" }}>{row.srNo}</td>
                            <td style={{ padding: "4px 8px" }}>{row.default ? "✓" : ""}</td>
                            <td style={{ padding: "4px 8px" }}>{row.branchName}</td>
                            <td style={{ padding: "4px 8px" }}>{row.address1}</td>
                            <td style={{ padding: "4px 8px" }}>{row.address2}</td>
                            <td style={{ padding: "4px 8px" }}>{row.city}</td>
                            <td style={{ padding: "4px 8px" }}>{row.sezWarehouseCode}</td>
                            <td style={{ padding: "4px 8px" }}>{row.pin}</td>
                            <td style={{ padding: "4px 8px" }}>{row.state}</td>
                            <td style={{ padding: "4px 8px" }}>{row.country}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "other" && (
            <div style={{ background: "#fff", border: "1px solid #c8d8ea", borderRadius: 4, padding: 20 }}>
              <p style={{ color: "#666" }}>Other Details tab — extend with additional fields as needed.</p>
            </div>
          )}

          {activeTab === "contact" && (
            <div style={{ background: "#fff", border: "1px solid #c8d8ea", borderRadius: 4, padding: 20 }}>
              <p style={{ color: "#666" }}>Contact Details tab — extend with contact fields as needed.</p>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div style={{ background: "#f0f4f8", borderTop: "1px solid #c8d8ea", padding: "8px 16px", display: "flex", gap: 8, alignItems: "center" }}>
          <span style={labelStyle}>Date From</span>
          <input type="date" style={{ ...inputStyle, width: 130 }} />
          <span style={labelStyle}>To</span>
          <input type="date" style={{ ...inputStyle, width: 130 }} />
          <div style={{ flex: 1 }} />
          <button style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 4, padding: "6px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Reset</button>
          <button style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 4, padding: "6px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save</button>
          <button style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 4, padding: "6px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>New</button>
        </div>
      </div>
    </div>
  );
}
