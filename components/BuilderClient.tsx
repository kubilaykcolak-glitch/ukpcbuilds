"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Gamepad2, Briefcase, Video, Zap,
  CheckCircle2, AlertTriangle, ExternalLink,
  ChevronRight, Send, SlidersHorizontal,
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
  if (budget <= 670)  return "entry";
  if (budget <= 1100) return "budget";
  if (budget <= 1600) return "mid";
  if (budget <= 2800) return "high";
  return "enthusiast";
}

function clamp(v: number) {
  return Math.min(MAX, Math.max(MIN, v));
}

function snapTo50(v: number) {
  return Math.round(v / 50) * 50;
}

function parseBudget(raw: string | null): number {
  if (!raw) return 700;
  const v = snapTo50(clamp(Number(raw)));
  return isNaN(v) ? 700 : v;
}

function parseUseCase(raw: string | null): UseCaseKey {
  if (raw && ["gaming", "office", "creation", "performance"].includes(raw)) {
    return raw as UseCaseKey;
  }
  return "gaming";
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BuilderClient() {
  const searchParams = useSearchParams();

  // ── Initialise state directly from URL params — no flash, no delay ──────────
  const [budget, setBudget] = useState(() => parseBudget(searchParams.get("budget")));
  const [budgetStr, setBudgetStr] = useState(() =>
    String(parseBudget(searchParams.get("budget")))
  );
  const [useCase, setUseCase] = useState<UseCaseKey>(() =>
    parseUseCase(searchParams.get("use"))
  );
  const [tier, setTier] = useState<TierKey>(() =>
    getTier(parseBudget(searchParams.get("budget")))
  );
  const [email, setEmail]       = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(true);

  const resultsRef = useRef<HTMLDivElement>(null);

  // ── Live build — recomputes whenever tier or useCase changes ────────────────
  const currentBuild: UseCaseData | null =
    BUILDS[tier]?.useCases?.[useCase] ?? null;

  // ── Auto-scroll to results when arriving from the homepage ──────────────────
  useEffect(() => {
    const hasParams = searchParams.get("budget") || searchParams.get("use");
    if (hasParams) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.includes("@")) setSubscribed(true);
  }

  const sliderPct = ((budget - MIN) / (MAX - MIN)) * 100;
  const tierMeta  = TIER_META[tier];
  const ucMeta    = USE_CASES.find((u) => u.id === useCase)!;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">

      {/* ══════════════════════════════════════════════════════
          RESULTS (always visible — updates live)
      ══════════════════════════════════════════════════════ */}
      {currentBuild && (
        <div ref={resultsRef} className="flex flex-col gap-6 scroll-mt-20">

          {/* Build header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full", tierMeta.pill)}>
                  {tierMeta.label} Build
                </span>
                <span className="text-[#94A3B8] text-sm">·</span>
                <span className="text-[#94A3B8] text-sm">{ucMeta.label}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Best build for your{" "}
                <span className="text-[#2563EB]">£{budget.toLocaleString("en-GB")}</span>{" "}
                budget
              </h1>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-extrabold text-[#2563EB]">
                £{currentBuild.total.toLocaleString("en-GB")}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                build cost · within your budget
              </p>
            </div>
          </div>

          {/* ── Parts table ─────────────────────────────────────────── */}
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
                  {currentBuild.parts.map((part, i) => (
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
                        {part.affiliateUrl !== "#" ? (
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
                          <span className="text-xs text-[#475569]">{part.retailer}</span>
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
                      £{currentBuild.total.toLocaleString("en-GB")}
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

          {/* ── Performance card ──────────────────────────────────────── */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">
              What this build can handle
            </h3>

            <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/25 text-blue-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span aria-hidden>🖥️</span>
              {currentBuild.performance.resolution}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Good for</p>
                <ul className="flex flex-col gap-2.5">
                  {currentBuild.performance.goodFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden />
                      <span className="text-[#94A3B8]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Struggles with</p>
                <ul className="flex flex-col gap-2.5">
                  {currentBuild.performance.struggles.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" aria-hidden />
                      <span className="text-[#94A3B8]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-[#334155] pt-4 flex items-start gap-2.5">
              <span className="text-base" aria-hidden>💡</span>
              <p className="text-sm text-[#64748B] italic leading-relaxed">
                {currentBuild.performance.upgradeNote}
              </p>
            </div>
          </div>

          {/* ── Tweak your build ─────────────────────────────────────── */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden">
            <button
              onClick={() => setControlsOpen((o) => !o)}
              className="w-full flex items-center justify-between gap-3 px-6 py-5 text-left hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" aria-hidden />
                <span className="font-semibold text-white">Adjust your build</span>
              </div>
              <span className="text-[#94A3B8] text-sm">{controlsOpen ? "▲" : "▼"}</span>
            </button>

            {controlsOpen && (
              <div className="border-t border-[#1E293B] px-6 pb-6 pt-5 flex flex-col gap-6">

                {/* Budget slider */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-sm font-medium text-[#94A3B8]">Budget</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-bold text-xl">£</span>
                      <input
                        type="number"
                        min={MIN}
                        max={MAX}
                        step={50}
                        value={budgetStr}
                        onChange={onNumberChange}
                        onBlur={onNumberBlur}
                        aria-label="Budget in pounds"
                        className="w-24 bg-[#0F172A] border border-[#334155] focus:border-[#2563EB] text-white font-bold text-xl text-right rounded-xl px-3 py-1.5 focus:outline-none transition-colors tabular-nums"
                      />
                    </div>
                  </div>

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
                  <div className="flex justify-between text-xs text-[#94A3B8] mb-2">
                    <span>£300</span>
                    <span>£1,000</span>
                    <span>£2,000</span>
                    <span>£3,000</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-[#64748B]">Tier:</span>
                    <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full", tierMeta.pill)}>
                      {tierMeta.label}
                    </span>
                  </div>
                </div>

                {/* Use-case selector */}
                <div>
                  <p className="text-sm font-medium text-[#94A3B8] mb-3">Use case</p>
                  <div className="grid grid-cols-2 gap-2">
                    {USE_CASES.map(({ id, label, desc, Icon }) => {
                      const active = useCase === id;
                      return (
                        <button
                          key={id}
                          onClick={() => setUseCase(id)}
                          aria-pressed={active}
                          className={clsx(
                            "flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all duration-150",
                            active
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-[#334155] bg-[#0F172A]/40 hover:border-[#475569]"
                          )}
                        >
                          <div className={clsx(
                            "flex items-center justify-center w-9 h-9 rounded-lg shrink-0",
                            active ? "bg-blue-500/20" : "bg-[#1E293B]"
                          )}>
                            <Icon className={clsx("w-4 h-4", active ? "text-blue-400" : "text-[#94A3B8]")} aria-hidden />
                          </div>
                          <div className="mt-0.5">
                            <p className={clsx("font-semibold text-xs", active ? "text-white" : "text-[#CBD5E1]")}>
                              {label}
                            </p>
                            <p className="text-xs text-[#64748B] mt-0.5 leading-tight">{desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
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
