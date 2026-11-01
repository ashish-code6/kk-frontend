import type { Metadata } from "next";
import ProductsPage from "@/features/products/components/products-page";

export const instant = false;

export const metadata: Metadata = {
  title: "Shop Puja Essentials | KALASH & KUMKUM",
  description: "Browse puja kits, diyas, incense, flowers and more.",
};

export default function Page() {
  return <ProductsPage />;
}
