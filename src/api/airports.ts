const BASE_URL = "http://xiapp.tradewindapps.com:9912";
const TOKEN = "9265ee96af02fe95e132e33a447f8f08";

export async function getAirports() {
  const res = await fetch(`${BASE_URL}/airports`, {
    headers: {
      "X-API-Token": TOKEN,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch airports");

  return res.json();
}
