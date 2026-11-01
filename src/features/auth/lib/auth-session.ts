export type AuthUser = {
  name: string;
  email: string;
  mobile?: string;
};

const SESSION_KEY = "kk-auth-session";

type AuthSession = {
  user: AuthUser;
  token: string;
};

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Record<string, unknown>;
  if (!session.user || typeof session.user !== "object") return false;
  const user = session.user as Record<string, unknown>;
  return (
    typeof session.token === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}

function readAuthSession(): AuthSession | null {
  const value = window.sessionStorage.getItem(SESSION_KEY);
  if (!value) return null;

  try {
    const user: unknown = JSON.parse(value);
    if (isAuthSession(user)) return user;
  } catch {
    window.sessionStorage.removeItem(SESSION_KEY);
  }

  window.sessionStorage.removeItem(SESSION_KEY);
  return null;
}

export function readAuthUser(): AuthUser | null {
  return readAuthSession()?.user ?? null;
}

export function readAuthToken(): string | null {
  return readAuthSession()?.token ?? null;
}

export function saveAuthSession(user: AuthUser, token: string) {
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user, token }));
}

export function clearAuthUser() {
  window.sessionStorage.removeItem(SESSION_KEY);
}
