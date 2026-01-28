import { apiGet } from "./client";
import type { Flight } from "../types/flight";

export function getCurrentFlights(signal?: AbortSignal) {
  return apiGet<Flight[]>("/currentflights", signal);
}
