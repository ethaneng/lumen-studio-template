"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const header = headerRef.current;
      const container = containerRef.current;
      const logo = logoRef.current;
      const navItems = document.querySelectorAll("[data-nav-item]");

      if (!header || !container || !logo) return;

      // Create timeline for shrink animation (paused initially)
      const shrinkTl = gsap.timeline({ paused: true });

      // Prepare all animation targets and properties
      const animationProps = {
        duration: 0.15,
        ease: "power1.out",
      };

      // Border opacity change
      shrinkTl
        .to(container, {
          ...animationProps,
          borderBottomColor: "rgba(255, 255, 255, 0)",
        })
        // Logo size change - starts 0.05s after border
        .to(
          logo,
          {
            ...animationProps,
            height: window.innerWidth >= 768 ? "40px" : "32px",
          },
          0.05,
        );

      // Add nav items animation if they exist - parallel with logo
      if (navItems.length > 0) {
        shrinkTl.to(
          navItems,
          {
            ...animationProps,
            fontSize: "18px",
            paddingTop: "24px",
            paddingBottom: "24px",
          },
          0.05,
        );
      }

      // ScrollTrigger to play/reverse animation
      ScrollTrigger.create({
        trigger: "body",
        start: "top top-=1", // Trigger when scrolled just 1px from top
        onEnter: () => shrinkTl.play(),
        onLeaveBack: () => shrinkTl.reverse(),
      });

      // Handle responsive logo sizing on window resize
      const handleResize = () => {
        const isScrolled = window.scrollY > 1;
        const newHeight = isScrolled
          ? window.innerWidth >= 768
            ? "40px"
            : "32px"
          : window.innerWidth >= 768
            ? "64px"
            : "48px";

        gsap.set(logo, { height: newHeight });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
    { scope: headerRef },
  ); // Scope animations to header component

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 w-screen bg-gradient-to-b from-black/40 to-transparent"
    >
      <div
        ref={containerRef}
        className="container mx-auto px-4 border-b border-white transition-colors duration-300"
      >
        <div className="flex items-center justify-between py-4 ">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              ref={logoRef}
              src="/assets/logos/lumen-logo.svg"
              alt="Lumen Studio"
              width={120}
              height={47}
              className="h-12 md:h-16 w-auto transition-all duration-300"
              priority
            />
          </div>

          <Navigation />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
