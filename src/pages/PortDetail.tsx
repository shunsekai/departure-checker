import { useParams } from "react-router-dom";
import { ports } from "../data/ports";
import { useState, useEffect } from "react";
import styles from "./portDetail.module.css";

export default function PortDetail() {
  const { portId } = useParams();
  const port = ports.find((port) => port.id === portId);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [windDirection, setWindDirection] = useState<number | null>(null);
  useEffect(() => {
    const fetchWeather = async () => {
      if (!port) return;
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${port.lat}&longitude=${port.lon}&current=wind_speed_10m,temperature_2m,wind_direction_10m`,
      );
      const data = await response.json();
      setWindSpeed(data.current.wind_speed_10m);
      setTemperature(data.current.temperature_2m);
      setWindDirection(data.current.wind_direction_10m);
    };
    fetchWeather();
  }, [port]);
  if (!port) {
    return <h1>港が見つかりません</h1>;
  }
  return (
    <div className={styles.portCard}>
      <h1 className={styles.title}>{port.name}</h1>
      <div className={styles.info}>
        <p>緯度:{port.lat}</p>
        <p>経度:{port.lon}</p>
        <p className={styles.wind}>
          {windSpeed !== null ? `風速:${windSpeed}` : "風速未取得"}
        </p>
        <p>{temperature !== null ? `気温:${temperature}` : "気温未取得"}</p>
        <p>{windDirection !== null ? `風向:${windDirection}` : "風向未取得"}</p>
      </div>
    </div>
  );
}
