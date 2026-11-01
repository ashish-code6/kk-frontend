import type { Metadata } from "next";
import PujaListPage from "@/features/puja-list/components/puja-list-page";

export const instant = false;

export const metadata: Metadata = {
  title: "Plan Your Puja | KALASH & KUMKUM",
  description: "Request a custom puja samagri list for your special occasion.",
};

export default function Page() {
  return <PujaListPage />;
}
