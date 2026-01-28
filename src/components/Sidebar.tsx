import type { Flight } from "../types/flight";

type Props = {
  flights: Flight[];
  selected: Flight | null;
  onSelect: (flight: Flight) => void;
};

export function Sidebar({ flights, selected, onSelect }: Props) {
  const flying = flights.filter((f) => f.latitude != null && f.longitude != null);

  return (
    <div style={{ width: 280, borderRight: "1px solid #e5e5e5", padding: 12, overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Flights ({flying.length})</h3>

        <button
          onClick={() => onSelect(selected as Flight)}
          disabled={!selected}
          style={{
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #ddd",
            background: selected ? "white" : "#f3f3f3",
            cursor: selected ? "pointer" : "not-allowed",
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        {flying.map((f) => {
          const active = selected?.flightNumber === f.flightNumber;

          return (
            <div
              key={f.flightNumber}
              onClick={() => onSelect(f)}
              style={{
                padding: 8,
                marginBottom: 6,
                borderRadius: 6,
                cursor: "pointer",
                border: active ? "2px solid #111" : "1px solid #eee",
                background: "white",
              }}
            >
              <b>{f.flightNumber}</b>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {f.from} → {f.to}
              </div>
              {active && <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>Selected</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
