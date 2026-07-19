import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.tsx";
import History from "./pages/History.tsx";
import PortDetail from "./pages/PortDetail.tsx";
import Favorites from "./pages/Favorites.tsx";

export default function App() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saveFavorites = localStorage.getItem("favorites");
    if (saveFavorites) {
      return JSON.parse(saveFavorites);
    }
    return [];
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home favorites={favorites} setFavorites={setFavorites} />}
        />
        <Route
          path="/favorites"
          element={
            <Favorites favorites={favorites} setFavorites={setFavorites} />
          }
        />
        <Route path="/ports/:portId" element={<PortDetail />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
