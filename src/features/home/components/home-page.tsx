"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/features/home/data/home-data";
import CategoryShop from "./category-shop";
import { useHomeCategories } from "@/features/home/hooks/use-home-categories";
import LoginPage from "@/features/auth/components/login-page";
import { readAuthUser, type AuthUser } from "@/features/auth/lib/auth-session";
import HeroCarousel from "./hero-carousel";
import MobileBottomNav from "./mobile-bottom-nav";

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
  if (name === "search")
    return (
      <svg {...common}>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </svg>
    );
  if (name === "cart")
    return (
      <svg {...common}>
        <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
        <circle cx="10" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
      </svg>
    );
  if (name === "user")
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </svg>
    );
  if (name === "menu")
    return (
      <svg {...common}>
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    );
  if (name === "truck")
    return (
      <svg {...common}>
        <path d="M2 6h12v11H2zM14 10h4l4 4v3h-8z" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </svg>
    );
  if (name === "shield")
    return (
      <svg {...common}>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3 4 7v5c0 5 4 8 8 9 4-1 8-4 8-9V7l-8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function Logo() {
  return (
    <a href="#home" className="brand" aria-label="KALASH & KUMKUM home">
      <span className="brand-mark">ॐ</span>
      <span>
        <strong>|| KALASH & KUMKUM ||</strong>
        <small>Puja Samagri · Puja Seva · Bhakti</small>
      </span>
    </a>
  );
}

export default function Storefront() {
  const router = useRouter();
  const storeCategories = useHomeCategories();
  const [cart, setCart] = useState(0);
  const [query, setQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(true);

  useEffect(() => {
    setShowAuthModal(
      new URLSearchParams(window.location.search).get("auth") === "1" ||
        !readAuthUser(),
    );
  }, []);

  function closeAuthModal() {
    setShowAuthModal(false);
    window.history.replaceState(null, "", "/");
  }

  function completeSignIn(_user: AuthUser) {
    const destination = new URLSearchParams(window.location.search).get("next");
    const safeDestination =
      destination?.startsWith("/") && !destination.startsWith("//")
        ? destination
        : "/";

    if (safeDestination !== "/") {
      router.replace(safeDestination);
      return;
    }

    closeAuthModal();
  }
  const visibleProducts = useMemo(
    () =>
      products.filter((product) =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  function addToCart(name: string) {
    setCart((count) => count + 1);
    setNotice(`${name} added to your cart`);
    window.setTimeout(() => setNotice(""), 2200);
  }

  return (
    <main id="home" className="storefront">
      <header className="site-header">
        <button
          className="icon-button mobile-menu"
          aria-label="Open menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <Icon name="menu" />
        </button>
        <Logo />
        <nav
          className={mobileMenu ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <a className="active" href="/" onClick={() => setMobileMenu(false)}>
            Home
          </a>
          <a href="/products" onClick={() => setMobileMenu(false)}>
            Products
          </a>
          <a href="/puja-list" onClick={() => setMobileMenu(false)}>
            Puja List
          </a>
          <a href="/about" onClick={() => setMobileMenu(false)}>
            About Us
          </a>
          <a href="#footer" onClick={() => setMobileMenu(false)}>
            Contact
          </a>
        </nav>
        <label className="header-search">
          <Icon name="search" size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for puja items, kits or categories..."
          />
        </label>
        <button
          type="button"
          className="icon-button account-button"
          aria-label="Sign in or create an account"
          onClick={() => setShowAuthModal(true)}
        >
          <Icon name="user" />
        </button>
        <button
          className="icon-button cart-button"
          aria-label={`Cart, ${cart} items`}
          onClick={() =>
            setNotice(
              cart
                ? `You have ${cart} ${cart === 1 ? "item" : "items"} in your cart`
                : "Your cart is empty",
            )
          }
        >
          <Icon name="cart" />
          <span className="cart-count">{cart}</span>
        </button>
      </header>

      <HeroCarousel query={query} onQueryChange={setQuery} />

      <section
        className="section category-section"
        aria-labelledby="categories-title"
      >
        <div className="section-heading">
          <h2 id="categories-title">Shop by Category</h2>
          <a href="#products">
            View All <span>→</span>
          </a>
        </div>
        <CategoryShop
          categories={storeCategories}
          onSelectCategory={(name) => {
            setQuery(name);
            document
              .querySelector("#products")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </section>

      <section
        id="products"
        className="section products-section"
        aria-labelledby="products-title"
      >
        <div className="section-heading">
          <div>
            <h2 id="products-title">Featured Products</h2>
            {query && (
              <p className="search-results">Showing matches for “{query}”</p>
            )}
          </div>
          <a href="#products" onClick={() => setQuery("")}>
            View All <span>→</span>
          </a>
        </div>
        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.name}>
                <div
                  className="product-image"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=700&q=85)`,
                  }}
                  role="img"
                  aria-label={product.name}
                >
                  {product.tag && (
                    <span className="product-tag">{product.tag}</span>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">₹ {product.price}</p>
                  <p className="rating">
                    <span>★</span> {product.rating}{" "}
                    <small>({product.reviews})</small>
                  </p>
                  <button
                    className="add-button"
                    onClick={() => addToCart(product.name)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-results">
            No products found. Try another search.
          </div>
        )}
      </section>

      <section className="promo-grid">
        <article id="puja-list" className="upload-promo">
          <div className="list-illustration">
            <span>☷</span>
            <b>↑</b>
          </div>
          <div>
            <h2>Apni Puja List Upload Karein</h2>
            <p>
              Aap apni poori puja samagri ki list upload karein ya manually
              humein batayein. Hum aapke liye custom quotation bhejenge.
            </p>
            <div className="promo-actions">
              <button
                onClick={() =>
                  setNotice("Puja list upload will be available soon")
                }
              >
                ↥ &nbsp;Upload Puja List
              </button>
              <a href="#about">⊙ &nbsp;How it works?</a>
            </div>
          </div>
        </article>
        <article className="story-promo">
          <span>
            Har Puja
            <br />
            mein hai ek
            <br />
            Kahani
          </span>
          <p>
            Apni parampara, apni aastha
            <br />— humare saath.
          </p>
          <i>✧ Om Shanti ✧</i>
        </article>
      </section>

      <section id="about" className="service-strip">
        <div>
          <span>
            <Icon name="verified" />
          </span>
          <p>
            <strong>100% Authentic Products</strong>
            <small>Only genuine puja items</small>
          </p>
        </div>
        <div>
          <span>
            <Icon name="shield" />
          </span>
          <p>
            <strong>Safe &amp; Secure Checkout</strong>
            <small>Multiple payment options</small>
          </p>
        </div>
        <div>
          <span>
            <Icon name="truck" />
          </span>
          <p>
            <strong>On-Time Delivery</strong>
            <small>Across India</small>
          </p>
        </div>
        <div>
          <span>♧</span>
          <p>
            <strong>Dedicated Support</strong>
            <small>We are here to help</small>
          </p>
        </div>
      </section>

      <footer id="footer" className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo />
            <p>
              Bringing devotion closer to home,
              <br />
              one sacred moment at a time.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#puja-list">Puja List</a>
            <a href="#about">About Us</a>
            <a href="#footer">Contact</a>
          </div>
          <div>
            <h3>Categories</h3>
            {storeCategories.slice(0, 5).map((item) => (
              <a href="#products" key={item.name}>
                {item.name}
              </a>
            ))}
          </div>
          <div className="social-column">
            <h3>Connect With Us</h3>
            <div className="socials">
              <a href="#footer" aria-label="Facebook">
                f
              </a>
              <a href="#footer" aria-label="Instagram">
                ◎
              </a>
              <a href="#footer" aria-label="YouTube">
                ▶
              </a>
              <a href="#footer" aria-label="WhatsApp">
                ◉
              </a>
            </div>
            <h3 className="subscribe-title">
              Subscribe for updates &amp; offers
            </h3>
            <form
              className="subscribe-form"
              onSubmit={(event) => {
                event.preventDefault();
                setNotice("Thank you for subscribing!");
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email for updates"
              />
              <button aria-label="Subscribe">➤</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 KALASH & KUMKUM. All rights reserved.</span>
          <span>
            <a href="#footer">Terms &amp; Conditions</a>
            <i /> <a href="#footer">Privacy Policy</a>
          </span>
        </div>
      </footer>

      <MobileBottomNav
        currentPath="/"
        cartCount={cart}
        onCartClick={() =>
          setNotice(
            cart
              ? `You have ${cart} items in your cart`
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
      {showAuthModal && (
        <LoginPage
          onClose={closeAuthModal}
          onComplete={completeSignIn}
        />
      )}
    </main>
  );
}
