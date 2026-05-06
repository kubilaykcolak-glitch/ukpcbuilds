import Link from "next/link";
import { Cpu } from "lucide-react";

const navigation = [
  { label: "Home",        href: "/" },
  { label: "Build My PC", href: "/builder" },
  { label: "Newsletter",  href: "/newsletter" },
  { label: "About",       href: "/about" },
];

const community = [
  { label: "Discord",     href: "/discord" },
  { label: "Reddit",      href: "/reddit" },
  { label: "YouTube",     href: "/youtube" },
  { label: "Twitter / X", href: "/twitter" },
];

const legal = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy",    href: "/cookies" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Brand + tagline */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white font-bold text-lg tracking-tight hover:opacity-90 transition-opacity"
          >
            <Cpu className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />
            UK PC Builds
          </Link>
          <p className="mt-2 text-sm text-[#94A3B8] max-w-xs">
            Curated PC builds for every budget — priced in pounds, shipped from UK retailers.
          </p>
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              {community.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3 mb-5">
              {legal.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              UK PC Builds participates in affiliate programmes including Amazon Associates
              and Overclockers UK. We may earn a commission when you buy through our links,
              at no extra cost to you.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E293B] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#94A3B8]">
            &copy; {year} UK PC Builds. All rights reserved.
          </p>
          <p className="text-xs text-[#94A3B8]">
            Prices correct at time of publishing. Always verify before purchase.
          </p>
        </div>
      </div>
    </footer>
  );
}
