import { Suspense } from "react";
import type { Metadata } from "next";
import BuilderClient from "@/components/BuilderClient";

export const metadata: Metadata = {
  title: "Build My PC",
  description:
    "Enter your budget and use case to get an instant UK PC parts list with current prices from Scan, Amazon UK, and Overclockers.",
};

function BuilderSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-6 animate-pulse">
      <div className="h-8 w-48 bg-[#1E293B] rounded-lg" />
      <div className="h-4 w-72 bg-[#1E293B] rounded" />
      <div className="h-48 bg-[#1E293B] rounded-2xl" />
      <div className="h-56 bg-[#1E293B] rounded-2xl" />
      <div className="h-14 bg-[#1E293B] rounded-xl" />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderSkeleton />}>
      <BuilderClient />
    </Suspense>
  );
}
