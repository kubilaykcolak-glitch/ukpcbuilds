"use client";

import { useState, useCallback } from "react";
import buildsData from "@/data/builds.json";

// ── Types ─────────────────────────────────────────────────────────────────────

type Part = {
  type: string;
  name: string;
  price: number;
  retailer: string;
  affiliateUrl: string;
  why: string;
};

type UseCase = {
  parts: Part[];
  total: number;
  performance: {
    resolution: string;
    goodFor: readonly string[];
    struggles: readonly string[];
    upgradeNote: string;
  };
};

type Tier = {
  label: string;
  priceRange: readonly [number, number];
  useCases: Record<string, UseCase>;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const TIERS = Object.keys(buildsData) as (keyof typeof buildsData)[];
const USE_CASES = ["gaming", "office", "creation", "performance"] as const;

function sumParts(parts: Part[]) {
  return parts.reduce((sum, p) => sum + p.price, 0);
}

// ── Part Row ──────────────────────────────────────────────────────────────────

function PartRow({
  part,
  onChange,
}: {
  part: Part;
  onChange: (field: "name" | "price" | "affiliateUrl" | "retailer", val: string) => void;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr_80px_140px_1fr] gap-2 items-center py-2 border-b border-[#1E293B]">
      <span className="text-xs text-[#64748B] font-mono">{part.type}</span>
      <input
        className="bg-[#0F172A] border border-[#334155] rounded px-2 py-1 text-sm text-white focus:border-[#2563EB] focus:outline-none"
        value={part.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <div className="flex items-center gap-1">
        <span className="text-[#94A3B8] text-sm">£</span>
        <input
          type="number"
          min="0"
          className="bg-[#0F172A] border border-[#334155] rounded px-2 py-1 text-sm text-white w-full focus:border-[#2563EB] focus:outline-none"
          value={part.price}
          onChange={(e) => onChange("price", e.target.value)}
        />
      </div>
      <input
        className="bg-[#0F172A] border border-[#334155] rounded px-2 py-1 text-sm text-white focus:border-[#2563EB] focus:outline-none"
        value={part.retailer}
        onChange={(e) => onChange("retailer", e.target.value)}
        placeholder="Retailer"
      />
      <input
        className="bg-[#0F172A] border border-[#334155] rounded px-2 py-1 text-sm text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
        value={part.affiliateUrl}
        onChange={(e) => onChange("affiliateUrl", e.target.value)}
        placeholder="https://affiliate-link..."
      />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminPricesPage() {
  // Deep-clone the data so we can mutate it freely
  const [data, setData] = useState<Record<string, Tier>>(
    JSON.parse(JSON.stringify(buildsData))
  );
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(TIERS[0]);

  const updatePart = useCallback(
    (
      tier: string,
      useCase: string,
      partIdx: number,
      field: "name" | "price" | "affiliateUrl" | "retailer",
      val: string
    ) => {
      setData((prev) => {
        const next = JSON.parse(JSON.stringify(prev));
        const part = next[tier].useCases[useCase].parts[partIdx];
        if (field === "price") {
          part.price = parseFloat(val) || 0;
        } else {
          part[field] = val;
        }
        // Auto-recalculate total
        next[tier].useCases[useCase].total = sumParts(
          next[tier].useCases[useCase].parts
        );
        return next;
      });
    },
    []
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "builds.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const tierData = data[activeTab] as Tier;

  // Count missing affiliate links
  let missingLinks = 0;
  TIERS.forEach((tier) => {
    USE_CASES.forEach((uc) => {
      (data[tier] as Tier).useCases[uc]?.parts.forEach((p) => {
        if (!p.affiliateUrl || p.affiliateUrl === "#") missingLinks++;
      });
    });
  });

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <div className="border-b border-[#1E293B] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Price Editor</h1>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Edit prices, names and affiliate links — then download and replace{" "}
            <code className="bg-[#1E293B] px-1 rounded">data/builds.json</code>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {missingLinks > 0 && (
            <span className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
              {missingLinks} affiliate links missing
            </span>
          )}
          <button
            onClick={handleCopy}
            className="bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {copied ? "✓ Copied!" : "Copy JSON"}
          </button>
          <button
            onClick={handleDownload}
            className="bg-[#2563EB] hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Download builds.json
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Tier sidebar */}
        <aside className="w-48 border-r border-[#1E293B] p-3 flex flex-col gap-1 shrink-0">
          {TIERS.map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTab(tier)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tier
                  ? "bg-[#2563EB] text-white"
                  : "text-[#94A3B8] hover:bg-[#1E293B] hover:text-white"
              }`}
            >
              {(data[tier] as Tier).label}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-xl font-bold mb-1">{tierData.label}</h2>
          <p className="text-sm text-[#94A3B8] mb-6">
            £{tierData.priceRange[0]}–£{tierData.priceRange[1]} price range
          </p>

          {USE_CASES.map((uc) => {
            const ucData = tierData.useCases[uc];
            if (!ucData) return null;
            const total = sumParts(ucData.parts);
            return (
              <div key={uc} className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white capitalize tracking-wide">
                    {uc === "creation" ? "Content Creation" : uc === "office" ? "Office / Work" : uc === "performance" ? "Max Performance" : "Gaming"}
                  </h3>
                  <span
                    className={`text-sm font-bold ${
                      Math.abs(total - ucData.total) > 1
                        ? "text-amber-400"
                        : "text-emerald-400"
                    }`}
                  >
                    Total: £{total} {Math.abs(total - ucData.total) > 1 && `(was £${ucData.total})`}
                  </span>
                </div>

                <div className="bg-[#1E293B] rounded-xl p-4">
                  {/* Column headers */}
                  <div className="grid grid-cols-[120px_1fr_80px_140px_1fr] gap-2 mb-2">
                    {["Type", "Product name", "Price", "Retailer", "Affiliate URL"].map((h) => (
                      <span key={h} className="text-xs text-[#475569] font-semibold uppercase tracking-wide">
                        {h}
                      </span>
                    ))}
                  </div>
                  {ucData.parts.map((part, idx) => (
                    <PartRow
                      key={`${uc}-${idx}`}
                      part={part}
                      onChange={(field, val) =>
                        updatePart(activeTab, uc, idx, field, val)
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
