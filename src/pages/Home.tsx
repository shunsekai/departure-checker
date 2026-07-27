import PortCard from "../components/PortCard";
import { ports } from "../data/ports";
import React, { useEffect } from "react";
type HomeProps = {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
};
export default function Home({ favorites, setFavorites }: HomeProps) {
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
