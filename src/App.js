import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Ludo from "./Ludo";
import Shipper from "./components/Form/masters/Shipper";
import StudentForm from "./components/Form/masters/StudentForm";
import Menu from "./components/Menu";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ludo" element={<Ludo />} />
        <Route path="components/Form/masters/StudentForm" element={<StudentForm />} />
        <Route path="components/Form/masters/Shipper" element={<Shipper />} />
        <Route path="/components/Menu" element={<Menu />} />
      </Routes>      
    </BrowserRouter>
     
    </>
  );
}

export default App;


