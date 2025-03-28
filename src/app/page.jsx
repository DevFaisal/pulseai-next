import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { Header } from "@/components/layout/Header";

// Dynamically import components that are below the fold
const Features = dynamic(() => import("@/components/sections/Features").then((mod) => mod.Features), {
  loading: () => <div className="py-12 bg-white animate-pulse" />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((mod) => mod.Testimonials), {
  loading: () => <div className="py-12 bg-gray-50 animate-pulse" />,
});

export default function PulseAILandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-background text-foreground dark:from-violet-950 dark:to-background">
      <Header />
      <Hero />

      <Suspense fallback={<div className="py-12 bg-white animate-pulse" />}>
        <Features />
      </Suspense>

      <Suspense fallback={<div className="py-12 bg-gray-50 animate-pulse" />}>
        <Testimonials />
      </Suspense>
    </div>
  );
}
