"use client";

import { useState } from "react";
import {
  HeadphonesIcon,
  BellRing,
  ClipboardList,
  ShoppingBag,
  Archive,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ── Feature cards ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: HeadphonesIcon,
    title: "Expert help desk",
    body: "Post your build or upgrade question and get a real answer from experienced builders — usually within the hour.",
  },
  {
    icon: BellRing,
    title: "Automated deal alerts",
    body: "New deals posted automatically every day. Be first to know when prices drop on GPUs, CPUs, and storage.",
  },
  {
    icon: ClipboardList,
    title: "Build reviews",
    body: "Share your planned parts list and get honest feedback before you spend a penny.",
  },
  {
    icon: ShoppingBag,
    title: "Group buys",
    body: "Community discount codes on popular parts, negotiated directly with UK retailers on your behalf.",
  },
  {
    icon: Archive,
    title: "Monthly builds archive",
    body: "Every recommended build going back two years — so you can track how prices and part recommendations have changed.",
  },
] as const;

// ── What's included list ──────────────────────────────────────────────────────

const perks = [
  "Full Discord community access",
  "Expert help desk",
  "Daily deal alerts",
  "Build reviews & feedback",
  "Group buys & community discount codes",
  "Monthly builds archive",
  "Priority help from experienced builders",
] as const;

// ── FAQ accordion ─────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes — cancel in Whop with one click. No emails, no hoops, no questions asked.",
  },
  {
    q: "Is there a free trial?",
    a: "Your first month is risk-free. If you're not happy, email us and we'll refund it — no questions asked.",
  },
  {
    q: "How active is the community?",
    a: "Deal alerts are posted daily. The help desk typically gets a response within an hour during the day. Group buys are organised monthly.",
  },
] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#334155] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-white font-medium hover:bg-white/[0.03] transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        {open
          ? <ChevronUp  className="w-4 h-4 text-[#94A3B8] shrink-0" aria-hidden />
          : <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0" aria-hidden />
        }
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B] pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DiscordPage() {
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight text-balance max-w-3xl">
            The UK PC Builder{" "}
            <span className="text-[#2563EB]">Community</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#94A3B8] max-w-xl text-balance">
            Expert help, daily deal alerts, build reviews, and group buys. Everything in one place for £5/month.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-500 transition-colors text-white font-semibold px-10 py-4 rounded-xl shadow-[0_0_24px_rgba(37,99,235,0.35)] text-lg mt-2"
          >
            Join the community — £5/mo
          </a>
        </div>
      </section>

      {/* ══ WHAT'S INSIDE ═════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">What&apos;s inside</h2>
          <p className="mt-2 text-[#94A3B8]">Everything you get as a member</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 shrink-0">
                <Icon className="w-5 h-5 text-[#2563EB]" aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PRICING CARD ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Simple pricing</h2>
          <p className="mt-2 text-[#94A3B8]">One plan. Everything included.</p>
        </div>

        <div className="max-w-md mx-auto bg-[#1E293B] border border-[#2563EB] rounded-2xl p-8 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest mb-2">Builder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-white">£5</span>
              <span className="text-[#94A3B8] text-lg">/month</span>
            </div>
            <p className="text-sm text-[#64748B] mt-2">Cancel anytime. First month risk-free.</p>
          </div>

          <ul className="flex flex-col gap-3 mb-8">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" aria-hidden />
                <span className="text-[#94A3B8]">{perk}</span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="block text-center bg-[#2563EB] hover:bg-blue-500 transition-colors text-white font-bold text-base px-6 py-3.5 rounded-xl"
          >
            Join now — £5/mo
          </a>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">FAQ</h2>
        </div>
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>
    </div>
  );
}
