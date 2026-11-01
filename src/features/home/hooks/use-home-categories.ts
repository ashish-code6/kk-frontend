"use client";

import { useEffect, useState } from "react";
import { categories as fallbackCategories } from "@/features/home/data/home-data";
import type {
  CategoriesResponse,
  StoreCategory,
} from "@/features/home/types/category";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const initialCategories: StoreCategory[] = fallbackCategories.map(
  (category, index) => ({
    id: `fallback-${index}`,
    name: category.name,
    slug: "",
    imageUrl: null,
    sortOrder: index,
    parentId: null,
    children: [],
  }),
);

export function useHomeCategories() {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const payload = (await response.json()) as CategoriesResponse;
        if (!response.ok || !payload.success || !Array.isArray(payload.data)) {
          throw new Error(payload.message || "Unable to load categories.");
        }
        setCategories(payload.data);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Could not load store categories.", error);
      }
    }

    void loadCategories();
    return () => controller.abort();
  }, []);

  return categories;
}
