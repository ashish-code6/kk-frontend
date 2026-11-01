"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/features/home/data/home-data";
import MobileBottomNav from "@/features/home/components/mobile-bottom-nav";

export default function ProductsPage() {
  const [cart, setCart] = useState(0);
  const [notice, setNotice] = useState("");
  return (
    <main className="content-page">
      <header className="content-header">
        <Link className="content-brand" href="/">
          ॐ{" "}
          <span>
            || KALASH & KUMKUM ||<small>Puja Samagri · Puja Seva · Bhakti</small>
          </span>
        </Link>
        <nav>
          <Link href="/">Home</Link>
          <Link className="current" href="/products">
            Products
          </Link>
          <Link href="/puja-list">Puja List</Link>
          <Link href="/about">About Us</Link>
        </nav>
        <span className="catalog-cart">Cart · {cart}</span>
      </header>
      <section className="catalog-intro">
        <p className="eyebrow">PURE &amp; TRUSTED</p>
        <h1>Shop Puja Essentials</h1>
        <p>
          Everything you need for your sacred moments, brought together with
          care.
        </p>
      </section>
      <section className="catalog-grid">
        {products.map((product) => (
          <article className="catalog-card" key={product.name}>
            <div
              className="catalog-image"
              style={{
                backgroundImage: `url(https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=700&q=85)`,
              }}
            />
            <div className="catalog-info">
              <small>{product.category}</small>
              <h2>{product.name}</h2>
              <p className="price">₹ {product.price}</p>
              <p className="rating">
                <span>★</span> {product.rating}{" "}
                <small>({product.reviews} reviews)</small>
              </p>
              <button
                className="add-button"
                onClick={() => setCart((value) => value + 1)}
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </section>
      <footer className="content-footer">
        <span>© 2025 KALASH & KUMKUM. All rights reserved.</span>
        <Link href="/">Back to Home ↑</Link>
      </footer>
      <MobileBottomNav
        currentPath="/products"
        cartCount={cart}
        onCartClick={() =>
          setNotice(
            cart
              ? `You have ${cart} ${cart === 1 ? "item" : "items"} in your cart`
              : "Your cart is empty",
          )
        }
      />
      {notice && (
        <div className="toast" role="status">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
    </main>
  );
}
