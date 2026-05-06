"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Cpu } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { label: "Home",         href: "/" },
  { label: "Build My PC",  href: "/builder" },
  { label: "Newsletter",   href: "/newsletter" },
  { label: "Discord",      href: "/discord" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-[#2563EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-lg tracking-tight shrink-0 hover:opacity-90 transition-opacity"
          >
            <Cpu className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />
            UK PC Builds
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/builder"
              className="inline-block bg-[#2563EB] hover:bg-blue-500 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Get started free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#94A3B8] hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-96 border-t border-[#1E293B]" : "max-h-0"
        )}
      >
        <nav
          className="px-4 pt-3 pb-5 flex flex-col gap-4"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/builder"
            className="mt-2 inline-block text-center bg-[#2563EB] hover:bg-blue-500 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg"
            onClick={() => setMenuOpen(false)}
          >
            Get started free
          </Link>
        </nav>
      </div>
    </header>
  );
}
