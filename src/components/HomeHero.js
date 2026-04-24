"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeroOrbitFallback from "@/components/HeroOrbitFallback";

const HeroOrbit = dynamic(() => import("@/components/HeroOrbit"), {
  ssr: false,
});

export default function HomeHero({ sections }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <HeroOrbitFallback sections={sections} />;
  }

  return <HeroOrbit sections={sections} />;
}
