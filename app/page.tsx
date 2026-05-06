import { CheckCircle2, Cpu, ShoppingCart, BarChart3 } from "lucide-react";
import HeroBuilder from "@/components/HeroBuilder";
import NewsletterForm from "@/components/NewsletterForm";

// ─── Section 4 community perks ───────────────────────────────────────────────
const communityPerks = [
  "Expert help desk — answers usually within the hour",
  "Daily deal alerts on GPUs, CPUs & storage",
  "Build reviews before you spend a penny",
  "Group buys & community discount codes",
] as const;

// ─── How it works steps ───────────────────────────────────────────────────────
const steps = [
  {
    icon: <ShoppingCart className="w-7 h-7 text-[#2563EB]" aria-hidden="true" />,
    title:  "Enter your budget",
    body:   "Slide to any amount from £300 to £3,000. We cover every realistic tier.",
  },
  {
    icon: <Cpu className="w-7 h-7 text-[#2563EB]" aria-hidden="true" />,
    title:  "Get your build",
    body:   "A hand-curated parts list with current UK prices and direct buy links from Scan, Amazon UK, and Overclockers.",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-[#2563EB]" aria-hidden="true" />,
    title:  "See what it can do",
    body:   "Honest performance expectations — what games run, at what settings, and what to upgrade first.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Subtle radial glow behind the hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -top-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 bg-[#1E293B] border border-[#2563EB]/30 rounded-full px-4 py-1.5 text-xs font-medium text-[#94A3B8] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" aria-hidden="true" />
            UK prices · Updated monthly
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight text-balance max-w-3xl">
            Find your perfect{" "}
            <span className="text-[#2563EB]">UK PC build</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#94A3B8] max-w-xl text-balance">
            Enter your budget. Pick your use case. Get an instant parts list with
            current UK prices.
          </p>

          {/* Interactive builder widget */}
          <div className="w-full max-w-lg bg-[#1E293B] border border-[#334155] rounded-2xl p-6 sm:p-8 mt-4 text-left shadow-xl">
            <HeroBuilder />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — HOW IT WORKS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E293B]/40 border-y border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How it works
            </h2>
            <p className="mt-2 text-[#94A3B8]">Three steps to your ideal build</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center gap-4 bg-[#1E293B] rounded-2xl p-8 border border-[#334155]"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-[#2563EB] tracking-widest uppercase">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — DISCORD COMMUNITY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E293B]/40 border-y border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-10">
            {/* Left — copy */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Join the community
              </h2>
              <p className="text-[#94A3B8] mb-6">
                Get expert help, daily deal alerts, and build reviews on Discord.
                Everything included for one flat price.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {communityPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-[#94A3B8]">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — pricing card */}
            <div className="w-full sm:w-64 shrink-0 bg-[#1E293B] border border-[#2563EB] rounded-2xl p-7 shadow-[0_0_32px_rgba(37,99,235,0.2)] text-center">
              <p className="text-xs font-bold text-[#2563EB] uppercase tracking-widest mb-3">Builder</p>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-4xl font-extrabold text-white">£5</span>
                <span className="text-[#94A3B8] text-sm">/mo</span>
              </div>
              <p className="text-xs text-[#64748B] mb-6">Cancel anytime</p>
              <a
                href="/discord"
                className="block bg-[#2563EB] hover:bg-blue-500 transition-colors text-white font-bold text-sm px-6 py-3 rounded-xl"
              >
                Join now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — BUY ME A COFFEE
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto bg-[#1E293B] border border-[#334155] rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <span className="text-5xl shrink-0" aria-hidden="true">☕</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">Find this useful?</h3>
              <p className="text-sm text-[#94A3B8]">
                This site is free and always will be. If it saved you money or time on your build, a coffee goes a long way.
              </p>
            </div>
            <a
              href="https://buymeacoffee.com/ukpcbuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#FFDD00] hover:bg-yellow-300 transition-colors text-[#1a1a1a] font-bold text-sm px-6 py-3 rounded-xl whitespace-nowrap"
            >
              ☕ Buy me a coffee
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5 — NEWSLETTER
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-5">
            <div className="text-4xl" aria-hidden="true">📬</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Get monthly build updates free
            </h2>
            <p className="text-[#94A3B8]">
              Price drops, new GPU launches, and the best value builds — straight
              to your inbox every month.
            </p>

            <NewsletterForm />

            <p className="text-xs text-[#94A3B8]">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
