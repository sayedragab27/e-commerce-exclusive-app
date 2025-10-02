"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { mainSliderOptions } from "@/config/swiper.config";

export default function ProductSlider({ images }: { images: string[] }) {
  return (
    <div>
      <Swiper {...mainSliderOptions}>
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={image}
              width={500}
              height={500}
              alt={`${image}-${idx}`}
              className="w-full h-[37.5rem] object-contain bg-gray-100 mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
