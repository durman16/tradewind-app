import { MapView } from "./components/MapView";
import { Sidebar } from "./components/Sidebar";
import { useAirports } from "./hooks/useAirports";
import { useFlights } from "./hooks/useFlights";
import { useState } from "react";
import type { Flight } from "./types/flight";

export default function App() {
  const { data: airports } = useAirports();
  const { data: flights } = useFlights(1000);

  const [selected, setSelected] = useState<Flight | null>(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar flights={flights} onSelect={setSelected} />
      <MapView airports={airports} flights={flights} selectedFlight={selected} />
    </div>
  );
}
