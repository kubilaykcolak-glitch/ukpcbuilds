import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Get monthly UK PC build updates, price drop alerts, and the best value parts lists — free to your inbox.",
};

// ── Benefits ──────────────────────────────────────────────────────────────────

const benefits = [
  "The best-value UK PC build for every budget tier, updated every month",
  "Price drop alerts on CPUs, GPUs, and storage from UK retailers",
  "New GPU and CPU launch roundups with honest performance-per-pound analysis",
  "One hand-picked upgrade recommendation based on current market prices",
] as const;

// ── Tier preview cards ────────────────────────────────────────────────────────

const tiers = [
  {
    name: "Free subscriber",
    price: "£0",
    period: "/mo",
    accent: false,
    perks: [
      "Monthly build update email",
      "Price drop highlights",
      "GPU & CPU launch summaries",
    ],
    note: null,
  },
  {
    name: "Builder",
    price: "£5",
    period: "/mo",
    accent: false,
    perks: [
      "Everything in Free",
      "Full Discord community access",
      "Weekly deal alerts",
      "Build reviews",
      "Group buys & discount codes",
    ],
    note: "Discord community",
  },
  {
    name: "Pro",
    price: "£12",
    period: "/mo",
    accent: true,
    perks: [
      "Everything in Builder",
      "Priority help desk",
      "Monthly 1:1 session",
      "Exclusive pre-builds",
      "Founding member badge",
    ],
    note: "Most popular",
  },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NewsletterPage() {
  return (
    <div className="flex flex-col gap-20 pb-24">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -top-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 bg-[#1E293B] border border-[#2563EB]/30 rounded-full px-4 py-1.5 text-xs font-medium text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" aria-hidden="true" />
            Free — no spam — unsubscribe anytime
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight text-balance max-w-3xl">
            Monthly PC Build Updates —{" "}
            <span className="text-[#2563EB]">Free</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#94A3B8] max-w-xl text-balance">
            The best UK PC builds, price alerts, and part recommendations delivered
            to your inbox once a month.
          </p>
        </div>
      </section>

      {/* ══ BENEFITS + EMBED ══════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl mx-auto flex flex-col gap-10">

          {/* What you get */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">What you get every month</h2>
            <ul className="flex flex-col gap-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle2
                    className="w-5 h-5 text-[#2563EB] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[#94A3B8] leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Beehiiv embed */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-2">Subscribe free</h2>
            <p className="text-sm text-[#94A3B8] mb-6">
              Join readers who get the best UK PC builds before anyone else.
            </p>

            {/* Replace this div with your Beehiiv embed code from your dashboard */}
            <div
              id="beehiiv-form"
              className="flex items-center justify-center min-h-[120px] border-2 border-dashed border-[#334155] rounded-xl text-[#475569] text-sm"
            >
              Beehiiv embed goes here — paste your embed code from the Beehiiv dashboard
            </div>
          </div>
        </div>
      </section>

      {/* ══ TIER PREVIEW ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Want even more?
          </h2>
          <p className="mt-2 text-[#94A3B8]">
            Upgrade to Discord for expert help and daily deal alerts
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                tier.accent
                  ? "bg-[#1E293B] border-[#2563EB] shadow-[0_0_32px_rgba(37,99,235,0.2)]"
                  : "bg-[#1E293B] border-[#334155]"
              }`}
            >
              {tier.note && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {tier.note}
                </span>
              )}

              <div className="mb-5">
                <p className="text-sm font-medium text-[#94A3B8]">{tier.name}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-[#94A3B8] text-sm">{tier.period}</span>
                </div>
              </div>

              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-[#94A3B8]">{perk}</span>
                  </li>
                ))}
              </ul>

              {tier.price !== "£0" && (
                <a
                  href="/discord"
                  className={`text-center text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                    tier.accent
                      ? "bg-[#2563EB] hover:bg-blue-500 text-white"
                      : "bg-[#0F172A] hover:bg-[#0F172A]/80 border border-[#334155] text-white"
                  }`}
                >
                  Learn more →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
