"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { mainSliderOptions } from "@/config/swiper.config";
import Image from "next/image";

import imgSlider1 from "@/assets/images/slider-image-1.jpeg";
import imgSlider2 from "@/assets/images/slider-image-2.jpeg";
import imgSlider3 from "@/assets/images/slider-image-3.jpeg";

const images = [
  { path: imgSlider1.src, label: "slider-image-1" },
  { path: imgSlider2.src, label: "slider-image-2" },
  { path: imgSlider3.src, label: "slider-image-3" },
];

export default function MainSlider() {
  return (
    <section className="px-40 pb-20">
      <div className="container mx-auto">
        <Swiper
          {...mainSliderOptions}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={image.path}
                width={1920}
                height={344}
                alt={image.label}
                className="w-full h-[21.5rem] sm:h-[28rem] md:h-[32rem] object-cover transition-transform duration-500 hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
