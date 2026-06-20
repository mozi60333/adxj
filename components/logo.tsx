import Image from "next/image";
import React from "react";

export function AdxjLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/brand/adxj-logo-horizontal.png"
        alt="ADXJ 跨境出海"
        width={820}
        height={210}
        priority
        className="h-11 w-auto sm:h-12"
      />
    </div>
  );
}

