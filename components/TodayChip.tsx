"use client";

import { useEffect, useState } from "react";
import { bnDate } from "@/lib/bn";

/** Today's date pill; read after mount so prerendering never freezes a stale date */
export default function TodayChip() {
  const [date, setDate] = useState("");
  useEffect(() => setDate(bnDate()), []);

  return (
    <span className="inline-block rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-3 py-1 text-sm font-semibold text-[var(--primary)]">
      {date}
    </span>
  );
}
