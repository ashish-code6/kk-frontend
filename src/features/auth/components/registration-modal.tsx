"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { AuthUser } from "../lib/auth-session";
import {
  requestRegistrationOtp,
  verifyRegistrationOtp,
} from "../lib/auth-api";
import styles from "./auth.module.css";

type RegistrationModalProps = {
  onClose: () => void;
  onComplete: (user: AuthUser, token: string) => void;
};

export default function RegistrationModal({
  onClose,
  onComplete,
}: RegistrationModalProps) {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [user, setUser] = useState<AuthUser>({ name: "", mobile: "", email: "" });
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [resendWait, setResendWait] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (resendWait === 0) return;
    const timer = window.setTimeout(
      () => setResendWait((remaining) => Math.max(remaining - 1, 0)),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [resendWait]);

  function registrationDetails() {
    return {
      ...user,
      name: user.name.trim(),
      mobile: user.mobile?.trim() ?? "",
      email: user.email.trim(),
      password,
    };
  }

  async function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await requestRegistrationOtp(registrationDetails());
      setStep("otp");
      setResendWait(60);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send the verification code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function resendOtp() {
    setError("");
    setIsSubmitting(true);
    try {
      await requestRegistrationOtp(registrationDetails());
      setResendWait(60);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to resend the verification code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const result = await verifyRegistrationOtp({
        email: user.email.trim(),
        otp,
      });
      onComplete(result.user, result.token);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to verify your email. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close registration"
        >
          ×
        </button>
        <img
          className={styles.modalIcon}
          src="/kk-logo-transparent.png"
          alt="KALASH & KUMKUM — Tradition Delivered with Devotion"
        />
        <p className={styles.eyebrow}>JOIN OUR COMMUNITY</p>
        <h2 id="registration-title">
          {step === "details" ? "Create your account" : "Verify your email"}
        </h2>
        <p className={styles.modalLead}>
          {step === "details"
            ? "A few details to make every sacred moment simpler."
            : `Enter the 6-digit code we sent to ${user.email}.`}
        </p>

        {step === "details" ? (
          <form className={styles.form} onSubmit={submitDetails}>
            <label>
              Full name
              <input
                autoComplete="name"
                required
                value={user.name}
                onChange={(event) =>
                  setUser({ ...user, name: event.target.value })
                }
                placeholder="Your name"
              />
            </label>
            <label>
              Mobile number
              <input
                autoComplete="tel"
                type="tel"
                inputMode="tel"
                pattern="[0-9+() -]{8,18}"
                required
                value={user.mobile}
                onChange={(event) =>
                  setUser({ ...user, mobile: event.target.value })
                }
                placeholder="+91 98765 43210"
              />
            </label>
            <label>
              Email address
              <input
                autoComplete="email"
                type="email"
                required
                value={user.email}
                onChange={(event) =>
                  setUser({ ...user, email: event.target.value })
                }
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                autoComplete="new-password"
                type="password"
                minLength={8}
                maxLength={128}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
              />
            </label>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button
              className={styles.primaryButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending code…" : "Send verification code"}{" "}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={submitOtp}>
            <label>
              Verification code
              <input
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                autoFocus
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter 6-digit code"
              />
            </label>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button
              className={styles.primaryButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying…" : "Verify & create account"}{" "}
              <span aria-hidden="true">→</span>
            </button>
            <button
              className={styles.textButton}
              type="button"
              onClick={resendOtp}
              disabled={isSubmitting || resendWait > 0}
            >
              {resendWait > 0 ? `Resend code in ${resendWait}s` : "Resend code"}
            </button>
            <button
              className={styles.textButton}
              type="button"
              onClick={() => {
                setError("");
                setOtp("");
                setStep("details");
              }}
            >
              Back to your details
            </button>
          </form>
        )}
        {step === "details" && (
          <p className={styles.legalNote}>
            By creating an account, you agree to our Terms &amp; Privacy Policy.
          </p>
        )}
      </section>
    </div>
  );
}
