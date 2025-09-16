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
  const mobileHeadingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      const paragraph = paragraphRef.current;
      const mobileHeading = mobileHeadingRef.current;

      if (!button || !paragraph || !mobileHeading) return;

      // Create timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          once: true,
        },
      });

      // Animate mobile heading from the right
      tl.fromTo(
        mobileHeading,
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
      )
        // Animate button from the left
        .fromTo(
          button,
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<",
        )
        // Paragraph: fade in after button
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
    <section
      id="gallery"
      ref={sectionRef}
      className="h-screen bg-secondary relative flex items-center overflow-x-clip"
    >
      <div className="w-full">
        <div className="container mx-auto px-4">
          {/* Mobile/Tablet Heading */}
          <h1
            ref={mobileHeadingRef}
            className="block md:hidden font-heading text-[120px] md:text-[200px] font-semibold italic tracking-tighter text-muted text-right"
          >
            Gallery
          </h1>
          <Button
            ref={buttonRef}
            size="lg"
            variant="white"
            className="mb-10 md:my-20 transition-none"
          >
            View Full Gallery
          </Button>
        </div>
        {/* Swiper Carousel - Outside container for wider span */}
        <div className="mb-10 md:mb-20 overflow-hidden">
          <SwiperCarousel />
        </div>

        {/* Text content - Inside container */}
        <div className="container mx-auto px-4">
          <p
            ref={paragraphRef}
            className="text-secondary-foreground max-w-full md:max-w-1/2 text-balance text-lg md:text-base"
          >
            At Lumen Studio, we believe photography should feel effortless. From
            start to finish, we create a relaxed, natural environment where
            genuine moments unfold. With a balance of guidance and subtlety, we
            capture images that are authentic, refined, and timeless preserving
            not just how you looked, but how you truly felt.
          </p>
        </div>
      </div>

      {/* Desktop Fancy gallery heading */}
      <h1 className="font-heading z-10 absolute bottom-0 right-0 translate-y-1/3 text-8xl md:text-[150px] lg:text-[300px] font-semibold italic tracking-tighter mix-blend-difference text-white hidden md:block">
        Gallery
      </h1>
    </section>
  );
}
