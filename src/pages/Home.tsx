import PortCard from "../components/PortCard";
import { ports } from "../data/ports";
import { useState, useEffect } from "react";
export default function Home() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      const parseFavorites = JSON.parse(savedFavorites);
      console.log("読み込み", savedFavorites);
      setFavorites(parseFavorites);
    }
  }, []);
  useEffect(() => {
    console.log("保存", favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      {ports.map((port) => (
        <PortCard
          key={port.id}
          name={port.name}
          id={port.id}
          isFavorite={favorites.includes(port.id)}
          onFavoriteClick={() => toggleFavorite(port.id)}
        />
      ))}
    </>
  );
}
