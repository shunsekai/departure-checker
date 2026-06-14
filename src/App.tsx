import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import History from "./pages/History.tsx";
import PortDetail from "./pages/PortDetail.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ports/:portId" element={<PortDetail />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
