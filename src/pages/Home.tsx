import PortCard from "../components/PortCard";
import styles from "./Home.module.css";
import { ports } from "../data/ports";
import React, { useEffect, useState } from "react";
type HomeProps = {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
};
export default function Home({ favorites, setFavorites }: HomeProps) {
  const [search, setSearch] = useState("");
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  useEffect(() => {
    console.log("保存", favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const filteredPorts = ports.filter((port) =>
    port.name.toLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="港名で検索"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className={styles.search}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className={styles.clearButton}
            >
              ✕
            </button>
          )}
        </div>
        <h1>🌊港の風・出港情報</h1>
        <p>
          各港の現在の風速、気温を確認しボートサイズに応じた出港判断をサポートします
        </p>
      </div>

      {filteredPorts.length > 0 ? (
        filteredPorts.map((port) => (
          <PortCard
            key={port.id}
            name={port.name}
            id={port.id}
            isFavorite={favorites.includes(port.id)}
            onFavoriteClick={() => toggleFavorite(port.id)}
          />
        ))
      ) : (
        <p className={styles.noResult}>該当する港がありません</p>
      )}
    </div>
  );
}
