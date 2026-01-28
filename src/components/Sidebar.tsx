import type { Flight } from "../types/flight";

type Props = {
  flights: Flight[];
  onSelect: (flight: Flight) => void;
};

export function Sidebar({ flights, onSelect }: Props) {
  const flying = flights.filter((f) => f.latitude != null && f.longitude != null);

  return (
    <div
      style={{
        width: 280,
        borderRight: "1px solid #e5e5e5",
        padding: 12,
        overflowY: "auto",
        background: "#fafafa",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Flights ({flying.length})</h3>

      {flying.map((f) => (
        <div
          key={f.flightNumber}
          onClick={() => onSelect(f)}
          style={{
            padding: 8,
            marginBottom: 6,
            borderRadius: 6,
            background: "white",
            cursor: "pointer",
            border: "1px solid #eee",
          }}
        >
          <b>{f.flightNumber}</b>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {f.from} → {f.to}
          </div>
        </div>
      ))}
    </div>
  );
}
