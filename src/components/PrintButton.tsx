"use client";

import { Icon } from "./Icon";

export function PrintButton({ label = "Print Wound-Care Guide" }: { label?: string }) {
  return (
    <button type="button" className="btn btn--dark" onClick={() => window.print()}>
      <Icon name="printer" size={20} /> {label}
    </button>
  );
}
