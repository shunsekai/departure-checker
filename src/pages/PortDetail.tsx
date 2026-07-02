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
  const [boatSize, setBoatSize] = useState("large");
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

  const departureStatus = () => {
    if (windSpeed === null) {
      return "判定できません";
    }
    if (boatSize === "large") {
      if (windSpeed < 10) {
        return "出港可能";
      } else if (windSpeed >= 10 && windSpeed < 13) {
        return "出港注意";
      } else {
        return "出港不可";
      }
    }

    if (boatSize === "mediam") {
      if (windSpeed < 7) {
        return "出港可能";
      } else if (windSpeed >= 7 && windSpeed < 10) {
        ("出港注意");
      } else {
        return "出港不可";
      }
    }
    if (boatSize === "small") {
      if (windSpeed < 5) {
        return "出港可能";
      } else if (windSpeed >= 5 && windSpeed < 8) {
        return "出港注意";
      } else {
        return "出港不可";
      }
    }
  };
  const status = departureStatus();
  const statusClass =
    status === "出港可能"
      ? styles.safe
      : status === "出港注意"
        ? styles.warning
        : status === "出港不可"
          ? styles.danger
          : styles.unknown;

  const getWindDirection = () => {
    if (windDirection === null) return;
    if (windDirection < 45 || windDirection >= 315) {
      return "北風";
    } else if (windDirection >= 45 && windDirection < 135) {
      return "東風";
    } else if (windDirection >= 135 && windDirection < 225) {
      return "南風";
    } else {
      return "西";
    }
  };

  return (
    <div className={styles.portCard}>
      <h1 className={styles.title}>{port.name}</h1>
      <label>ボートサイズ</label>
      <select
        value={boatSize}
        onChange={(event) => {
          setBoatSize(event.target.value);
        }}
      >
        <option value="large">大型</option>
        <option value="mediam">中型</option>
        <option value="small">小型</option>
      </select>
      <div className={styles.info}>
        <p>緯度:{port.lat}</p>
        <p>経度:{port.lon}</p>
        <p className={styles.wind}>
          {windSpeed !== null ? `風速:${windSpeed}m/s` : "風速未取得"}
        </p>
        <p>{temperature !== null ? `気温:${temperature}℃` : "気温未取得"}</p>
        <p>
          {windDirection !== null ? `風向:${windDirection}°` : "風向未取得"}
          {getWindDirection()}
        </p>
      </div>
      <p className={`${styles.status} ${statusClass}`}>{status}</p>
    </div>
  );
}
