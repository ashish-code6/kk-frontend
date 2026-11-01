"use client";

import { useEffect, useState } from "react";

export type PujaKit = {
  id: string;
  name: string;
  description: string;
  includes: string;
  kitItems: { item: string; quantity: string }[];
  price: number;
  originalPrice: number | null;
  rating: number | null;
  reviewCount: number | null;
  tag: string;
  deliveryInfo: string;
  imageUrl: string;
  galleryImages: string[];
  sortOrder: number;
};

type PujaKitsResponse = {
  success: boolean;
  message?: string;
  data?: PujaKit[];
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export function usePujaKits() {
  const [kits, setKits] = useState<PujaKit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadKits() {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE_URL}/puja-kits`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const payload = (await response.json()) as PujaKitsResponse;
        if (!response.ok || !payload.success || !Array.isArray(payload.data)) {
          throw new Error(payload.message || "Unable to load puja kits.");
        }
        setKits(payload.data);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load puja kits.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadKits();
    return () => controller.abort();
  }, [reloadKey]);

  return {
    kits,
    isLoading,
    error,
    retry: () => setReloadKey((current) => current + 1),
  };
}
