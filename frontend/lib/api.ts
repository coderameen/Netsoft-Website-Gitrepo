import { HomeContent } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export async function getContent(): Promise<HomeContent> {
  const res = await fetch(`${API_BASE}/api/content`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load content");
  }
  return res.json();
}

export { API_BASE };
