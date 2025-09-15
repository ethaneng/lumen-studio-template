"use client";

import { useRef } from "react";
import { Button } from "@/app/shared/components";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const topRightImageRef = useRef<HTMLImageElement>(null);
  const bottomRightImageRef = useRef<HTMLImageElement>(null);
  const topH1Ref = useRef<HTMLHeadingElement>(null);
  const bottomH1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const leftImage = leftImageRef.current;
      const topRightImage = topRightImageRef.current;
      const bottomRightImage = bottomRightImageRef.current;
      const topH1 = topH1Ref.current;
      const bottomH1 = bottomH1Ref.current;

      if (!leftImage || !topRightImage || !bottomRightImage || !topH1 || !bottomH1) return;

      // Entry animations for h1 elements
      gsap.fromTo(
        topH1,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true
          }
        }
      );

      gsap.fromTo(
        bottomH1,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true
          }
        }
      );

      // Create parallax effects with base positioning matching CSS transforms
      gsap.fromTo(
        leftImage,
        { y: "-55%" }, // Base -translate-y-1/2 + 50px offset
        {
          y: "-45%", // Base -translate-y-1/2 - 50px offset
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
        { y: "-60%" }, // Base -translate-y-1/2 + 50px offset
        {
          y: "-40%", // Base -translate-y-1/2 - 50px offset
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
        { y: "33" }, // Base translate-y-1/3 + 50px offset
        {
          y: "40%", // Base translate-y-1/3 - 50px offset
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="h-screen bg-muted relative overflow-x-clip"
    >
      {/* Content Section */}
      <div className="container mx-auto flex flex-col justify-center items-center h-full z-10 relative">
        <h2 className="text-black/70 text-4xl relative -translate-x-12 mb-3">
          About Us
        </h2>
        <h1 ref={topH1Ref} className="text-primary font-heading font-bold text-9xl tracking-tighter drop-shadow">
          Who we are as
        </h1>
        <div className="relative translate-x-52 mb-16">
          <h1 ref={bottomH1Ref} className="italic text-primary font-heading tracking-[-0.075em] font-semibold text-9xl mb-3">
            Photographers
          </h1>
          <p className="text-muted-foreground text-2xl max-w-3xl text-balance tracking-tight leading-normal">
            At <strong className="text-secondary">Lumen Studio</strong>, we
            capture light and emotion with a modern, timeless style. Our work
            blends professionalism with creativity, delivering images that are
            authentic, refined, and enduring.
          </p>
        </div>
        <Button
          size="xl"
          variant={"secondary"}
          className="relative -translate-x-8"
        >
          Get In Touch
        </Button>
      </div>

      {/* Images */}
      <div className="absolute w-screen h-screen top-0 left-0">
        {/*Left side - Girl with hat */}
        <Image
          ref={leftImageRef}
          src="/assets/images/girl-with-hat.jpg"
          alt="Girl with a hat, standing in an alleyway facing away from the camera."
          width={2832}
          height={4240}
          className="absolute left-0 top-1/2  -translate-x-1/4 w-[250px] h-[375px] md:w-[400px] md:h-[600px] lg:w-[586px] lg:h-[806px] object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wgARCAAKAAcDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGyA//EABYQAQEBAAAAAAAAAAAAAAAAAAEiQv/aAAgBAQABBQIZz//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEABj8CP//EABcQAQADAAAAAAAAAAAAAAAAAAABEUH/2gAIAQEAAT8hgoy//9oADAMBAAIAAwAAABAH/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQMBAT8Qr//EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oACAECAQE/EI//xAAXEAADAQAAAAAAAAAAAAAAAAAAARFh/9oACAEBAAE/EJDCsP/Z"
          quality={85}
          sizes="(max-width: 640px) 250px, (max-width: 1024px) 400px, 586px"
        />

        {/* Top Right - Girl at beach */}
        <Image
          ref={topRightImageRef}
          src="/assets/images/woman-at-beach.jpeg"
          alt="Woman standing at the shore of a beach as the waves come into her feet."
          width={6194}
          height={3484}
          className="absolute right-0 top-1/4  translate-x-1/4 w-[200px] h-[126px] md:w-[350px] md:h-[220px] lg:w-[606px] lg:h-[382px] object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wgARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABoI//xAAVEAEBAAAAAAAAAAAAAAAAAAAQEf/aAAgBAQABBQKH/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8Br//EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEABj8CP//EABcQAQADAAAAAAAAAAAAAAAAAAABEVH/2gAIAQEAAT8hKnX/2gAMAwEAAgADAAAAEHv/xAAWEQADAAAAAAAAAAAAAAAAAAAAARH/2gAIAQMBAT8QiP/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oACAECAQE/EKf/xAAYEAEBAAMAAAAAAAAAAAAAAAABABExYf/aAAgBAQABPxARpxdd/9k="
          quality={85}
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 350px, 606px"
        />

        {/* Bottom Right - Beach through trees */}
        <Image
          ref={bottomRightImageRef}
          src="/assets/images/beach-through-the-trees.jpg"
          alt="A view of the beach, peering through the trees."
          width={3332}
          height={4998}
          className="absolute z-10 bottom-0 right-1/5  w-[150px] h-[225px] md:w-[200px] md:h-[300px] lg:w-[382px] lg:h-[383px] object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wgARCAAKAAcDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIE/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAZZ0f//EABcQAAMBAAAAAAAAAAAAAAAAAAABAiH/2gAIAQEAAQUCdYf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAVEAEBAAAAAAAAAAAAAAAAAAAQEf/aAAgBAQAGPwKn/8QAFhABAQEAAAAAAAAAAAAAAAAAEQEQ/9oACAEBAAE/IUgZ/9oADAMBAAIAAwAAABA3/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPxB//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPxB//8QAFhABAQEAAAAAAAAAAAAAAAAAAREA/9oACAEBAAE/EJYBdWBv/9k="
          quality={85}
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 280px"
        />
      </div>
    </section>
  );
}
