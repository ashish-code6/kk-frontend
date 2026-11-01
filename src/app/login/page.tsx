import type { Metadata } from "next";
import LoginRoute from "@/features/auth/components/login-route";

export const instant = false;

export const metadata: Metadata = {
  title: "Sign in | KALASH & KUMKUM",
  description: "Sign in or create your KALASH & KUMKUM account.",
};

export default function Page() {
  return <LoginRoute />;
}
