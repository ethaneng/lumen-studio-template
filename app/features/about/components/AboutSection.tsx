"use client";

import { useRef } from "react";
import { Button } from "@/app/shared/components";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * About Section Component
 *
 * Features a full-screen layout with animated text content and parallax background images.
 * Implements responsive GSAP animations that adapt based on screen size for optimal performance.
 *
 * @component
 * @example
 * return (
 *   <AboutSection />
 * )
 *
 * @features
 * - Responsive parallax image animations
 * - Staggered text entry animations
 * - Mobile-optimized animation performance
 * - Blur-loaded images with proper accessibility
 */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const topRightImageRef = useRef<HTMLImageElement>(null);
  const bottomRightImageRef = useRef<HTMLImageElement>(null);
  const topH1Ref = useRef<HTMLHeadingElement>(null);
  const bottomH1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      try {
        const leftImage = leftImageRef.current;
        const topRightImage = topRightImageRef.current;
        const bottomRightImage = bottomRightImageRef.current;
        const topH1 = topH1Ref.current;
        const bottomH1 = bottomH1Ref.current;

        if (
          !leftImage ||
          !topRightImage ||
          !bottomRightImage ||
          !topH1 ||
          !bottomH1
        ) {
          console.warn(
            "AboutSection: Some animation targets are not available",
          );
          return;
        }

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (prefersReducedMotion) {
          // Set elements to final positions without animation
          gsap.set([topH1, bottomH1], { x: 0, opacity: 1 });
          gsap.set([leftImage, topRightImage, bottomRightImage], {
            opacity: 1,
          });
          return;
        }

        // Entry animations for h1 elements
        gsap.fromTo(
          topH1,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          bottomH1,
          {
            x: -100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            leftImage,
            { y: "0%" },
            {
              y: "30%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );

          gsap.fromTo(
            topRightImage,
            { y: "-60%" },
            {
              y: "-40%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );

          gsap.fromTo(
            bottomRightImage,
            { y: "33%" },
            {
              y: "40%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        mm.add("(max-width: 767px)", () => {
          // Mobile: Simple fade in for background images
          gsap.fromTo(
            [topRightImage, bottomRightImage],
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            },
          );

          gsap.fromTo(
            topRightImage,
            { x: "50%", y: "-55%" },
            {
              x: "20%",
              y: "-45%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            },
          );

          gsap.fromTo(
            bottomRightImage,
            { y: "35%" },
            {
              y: "10%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            },
          );
          gsap.fromTo(
            bottomRightImage,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            },
          );
        });
      } catch (error) {
        console.error("AboutSection animation error:", error);
        // Fallback: ensure elements are visible
        if (topH1Ref.current) topH1Ref.current.style.opacity = "1";
        if (bottomH1Ref.current) bottomH1Ref.current.style.opacity = "1";
        if (leftImageRef.current) leftImageRef.current.style.opacity = "1";
        if (topRightImageRef.current)
          topRightImageRef.current.style.opacity = "1";
        if (bottomRightImageRef.current)
          bottomRightImageRef.current.style.opacity = "1";
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="h-screen bg-muted relative overflow-x-clip"
    >
      {/* Content Section with Left Image */}
      <div className="container mx-auto flex h-full z-20 relative px-6 md:px-0">
        {/* Left Image -  */}
        <div className="hidden md:block relative flex-shrink-0">
          <Image
            ref={leftImageRef}
            src="/assets/images/girl-with-hat.jpg"
            alt="Girl with a hat, standing in an alleyway facing away from the camera."
            width={2832}
            height={4240}
            className="w-[300px] lg:w-[400px] xl:w-[500px] h-auto object-cover drop-shadow"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wgARCAAKAAcDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGyA//EABYQAQEBAAAAAAAAAAAAAAAAAAEiQv/aAAgBAQABBQIZz//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEABj8CP//EABcQAQADAAAAAAAAAAAAAAAAAAABEUH/2gAIAQEAAT8hgoy//9oADAMBAAIAAwAAABAH/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQMBAT8Qr//EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oACAECAQE/EI//xAAXEAADAQAAAAAAAAAAAAAAAAAAARFh/9oACAEBAAE/EJDCsP/Z"
            quality={85}
            sizes="(max-width: 768px) 440px, 500px"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center items-center md:items-start flex-1 md:ml-12 lg:ml-20">
          <h2 className="text-black/70 text-3xl md:text-4xl mb-3 self-center md:self-start">
            About Us
          </h2>
          <h1
            ref={topH1Ref}
            className="text-primary font-heading font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter drop-shadow-md text-center md:text-left"
          >
            Who we are as
          </h1>
          <div className="mb-8 md:mb-16">
            <h1
              ref={bottomH1Ref}
              className="italic text-primary font-heading tracking-[-0.075em] text-center md:text-left font-semibold text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-3 drop-shadow-md"
            >
              Photographers
            </h1>
            <p className="text-muted-foreground md:drop-shadow-md text-center md:text-left text-lg md:text-xl lg:text-2xl max-w-2xl text-balance tracking-tight leading-normal">
              At <strong className="text-secondary">Lumen Studio</strong>, we
              capture light and emotion with a modern, timeless style. Our work
              blends professionalism with creativity, delivering images that are
              authentic, refined, and enduring.
            </p>
          </div>
          <Button
            size="lg"
            variant={"secondary"}
            className="self-center md:self-start"
          >
            Get In Touch
          </Button>
        </div>
      </div>

      {/* Background parallax images */}
      <div className="absolute w-screen h-screen top-0 left-0 z-10 pointer-events-none">
        <Image
          ref={topRightImageRef}
          src="/assets/images/woman-at-beach.jpeg"
          alt="Woman standing at the shore of a beach as the waves come into her feet."
          width={6194}
          height={3484}
          className="absolute right-0 top-1/6 md:top-1/4 opacity-80 md:opacity-100 w-[350px] translate-x-1/4 md:translate-x-1/2 lg:w-[606px] lg:h-[382px] object-cover drop-shadow"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wgARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABoI//xAAVEAEBAAAAAAAAAAAAAAAAAAAQEf/aAAgBAQABBQKH/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8Br//EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEABj8CP//EABcQAQADAAAAAAAAAAAAAAAAAAABEVH/2gAIAQEAAT8hKnX/2gAMAwEAAgADAAAAEHv/xAAWEQADAAAAAAAAAAAAAAAAAAAAARH/2gAIAQMBAT8QiP/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oACAECAQE/EKf/xAAZEAEBAAMAAAAAAAAAAAAAAAABABExYf/aAAgBAQABPxARpxdd/9k="
          quality={85}
          sizes="(max-width: 768px) 450px, 606px"
        />

        <Image
          ref={bottomRightImageRef}
          src="/assets/images/beach-through-the-trees.jpg"
          alt="A view of the beach, peering through the trees."
          width={3332}
          height={4998}
          className="absolute drop-shadow bottom-0 left-4 md:left-auto h-[200px] md:h-auto md:right-1/5 w-[175px] lg:w-[280px] lg:h-[383px] object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wgARCAAKAAcDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIE/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAZZ0f//EABcQAAMBAAAAAAAAAAAAAAAAAAABAiH/2gAIAQEAAQUCdYf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEAEBAAAAAAAAAAAAAAAAAAAQEf/aAAgBAQAGPwKn/8QAFhABAQEAAAAAAAAAAAAAAAAAEQEQ/9oACAEBAAE/IUgZ/9oADAMBAAIAAwAAABA3/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPxB//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPxB//8QAFhABAQEAAAAAAAAAAAAAAAAAAREA/9oACAEBAAE/EJYBdWBv/9k="
          quality={85}
          sizes="(max-width: 768px) 220px, 280px"
        />
      </div>
    </section>
  );
}
