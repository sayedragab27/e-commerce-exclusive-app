import { Autoplay, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

// ✅ Base (default) config
export const defaultSwiperOptions: SwiperOptions = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-4 border-2",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-500 border-white",
  },
  modules: [Pagination, Autoplay],
};

// ✅ Named variations (extend default with overrides)
export const mainSliderOptions: SwiperOptions = {
  ...defaultSwiperOptions,
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
};

export const categoriesSliderOptions: SwiperOptions = {
  ...defaultSwiperOptions,
  slidesPerView: 1,
  spaceBetween: 0,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1536: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  },
  loop: false,
};
