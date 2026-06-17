import PortCard from "../components/PortCard";
export default function Home() {
  const ports = [
    { id: "yokohama", name: "横浜港" },
    { id: "tateyama", name: "館山港" },
    { id: "hiratsuka", name: "平塚港" },
  ];
  return (
    <>
      {ports.map((port) => (
        <PortCard key={port.id} name={port.name} id={port.id} />
      ))}
    </>
  );
}
