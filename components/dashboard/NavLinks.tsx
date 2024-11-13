"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/lib/globals";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, i) => {
        const isActive = pathname == link.href;
        return (
          <Link
            href={link.href}
            className={`py-4 text-primary-foreground  hover:bg-secondary transition-all flex gap-4 cursor-pointer ${
              isActive
                ? "font-semibold"
                : "hover:text-primary-foreground opacity-80"
            }`}
            key={i}
          >
            <link.icon />
            {link.tag}
          </Link>
        );
      })}
    </>
  );
}
