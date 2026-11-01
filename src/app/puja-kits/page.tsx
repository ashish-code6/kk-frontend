import type { Metadata } from "next";
import PujaKitsPage from "@/features/puja-kits/components/puja-kits-page";

export const instant = false;

export const metadata: Metadata = {
  title: "Complete Puja Kits | KALASH & KUMKUM",
  description:
    "Shop thoughtfully prepared puja kits for daily prayers and special occasions.",
};

export default function Page() {
  return <PujaKitsPage />;
}
