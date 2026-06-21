import PortCard from "../components/PortCard";
import { ports } from "../data/ports";
export default function Home() {
  return (
    <>
      {ports.map((port) => (
        <PortCard key={port.id} name={port.name} id={port.id} />
      ))}
    </>
  );
}
