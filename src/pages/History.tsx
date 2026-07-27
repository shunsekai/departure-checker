import { ports } from "../data/ports.ts";
import PortCard from "../components/PortCard.tsx";

export default function History() {
  const savedHistory = localStorage.getItem("history");
  const history: string[] = savedHistory ? JSON.parse(savedHistory) : [];
  const historyPorts = history
    .map((id) => ports.find((port) => port.id === id))
    .filter((port) => port !== undefined);
  return (
    <>
      {historyPorts.map((port) => (
        <PortCard
          key={port.id}
          name={port.name}
          id={port.id}
          isFavorite={false}
          onFavoriteClick={() => {}}
        />
      ))}
    </>
  );
}
