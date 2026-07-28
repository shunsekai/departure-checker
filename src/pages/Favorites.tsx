import { ports } from "../data/ports";
import PortCard from "../components/PortCard.tsx";
type FavoritesProps = {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
};
export default function Favorites({ favorites, setFavorites }: FavoritesProps) {
  const favoritePorts = ports.filter((port) => favorites.includes(port.id));
  if (favoritePorts.length === 0) {
    return <p>お気に入りはありません</p>;
  }
  const toggleFavorite = (id: string) => {
    setFavorites(favorites.filter((favoritesId) => favoritesId !== id));
  };
  return (
    <>
      {favoritePorts.map((port) => (
        <PortCard
          key={port.id}
          name={port.name}
          id={port.id}
          isFavorite={true}
          onFavoriteClick={() => toggleFavorite(port.id)}
        />
      ))}
    </>
  );
}
