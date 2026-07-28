import { ports } from "../data/ports.ts";
import PortCard from "../components/PortCard.tsx";

export default function History() {
  const savedHistory = localStorage.getItem("history");
  const history: string[] = savedHistory ? JSON.parse(savedHistory) : [];
  const historyPorts = history
    .map((id) => ports.find((port) => port.id === id))
    .filter((port) => port !== undefined);
  if (history.length === 0) {
    return <p>閲覧履歴はありません</p>;
  }
  return (
    <>
      {historyPorts.map((port) => {
        if (!port) return null;
        return (
          <PortCard
            key={port.id}
            name={port.name}
            id={port.id}
            isFavorite={false}
            onFavoriteClick={() => {}}
          />
        );
      })}
    </>
  );
}
