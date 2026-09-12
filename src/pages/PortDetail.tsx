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
  const [loading, setLoading] = useState(true);
  type BoatSize = "large" | "medium" | "small";
  const [boatSize, setBoatSize] = useState<BoatSize>("large");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchWeather = async () => {
      if (!port) return;
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${port.lat}&longitude=${port.lon}&current=wind_speed_10m,temperature_2m,wind_direction_10m`,
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("天気情報の取得に失敗しました");
        }
        setWindSpeed(data.current.wind_speed_10m ?? null);
        setTemperature(data.current.temperature_2m ?? null);
        setWindDirection(data.current.wind_direction_10m ?? null);
      } catch {
        setError("天気情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [port]);

  useEffect(() => {
    if (!port) return;
    const saveHistory = localStorage.getItem("history");
    const history: string[] = saveHistory ? JSON.parse(saveHistory) : [];
    const newHistory = history.filter((id) => id !== port.id);
    newHistory.unshift(port.id);
    localStorage.setItem("history", JSON.stringify(newHistory));
  }, [port]);

  if (!port) {
    return <h1>港が見つかりません</h1>;
  }

  const departureStatus = () => {
    if (loading) {
      return "判定中...";
    }
    if (error) {
      return "判定できません";
    }
    if (windSpeed === null) {
      return "判定できません";
    }
    const limits = {
      large: { safe: 10, warning: 13 },
      medium: { safe: 7, warning: 10 },
      small: { safe: 5, warning: 8 },
    };
    const limit = limits[boatSize];
    if (windSpeed < limit.safe) {
      return "出港可能";
    }

    if (windSpeed < limit.warning) {
      return "出港注意";
    }

    return "出港不可";
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
      <h1 className={styles.title}>🌊 {port.name}</h1>
      <div className={styles.selectArea}>
        <label htmlFor="boatSize">ボートサイズ</label>
        <select
          id="boatSize"
          value={boatSize}
          onChange={(event) => {
            setBoatSize(event.target.value as BoatSize);
          }}
        >
          <option value="large">大型</option>
          <option value="medium">中型</option>
          <option value="small">小型</option>
        </select>
      </div>

      <div className={styles.section}>
        {loading ? (
          <p className={styles.loading}>天気情報を取得中…</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <>
            <p className={styles.wind}>💨 風速{windSpeed}m/s</p>
            <p>🌡 気温{temperature}度</p>

            <p>
              🧭 風向{windDirection}°{getWindDirection()}
            </p>
          </>
        )}
      </div>
      <div className={styles.statusArea}>
        <h2>出港判断</h2>
        <p className={`${styles.status} ${statusClass}`}>{status}</p>
      </div>
    </div>
  );
}
