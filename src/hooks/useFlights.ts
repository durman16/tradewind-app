import { useEffect, useRef, useState } from "react";
import { getCurrentFlights } from "../api/flights";
import type { Flight } from "../types/flight";

export function useFlights(pollMs = 1000) {
  const [data, setData] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);
  const ctrlRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let mounted = true;

    const tick = async () => {
      ctrlRef.current?.abort();
      const ctrl = new AbortController();
      ctrlRef.current = ctrl;

      try {
        const flights = await getCurrentFlights(ctrl.signal);
        if (!mounted) return;
        setData(flights);
        setError(null);
        setLoading(false);
      } catch (e) {
        if (!mounted) return;
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Failed to load flights");
        setLoading(false);
      }
    };

    tick();
    timerRef.current = window.setInterval(tick, pollMs);

    return () => {
      mounted = false;
      if (timerRef.current) window.clearInterval(timerRef.current);
      ctrlRef.current?.abort();
    };
  }, [pollMs]);

  return { data, loading, error };
}
