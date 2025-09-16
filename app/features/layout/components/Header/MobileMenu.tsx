"use client";

import { useState, useRef } from "react";
import { Menu, X, Instagram } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAVIGATION_ITEMS } from "../../../../shared/utils";

// Register plugins
gsap.registerPlugin(useGSAP);

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const menu = menuRef.current;
    const nav = navRef.current;

    if (!menu || !nav) return;

    // Create timeline for menu animations
    const tl = gsap.timeline({ paused: true });
    const navItems = nav.querySelectorAll('li');

    // Set initial states
    gsap.set(menu, {
      height: 0,
      opacity: 0,
    });

    gsap.set(navItems, {
      y: -20,
      opacity: 0,
    });

    // Animation sequence
    tl.to(menu, {
      height: "auto",
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    })
    .to(navItems, {
      y: 0,
      opacity: 1,
      duration: 0.25,
      stagger: 0.05,
      ease: "power2.out",
    }, "-=0.15");

    timelineRef.current = tl;
  }, { scope: menuRef });

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (timelineRef.current) {
      if (newIsOpen) {
        timelineRef.current.play();
      } else {
        timelineRef.current.reverse();
      }
    }
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-white/20 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform duration-300" />
        ) : (
          <Menu className="w-6 h-6 text-white transition-transform duration-300" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg overflow-hidden"
      >
        <nav ref={navRef} className="container mx-auto px-4 py-6">
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
                  onClick={toggleMenu}
                >
                  {item.name === "Instagram" ? (
                    <>
                      <Instagram className="w-5 h-5" />
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
    </div>
  );
}
