"use client";

import { WebsiteGenerator } from "@/components/website-generator";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="min-h-dvh bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <WebsiteGenerator />
      <Toaster richColors position="top-right" />
    </main>
  );
}
