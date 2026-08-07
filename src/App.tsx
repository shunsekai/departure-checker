import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.tsx";
import History from "./pages/History.tsx";
import PortDetail from "./pages/PortDetail.tsx";
import Favorites from "./pages/Favorites.tsx";
import NotFound from "./pages/NotFound.tsx";
import styles from "./App.module.css";

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
      <nav className={styles.nav}>
        <Link className={styles.link} to="/">
          HOME
        </Link>{" "}
        <Link className={styles.link} to="/favorites">
          お気に入り
        </Link>{" "}
        <Link className={styles.link} to="/history">
          履歴
        </Link>
      </nav>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className={styles.footer}>
        <p className={styles.notice}>
          ※本アプリの出港判断は参考情報です。実際の出港可否は気象情報や現地の状況を確認のうえ、ご自身で判断してください。
        </p>
        <p className={styles.credit}>Weather data: Open-Meteo</p>
      </footer>
    </BrowserRouter>
  );
}
