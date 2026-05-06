"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Gamepad2, Briefcase, Video, Zap,
  CheckCircle2, AlertTriangle, ExternalLink,
  ChevronRight, Send,
} from "lucide-react";
import clsx from "clsx";
import buildsData from "@/data/builds.json";

// ── Types ─────────────────────────────────────────────────────────────────────

type TierKey    = "entry" | "budget" | "mid" | "high" | "enthusiast";
type UseCaseKey = "gaming" | "office" | "creation" | "performance";

interface Part {
  type: string;
  name: string;
  price: number;
  retailer: string;
  affiliateUrl: string;
  why: string;
}

interface UseCaseData {
  parts: Part[];
  total: number;
  performance: {
    resolution: string;
    goodFor: string[];
    struggles: string[];
    upgradeNote: string;
  };
}

type Builds = Record<TierKey, {
  label: string;
  priceRange: [number, number];
  useCases: Record<UseCaseKey, UseCaseData>;
}>;

// ── Constants ─────────────────────────────────────────────────────────────────

const BUILDS = buildsData as unknown as Builds;

const MIN = 300;
const MAX = 3000;

const TIER_META: Record<TierKey, { label: string; pill: string }> = {
  entry:      { label: "Entry",      pill: "bg-slate-700/80 text-slate-200 border border-slate-600" },
  budget:     { label: "Budget",     pill: "bg-emerald-900/50 text-emerald-300 border border-emerald-800/60" },
  mid:        { label: "Mid-Range",  pill: "bg-blue-900/50 text-blue-300 border border-blue-800/60" },
  high:       { label: "High-End",   pill: "bg-purple-900/50 text-purple-300 border border-purple-800/60" },
  enthusiast: { label: "Enthusiast", pill: "bg-amber-900/50 text-amber-300 border border-amber-800/60" },
};

const USE_CASES: {
  id: UseCaseKey;
  label: string;
  desc: string;
  Icon: React.ElementType;
}[] = [
  { id: "gaming",      label: "Gaming",             desc: "1080p to 4K gaming",         Icon: Gamepad2  },
  { id: "office",      label: "Office / Work",       desc: "Productivity & multitasking", Icon: Briefcase },
  { id: "creation",    label: "Content Creation",    desc: "Video editing & design",      Icon: Video     },
  { id: "performance", label: "Maximum Performance", desc: "Raw speed & low latency",     Icon: Zap       },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getTier(budget: number): TierKey {
  if (budget <= 450)  return "entry";
  if (budget <= 700)  return "budget";
  if (budget <= 1100) return "mid";
  if (budget <= 1800) return "high";
  return "enthusiast";
}

function clamp(v: number) {
  return Math.min(MAX, Math.max(MIN, v));
}

function snapTo50(v: number) {
  return Math.round(v / 50) * 50;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BuilderClient() {
  const searchParams = useSearchParams();

  const [budget,     setBudget]     = useState(700);
  const [budgetStr,  setBudgetStr]  = useState("700");
  const [useCase,    setUseCase]    = useState<UseCaseKey>("gaming");
  const [results,    setResults]    = useState<UseCaseData | null>(null);
  const [tier,       setTier]       = useState<TierKey>("budget");
  const [email,      setEmail]      = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Hydrate from URL params (?budget=700&use=gaming)
  useEffect(() => {
    const rawB = searchParams.get("budget");
    const rawU = searchParams.get("use");

    if (rawB) {
      const v = snapTo50(clamp(Number(rawB)));
      if (!isNaN(v)) {
        setBudget(v);
        setBudgetStr(String(v));
        setTier(getTier(v));
      }
    }
    if (rawU && ["gaming", "office", "creation", "performance"].includes(rawU)) {
      setUseCase(rawU as UseCaseKey);
    }
  }, [searchParams]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  function onRangeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value);
    setBudget(v);
    setBudgetStr(String(v));
    setTier(getTier(v));
  }

  function onNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBudgetStr(e.target.value);
    const v = Number(e.target.value);
    if (!isNaN(v) && e.target.value.trim() !== "") {
      const clamped = clamp(v);
      setBudget(clamped);
      setTier(getTier(clamped));
    }
  }

  function onNumberBlur() {
    const v = snapTo50(clamp(Number(budgetStr) || MIN));
    setBudget(v);
    setBudgetStr(String(v));
    setTier(getTier(v));
  }

  function onFindBuild() {
    const data = BUILDS[tier]?.useCases?.[useCase];
    if (!data) return;
    setResults(data);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.includes("@")) setSubscribed(true);
  }

  const sliderPct = ((budget - MIN) / (MAX - MIN)) * 100;
  const tierMeta  = TIER_META[tier];
  const ucMeta    = USE_CASES.find((u) => u.id === useCase)!;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">

      {/* Page title */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Build My PC
        </h1>
        <p className="mt-2 text-[#94A3B8]">
          Set your budget, pick your use case, and get an instant UK parts list.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════
          INPUTS
      ══════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-6">

        {/* 1 — Budget control */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 sm:p-8">
          <h2 className="text-base font-semibold text-[#94A3B8] uppercase tracking-wider mb-5">
            1. Set your budget
          </h2>

          {/* Label + editable number */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-[#94A3B8] text-sm">Your budget:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-2xl">£</span>
              <input
                type="number"
                min={MIN}
                max={MAX}
                step={50}
                value={budgetStr}
                onChange={onNumberChange}
                onBlur={onNumberBlur}
                aria-label="Budget in pounds"
                className="w-28 bg-[#0F172A] border border-[#334155] focus:border-[#2563EB] text-white font-bold text-2xl text-right rounded-xl px-3 py-1.5 focus:outline-none transition-colors tabular-nums"
              />
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={50}
            value={budget}
            onChange={onRangeChange}
            aria-label="Budget slider"
            className="hero-slider w-full h-2 rounded-full appearance-none cursor-pointer mb-3"
            style={{
              background: `linear-gradient(to right, #2563EB ${sliderPct}%, #1E293B ${sliderPct}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-[#94A3B8] mb-5">
            <span>£300</span>
            <span>£1,000</span>
            <span>£2,000</span>
            <span>£3,000</span>
          </div>

          {/* Tier badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B]">Build tier:</span>
            <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full", tierMeta.pill)}>
              {tierMeta.label}
            </span>
          </div>
        </div>

        {/* 2 — Use case selector */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 sm:p-8">
          <h2 className="text-base font-semibold text-[#94A3B8] uppercase tracking-wider mb-5">
            2. Choose your use case
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {USE_CASES.map(({ id, label, desc, Icon }) => {
              const active = useCase === id;
              return (
                <button
                  key={id}
                  onClick={() => setUseCase(id)}
                  aria-pressed={active}
                  className={clsx(
                    "flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150",
                    active
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_16px_rgba(59,130,246,0.15)]"
                      : "border-[#334155] bg-[#0F172A]/40 hover:border-[#475569] hover:bg-[#0F172A]/70"
                  )}
                >
                  <div className={clsx(
                    "flex items-center justify-center w-11 h-11 rounded-xl shrink-0",
                    active ? "bg-blue-500/20" : "bg-[#1E293B]"
                  )}>
                    <Icon className={clsx("w-5 h-5", active ? "text-blue-400" : "text-[#94A3B8]")} aria-hidden />
                  </div>
                  <div className="mt-0.5">
                    <p className={clsx("font-semibold text-sm", active ? "text-white" : "text-[#CBD5E1]")}>
                      {label}
                    </p>
                    <p className="text-xs text-[#64748B] mt-0.5">{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onFindBuild}
          className="w-full bg-[#2563EB] hover:bg-blue-500 active:scale-[0.99] transition-all text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_24px_rgba(37,99,235,0.35)] hover:shadow-[0_0_36px_rgba(37,99,235,0.5)]"
        >
          Find my build →
        </button>
      </div>

      {/* ══════════════════════════════════════════════════
          RESULTS
      ══════════════════════════════════════════════════ */}
      {results && (
        <div ref={resultsRef} className="flex flex-col gap-6 scroll-mt-24">

          {/* Divider */}
          <div className="border-t border-[#1E293B] pt-4" />

          {/* Build header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full", tierMeta.pill)}>
                {tierMeta.label} Build
              </span>
              <span className="text-[#94A3B8] text-sm">·</span>
              <span className="text-[#94A3B8] text-sm">{ucMeta.label}</span>
            </div>
            <p className="text-2xl font-extrabold text-white">
              Total:{" "}
              <span className="text-[#2563EB]">£{results.total.toLocaleString("en-GB")}</span>
            </p>
          </div>

          {/* ── Parts table ──────────────────────────────────────────── */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="border-b border-[#334155]">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider w-28">Component</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Part</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider w-24">Price</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider w-32">Buy</th>
                  </tr>
                </thead>
                <tbody>
                  {results.parts.map((part, i) => (
                    <tr
                      key={`${part.type}-${i}`}
                      className="border-b border-[#0F172A] last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4 text-[#94A3B8] font-medium whitespace-nowrap align-top">
                        {part.type}
                      </td>
                      <td className="px-5 py-4 align-top">
                        <p className="text-white font-medium leading-snug">{part.name}</p>
                        <p className="text-xs text-[#64748B] mt-1 leading-relaxed max-w-md">{part.why}</p>
                      </td>
                      <td className="px-5 py-4 text-right font-semibold tabular-nums align-top whitespace-nowrap">
                        {part.price === 0
                          ? <span className="text-[#94A3B8] text-xs font-normal">Included</span>
                          : <span className="text-white">£{part.price}</span>
                        }
                      </td>
                      <td className="px-5 py-4 text-right align-top">
                        {part.affiliateUrl !== "#" || part.price > 0 ? (
                          <a
                            href={part.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-blue-500 transition-colors text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap"
                          >
                            {part.retailer}
                            <ExternalLink className="w-3 h-3" aria-hidden />
                          </a>
                        ) : (
                          <span className="text-xs text-[#64748B]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {/* Total row */}
                  <tr className="bg-[#0F172A]/60 border-t-2 border-[#334155]">
                    <td colSpan={2} className="px-5 py-4 text-white font-bold text-base">
                      Total
                    </td>
                    <td className="px-5 py-4 text-right text-[#2563EB] font-extrabold text-base tabular-nums">
                      £{results.total.toLocaleString("en-GB")}
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PCPartPicker footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#334155] bg-[#0F172A]/30">
              <a
                href="https://uk.pcpartpicker.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors"
              >
                <ExternalLink className="w-3 h-3" aria-hidden />
                Check compatibility on PCPartPicker UK
              </a>
            </div>
          </div>

          {/* ── Performance card ─────────────────────────────────────── */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">
              What this build can handle
            </h3>

            {/* Resolution pill */}
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/25 text-blue-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span aria-hidden>🖥️</span>
              {results.performance.resolution}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Good for */}
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                  Good for
                </p>
                <ul className="flex flex-col gap-2.5">
                  {results.performance.goodFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden />
                      <span className="text-[#94A3B8]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Struggles */}
              <div>
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                  Struggles with
                </p>
                <ul className="flex flex-col gap-2.5">
                  {results.performance.struggles.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" aria-hidden />
                      <span className="text-[#94A3B8]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Upgrade note */}
            <div className="border-t border-[#334155] pt-4 flex items-start gap-2.5">
              <span className="text-base" aria-hidden>💡</span>
              <p className="text-sm text-[#64748B] italic leading-relaxed">
                {results.performance.upgradeNote}
              </p>
            </div>
          </div>

          {/* ── Newsletter capture ────────────────────────────────────── */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-1">
              Get this build updated monthly — free
            </h3>
            <p className="text-sm text-[#94A3B8] mb-5">
              We&apos;ll email you when prices drop or better parts launch in your budget range.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-5 h-5" aria-hidden />
                You&apos;re subscribed — we&apos;ll be in touch next month.
              </div>
            ) : (
              <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="builder-email" className="sr-only">Email address</label>
                <input
                  id="builder-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 bg-[#0F172A] border border-[#334155] focus:border-[#2563EB] text-white placeholder-[#64748B] text-sm rounded-lg px-4 py-2.5 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-500 transition-colors text-white font-semibold text-sm px-6 py-2.5 rounded-lg whitespace-nowrap"
                >
                  <Send className="w-4 h-4" aria-hidden />
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* ── Discord CTA ───────────────────────────────────────────── */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-1">
              Want expert help or weekly deal alerts?
            </h3>
            <p className="text-sm text-[#94A3B8] mb-5">
              Join our Discord for build reviews, group buys, and real-time advice from the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="flex items-center justify-center gap-2 border border-[#334155] hover:border-[#2563EB] bg-[#0F172A] hover:bg-[#0F172A]/80 transition-colors text-white font-semibold text-sm px-6 py-3 rounded-xl"
              >
                Builder
                <span className="text-[#94A3B8] font-normal">£5/mo</span>
                <ChevronRight className="w-4 h-4 text-[#2563EB]" aria-hidden />
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-500 transition-colors text-white font-semibold text-sm px-6 py-3 rounded-xl"
              >
                Pro
                <span className="text-blue-200 font-normal">£12/mo</span>
                <ChevronRight className="w-4 h-4" aria-hidden />
              </a>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
