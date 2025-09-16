import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Pinterest SVG icon component (since it's not in lucide-react)
const PinterestIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    <path
      d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"
      fill="currentColor"
    />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12 border-y border-secondary">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo - Left side */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logos/lumen-logo-dark.svg"
                alt="Lumen Studio"
                width={120}
                height={47}
                className="h-10 md:h-12 w-auto "
                priority
              />
            </Link>
          </div>

          {/* Navigation Links - Right side */}
          <nav className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8">
            <Link
              href="#about"
              className="text-secondary font-light text-base hover:text-primary transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              href="#gallery"
              className="text-secondary font-light text-base hover:text-primary transition-colors duration-200"
            >
              Portfolio / Gallery
            </Link>
            <Link
              href="#contact"
              className="text-secondary font-light text-base hover:text-primary transition-colors duration-200"
            >
              Contact
            </Link>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 ml-4">
              <Link
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors duration-200"
                aria-label="Pinterest"
              >
                <PinterestIcon />
              </Link>
              <Link
                href="https://www.instagram.com/wordofmouthagency/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex flex-col md:flex-row py-8 container mx-auto px-4 text-secondary font-light items-center justify-center md:justify-end gap-2 text-center md:text-left">
        <p>Site by Word Of Mouth Agency</p>
        <span className="hidden md:inline">|</span>
        <p>© 2025 Lumen Studio. All rights reserved</p>
      </div>
    </footer>
  );
}
