"use client";

import { useState } from "react";
import { Menu, X, Camera } from "lucide-react";
import { NAVIGATION_ITEMS } from "../../../../shared/utils";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <Menu className="w-6 h-6 transition-transform duration-300" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    {...(item.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="text-base hover:opacity-70 transition-opacity duration-300 flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name === "Instagram" ? (
                      <>
                        <Camera className="w-5 h-5" />
                        Instagram
                      </>
                    ) : (
                      item.name
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
