"use client";

import { useEffect, useRef } from "react";

interface GoogleAdSlotProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  fullWidthResponsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function GoogleAdSlot({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  label = "Annonce Partenaire",
}: GoogleAdSlotProps) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch {
      // AdSense script not yet ready or blocked by browser extension
    }
  }, []);

  return (
    <aside
      aria-label={label}
      className={`my-6 w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-50/60 p-3 text-center ${className}`}
    >
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </span>
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-3034343595064419"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </aside>
  );
}
