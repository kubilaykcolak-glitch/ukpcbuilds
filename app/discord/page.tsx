"use client";

import { useState } from "react";
import {
  HeadphonesIcon,
  BellRing,
  ClipboardList,
  ShoppingBag,
  Archive,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import clsx from "clsx";

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
  {
    icon: Star,
    title: "Priority 1:1 help",
    body: "Pro tier only. Book a 30-minute screen share with a builder to plan your exact setup.",
  },
] as const;

// ── Comparison table ──────────────────────────────────────────────────────────

const tableRows: { label: string; builder: boolean; pro: boolean }[] = [
  { label: "Discord access",       builder: true,  pro: true  },
  { label: "Help desk",            builder: true,  pro: true  },
  { label: "Deal alerts",          builder: true,  pro: true  },
  { label: "Build reviews",        builder: true,  pro: true  },
  { label: "Group buys",           builder: true,  pro: true  },
  { label: "Archive",              builder: true,  pro: true  },
  { label: "Priority help",        builder: false, pro: true  },
  { label: "Monthly 1:1 session",  builder: false, pro: true  },
  { label: "Founding member badge",builder: false, pro: true  },
];

// ── FAQ accordion ─────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes — cancel in Whop with one click. No emails, no hoops, no questions asked.",
  },
  {
    q: "What is Founding Member pricing?",
    a: "The first 50 members lock in £3/mo for life on the Builder tier. Once those spots are gone, the standard price applies.",
  },
  {
    q: "Is there a free trial?",
    a: "Your first month is risk-free. If you're not happy, email us and we'll refund it — no questions asked.",
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
            Expert help. Automated deal alerts. Monthly group buys. From £5/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 border border-[#334155] hover:border-[#2563EB] bg-[#1E293B] hover:bg-[#1E293B]/80 transition-colors text-white font-semibold px-8 py-3.5 rounded-xl"
            >
              Join as Builder — £5/mo
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-500 transition-colors text-white font-semibold px-8 py-3.5 rounded-xl shadow-[0_0_24px_rgba(37,99,235,0.35)]"
            >
              Join as Pro — £12/mo
            </a>
          </div>
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

      {/* ══ COMPARISON TABLE ══════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Compare plans</h2>
          <p className="mt-2 text-[#94A3B8]">Both tiers, side by side</p>
        </div>
        <div className="max-w-2xl mx-auto bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="text-left px-6 py-4 text-[#94A3B8] font-semibold w-1/2" />
                <th className="text-center px-6 py-4 text-white font-bold">
                  Builder<br />
                  <span className="text-[#2563EB] text-lg font-extrabold">£5</span>
                  <span className="text-[#94A3B8] text-xs font-normal">/mo</span>
                </th>
                <th className="text-center px-6 py-4 text-white font-bold">
                  Pro<br />
                  <span className="text-[#2563EB] text-lg font-extrabold">£12</span>
                  <span className="text-[#94A3B8] text-xs font-normal">/mo</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map(({ label, builder, pro }, i) => (
                <tr
                  key={label}
                  className={clsx(
                    i < tableRows.length - 1 && "border-b border-[#0F172A]",
                    "hover:bg-white/[0.02] transition-colors"
                  )}
                >
                  <td className="px-6 py-3.5 text-[#94A3B8]">{label}</td>
                  <td className="px-6 py-3.5 text-center">
                    {builder
                      ? <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" aria-label="Included" />
                      : <span className="text-[#475569] font-bold" aria-label="Not included">—</span>
                    }
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    {pro
                      ? <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" aria-label="Included" />
                      : <span className="text-[#475569] font-bold" aria-label="Not included">—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA below table */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 border border-[#334155] hover:border-[#2563EB] bg-[#1E293B] transition-colors text-white font-semibold px-8 py-3.5 rounded-xl"
          >
            Join Builder — £5/mo
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-500 transition-colors text-white font-semibold px-8 py-3.5 rounded-xl shadow-[0_0_24px_rgba(37,99,235,0.35)]"
          >
            Join Pro — £12/mo
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
