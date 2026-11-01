import type { Metadata } from "next";
import "./globals.css";
import AuthGuard from "@/features/auth/components/auth-guard";

export const metadata: Metadata = {
  title: "KALASH & KUMKUM | Puja Samagri for Sacred Moments",
  description:
    "Shop authentic puja samagri, diyas, flowers and puja kits. Tradition meets convenience with KALASH & KUMKUM.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
