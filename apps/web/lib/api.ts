import axios from "axios";
import type { HistoryResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API_URL:", API_URL);

export async function analyzeLocation(
  country: string,
  city: string,
  zone?: string
) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not set.");
  }
  const response = await axios.get(`${API_URL}/analyze`, {
    params: { country, city, zone },
  });

  return response.data;
}

export async function fetchHistory(
  page: number,
  limit: number
): Promise<HistoryResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not set.");
  }
  const response = await axios.get(`${API_URL}/history`, {
    params: { page, limit },
  });
  return response.data;
}
