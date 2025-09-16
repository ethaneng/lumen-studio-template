"use client";

import { useRef } from "react";
import ContactForm from "./ContactForm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      const form = formRef.current;

      if (!heading || !form) return;

      // Create timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          once: true,
        },
      });

      // Heading: fade and slide in from left
      tl.fromTo(
        heading,
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
      )
        // Form: fade in and slide up (starts 0.3s after heading)
        .fromTo(
          form,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="h-screen bg-muted relative flex flex-col justify-center"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <h1
            ref={headingRef}
            className="text-primary font-heading font-bold text-6xl md:text-7xl lg:text-9xl tracking-tighter"
          >
            Send us a message
          </h1>
        </div>

        {/* Contact Form */}
        <div ref={formRef}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
