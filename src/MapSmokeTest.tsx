import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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

type Props = {
  airports: Airport[];
  flights: Flight[];
};

export default function MapSmokeTest({ airports, flights }: Props) {
  const center: [number, number] = [45.4215, -75.6972];

  const flying = flights.filter((f) => f.latitude != null && f.longitude != null);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={center} zoom={4} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Airports */}
        {airports.map((a) => (
          <Marker key={a.icao} position={[a.latitude, a.longitude]}>
            <Popup>
              <b>{a.icao}</b>
              <div>{a.name}</div>
            </Popup>
          </Marker>
        ))}

        {/* Flights (only when lat/lng is not null) */}
        {flying.map((f) => (
          <Marker
            key={f.flightNumber}
            position={[f.latitude as number, f.longitude as number]}
          >
            <Popup>
              <b>{f.flightNumber}</b>
              <div>
                {f.from} → {f.to}
              </div>
              <div>Departed: {f.departedAt}</div>
              <div>Arrives: {f.arrivesAt}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
