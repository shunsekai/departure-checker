import { useParams } from "react-router-dom";
import { ports } from "../data/ports";
import { useState, useEffect } from "react";

export default function PortDetail() {
  const { portId } = useParams();
  const port = ports.find((port) => port.id === portId);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [temperature, setTempature] = useState<number | null>(null);
  const [windDirection, setWindDirection] = useState<number | null>(null);
  useEffect(() => {
    const fetchWeather = async () => {
      if (!port) return;
      const responce = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${port.lat}&longitude=${port.lon}&current=wind_speed_10m,temperature_2m,wind_direction_10m`,
      );
      const data = await responce.json();
      setWindSpeed(data.current.wind_speed_10m);
      setTempature(data.current.temperature_2m);
      setWindDirection(data.current.wind_direction_10m);
    };
    fetchWeather();
  }, [port]);
  if (!port) {
    return <h1>港が見つかりません</h1>;
  }
  return (
    <div>
      <h1>{port.name}</h1>
      <p>緯度:{port.lat}</p>
      <p>経度:{port.lon}</p>
      <p>{windSpeed !== null ? `風速:${windSpeed}` : "風速未取得"}</p>
      <p>{temperature !== null ? `気温:${temperature}` : "気温未取得"}</p>
      <p>{windSpeed !== null ? `風向:${windDirection}` : "風向未取得"}</p>
    </div>
  );
}
