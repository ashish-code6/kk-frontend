"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MobileBottomNav from "@/features/home/components/mobile-bottom-nav";
import StoreFooter from "@/features/home/components/store-footer";
import StoreHeader from "@/features/home/components/store-header";
import { usePujaKits } from "@/features/puja-kits/hooks/use-puja-kits";
import type { PujaKit } from "@/features/puja-kits/hooks/use-puja-kits";

const kitEssentials = [
  {
    title: "Roli, Kumkum, Haldi & Akshat",
    description: "Daily puja essentials",
    image: "photo-1603006905003-be475563bc59",
  },
  {
    title: "Agarbatti & Kapoor",
    description: "Pure & premium",
    image: "photo-1608571423902-eed4a5ad8108",
  },
  {
    title: "Rui Ki Batti",
    description: "Long lasting",
    image: "photo-1604608672516-6e2b7c5d07e5",
  },
  {
    title: "Phool & Puja Samagri",
    description: "Fresh & auspicious",
    image: "photo-1490750967868-88aa4486c946",
  },
];

const reviews = [
  {
    name: "Priya Sharma",
    city: "Patna",
    quote: "Bahut hi achhi quality hai. Delivery bhi time par mili.",
    image: "photo-1534528741775-53994a69daeb",
  },
  {
    name: "Rahul Kumar",
    city: "Patna",
    quote: "Complete kit ek hi jagah mil gayi. Highly recommended!",
    image: "photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Neha Singh",
    city: "Patna",
    quote: "Puja samagri bahut shuddh aur proper packaging ke saath.",
    image: "photo-1531123897727-8f129e1688ce",
  },
];

function photoUrl(id: string, width: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
}

export default function PujaKitsPage() {
  const [cart, setCart] = useState(0);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedKit, setSelectedKit] = useState<PujaKit | null>(null);
  const [selectedKitImage, setSelectedKitImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlistedKits, setWishlistedKits] = useState<Set<string>>(() => new Set());
  const { kits, isLoading, error, retry } = usePujaKits();
  const visibleKits = useMemo(
    () =>
      kits.filter((kit) =>
        `${kit.name} ${kit.description}`.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [kits, query],
  );

  function openKitDetails(kit: PujaKit) {
    setSelectedKit(kit);
    setSelectedKitImage(kit.imageUrl);
    setQuantity(1);
  }

  function addToCart(name: string, count = 1) {
    setCart((current) => current + count);
    setSelectedKit(null);
    setNotice(`${name}${count > 1 ? ` × ${count}` : ""} added to your cart`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function toggleWishlist(kit: PujaKit) {
    const alreadyWishlisted = wishlistedKits.has(kit.id);
    setWishlistedKits((current) => {
      const next = new Set(current);
      if (alreadyWishlisted) next.delete(kit.id);
      else next.add(kit.id);
      return next;
    });
    setNotice(alreadyWishlisted ? "Removed from your wishlist" : "Added to your wishlist");
    window.setTimeout(() => setNotice(""), 2400);
  }

  return (
    <main className="kit-page">
      <StoreHeader
        currentPath="/puja-kits"
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

      <section className="kit-hero" aria-labelledby="kit-hero-title">
        <div className="kit-hero-copy">
          <p className="kit-eyebrow">EVERYDAY DEVOTION, MADE SIMPLE</p>
          <h1 id="kit-hero-title">
            Complete
            <br />
            Puja Kits
          </h1>
          <p className="kit-hero-subtitle">
            Daily puja ke liye zaroori samagri,
            <br />
            ab ek hi kit mein.
          </p>
          <div className="kit-hero-divider" aria-hidden="true">
            <span />
            ❀
            <span />
          </div>
          <a className="kit-delivery-pill" href="#kits">
            <span aria-hidden="true">♧</span>
            Patna mein 1–2 din mein delivery
          </a>
        </div>
        <div className="kit-hero-art" role="img" aria-label="Puja thali with flowers and traditional essentials" />
        <span className="kit-hero-om" aria-hidden="true">ॐ</span>
        <span className="kit-hero-bell kit-bell-left" aria-hidden="true">♧</span>
        <span className="kit-hero-bell kit-bell-right" aria-hidden="true">♧</span>
      </section>

      <section className="kit-section kit-choices" id="kits" aria-labelledby="kit-choices-title">
        <div className="kit-section-title">
          <span aria-hidden="true">❧</span>
          <h2 id="kit-choices-title">Choose Your Puja Kit</h2>
          <span aria-hidden="true">❧</span>
        </div>
        <p className="kit-section-subtitle">
          Thoughtfully curated essentials for your daily rituals
        </p>
        {isLoading && <p className="kit-load-state" role="status">Loading puja kits…</p>}
        {error && (
          <div className="kit-load-state kit-load-error" role="alert">
            <span>{error}</span>
            <button type="button" onClick={retry}>Try again</button>
          </div>
        )}
        {!isLoading && !error && (
          <div className="kit-card-grid">
            {visibleKits.map((kit) => (
              <article className="kit-product-card" key={kit.id}>
                <div className="kit-product-media">
                  {kit.imageUrl ? (
                    <img src={kit.imageUrl} alt={`${kit.name} puja essentials`} />
                  ) : (
                    <div className="kit-product-placeholder" role="img" aria-label={`${kit.name} image unavailable`}>
                      Image unavailable
                    </div>
                  )}
                  {kit.tag && <span className="kit-product-tag">{kit.tag}</span>}
                </div>
                <div className="kit-product-copy">
                  <h3>{kit.name}</h3>
                  <p className="kit-product-description">{kit.description}</p>
                  <div className="kit-product-card-bottom">
                    <p className="kit-product-price">₹{kit.price}</p>
                    <button type="button" onClick={() => openKitDetails(kit)}>
                      View details <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {!isLoading && !error && visibleKits.length === 0 && (
          <p className="kit-empty-state">No kits match “{query}”. Try another search.</p>
        )}
      </section>

      <section className="kit-details-grid" aria-label="Kit details and benefits">
        <div className="kit-inside-panel">
          <div className="kit-section-title kit-small-title">
            <span aria-hidden="true">❧</span>
            <h2>What’s Inside Your Kit?</h2>
            <span aria-hidden="true">❧</span>
          </div>
          <div className="kit-essentials-grid">
            {kitEssentials.map((item) => (
              <article className="kit-essential" key={item.title}>
                <img src={photoUrl(item.image, 240)} alt="" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="kit-benefits-panel">
          <h2>Why Choose Us?</h2>
          <ul>
            <li><span>✓</span> Premium quality puja samagri</li>
            <li><span>✓</span> Fast delivery (1–2 days)</li>
            <li><span>✓</span> Trusted by devotees</li>
            <li><span>✓</span> Affordable prices</li>
          </ul>
          <span className="kit-prayer-hands" aria-hidden="true">🙏</span>
        </aside>
      </section>

      <section className="kit-upload-banner">
        <div className="kit-upload-art" aria-hidden="true">☷</div>
        <div>
          <h2>Can’t find your puja items?</h2>
          <p>Apni puja list upload karein. We’ll help you build a custom kit.</p>
        </div>
        <Link href="/puja-list">
          <span aria-hidden="true">⇧</span> Upload Puja List <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="kit-reviews" aria-labelledby="kit-reviews-title">
        <div className="kit-section-title">
          <span aria-hidden="true">❧</span>
          <h2 id="kit-reviews-title">What Our Customers Say</h2>
          <span aria-hidden="true">❧</span>
        </div>
        <div className="kit-review-grid">
          {reviews.map((review) => (
            <article className="kit-review-card" key={review.name}>
              <img src={photoUrl(review.image, 120)} alt="" />
              <div>
                <p className="kit-review-stars" aria-label="5 out of 5 stars">★★★★★</p>
                <blockquote>“{review.quote}”</blockquote>
                <p className="kit-review-author">— {review.name}, {review.city}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <StoreFooter />

      <MobileBottomNav
        currentPath="/puja-kits"
        cartCount={cart}
        onCartClick={() =>
          setNotice(
            cart
              ? `You have ${cart} ${cart === 1 ? "item" : "items"} in your cart`
              : "Your cart is empty",
          )
        }
      />

      {selectedKit && (
        <div
          className="kit-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedKit(null);
          }}
        >
          <section
            className="kit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="selected-kit-title"
          >
            <button
              className="kit-modal-close"
              type="button"
              aria-label="Close kit details"
              onClick={() => setSelectedKit(null)}
            >
              ×
            </button>
            <div className="kit-modal-gallery">
              {selectedKitImage ? (
                <img
                  className="kit-modal-main-image"
                  src={selectedKitImage}
                  alt={selectedKit.name}
                />
              ) : (
                <div className="kit-modal-image-placeholder" role="img" aria-label={`${selectedKit.name} image unavailable`}>
                  Image unavailable
                </div>
              )}
              {selectedKit.galleryImages.length > 0 && (
                <div className="kit-modal-thumbnails" aria-label="More kit images">
                  {[selectedKit.imageUrl, ...selectedKit.galleryImages]
                    .filter(Boolean)
                    .map((imageUrl, index) => (
                      <button
                        className={`kit-modal-thumbnail${selectedKitImage === imageUrl ? " is-selected" : ""}`}
                        type="button"
                        key={`${imageUrl}-${index}`}
                        aria-label={`View kit image ${index + 1}`}
                        aria-pressed={selectedKitImage === imageUrl}
                        onClick={() => setSelectedKitImage(imageUrl)}
                      >
                        <img src={imageUrl} alt="" />
                      </button>
                    ))}
                </div>
              )}
            </div>
            <div className="kit-modal-details">
              {selectedKit.tag && (
                <span className="kit-modal-badge">
                  {selectedKit.tag}
                </span>
              )}
              <h2 id="selected-kit-title">{selectedKit.name}</h2>
              <p className="kit-modal-description">{selectedKit.description}</p>
              {selectedKit.rating !== null && (
                <div className="kit-modal-rating" aria-label={`Rated ${selectedKit.rating} out of 5`}>
                  <span aria-hidden="true">★★★★★</span>
                  <strong>{selectedKit.rating.toFixed(1)}</strong>
                  {selectedKit.reviewCount !== null && (
                    <small>({selectedKit.reviewCount.toLocaleString()} reviews)</small>
                  )}
                </div>
              )}
              <div className="kit-modal-pricing">
                <p className="kit-modal-price">₹{selectedKit.price}</p>
                {selectedKit.originalPrice && selectedKit.originalPrice > selectedKit.price && (
                  <>
                    <del>₹{selectedKit.originalPrice}</del>
                    <span className="kit-modal-discount">
                      {Math.round(
                        ((selectedKit.originalPrice - selectedKit.price) /
                          selectedKit.originalPrice) *
                          100,
                      )}% OFF
                    </span>
                  </>
                )}
              </div>
              {selectedKit.deliveryInfo && (
                <p className="kit-modal-delivery">
                  <span aria-hidden="true">🚚</span>
                  {selectedKit.deliveryInfo}
                </p>
              )}
              {selectedKit.includes.trim() && (
                <section className="kit-modal-includes" aria-labelledby="kit-modal-includes-title">
                  <h3 id="kit-modal-includes-title">What’s in this kit?</h3>
                  <ul>
                    {selectedKit.includes
                      .split(/[\n,;]+/)
                      .map((item) => item.trim())
                      .filter(Boolean)
                      .map((item, index) => (
                        <li key={`${item}-${index}`}>
                          {item}
                        </li>
                      ))}
                  </ul>
                </section>
              )}
              <div className="kit-modal-actions">
                <div className="kit-modal-quantity" aria-label="Quantity">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((current) => current + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="kit-modal-add"
                  type="button"
                  onClick={() => addToCart(selectedKit.name, quantity)}
                >
                  Add to Cart · ₹{selectedKit.price * quantity}
                </button>
              </div>
              <button
              className={`kit-modal-wishlist${wishlistedKits.has(selectedKit.id) ? " is-active" : ""}`}
                type="button"
                aria-pressed={wishlistedKits.has(selectedKit.id)}
                onClick={() => toggleWishlist(selectedKit)}
              >
                {wishlistedKits.has(selectedKit.id) ? "♥ Added to Wishlist" : "♡ Add to Wishlist"}
              </button>
            </div>
          </section>
        </div>
      )}

      {notice && (
        <div className="toast" role="status">
          {notice}
          <button type="button" onClick={() => setNotice("")} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
    </main>
  );
}
