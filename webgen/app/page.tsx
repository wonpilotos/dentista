"use client";

import { WebsiteGenerator } from "@/components/website-generator";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[#EEF2FF]">
      <WebsiteGenerator />
      <Toaster richColors position="top-right" />
    </main>
  );
}
