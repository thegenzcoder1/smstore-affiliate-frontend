import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BillPage from "./pages/BillPage";
import DeleteSareePage from "./pages/DeleteSareePage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<BillPage />} />
        <Route path="/bill-page" element={<BillPage />} />
        <Route path="/delete-sareeid" element={<DeleteSareePage />} />
      </Routes>
    </BrowserRouter>
  );
}
