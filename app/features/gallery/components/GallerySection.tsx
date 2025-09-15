"use client";

import { useRef } from "react";
import { Button } from "@/app/shared/components";
import SwiperCarousel from "./SwiperCarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      const paragraph = paragraphRef.current;

      if (!button || !paragraph) return;

      // Create timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          once: true,
        },
      });

      // Button: fade in first
      tl.fromTo(
        button,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2",
        },
      )
        // Paragraph: fade in after button (starts 0.3s after button)
        .fromTo(
          paragraph,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power1.out",
          },
          "-=0.3",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section id="gallery" ref={sectionRef} className="h-screen bg-secondary relative">
      <div className="container mx-auto">
        <Button ref={buttonRef} size="xl" variant="white" className="my-20">
          View Full Gallery
        </Button>
      </div>
      {/* Swiper Carousel - Outside container for wider span */}
      <div className="mb-20 overflow-hidden">
        <SwiperCarousel />
      </div>

      {/* Text content - Inside container */}
      <div className="container mx-auto px-4">
        <p
          ref={paragraphRef}
          className="text-secondary-foreground max-w-1/2 text-balance"
        >
          At Lumen Studio, we believe photography should feel effortless. From
          start to finish, we create a relaxed, natural environment where
          genuine moments unfold. With a balance of guidance and subtlety, we
          capture images that are authentic, refined, and timeless preserving
          not just how you looked, but how you truly felt.
        </p>
      </div>

      {/* Fancy gallery heading */}
      <h1 className="font-heading z-10 absolute bottom-0 right-0 translate-y-1/3 text-[300px] font-semibold italic tracking-tighter mix-blend-difference text-white">
        Gallery
      </h1>
    </section>
  );
}
