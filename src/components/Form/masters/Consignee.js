import { useState } from "react";

// ─────────────────────────────────────────────
//  EMBEDDED STYLES  (no external CSS file needed)
// ─────────────────────────────────────────────
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: #dde4f0;
    font-size: 13px;
    color: #1f2937;
  }

  /* ── LAYOUT ── */
  .cn-wrap   { display: flex; flex-direction: column; height: 100vh; overflow: hidden; background: #dde4f0; }
  .cn-body   { display: flex; flex: 1; overflow: hidden; }

  /* ── SIDEBAR ── */
  .cn-side   { width: 285px; flex-shrink: 0; background: #f0f4fb; border-right: 1px solid #c5d2e8;
               display: flex; flex-direction: column; }

  .cn-side-hd { background: #4a90d9; color: #fff; padding: 9px 14px;
                font-weight: 700; font-size: 13px; letter-spacing: .3px; }

  .cn-side-filter { padding: 10px 11px; border-bottom: 1px solid #c5d2e8;
                    display: flex; flex-direction: column; gap: 7px; }

  .cn-side-list   { flex: 1; overflow-y: auto; }

  /* supplier table */
  .cn-stbl   { width: 100%; border-collapse: collapse; }
  .cn-stbl thead tr { background: #dce8f8; position: sticky; top: 0; z-index: 1; }
  .cn-stbl th { padding: 5px 8px; text-align: left; font-size: 11.5px;
                font-weight: 700; color: #1e40af; border-bottom: 1px solid #c5d2e8; }
  .cn-stbl tbody tr { cursor: pointer; transition: background .1s; }
  .cn-stbl tbody tr:hover  { background: #e8f0fd; }
  .cn-stbl tbody tr.sel-row { background: #bfdbfe; }
  .cn-stbl td { padding: 4px 8px; font-size: 12px; color: #374151;
                border-bottom: 1px solid #eef2f9; }
  .cn-dot { width: 14px; height: 14px; border-radius: 50%;
            background: #22c55e; border: 2px solid #16a34a; display: inline-block; }

  /* sidebar bottom */
  .cn-side-bot { padding: 9px 11px; border-top: 1px solid #c5d2e8; background: #e8eef8; }
  .cn-meta     { display: grid; grid-template-columns: 90px 1fr; gap: 5px 8px; align-items: center; }
  .cn-mlbl     { font-size: 11.5px; font-weight: 600; color: #374151; }
  .cn-minp     { height: 27px; border-radius: 999px; border: 1.5px solid #b8c9e2;
                 padding: 0 10px; font-size: 11.5px; width: 100%; outline: none;
                 background: #fff; font-family: inherit; }
  .cn-minp:focus { border-color: #2563eb; }

  /* ── MAIN ── */
  .cn-main   { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  /* tab bar */
  .cn-tabs   { background: #d4e3f7; border-bottom: 2px solid #93b4f0;
               display: flex; padding: 7px 14px 0; }
  .cn-tab    { padding: 6px 20px; border: 1px solid #93b4f0; border-bottom: none;
               background: #bad2f4; color: #1e40af; font-weight: 600; font-size: 13px;
               border-radius: 7px 7px 0 0; cursor: default; outline: none; }
  .cn-tab.active { background: #fff; border-bottom: 2px solid #fff;
                   margin-bottom: -2px; color: #1e3a8a; }

  /* scrollable content */
  .cn-content { flex: 1; overflow-y: auto; padding: 14px; background: #e4ecf8;
                display: flex; flex-direction: column; gap: 0; }

  /* ── CARD ── */
  .cn-card { background: #fff; border-radius: 10px; border: 1px solid #c5d2e8;
             box-shadow: 0 1px 5px rgba(0,0,0,.07); overflow: hidden; }

  /* ── RADIO ROW ── */
  .cn-radio-row { display: flex; align-items: center; gap: 30px;
                  padding: 11px 18px; border-bottom: 1px solid #eef2fb; background: #f7faff; }
  .cn-rlbl { display: flex; align-items: center; gap: 6px; font-size: 13px;
             font-weight: 600; color: #1e40af; cursor: pointer; }
  .cn-rlbl input[type=radio] { width: 14px; height: 14px; accent-color: #2563eb; cursor: pointer; }

  /* ── FORM SECTIONS ── */
  .cn-section { padding: 12px 18px; display: flex; flex-direction: column; gap: 9px; }
  .cn-row     { display: flex; align-items: center; gap: 10px; }
  .cn-row-3   { display: grid; grid-template-columns: 140px 1fr 175px 210px; gap: 10px; align-items: center; }

  /* ADDRESS HEADING */
  .cn-addr-hd { font-size: 14px; font-weight: 700; color: #1d4ed8;
                padding: 8px 18px 0; border-top: 1px solid #e5ecfa; }

  /* ── FIELD GRID (Address fields) ── */
  .cn-fg { display: grid; gap: 8px 12px; padding: 8px 18px 12px; align-items: center; }
  .cn-fg-3 { grid-template-columns: 120px 1fr 120px 1fr 90px 1fr; }
  .cn-fg-2 { grid-template-columns: 140px 1fr 165px 1fr; }

  /* ── LABEL ── */
  .cn-lbl { font-size: 12px; font-weight: 600; color: #374151; white-space: nowrap; }

  /* ── ROUNDED INPUTS ── */
  .cn-inp, .cn-sel {
    width: 100%; padding: 5px 13px;
    border: 1.5px solid #c7d2e8; border-radius: 999px;
    font-size: 12.5px; color: #1f2937; background: #fff;
    outline: none; height: 32px; font-family: inherit;
    transition: border-color .18s, box-shadow .18s;
  }
  .cn-inp:focus, .cn-sel:focus {
    border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.11);
  }
  .cn-inp::placeholder { color: #adb8cc; font-size: 11.5px; }

  /* colour variants */
  .red-b   { border-color: #fca5a5; background: #fff7f7; }
  .green-b { border-color: #6ee7b7; background: #f0fdf9; }
  .yellow-b{ border-color: #fcd34d; background: #fffbeb; }

  /* SELECT */
  .cn-sel {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%236b7280' d='M5 7L0 2h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 11px center;
    padding-right: 28px; cursor: pointer;
  }

  /* CHECKBOX */
  .cn-cb { display: flex; align-items: center; gap: 6px; }
  .cn-cb input[type=checkbox] { width: 15px; height: 15px; accent-color: #2563eb; cursor: pointer; }

  /* ── ADD BUTTON ── */
  .cn-btn-add { background: #2563eb; color: #fff; border: none; border-radius: 999px;
                padding: 6px 16px; font-size: 12.5px; font-weight: 700; cursor: pointer;
                white-space: nowrap; transition: background .18s; }
  .cn-btn-add:hover { background: #1d4ed8; }

  /* ── ADDRESS TABLE ── */
  .cn-tbl-wrap { margin: 0 18px 16px; border-radius: 8px; overflow: auto;
                 border: 1px solid #c5d2e8; max-height: 200px; }
  .cn-tbl { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 1000px; }
  .cn-tbl thead tr { background: #dce8f8; position: sticky; top: 0; z-index: 1; }
  .cn-tbl th { padding: 6px 9px; text-align: left; font-weight: 700; color: #1e40af;
               border-bottom: 1px solid #c5d2e8; white-space: nowrap; }
  .cn-tbl tbody tr:nth-child(even) { background: #f4f8ff; }
  .cn-tbl tbody tr:hover { background: #ebf2ff; }
  .cn-tbl td { padding: 4px 9px; border-bottom: 1px solid #eef2f9; white-space: nowrap; }
  .cn-empty { padding: 26px; text-align: center; color: #9ca3af; font-style: italic; }

  /* table action buttons */
  .cn-btn-e { background: #3b82f6; color: #fff; border: none; border-radius: 999px;
              padding: 2px 11px; font-size: 11px; cursor: pointer; font-weight: 600; }
  .cn-btn-d { background: #ef4444; color: #fff; border: none; border-radius: 999px;
              padding: 2px 10px; font-size: 11px; cursor: pointer; font-weight: 600; }

  /* ── BOTTOM ACTION BAR ── */
  .cn-bar { background: #ccd9ef; border-top: 1px solid #aec1de;
            padding: 12px 0; display: flex; align-items: center;
            justify-content: center; gap: 16px; }

  .cn-bsave   { background: #22c55e; color: #fff; border: none; border-radius: 999px;
                padding: 9px 30px; font-size: 13px; font-weight: 700; cursor: pointer;
                display: flex; align-items: center; gap: 6px; }
  .cn-bsave:hover   { background: #16a34a; }

  .cn-bmod    { background: #f59e0b; color: #fff; border: none; border-radius: 999px;
                padding: 9px 30px; font-size: 13px; font-weight: 700; cursor: pointer;
                display: flex; align-items: center; gap: 6px; }
  .cn-bmod:hover    { background: #d97706; }

  .cn-bdel    { background: #ef4444; color: #fff; border: none; border-radius: 999px;
                padding: 9px 30px; font-size: 13px; font-weight: 700; cursor: pointer;
                display: flex; align-items: center; gap: 6px; }
  .cn-bdel:hover    { background: #dc2626; }

  .cn-bclr    { background: #06b6d4; color: #fff; border: none; border-radius: 999px;
                padding: 9px 30px; font-size: 13px; font-weight: 700; cursor: pointer;
                display: flex; align-items: center; gap: 6px; }
  .cn-bclr:hover    { background: #0891b2; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: #93b4f0; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #3b82f6; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1100px) {
    .cn-side { width: 230px; }
    .cn-fg-3 { grid-template-columns: 110px 1fr 110px 1fr; }
  }
  @media (max-width: 768px) {
    .cn-body { flex-direction: column; }
    .cn-side { width: 100%; max-height: 240px; }
    .cn-fg-3, .cn-fg-2, .cn-row-3 { grid-template-columns: 1fr 1fr; }
  }
`;

// ─────────────────────────────────────────────
//  MOCK SUPPLIER LIST
// ─────────────────────────────────────────────
const SUPPLIERS = [
  "1300 E MILITARY HWY (281) DOCK 26",
  "1816 NEWYORK",
  "A & E LLC GASTONIA PLANT 20",
  "A.I. GLOBAL PACK, LLC",
  "AAAA",
  "ABB B.V",
  "ABC",
  "ABC EUROPEAN AIR",
  "ABC TRADING S.A.",
  "ABC123",
  "ABCD",
  "ABCD4321",
  "ABCDEFG",
  "ABCL LTD",
  "ABDC HHHH",
  "ABEINSA EPC XINA PTY LTD",
  "ABF DC",
  "ABLE ADVANCED CHEMICALS CO., LTD.",
  "ABSORPOWER SERVICE GMBH",
  "ACCEL CARRAGEENAN CORPORATION",
  "ACCELRYS SOFTWARE INC",
  "ACCIONA AGUA S.A",
  "ACMA CORPORATION",
  "ACME GLOBAL EXPORTS",
  "ACOS VILLARES S.A.",
  "ADVANCE LOGISTICS PVT LTD",
  "AGILITY LOGISTICS",
  "AGL SHIPPING CO",
  "AGRI EXPORT INDIA",
  "AHMEDABAD EXPORTS LTD",
];

// ─────────────────────────────────────────────
//  INITIAL STATE
// ─────────────────────────────────────────────
const FORM0 = {
  partyType:       "consignee",
  partyName:       "",
  extendedName:    "",
  billing:         false,
  relatedThirdParty: "",
};

const ADDR0 = {
  isDefault:     false,
  contactPerson: "",
  address1:      "",
  address2:      "",
  city:          "",
  state:         "",
  country:       "",
  pinCode:       "",
  phone:         "",
  mobile:        "",
  fax:           "",
  email1:        "",
  email2:        "",
  website:       "",
  unlocCity:     "",
  branchName:    "",
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function ConsigneeMaster() {
  const [form,      setForm]      = useState(FORM0);
  const [addr,      setAddr]      = useState(ADDR0);
  const [addrRows,  setAddrRows]  = useState([]);
  const [search,    setSearch]    = useState("");
  const [selIdx,    setSelIdx]    = useState(null);
  const [editId,    setEditId]    = useState(null);   // id of row being edited
  const [enteredBy] = useState("");
  const [modifiedBy] = useState("");

  // ── derived ──────────────────────────────────
  const filtered = SUPPLIERS.filter(s =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  // ── handlers ─────────────────────────────────
  const onForm = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onAddr = e => {
    const { name, value, type, checked } = e.target;
    setAddr(a => ({ ...a, [name]: type === "checkbox" ? checked : value }));
  };

  const handleAdd = () => {
    if (!addr.address1.trim()) { alert("Address 1 is required!"); return; }

    if (editId !== null) {
      // UPDATE existing row
      setAddrRows(rows => rows.map(r => r.id === editId ? { ...addr, id: editId } : r));
      setEditId(null);
    } else {
      // ADD new row
      setAddrRows(rows => [...rows, { ...addr, id: Date.now() }]);
    }
    setAddr(ADDR0);
  };

  const handleEdit = (row) => {
    setAddr({ ...row });
    setEditId(row.id);
  };

  const handleDelete = (id) => {
    setAddrRows(rows => rows.filter(r => r.id !== id));
    if (editId === id) { setAddr(ADDR0); setEditId(null); }
  };

  const handleSave = () => {
    if (!form.partyName.trim()) { alert("Party Name is required!"); return; }
    alert(`✅ Record saved!\n\nParty : ${form.partyName}\nType  : ${form.partyType}\nAddresses: ${addrRows.length}`);
  };

  const handleClear = () => {
    setForm(FORM0); setAddr(ADDR0);
    setAddrRows([]); setSelIdx(null); setEditId(null);
  };

  // ── render ───────────────────────────────────
  return (
    <>
      {/* inject CSS */}
      <style>{css}</style>

      <div className="cn-wrap">
        <div className="cn-body">

          {/* ════════════ SIDEBAR ════════════ */}
          <div className="cn-side">
            <div className="cn-side-hd">🔍 Search</div>

            <div className="cn-side-filter">
              <select className="cn-sel">
                <option>Supplier</option>
                <option>Buyer</option>
                <option>Consignee</option>
                <option>Notify Party</option>
              </select>
              <input
                className="cn-inp"
                placeholder="NAME"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Supplier list */}
            <div className="cn-side-list">
              <table className="cn-stbl">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((name, i) => (
                    <tr
                      key={i}
                      className={selIdx === i ? "sel-row" : ""}
                      onClick={() => {
                        setSelIdx(i);
                        setForm(f => ({ ...f, partyName: name }));
                      }}
                    >
                      <td><span className="cn-dot" /></td>
                      <td>{name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sidebar bottom meta */}
            <div className="cn-side-bot">
              <div className="cn-meta">
                <span className="cn-mlbl">Entered By</span>
                <input className="cn-minp" value={enteredBy} readOnly />

                <span className="cn-mlbl">Date</span>
                <input className="cn-minp" type="date" />

                <span className="cn-mlbl">Modified By</span>
                <input className="cn-minp" value={modifiedBy} readOnly />

                <span className="cn-mlbl">Date</span>
                <input className="cn-minp" type="date" />
              </div>
            </div>
          </div>

          {/* ════════════ MAIN ════════════ */}
          <div className="cn-main">

            {/* Tab bar */}
            <div className="cn-tabs">
              <button className="cn-tab active">Consignee / Buyer / Notify</button>
            </div>

            {/* Scrollable content */}
            <div className="cn-content">
              <div className="cn-card">

                {/* ── Radio: party type ── */}
                <div className="cn-radio-row">
                  {[
                    { val: "consignee", label: "Consignee / Supplier" },
                    { val: "buyer",     label: "Buyer" },
                    { val: "notify",    label: "Notify" },
                  ].map(opt => (
                    <label key={opt.val} className="cn-rlbl">
                      <input
                        type="radio"
                        name="partyType"
                        value={opt.val}
                        checked={form.partyType === opt.val}
                        onChange={onForm}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>

                {/* ── Party Name / Related Third Party ── */}
                <div className="cn-section" style={{ gap: 8 }}>
                  {/* Row 1: Party Name + Related Third Party */}
                  <div className="cn-row-3">
                    <span className="cn-lbl">Party Name *</span>
                    <input
                      className="cn-inp red-b"
                      name="partyName"
                      value={form.partyName}
                      onChange={onForm}
                      placeholder="NAME"
                    />
                    <span className="cn-lbl">Related Third Party</span>
                    <input
                      className="cn-inp yellow-b"
                      name="relatedThirdParty"
                      value={form.relatedThirdParty}
                      onChange={onForm}
                      placeholder="THIRD PARTY"
                    />
                  </div>

                  {/* Row 2: Extended Name */}
                  <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "0 10px", alignItems: "center" }}>
                    <span className="cn-lbl">Extended Name</span>
                    <input
                      className="cn-inp"
                      name="extendedName"
                      value={form.extendedName}
                      onChange={onForm}
                      placeholder="NAME"
                    />
                  </div>

                  {/* Row 3: Billing */}
                  <div className="cn-cb">
                    <span className="cn-lbl">Billing</span>
                    <input
                      type="checkbox"
                      name="billing"
                      checked={form.billing}
                      onChange={onForm}
                    />
                  </div>
                </div>

                {/* ── ADDRESS heading ── */}
                <div className="cn-addr-hd">Address</div>

                {/* ── Default Address + Contact Person ── */}
                <div className="cn-fg cn-fg-2" style={{ paddingTop: 10 }}>
                  <div className="cn-cb">
                    <span className="cn-lbl">Default Address</span>
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={addr.isDefault}
                      onChange={onAddr}
                    />
                  </div>
                  <div />

                  <span className="cn-lbl">Contact Person</span>
                  <input
                    className="cn-inp"
                    name="contactPerson"
                    value={addr.contactPerson}
                    onChange={onAddr}
                    placeholder="CONTACT PERSON"
                  />
                </div>

                {/* ── Address Fields (3-col grid) ── */}
                <div className="cn-fg cn-fg-3">

                  <span className="cn-lbl">Address1 *</span>
                  <input className="cn-inp red-b" name="address1"
                    value={addr.address1} onChange={onAddr} placeholder="ADDRESS LINE 1" />

                  <span className="cn-lbl">Address2</span>
                  <input className="cn-inp" name="address2"
                    value={addr.address2} onChange={onAddr} placeholder="ADDRESS LINE 2" />

                  <span className="cn-lbl">City</span>
                  <input className="cn-inp" name="city"
                    value={addr.city} onChange={onAddr} placeholder="CITY" />

                  {/* Row 2 */}
                  <span className="cn-lbl">State</span>
                  <input className="cn-inp" name="state"
                    value={addr.state} onChange={onAddr} placeholder="STATE" />

                  <span className="cn-lbl">Country</span>
                  <input className="cn-inp green-b" name="country"
                    value={addr.country} onChange={onAddr} placeholder="COUNTRY" />

                  <span className="cn-lbl">Pin Code</span>
                  <input className="cn-inp" name="pinCode"
                    value={addr.pinCode} onChange={onAddr} placeholder="PIN CODE" />

                  {/* Row 3 */}
                  <span className="cn-lbl">Phone</span>
                  <input className="cn-inp" name="phone"
                    value={addr.phone} onChange={onAddr} placeholder="PHONE" />

                  <span className="cn-lbl">Mobile</span>
                  <input className="cn-inp" name="mobile"
                    value={addr.mobile} onChange={onAddr} placeholder="MOBILE" />

                  <span className="cn-lbl">Fax</span>
                  <input className="cn-inp" name="fax"
                    value={addr.fax} onChange={onAddr} placeholder="FAX" />

                  {/* Row 4 */}
                  <span className="cn-lbl">Email1</span>
                  <input className="cn-inp" name="email1" type="email"
                    value={addr.email1} onChange={onAddr} placeholder="EMAIL ID 1" />

                  <span className="cn-lbl">Email2</span>
                  <input className="cn-inp" name="email2" type="email"
                    value={addr.email2} onChange={onAddr} placeholder="EMAIL ID 2" />

                  <span className="cn-lbl">Website</span>
                  <input className="cn-inp" name="website"
                    value={addr.website} onChange={onAddr} placeholder="WEBSITE" />

                  {/* Row 5: UNLOC + Branch + Add button */}
                  <span className="cn-lbl">UNLOC Code City</span>
                  <input className="cn-inp green-b" name="unlocCity"
                    value={addr.unlocCity} onChange={onAddr} placeholder="UNLOC CODE CITY" />

                  <span className="cn-lbl">Branch Name</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", gridColumn: "span 3" }}>
                    <input
                      className="cn-inp"
                      name="branchName"
                      value={addr.branchName}
                      onChange={onAddr}
                      placeholder="BRANCH NAME"
                      style={{ maxWidth: 260 }}
                    />
                    <button className="cn-btn-add" onClick={handleAdd}>
                      {editId !== null ? "✔ Update" : "+ Add"}
                    </button>
                    {editId !== null && (
                      <button
                        className="cn-btn-add"
                        style={{ background: "#6b7280" }}
                        onClick={() => { setAddr(ADDR0); setEditId(null); }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Address Table ── */}
                <div className="cn-tbl-wrap">
                  {addrRows.length === 0 ? (
                    <div className="cn-empty">
                      No addresses added yet — fill the form above and click "+ Add".
                    </div>
                  ) : (
                    <table className="cn-tbl">
                      <thead>
                        <tr>
                          <th>Edit</th>
                          <th>Delete</th>
                          <th>Default</th>
                          <th>Address1</th>
                          <th>Address2</th>
                          <th>City</th>
                          <th>Pin Code</th>
                          <th>State</th>
                          <th>Country Name</th>
                          <th>Contact Person</th>
                          <th>Phone No.</th>
                          <th>Mobile No.</th>
                          <th>Email Id 1</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addrRows.map(row => (
                          <tr key={row.id}>
                            <td><button className="cn-btn-e" onClick={() => handleEdit(row)}>Edit</button></td>
                            <td><button className="cn-btn-d" onClick={() => handleDelete(row.id)}>Del</button></td>
                            <td>{row.isDefault ? "✓" : ""}</td>
                            <td>{row.address1}</td>
                            <td>{row.address2}</td>
                            <td>{row.city}</td>
                            <td>{row.pinCode}</td>
                            <td>{row.state}</td>
                            <td>{row.country}</td>
                            <td>{row.contactPerson}</td>
                            <td>{row.phone}</td>
                            <td>{row.mobile}</td>
                            <td>{row.email1}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

              </div>{/* /card */}
            </div>{/* /content */}

            {/* ── Bottom Action Bar ── */}
            <div className="cn-bar">
              <button className="cn-bsave" onClick={handleSave}>💾 Save</button>
              <button className="cn-bmod">✏️ Modify</button>
              <button className="cn-bdel" onClick={() => { if (window.confirm("Delete this record?")) handleClear(); }}>✕ Delete</button>
              <button className="cn-bclr" onClick={handleClear}>🔄 Clear</button>
            </div>

          </div>{/* /main */}
        </div>{/* /body */}
      </div>
    </>
  );
}
