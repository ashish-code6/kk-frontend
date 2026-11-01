"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type StorePath = "/" | "/products" | "/puja-kits" | "/puja-list" | "/about";

type StoreHeaderProps = {
  currentPath: StorePath;
  cartCount: number;
  onCartClick?: () => void;
  onAccountClick?: () => void;
  query?: string;
  onQueryChange?: (value: string) => void;
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </svg>
    );
  }
  if (name === "cart") {
    return (
      <svg {...common}>
        <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
        <circle cx="10" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function StoreLogo() {
  return (
    <Link href="/" className="brand" aria-label="KALASH & KUMKUM home">
      <img
        src="/kk-logo-transparent.png"
        alt="KALASH & KUMKUM — Tradition Delivered with Devotion"
      />
    </Link>
  );
}

export default function StoreHeader({
  currentPath,
  cartCount,
  onCartClick,
  onAccountClick,
  query,
  onQueryChange,
}: StoreHeaderProps) {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const [cartNotice, setCartNotice] = useState("");
  const searchValue = query ?? localQuery;

  function updateSearch(value: string) {
    if (onQueryChange) {
      onQueryChange(value);
    } else {
      setLocalQuery(value);
    }
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!onQueryChange && searchValue.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    }
  }

  return (
    <header className="site-header">
      <button
        type="button"
        className="icon-button mobile-menu"
        aria-label={mobileMenu ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenu}
        onClick={() => setMobileMenu((open) => !open)}
      >
        <Icon name="menu" />
      </button>
      <StoreLogo />
      <nav
        className={mobileMenu ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
      >
        {(
          [
            ["/", "Home"],
            ["/products", "Products"],
            ["/puja-kits", "Puja Kits"],
            ["/puja-list", "Puja List"],
            ["/about", "About Us"],
          ] as const
        ).map(([href, label]) => (
          <Link
            href={href}
            key={href}
            className={currentPath === href ? "active" : undefined}
            aria-current={currentPath === href ? "page" : undefined}
            onClick={() => setMobileMenu(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href={currentPath === "/" ? "#footer" : "/#footer"}
          onClick={() => setMobileMenu(false)}
        >
          Contact
        </Link>
      </nav>
      <form className="header-search" onSubmit={submitSearch}>
        <Icon name="search" size={17} />
        <input
          value={searchValue}
          onChange={(event) => updateSearch(event.target.value)}
          placeholder="Search for puja items, kits or categories..."
          aria-label="Search products and puja kits"
        />
      </form>
      <button
        type="button"
        className="icon-button account-button"
        aria-label="Sign in or create an account"
        onClick={() => {
          if (onAccountClick) {
            onAccountClick();
          } else {
            router.push("/login");
          }
        }}
      >
        <Icon name="user" />
      </button>
      <button
        type="button"
        className="icon-button cart-button"
        aria-label={`Cart, ${cartCount} items`}
        onClick={() => {
          if (onCartClick) {
            onCartClick();
          } else {
            setCartNotice(
              cartCount
                ? `You have ${cartCount} ${cartCount === 1 ? "item" : "items"} in your cart`
                : "Your cart is empty",
            );
          }
        }}
      >
        <Icon name="cart" />
        <span className="cart-count">{cartCount}</span>
      </button>
      {cartNotice && (
        <div className="toast" role="status">
          {cartNotice}
          <button
            type="button"
            onClick={() => setCartNotice("")}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
    </header>
  );
}
