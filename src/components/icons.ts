import L from "leaflet";

// Blue pin (airport)
const airportIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export { airportIcon };

// Simple red dot (flight) – SVG data URL (no extra files)
const redDotSvg =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
      <circle cx="9" cy="9" r="7" fill="#d11" stroke="#fff" stroke-width="2"/>
    </svg>`
  );

export const flightIcon = new L.DivIcon({
  html: `<img src="${redDotSvg}" />`,
  className: "",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export function createFlightIcon(label: string) {
  return new L.DivIcon({
    html: `
      <div style="
        background:#d11;
        color:#3388FF;
        padding:2px 6px;
        border-radius:6px;
        font-size:11px;
        font-weight:bold;
        white-space:nowrap;
        box-shadow:0 1px 4px rgba(0,0,0,0.3);
        transform: translate(-50%, -50%);
      ">
        ${label}
      </div>
    `,
    className: "",
  });
}
