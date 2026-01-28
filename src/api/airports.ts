import { apiGet } from "./client";
import type { Airport } from "../types/airport";

export function getAirports(signal?: AbortSignal) {
  return apiGet<Airport[]>("/airports", signal);
}
