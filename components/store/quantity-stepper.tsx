"use client";

import { Minus, Plus } from "lucide-react";
import { useI18n } from "@/components/i18n/locale-provider";

export function QuantityStepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const { t } = useI18n();
  return (
    <div className="inline-flex items-center rounded-full border border-hairline bg-white">
      <button type="button" className="grid h-10 w-10 place-items-center text-stone disabled:opacity-40" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={t.cart.decrease}>
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className="grid h-10 w-10 place-items-center text-stone" onClick={() => onChange(value + 1)} aria-label={t.cart.increase}>
        <Plus size={14} />
      </button>
    </div>
  );
}
