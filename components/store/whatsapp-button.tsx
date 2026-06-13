import { MessageCircle } from "lucide-react";
import { storeInfo } from "@/lib/sample-data";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${storeInfo.whatsapp}`}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-boutique"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle />
    </a>
  );
}
