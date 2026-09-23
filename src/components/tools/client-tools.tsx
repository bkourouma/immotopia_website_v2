"use client";

import dynamic from "next/dynamic";

// Les générateurs de documents utilisent la date du jour : ils sont rendus uniquement dans le navigateur.
function Skeleton() {
  return (
    <div className="grid animate-pulse gap-6 lg:grid-cols-[1fr_1.05fr]">
      <div className="h-[520px] rounded-[24px] bg-white" />
      <div className="h-[520px] rounded-[24px] bg-[#e9eaf3]" />
    </div>
  );
}

export const ReceiptGenerator = dynamic(() => import("./documents").then((m) => m.ReceiptGenerator), { ssr: false, loading: Skeleton });
export const ResidentialLeaseGenerator = dynamic(() => import("./documents").then((m) => m.ResidentialLeaseGenerator), { ssr: false, loading: Skeleton });
export const CommercialLeaseGenerator = dynamic(() => import("./documents").then((m) => m.CommercialLeaseGenerator), { ssr: false, loading: Skeleton });
