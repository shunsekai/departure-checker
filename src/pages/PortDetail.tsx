import { useParams } from "react-router-dom";
import { ports } from "../data/ports";

export default function PortDetail() {
  const { portId } = useParams();
  const port = ports.find((port) => port.id === portId);
  if (!port) {
    return <h1>港が見つかりません</h1>;
  }
  return (
    <div>
      <h1>{port.name}</h1>
      <p>緯度:{port.lat}</p>
      <p>経度:{port.lon}</p>
    </div>
  );
}
