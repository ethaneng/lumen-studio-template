"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "../../../shared/components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register plugins
gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      const paragraph = paragraphRef.current;
      const button = buttonRef.current;
      const image = imageRef.current;

      if (!heading || !paragraph || !button || !image) return;

      // Create timeline for coordinated hero entry animations
      const tl = gsap.timeline({ delay: 0.3 }); // Small delay after page load

      // Set initial states
      gsap.set([heading, paragraph, button, image], {
        opacity: 0,
      });
      gsap.set(heading, { y: 50 });
      gsap.set(paragraph, { y: 30 });
      gsap.set(image, { x: 50, scale: 1.05 });

      // Animate elements in sequence
      tl.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          paragraph,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .to(
          button,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          image,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.8",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background Image with optimizations */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/beach-view.jpeg"
          alt="Beautiful beach aerial view with turquoise waters"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wgARCAAEAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABrET/xAAVEAEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAQABBQKK/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAEP/aAAgBAQAGPwI//8QAFhABAQEAAAAAAAAAAAAAAAAAEQAx/9oACAEBAAE/IQZK/9oADAMBAAIAAwAAABB//8QAFhEAAwAAAAAAAAAAAAAAAAAAAAER/9oACAEDAQE/EIj/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAgBAgEBPxCP/8QAFxABAQEBAAAAAAAAAAAAAAAAAREAIf/aAAgBAQABPxAOgXN3u//Z"
        />

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start h-full container mx-auto px-6 md:px-12 lg:px-28">
        <div className="text-white w-full xl:w-1/2 text-center md:text-left relative z-10">
          <h1
            ref={headingRef}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 drop-shadow-sm"
          >
            Defining Moments <br className="hidden md:block" />
            Through the Lens
          </h1>
          <p
            ref={paragraphRef}
            className="mb-8 md:mb-12 text-lg md:text-2xl text-muted max-w-xl mx-auto md:mx-0 drop-shadow-sm"
          >
            I love capturing candid moments and telling stories through my
            photographs. You know how when you watch indie movies, and you have
            a certain feeling from it. I want you to feel that.
          </p>
          <Button ref={buttonRef} size="xl">
            View Gallery
          </Button>
        </div>

        <div className="hidden md:block md:w-1/2 lg:w-auto">
          <Image
            ref={imageRef}
            src="/assets/images/pair-walking.jpeg"
            width={7667}
            height={5111}
            alt="Two friends walking together towards a beautiful beach cove."
            className="grayscale absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[50vw] xl:w-[992px] h-auto"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wgARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABiSP/xAAWEAEBAQAAAAAAAAAAAAAAAAAAARL/2gAIAQEAAQUCbr//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAQ/9oACAEBAAY/Aj//xAAWEAEBAQAAAAAAAAAAAAAAAAABEFH/2gAIAQEAAT8hFRch/9oADAMBAAIAAwAAABDz/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAR/9oACAEDAQE/EMC//8QAFxEBAAMAAAAAAAAAAAAAAAAAAQARMf/aAAgBAgEBPxC12f/EABcQAAMBAAAAAAAAAAAAAAAAAAABEWH/2gAIAQEAAT8QUWDZn//Z"
            quality={85}
            sizes="(max-width: 768px) 50vw, 992px"
            priority
          />
        </div>
      </div>

      {/* Scroll indicator  */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-white/50 animate-pulse" />
      </div>
    </section>
  );
}
