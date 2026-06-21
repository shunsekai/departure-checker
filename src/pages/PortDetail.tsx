import { useParams } from "react-router-dom";
import { ports } from "../data/ports";

export default function PortDetail() {
  const { portId } = useParams();
  const port = ports.find((port) => port.id === portId);
  return (
    <div>
      <h1>{port?.name}</h1>
    </div>
  );
}
