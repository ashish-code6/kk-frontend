import type { AuthUser } from "./auth-session";

type AuthResponse = {
  success: boolean;
  message?: string;
  data?: {
    user?: {
      name?: unknown;
      email?: unknown;
      mobile?: unknown;
    };
    token?: unknown;
  };
};

type CurrentUserResponse = {
  success: boolean;
  data?: {
    user?: {
      name?: unknown;
      email?: unknown;
      mobile?: unknown;
    };
  };
};

export type AuthResult = {
  user: AuthUser;
  token: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export async function validateAuthSession(
  token: string,
  signal: AbortSignal,
): Promise<AuthUser | null> {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal,
  });

  if (response.status === 401) return null;
  if (!response.ok) {
    throw new Error("Unable to validate your session. Please try again.");
  }

  const payload = (await response.json()) as CurrentUserResponse;
  const apiUser = payload.data?.user;
  if (
    !payload.success ||
    typeof apiUser?.name !== "string" ||
    typeof apiUser.email !== "string"
  ) {
    throw new Error("The server returned an invalid session response.");
  }

  return {
    name: apiUser.name,
    email: apiUser.email,
    ...(typeof apiUser.mobile === "string" ? { mobile: apiUser.mobile } : {}),
  };
}

async function submitAuthRequest(
  endpoint: "login" | "register/verify-otp",
  values: Record<string, string>,
): Promise<AuthResult> {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/auth/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const payload = (await response.json()) as AuthResponse;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Authentication failed. Please try again.");
  }

  const apiUser = payload.data?.user;
  const token = payload.data?.token;
  if (
    typeof apiUser?.name !== "string" ||
    typeof apiUser.email !== "string" ||
    typeof token !== "string"
  ) {
    throw new Error("The server returned an invalid authentication response.");
  }

  return {
    user: {
      name: apiUser.name,
      email: apiUser.email,
      ...(typeof apiUser.mobile === "string" ? { mobile: apiUser.mobile } : {}),
    },
    token,
  };
}

export function loginWithPassword(email: string, password: string) {
  return submitAuthRequest("login", { email, password });
}

export function verifyRegistrationOtp(values: {
  email: string;
  otp: string;
}) {
  return submitAuthRequest("register/verify-otp", values);
}

export async function requestRegistrationOtp(values: {
  name: string;
  mobile: string;
  email: string;
  password: string;
}) {
  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/auth/register/request-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );
  const payload = (await response.json()) as AuthResponse;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Unable to send a verification code.");
  }
}
