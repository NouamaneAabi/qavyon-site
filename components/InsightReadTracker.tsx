"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking";

export default function InsightReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track("insight_read", { slug });
  }, [slug]);
  return null;
}
