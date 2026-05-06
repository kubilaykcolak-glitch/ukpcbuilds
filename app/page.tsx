import { CheckCircle2, Cpu, ShoppingCart, BarChart3 } from "lucide-react";
import HeroBuilder from "@/components/HeroBuilder";
import NewsletterForm from "@/components/NewsletterForm";

// ─── Section 4 plans ─────────────────────────────────────────────────────────
const plans = [
  {
    name:    "Builder",
    price:   "£5",
    period:  "/mo",
    badge:   null,
    perks:   ["Community help desk", "Weekly deal alerts", "Build reviews", "Group buys"],
    cta:     "Join Builder",
    href:    "#",
    accent:  false,
  },
  {
    name:    "Pro",
    price:   "£12",
    period:  "/mo",
    badge:   "Most popular",
    perks:   ["Everything in Builder", "Priority help", "Monthly 1:1 session", "Exclusive pre-builds"],
    cta:     "Join Pro",
    href:    "#",
    accent:  true,
  },
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
          SECTION 3 — DISCORD COMMUNITY PLANS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E293B]/40 border-y border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Join the community
            </h2>
            <p className="mt-2 text-[#94A3B8]">
              Get expert help, deal alerts, and build reviews on Discord.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.accent
                    ? "bg-[#1E293B] border-[#2563EB] shadow-[0_0_32px_rgba(37,99,235,0.25)]"
                    : "bg-[#1E293B] border-[#334155]"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="text-[#94A3B8] text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2
                        className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-[#94A3B8]">{perk}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  className={`text-center font-semibold text-sm px-6 py-3 rounded-xl transition-colors ${
                    plan.accent
                      ? "bg-[#2563EB] hover:bg-blue-500 text-white"
                      : "bg-[#0F172A] hover:bg-[#1E293B] border border-[#334155] text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — NEWSLETTER
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
