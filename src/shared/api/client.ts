/** Frontend API map. Replace paths here when the backend is connected. */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export const apiEndpoints = {
  products: `${API_BASE_URL}/products`,
  categories: `${API_BASE_URL}/categories`,
  cart: `${API_BASE_URL}/cart`,
  pujaLists: `${API_BASE_URL}/puja-lists`,
  newsletter: `${API_BASE_URL}/newsletter`,
};

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json() as Promise<T>;
}
