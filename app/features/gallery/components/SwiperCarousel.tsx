"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Image from "next/image";

type ImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
const galleryImages: ImageData[] = [
  {
    src: "/assets/images/girl-with-hat.jpg",
    alt: "Girl with a hat, standing in an alleyway facing away from the camera.",
    width: 2832,
    height: 4240,
  },
  {
    src: "/assets/images/woman-at-beach.jpeg",
    alt: "Woman standing at the shore of a beach as the waves come into her feet.",
    width: 6194,
    height: 3484,
  },
  {
    src: "/assets/images/beach-through-the-trees.jpg",
    alt: "A view of the beach, peering through the trees.",
    width: 3332,
    height: 4998,
  },
  {
    src: "/assets/images/pair-walking.jpeg",
    alt: "Two friends walking together towards a beautiful beach cove.",
    width: 7667,
    height: 5111,
  },
  {
    src: "/assets/images/beach-view.jpeg",
    alt: "Beautiful beach aerial view with turquoise waters.",
    width: 5184,
    height: 2064,
  },
  {
    src: "/assets/images/scott-broome-BcVvVvqiCGA-unsplash.jpg",
    alt: "Scenic landscape photography.",
    width: 6016,
    height: 4016,
  },
];

export default function SwiperCarousel() {
  const swiperRef = useRef<SwiperType>(null);

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, FreeMode, Autoplay]}
        loop={true}
        freeMode={{
          enabled: true,
          momentum: false,
        }}
        speed={2000}
        grabCursor={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false,
        }}
        slidesPerGroup={1}
        allowTouchMove={true}
        style={
          {
            "--swiper-wrapper-transition-timing-function":
              "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          } as React.CSSProperties
        }
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 2.8,
            spaceBetween: 20,
          },
        }}
      >
        {galleryImages.map((image) => (
          <SwiperSlide key={image.src}>
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[586px] lg:h-[586px] rounded-lg overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows */}
      <button
        onClick={handlePrevious}
        className="hidden md:flex w-16 h-16 lg:w-24 lg:h-24 backdrop-blur border border-white rounded-full z-10 items-center justify-center absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 drop-shadow transition-all duration-200 hover:bg-white/10 hover:border-white/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 active:bg-white/20"
      >
        <Image
          src="/assets/svgs/right-arrow.svg"
          alt="left arrow"
          width={56}
          height={37}
          className="rotate-180 w-8 h-8 lg:w-14 lg:h-14"
        />
      </button>
      {/* Navigation arrows */}
      <button
        onClick={handleNext}
        className="hidden md:flex w-16 h-16 lg:w-24 lg:h-24 backdrop-blur border border-white rounded-full z-10 items-center justify-center absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 drop-shadow transition-all duration-200 hover:bg-white/10 hover:border-white/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 active:bg-white/20"
      >
        <Image
          src="/assets/svgs/right-arrow.svg"
          alt="right arrow"
          width={56}
          height={37}
          className="w-8 h-8 lg:w-14 lg:h-14"
        />
      </button>
    </div>
  );
}
