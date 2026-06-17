import { Link } from "react-router-dom";
import styles from "./PortCard.module.css";
type PortCardProps = { name: string; id: string };
export default function PortCard({ name, id }: PortCardProps) {
  return (
    <Link to={`/port/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <h2>{name}</h2>
      </div>
    </Link>
  );
}
