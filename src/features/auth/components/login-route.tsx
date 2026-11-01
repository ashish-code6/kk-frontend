"use client";

import { useRouter } from "next/navigation";
import LoginPage from "./login-page";
import type { AuthUser } from "../lib/auth-session";

export default function LoginRoute() {
  const router = useRouter();

  function completeSignIn(_user: AuthUser) {
    const destination = new URLSearchParams(window.location.search).get("next");
    const safeDestination =
      destination?.startsWith("/") && !destination.startsWith("//")
        ? destination
        : "/";

    router.replace(safeDestination);
  }

  return (
    <LoginPage
      required
      onClose={() => router.replace("/login")}
      onComplete={completeSignIn}
    />
  );
}
