"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

type UseCase = "gaming" | "office" | "creation" | "performance";

const USE_CASES: { id: UseCase; label: string; icon: string; desc: string }[] = [
  { id: "gaming",      label: "Gaming",      icon: "🎮", desc: "1080p to 4K"         },
  { id: "office",      label: "Office",       icon: "💼", desc: "Work & productivity" },
  { id: "creation",    label: "Creation",     icon: "🎨", desc: "Video & design"      },
  { id: "performance", label: "Performance",  icon: "⚡", desc: "Max speed"           },
];

const MIN = 300;
const MAX = 3000;

export default function HeroBuilder() {
  const [budget, setBudget]   = useState(700);
  const [useCase, setUseCase] = useState<UseCase>("gaming");

  const pct = ((budget - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="flex flex-col gap-7">

      {/* ── Budget ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">

        {/* Label + amount */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">
            Your budget
          </span>
          <span className="text-4xl font-extrabold text-white tabular-nums leading-none">
            £{budget.toLocaleString("en-GB")}
          </span>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={50}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          aria-label="Budget in pounds"
          className="hero-slider w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2563EB ${pct}%, #0F172A ${pct}%)`,
          }}
        />

        {/* Scale markers — evenly spaced */}
        <div className="grid grid-cols-4 text-xs text-[#64748B]">
          <span>£300</span>
          <span className="text-center">£1,000</span>
          <span className="text-center">£2,000</span>
          <span className="text-right">£3,000</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#334155]" />

      {/* ── Use case ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">
          Use case
        </span>

        <div className="grid grid-cols-4 gap-2">
          {USE_CASES.map(({ id, label, icon, desc }) => {
            const active = useCase === id;
            return (
              <button
                key={id}
                onClick={() => setUseCase(id)}
                aria-pressed={active}
                className={clsx(
                  "flex flex-col items-center gap-2 py-4 px-2 rounded-xl border-2 text-center transition-all duration-150 focus:outline-none",
                  active
                    ? "border-[#2563EB] bg-[#2563EB]/10 shadow-[0_0_16px_rgba(37,99,235,0.2)]"
                    : "border-[#334155] bg-[#0F172A]/60 hover:border-[#475569]"
                )}
              >
                <span className="text-2xl leading-none" aria-hidden="true">{icon}</span>
                <span className={clsx(
                  "text-xs font-semibold leading-tight",
                  active ? "text-white" : "text-[#94A3B8]"
                )}>
                  {label}
                </span>
                <span className="text-[10px] text-[#64748B] leading-tight hidden sm:block">
                  {desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <Link
        href={`/builder?budget=${budget}&use=${useCase}`}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-500 active:bg-blue-700 transition-colors text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_24px_rgba(37,99,235,0.35)] hover:shadow-[0_0_32px_rgba(37,99,235,0.5)]"
      >
        Build my PC →
      </Link>
    </div>
  );
}
