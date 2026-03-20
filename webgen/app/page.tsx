"use client";

import { WebsiteGenerator } from "@/components/website-generator";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#07091280]" style={{ backgroundColor: "#070912" }}>
      {/* Layered radial glow backgrounds */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-900/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      <WebsiteGenerator />
      <Toaster richColors position="top-right" />
    </main>
  );
}
