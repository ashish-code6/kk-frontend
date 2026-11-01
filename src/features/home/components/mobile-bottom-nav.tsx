"use client";

import { useState } from "react";
import Link from "next/link";

type MobileBottomNavProps = {
  currentPath: "/" | "/products" | "/puja-list" | "/about";
  cartCount?: number;
  onCartClick?: () => void;
};

export default function MobileBottomNav({
  currentPath,
  cartCount = 0,
  onCartClick,
}: MobileBottomNavProps) {
  const [notice, setNotice] = useState("");

  function showCart() {
    if (onCartClick) {
      onCartClick();
      return;
    }

    setNotice(cartCount ? `You have ${cartCount} items in your cart` : "Your cart is empty");
    window.setTimeout(() => setNotice(""), 2200);
  }

  return (
    <>
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link
          href="/"
          className={currentPath === "/" ? "selected" : undefined}
          aria-current={currentPath === "/" ? "page" : undefined}
        >
          <span aria-hidden="true">⌂</span>Home
        </Link>
        <Link
          href="/products"
          className={currentPath === "/products" ? "selected" : undefined}
          aria-current={currentPath === "/products" ? "page" : undefined}
        >
          <span aria-hidden="true">▦</span>Products
        </Link>
        <Link
          href="/puja-list"
          className={currentPath === "/puja-list" ? "selected" : undefined}
          aria-current={currentPath === "/puja-list" ? "page" : undefined}
        >
          <span aria-hidden="true">☷</span>Puja List
        </Link>
        <button type="button" onClick={showCart} aria-label={`Cart, ${cartCount} items`}>
          <span className="bottom-cart" aria-hidden="true">
            ♧<b>{cartCount}</b>
          </span>
          Cart
        </button>
        <Link href="/login">
          <span aria-hidden="true">♙</span>Account
        </Link>
      </nav>
      {notice && (
        <div className="toast" role="status">
          {notice}
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
