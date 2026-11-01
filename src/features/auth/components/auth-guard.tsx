"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { validateAuthSession } from "../lib/auth-api";
import { clearAuthUser, readAuthToken, saveAuthSession } from "../lib/auth-session";
import styles from "./auth.module.css";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorizedPath, setAuthorizedPath] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setAuthorizedPath(null);

    if (pathname === "/login") {
      setError("");
      const token = readAuthToken();
      if (!token) {
        setAuthorizedPath(pathname);
        return () => {
          active = false;
        };
      }

      const controller = new AbortController();
      validateAuthSession(token, controller.signal)
        .then((user) => {
          if (!active) return;
          if (!user) {
            clearAuthUser();
            setAuthorizedPath(pathname);
            return;
          }

          saveAuthSession(user, token);
          const destination = new URLSearchParams(window.location.search).get("next");
          const safeDestination =
            destination?.startsWith("/") && !destination.startsWith("//")
              ? destination
              : "/";
          router.replace(safeDestination);
        })
        .catch((requestError: unknown) => {
          if (!active || controller.signal.aborted) return;
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to validate your session. Please try again.",
          );
        });

      return () => {
        active = false;
        controller.abort();
      };
    }

    setAuthorizedPath(null);
    setError("");

    const token = readAuthToken();
    if (!token) {
      clearAuthUser();
      const returnTo = `${window.location.pathname}${window.location.search}`;
      router.replace(`/login?next=${encodeURIComponent(returnTo)}`);
      return () => {
        active = false;
      };
    }

    const controller = new AbortController();
    validateAuthSession(token, controller.signal)
      .then((user) => {
        if (!active) return;
        if (!user) {
          clearAuthUser();
          const returnTo = `${window.location.pathname}${window.location.search}`;
          router.replace(`/login?next=${encodeURIComponent(returnTo)}`);
          return;
        }
        saveAuthSession(user, token);
        setAuthorizedPath(pathname);
      })
      .catch((requestError: unknown) => {
        if (!active || controller.signal.aborted) return;
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to validate your session. Please try again.",
        );
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [pathname, router]);

  if (authorizedPath !== pathname) {
    return (
      <main className={styles.loading} aria-live="polite">
        <img
          className={styles.loadingMark}
          src="/kk-logo-transparent.png"
          alt="KALASH & KUMKUM"
        />
        {error ? (
          <>
            <p role="alert">{error}</p>
            <button type="button" onClick={() => window.location.reload()}>
              Try again
            </button>
          </>
        ) : (
          <p>Opening your sacred space…</p>
        )}
      </main>
    );
  }

  return children;
}
