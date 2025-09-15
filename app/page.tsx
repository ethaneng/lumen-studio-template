"use client";
import AboutSection from "./features/about/components/AboutSection";
import HeroSection from "./features/hero/components/HeroSection";
import { GallerySection } from "./features/gallery";
import { ContactSection } from "./features/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
