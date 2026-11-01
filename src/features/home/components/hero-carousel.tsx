"use client";

import { useEffect, useState } from "react";
import type {
  HomeBanner,
  HomeBannerResponse,
} from "@/features/home/types/home-banner";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const fallbackBanners: HomeBanner[] = [
  {
    slot: 1,
    eyebrow: "TRADITION MEETS CONVENIENCE",
    title: "Puja Samagri for your Sacred Moments",
    subtitle:
      "Authentic puja products | Custom puja lists | Pure & Trusted",
    caption: "A little devotion, delivered with love.",
    ctaLabel: "Shop now",
    ctaHref: "#products",
    imageUrl:
      "https://images.unsplash.com/photo-1604608672516-6e2b7c5d07e5?auto=format&fit=crop&w=1400&q=90",
    isActive: true,
  },
  {
    slot: 2,
    eyebrow: "CELEBRATE EVERY SACRED MOMENT",
    title: "Bring home the blessings of tradition",
    subtitle:
      "Thoughtfully chosen essentials for your daily prayers and celebrations.",
    caption: "Make every ritual a cherished memory.",
    ctaLabel: "Explore products",
    ctaHref: "#products",
    imageUrl:
      "https://images.unsplash.com/photo-1604608672516-6e2b7c5d07e5?auto=format&fit=crop&w=1400&q=90",
    isActive: true,
  },
];

type HeroCarouselProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export default function HeroCarousel({
  query,
  onQueryChange,
}: HeroCarouselProps) {
  const [banners, setBanners] = useState(fallbackBanners);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBanner = banners[activeIndex] ?? fallbackBanners[0];

  useEffect(() => {
    const controller = new AbortController();
    async function loadBanners() {
      try {
        const response = await fetch(`${API_BASE_URL}/banners`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const payload = (await response.json()) as HomeBannerResponse;
        if (!response.ok || !payload.success || !Array.isArray(payload.data)) {
          throw new Error(payload.message || "Unable to load homepage banners.");
        }
        const activeBanners = payload.data.filter(
          (banner) =>
            banner.isActive &&
            typeof banner.imageUrl === "string" &&
            typeof banner.title === "string",
        );
        if (activeBanners.length > 0) setBanners(activeBanners);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Could not load homepage banners.", error);
      }
    }

    void loadBanners();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (banners.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % banners.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, banners.length - 1));
  }, [banners.length]);

  function showSlide(index: number) {
    setActiveIndex((index + banners.length) % banners.length);
  }

  return (
    <section className="hero" aria-label="Featured store banners">
      <div className="hero-banner-stage">
        <a
          className="hero-art"
          href={activeBanner.ctaHref}
          aria-label={`${activeBanner.ctaLabel}: ${activeBanner.title}`}
        >
          <img
            className="hero-banner-image"
            src={activeBanner.imageUrl}
            alt={`${activeBanner.title}. ${activeBanner.subtitle}`}
            fetchPriority={activeIndex === 0 ? "high" : "auto"}
            onError={(event) => {
              const image = event.currentTarget;
              if (image.src !== fallbackBanners[activeIndex]?.imageUrl) {
                image.src =
                  fallbackBanners[activeIndex]?.imageUrl ??
                  fallbackBanners[0].imageUrl;
              }
            }}
          />
        </a>
        {banners.length > 1 && (
          <div className="hero-carousel-controls" aria-label="Banner slides">
            <button
              type="button"
              className="hero-carousel-arrow"
              aria-label="Previous banner"
              onClick={() => showSlide(activeIndex - 1)}
            >
              ‹
            </button>
            {banners.map((banner, index) => (
              <button
                type="button"
                key={banner.slot}
                className={
                  index === activeIndex
                    ? "hero-carousel-dot active"
                    : "hero-carousel-dot"
                }
                aria-label={`Show banner ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => showSlide(index)}
              />
            ))}
            <button
              type="button"
              className="hero-carousel-arrow"
              aria-label="Next banner"
              onClick={() => showSlide(activeIndex + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>
      <div className="hero-copy">
        <form
          className="hero-search"
          onSubmit={(event) => {
            event.preventDefault();
            document
              .querySelector("#products")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>
          <input
            aria-label="Search products"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search for puja items, kits or categories..."
          />
          <button type="submit">Search</button>
        </form>
        <a className="hero-cta" href={activeBanner.ctaHref}>
          {activeBanner.ctaLabel} <span aria-hidden="true">→</span>
        </a>
        <div className="trust-row">
          <div>
            <span className="trust-icon">♧</span>
            <span>Pure &amp;<br />Authentic</span>
          </div>
          <div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M2 6h12v11H2zM14 10h4l4 4v3h-8z" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="18" cy="19" r="2" />
            </svg>
            <span>Pan India<br />Delivery</span>
          </div>
          <div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>Secure<br />Payments</span>
          </div>
          <div>
            <span className="trust-icon">♧</span>
            <span>Trusted<br />Since 2010</span>
          </div>
        </div>
      </div>
    </section>
  );
}
