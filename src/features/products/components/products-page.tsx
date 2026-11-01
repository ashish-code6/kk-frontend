"use client";

import { useState } from "react";
import { products } from "@/features/home/data/home-data";
import MobileBottomNav from "@/features/home/components/mobile-bottom-nav";
import StoreFooter from "@/features/home/components/store-footer";
import StoreHeader from "@/features/home/components/store-header";

export default function ProductsPage() {
  const [cart, setCart] = useState(0);
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <main className="content-page">
      <StoreHeader
        currentPath="/products"
        cartCount={cart}
        query={query}
        onQueryChange={setQuery}
        onCartClick={() =>
          setNotice(
            cart
              ? `You have ${cart} ${cart === 1 ? "item" : "items"} in your cart`
              : "Your cart is empty",
          )
        }
      />
      <section className="catalog-intro">
        <p className="eyebrow">PURE &amp; TRUSTED</p>
        <h1>Shop Puja Essentials</h1>
        <p>
          Everything you need for your sacred moments, brought together with
          care.
        </p>
      </section>
      <section className="catalog-grid">
        {visibleProducts.map((product) => (
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
        {visibleProducts.length === 0 && (
          <p className="kit-empty-state">No products match “{query}”. Try another search.</p>
        )}
      </section>
      <StoreFooter />
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
