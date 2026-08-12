"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/gtag";

export default function DemoLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackEvent("view_demo")}>
      {children}
    </Link>
  );
}
