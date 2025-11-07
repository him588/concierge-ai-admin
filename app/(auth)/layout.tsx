/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  A11y,
  EffectFade,
} from "swiper/modules";

// required Swiper styles — you can also place these in your global CSS (e.g. app/globals.css)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type Props = { children?: React.ReactNode };

export default function SliderLayout({ children }: Props) {
  // sample images — replace these with your image URLs
  const slides = [
    "https://images.unsplash.com/photo-1652057295518-d2a109170821?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEhvdGVsJTIwc3RhZmYlMjBtYW5hZ21lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    "https://plus.unsplash.com/premium_photo-1664301007671-570a410c5c35?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsJTIwY2xlYW5pbmd8ZW58MHwxfDB8fHww&auto=format&fit=crop&q=60&w=600",
    "https://plus.unsplash.com/premium_photo-1759762963831-cc3d33fc4e33?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNoZWNrJTIwaW58ZW58MHwxfDB8fHww&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hlZnxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  ];

  const testimonials = [
    {
      quote:
        "Our guests love how the AI receptionist greets them instantly and handles check-ins without any wait. It’s like having a 24/7 front desk team that never gets tired.",
      name: "Sophia Nguyen",
      company: "Aurora Grand Hotel",
      position: "Front Office Manager",
    },
    {
      quote:
        "This AI receptionist transformed our operations. Guests can request room service, ask for directions, or extend stays effortlessly through voice or chat. Truly next-gen hospitality!",
      name: "Liam Patel",
      company: "BlueWave Resorts",
      position: "Operations Director",
    },
    {
      quote:
        "We integrated the virtual AI receptionist across all our boutique hotels. It not only reduced staff workload but also boosted guest satisfaction scores by 40%.",
      name: "Emma Rodriguez",
      company: "Velvet Stay Hotels",
      position: "Chief Experience Officer",
    },
    {
      quote:
        "From booking confirmations to personalized greetings, the AI receptionist makes every interaction smooth and engaging. It’s like having a digital concierge for every guest.",
      name: "Oliver Chen",
      company: "Skyline Suites",
      position: "General Manager",
    },
    {
      quote:
        "Our AI receptionist is redefining guest communication. It handles hundreds of queries daily with perfect accuracy and warmth — guests think they’re chatting with a real person!",
      name: "Ava Thompson",
      company: "Harmony Hotels Group",
      position: "Customer Relations Head",
    },
  ];

  return (
    <div className="min-h-[100vh] w-full relative  bg-[#f3f4fb] flex p-2">
      <div className="card  h-auto  md:w-1/2 lg:w-[45%] rounded-[15px] overflow-hidden relative mx-auto md:mx-0 shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
        <div className="box ">
          <div className="icon">
            <div className="iconbox h-full w-full flex items-center justify-center">
              <img src="/logo.png" alt="" className=" h-[70px] rotate-img" />
            </div>
          </div>
        </div>
        <div className="h-full w-full absolute rounded-[20px]  top-0 left-0">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            effect={"fade"}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            a11y={{ enabled: true }}
            className="h-full"
          >
            {slides.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className=" md:h-full w-full">
                  <img
                    src={src}
                    alt={`slide-${idx}`}
                    className="w-full h-full object-cover "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="absolute inset-0 z-20 flex items-end justify-center bg-black/40 p-5">
          <Swiper
            modules={[Pagination, Autoplay, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full text-white"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-5 md:px-7 md:py-10 text-center">
                  <p className="text-sm md:text-base italic mb-3 text-white">
                    “{item.quote}”
                  </p>
                  <h3 className="text-white font-semibold text-sm md:text-base">
                    {item.name}
                  </h3>
                  <p className="text-gray-200 text-xs">
                    {item.position} — {item.company}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className=" w-[65%] h-auto">{children}</div>

      {/* page children (content to the right, below, etc.) */}
    </div>
  );
}
