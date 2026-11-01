"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  clearAuthUser,
  readAuthUser,
  saveAuthSession,
  type AuthUser,
} from "../lib/auth-session";
import { loginWithPassword } from "../lib/auth-api";
import RegistrationModal from "./registration-modal";
import styles from "./auth.module.css";

type LoginPageProps = {
  onClose: () => void;
  onComplete: (user: AuthUser) => void;
  required?: boolean;
};

export default function LoginPage({
  onClose,
  onComplete,
  required = false,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [error, setError] = useState("");
  const [signedInUser, setSignedInUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setSignedInUser(readAuthUser());
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !showRegistration && !required) onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, required, showRegistration]);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const result = await loginWithPassword(email, password);
      saveAuthSession(result.user, result.token);
      onComplete(result.user);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function completeRegistration(user: AuthUser, token: string) {
    saveAuthSession(user, token);
    onComplete(user);
  }

  function closeRegistration() {
    setShowRegistration(false);
  }

  function signOut() {
    clearAuthUser();
    setSignedInUser(null);
    setEmail("");
    setPassword("");
    setError("");
  }

  return (
    <main
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !showRegistration &&
          !required
        ) {
          onClose();
        }
      }}
    >
      <section
        className={`${styles.modal} ${styles.loginModal}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        {!required && (
          <button
            className={styles.closeButton}
            type="button"
            onClick={onClose}
            aria-label="Close sign in"
          >
            ×
          </button>
        )}
        <div className={styles.modalIcon} aria-hidden="true">ॐ</div>
        <p className={styles.eyebrow}>KALASH &amp; KUMKUM · WELCOME</p>
        <h2 id="login-title">Sign in to your account</h2>
        <p className={styles.modalLead}>
          Sign in to continue to your sacred essentials.
        </p>

        {signedInUser ? (
          <div className={styles.signedInCard}>
            <p>
              You’re signed in as <strong>{signedInUser.email}</strong>.
            </p>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => onComplete(signedInUser)}
            >
              Continue shopping <span aria-hidden="true">→</span>
            </button>
            <button className={styles.textButton} type="button" onClick={signOut}>
              Sign out
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submitLogin}>
            <label>
              Email address
              <input
                autoComplete="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                autoComplete="current-password"
                type="password"
                required
                minLength={8}
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
              />
            </label>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button className={styles.primaryButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in"}{" "}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        )}

        <div className={styles.divider}><span>NEW HERE?</span></div>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() => setShowRegistration(true)}
        >
          Sign up
        </button>
        <p className={styles.disclaimer}>
          Your account is protected with secure password authentication.
        </p>
      </section>
      {showRegistration && (
        <RegistrationModal
          onClose={closeRegistration}
          onComplete={completeRegistration}
        />
      )}
    </main>
  );
}
