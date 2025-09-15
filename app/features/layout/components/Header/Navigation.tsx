"use client";

import { Instagram } from "lucide-react";
import { NAVIGATION_ITEMS } from "../../../../shared/utils";

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-12">
      {NAVIGATION_ITEMS.map((item) => (
        <a
          key={item.name}
          href={item.href}
          {...(item.external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
          className="text-white text-2xl hover:opacity-70 transition-opacity duration-300 flex items-center py-12"
          data-nav-item
        >
          {/* Using the deprecated Lucide Instagram logo for the sake of time */}
          {/* In a production app, i'd use the recommended alternative or bring my own */}
          {item.name === "Instagram" ? <Instagram size={32} /> : item.name}
        </a>
      ))}
    </nav>
  );
}
