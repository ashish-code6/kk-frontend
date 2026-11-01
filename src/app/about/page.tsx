import type { Metadata } from "next";
import AboutPage from "@/features/about/components/about-page";

export const instant = false;

export const metadata: Metadata = {
  title: "About Us | KALASH & KUMKUM",
  description:
    "Learn about KALASH & KUMKUM and our care for authentic puja essentials.",
};

export default function Page() {
  return <AboutPage />;
}
