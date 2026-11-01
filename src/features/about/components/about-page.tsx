import Link from "next/link";
import MobileBottomNav from "@/features/home/components/mobile-bottom-nav";
import StoreFooter from "@/features/home/components/store-footer";
import StoreHeader from "@/features/home/components/store-header";

export default function AboutPage() {
  return (
    <main className="content-page">
      <StoreHeader
        currentPath="/about"
        cartCount={0}
      />

      <section className="content-hero about-hero">
        <p className="eyebrow">OUR STORY</p>

        <h1>
          Tradition, cared for
          <br />
          with devotion.
        </h1>

        <p>
          We make it easier for every family to bring the right samagri to
          life’s sacred moments.
        </p>
      </section>

      <section className="about-body">
        <div>
          <p className="eyebrow">|| OM SHANTI ||</p>

          <h2>Faith deserves the finest details.</h2>

          <p>
            KALASH & KUMKUM brings authentic puja essentials together in one thoughtful
            place. From everyday diyas and incense to complete puja kits, each
            item is chosen to help make your rituals feel simple, meaningful,
            and close to home.
          </p>

          <p>
            Our aim is to respect the traditions families cherish while making
            it convenient to find what you need, wherever you are in India.
          </p>

          <Link className="content-button" href="/products">
            Explore our products <span>→</span>
          </Link>
        </div>

        <div className="about-values">
          <article>
            <span>✺</span>
            <h3>Authenticity first</h3>
            <p>Thoughtfully selected essentials for your home and rituals.</p>
          </article>

          <article>
            <span>♡</span>
            <h3>Made convenient</h3>
            <p>Browse, plan your puja list, and shop from one place.</p>
          </article>

          <article>
            <span>☼</span>
            <h3>Rooted in tradition</h3>
            <p>Every detail is guided by care and respect for custom.</p>
          </article>
        </div>
      </section>

      <StoreFooter />
      <MobileBottomNav currentPath="/about" />
    </main>
  );
}
