"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { categories } from "@/features/home/data/home-data";
import { StoreLogo } from "./store-header";

export default function StoreFooter() {
  const [subscribed, setSubscribed] = useState(false);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer id="footer" className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <StoreLogo />
          <p>
            Bringing devotion closer to home,
            <br />
            one sacred moment at a time.
          </p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/puja-kits">Puja Kits</Link>
          <Link href="/puja-list">Puja List</Link>
          <Link href="/about">About Us</Link>
          <Link href="/#footer">Contact</Link>
        </div>
        <div>
          <h3>Categories</h3>
          {categories.slice(0, 5).map((category) => (
            <Link
              href={
                category.name.trim().toLowerCase() === "puja kits"
                  ? "/puja-kits"
                  : "/products"
              }
              key={category.name}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="social-column">
          <h3>Connect With Us</h3>
          <div className="socials">
            <a href="/#footer" aria-label="Facebook">f</a>
            <a href="/#footer" aria-label="Instagram">◎</a>
            <a href="/#footer" aria-label="YouTube">▶</a>
            <a href="/#footer" aria-label="WhatsApp">◉</a>
          </div>
          <h3 className="subscribe-title">Subscribe for updates &amp; offers</h3>
          <form className="subscribe-form" onSubmit={subscribe}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email for updates"
              disabled={subscribed}
            />
            <button aria-label="Subscribe" disabled={subscribed}>➤</button>
          </form>
          {subscribed && (
            <p className="footer-subscribe-success" role="status">
              Thank you for subscribing!
            </p>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} KALASH &amp; KUMKUM. All rights reserved.</span>
        <span>
          <a href="/#footer">Terms &amp; Conditions</a>
          <i /> <a href="/#footer">Privacy Policy</a>
        </span>
      </div>
    </footer>
  );
}
