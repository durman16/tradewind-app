import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import type { Airport } from "../types/airport";
import type { Flight } from "../types/flight";
import { airportIcon, createFlightIcon } from "./icons.ts";
import { useMap } from "react-leaflet";


function FlyToFlight({ flight }: { flight: Flight | null }) {
  const map = useMap();

  if (!flight || flight.latitude == null || flight.longitude == null) return null;

  map.flyTo([flight.latitude!, flight.longitude!], 7);

  return null;
}


type Props = {
  airports: Airport[];
  flights: Flight[];
  selectedFlight: Flight | null;
};

export function MapView({ airports, flights, selectedFlight }: Props) {
//   const center: [number, number] = selectedFlight ? [selectedFlight.latitude, selectedFlight.longitude] : [45.4215, -75.6972];

  const center: [number, number] =  [45.4215, -75.6972];
  const flying = flights.filter((f) => f.latitude != null && f.longitude != null);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>

      <MapContainer center={center} zoom={4} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedFlight && <FlyToFlight flight={selectedFlight} />}


        {airports.map((a) => (
          <Marker key={a.icao} position={[a.latitude, a.longitude]} icon={airportIcon}>
            <Popup>
              <b>{a.icao}</b>
              <div>{a.name}</div>
            </Popup>
          </Marker>
        ))}

        {flying.map((f) => (
          <Marker key={f.flightNumber} position={[f.latitude as number, f.longitude as number]} icon={createFlightIcon(f.flightNumber)}>
            <Popup>
              <b>{f.flightNumber}</b>
              <div>{f.from} → {f.to}</div>
              <div>Departed: {f.departedAt}</div>
              <div>Arrives: {f.arrivesAt}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
