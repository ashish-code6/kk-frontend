"use client";

import { useState } from "react";
import Link from "next/link";
import MobileBottomNav from "@/features/home/components/mobile-bottom-nav";

export default function PujaListPage() {
  const [sent, setSent] = useState(false);
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
          <Link href="/products">Products</Link>
          <Link className="current" href="/puja-list">
            Puja List
          </Link>
          <Link href="/about">About Us</Link>
        </nav>
      </header>
      <section className="list-page-body">
        <div className="list-page-copy">
          <p className="eyebrow">YOUR RITUAL, YOUR WAY</p>
          <h1>
            Plan your puja
            <br />
            with peace of mind.
          </h1>
          <p>
            Share what you need for your upcoming puja. We’ll help you put
            together a custom list and quotation.
          </p>
          <ul>
            <li>Tell us the occasion and date</li>
            <li>Add the items you already know</li>
            <li>Get a tailored list from our team</li>
          </ul>
        </div>
        <form
          className="puja-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <h2>Request a Puja List</h2>
          <label>
            Your name
            <input required placeholder="Enter your name" />
          </label>
          <label>
            Email or phone
            <input required placeholder="How can we reach you?" />
          </label>
          <label>
            Occasion
            <input
              required
              placeholder="e.g. Griha Pravesh, Satyanarayan Puja"
            />
          </label>
          <label>
            Tell us what you need
            <textarea rows={4} placeholder="Any items or details to include?" />
          </label>
          <button className="content-button" type="submit">
            Send Request <span>→</span>
          </button>
          {sent && (
            <p className="form-success" role="status">
              Thank you. Your request is ready for our team.
            </p>
          )}
          <small className="form-note">
            This demo form does not send data to a server yet.
          </small>
        </form>
      </section>
      <footer className="content-footer">
        <span>© 2025 KALASH & KUMKUM. All rights reserved.</span>
        <Link href="/">Back to Home ↑</Link>
      </footer>
      <MobileBottomNav currentPath="/puja-list" />
    </main>
  );
}
