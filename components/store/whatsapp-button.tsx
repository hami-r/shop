"use client";

import { MessageCircle } from "lucide-react";
import { useI18n } from "@/components/i18n/locale-provider";
import { storeInfo } from "@/lib/sample-data";

export function WhatsAppButton() {
  const { t } = useI18n();
  return (
    <a
      href={`https://wa.me/${storeInfo.whatsapp}`}
      style={{ animationDelay: "600ms" }} className="fixed bottom-5 end-5 z-40 grid h-14 w-14 animate-rise place-items-center rounded-full bg-whatsapp text-white shadow-float hover:scale-105"
      aria-label={t.whatsapp.chat}
    >
      <MessageCircle />
    </a>
  );
}
