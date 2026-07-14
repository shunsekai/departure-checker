import { Link } from "react-router-dom";
import styles from "./PortCard.module.css";
type PortCardProps = {
  name: string;
  id: string;
  isFavorite: boolean;
  onFavoriteClick: () => void;
};
export default function PortCard({
  name,
  id,
  isFavorite,
  onFavoriteClick,
}: PortCardProps) {
  return (
    <Link to={`/ports/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <h2>
          <span
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onFavoriteClick();
            }}
          >
            {isFavorite ? "★" : "☆"}
          </span>{" "}
          {name}
        </h2>
      </div>
    </Link>
  );
}
