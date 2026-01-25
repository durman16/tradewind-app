import { useEffect, useState } from "react";
import MapSmokeTest from "./MapSmokeTest";
import { getAirports } from "./api/airports";
import { getCurrentFlights } from "./api/flights";

type Airport = {
  icao: string;
  name: string;
  latitude: number;
  longitude: number;
};

type Flight = {
  flightNumber: string;
  from: string;
  to: string;
  departedAt: string;
  arrivesAt: string;
  latitude: number | null;
  longitude: number | null;
};

export default function App() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);

  // load airports once
  useEffect(() => {
    getAirports()
      .then(setAirports)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load airports"));
  }, []);

  // poll flights every 1s
  useEffect(() => {
  const tick = async () => {
    try {
      const data = await getCurrentFlights();
      setFlights(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load flights");
    }
  };

  tick();
  const timerId = window.setInterval(tick, 1000);

  return () => {
    window.clearInterval(timerId);
  };
}, []);


  if (error) return <div style={{ padding: 16 }}>Error: {error}</div>;

  return <MapSmokeTest airports={airports} flights={flights} />;
}
