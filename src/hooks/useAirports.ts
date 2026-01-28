import { useEffect, useState } from "react";
import { getAirports } from "../api/airports";
import type { Airport } from "../types/airport";

export function useAirports() {
  const [data, setData] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const airports = await getAirports(ctrl.signal);
        setData(airports);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load airports");
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, []);

  return { data, loading, error };
}
