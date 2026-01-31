import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Ludo from "./Ludo";
import Shipper from "./components/Form/masters/Shipper";
import StudentForm from "./components/Form/masters/StudentForm";
import Division from "./Division";
import Consignee from "./components/Form/masters/Consignee";
import AutoSuggestInput from "./AutoSuggestInput";
import PurchaseReportPage from "./pages/PurchaseReportPage";
//import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/components/Header" element={<Header />} />
        <Route path="/components/Menu" element={<Menu />} />
        <Route path="/" element={<Login />} />
        <Route path="/Division" element={<Division />} />
        <Route path="/ludo" element={<Ludo />} />
        <Route path="components/Form/masters/StudentForm" element={<StudentForm />} />
        <Route path="components/Form/masters/Shipper" element={<Shipper />} />    
        <Route path="components/Form/masters/Consignee" element={<Consignee />} />      
        <Route path="/AutoSuggestInput" element={<AutoSuggestInput />} />
        <Route path="/pages/PurchaseReportPage" element={<PurchaseReportPage />} />
      </Routes>      
    </BrowserRouter>   
    </>
  );
}

export default App;


