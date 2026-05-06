"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

type UseCase = "gaming" | "office" | "creation" | "performance";

const USE_CASES: { id: UseCase; label: string; icon: string }[] = [
  { id: "gaming",      label: "Gaming",      icon: "🎮" },
  { id: "office",      label: "Office",      icon: "💼" },
  { id: "creation",    label: "Creation",    icon: "🎨" },
  { id: "performance", label: "Performance", icon: "⚡" },
];

const MIN = 300;
const MAX = 3000;

export default function HeroBuilder() {
  const [budget, setBudget]   = useState(700);
  const [useCase, setUseCase] = useState<UseCase>("gaming");

  const pct = ((budget - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="flex flex-col gap-8">
      {/* Budget slider */}
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-[#94A3B8]">Your budget</span>
          <span className="text-3xl font-bold text-white tabular-nums">
            £{budget.toLocaleString("en-GB")}
          </span>
        </div>

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={50}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          aria-label="Budget in pounds"
          className="hero-slider w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2563EB ${pct}%, #1E293B ${pct}%)`,
          }}
        />

        <div className="flex justify-between text-xs text-[#94A3B8]">
          <span>£300</span>
          <span>£1,000</span>
          <span>£2,000</span>
          <span>£3,000</span>
        </div>
      </div>

      {/* Use-case pills */}
      <div>
        <p className="text-sm font-medium text-[#94A3B8] mb-3">Use case</p>
        <div className="flex flex-wrap gap-3">
          {USE_CASES.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setUseCase(id)}
              aria-pressed={useCase === id}
              className={clsx(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-150",
                useCase === id
                  ? "bg-[#2563EB] border-[#2563EB] text-white shadow-[0_0_16px_rgba(37,99,235,0.45)]"
                  : "bg-transparent border-[#1E293B] text-[#94A3B8] hover:border-[#2563EB] hover:text-white"
              )}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        href={`/builder?budget=${budget}&use=${useCase}`}
        className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-500 active:bg-blue-700 transition-colors text-white font-bold text-lg px-10 py-4 rounded-xl shadow-[0_0_24px_rgba(37,99,235,0.35)] hover:shadow-[0_0_32px_rgba(37,99,235,0.5)]"
      >
        Build my PC
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
