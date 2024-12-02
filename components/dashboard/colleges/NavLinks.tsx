"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/lib/globals";

export function NavLinks({ role }: { role: string }) {
  const pathname = usePathname();
  const filteredLinks = links.filter((link) => link.for.includes(role));

  return (
    <>
      {filteredLinks.map((link, i) => {
        const isActive = pathname == link.href;
        return (
          <Link
            href={link.href}
            className={`p-4 rounded-lg text-primary-foreground  hover:bg-secondary transition-all flex gap-4 cursor-pointer ${
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
