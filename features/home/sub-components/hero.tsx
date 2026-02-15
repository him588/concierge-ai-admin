/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef<(HTMLSpanElement | null)[]>([]);
  const text = "Concierge";
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Image scale animation
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
    });

    // Image opacity
    gsap.to(imgRef.current, {
      opacity: 1,
      duration: 0.5,
    });

    // Overlay animation
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
    });
  }, []);

  useEffect(() => {
    // ❌ prevent second run (Strict Mode fix)
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const elements = textRef.current;

    const indices = [...Array(elements.length).keys()];

    // Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    indices.forEach((randomIndex, i) => {
      const el = elements[randomIndex];

      gsap.fromTo(
        el,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
        },
      );
    });
  }, []);

  return (
    <div className="w-full px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
      <div className="h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl relative">
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="h-full w-full bg-black/10 absolute z-10 opacity-0"
        ></div>

        {/* Image */}
        <img
          ref={imgRef}
          src="https://cdn.prod.website-files.com/68011fed23249a9699d7b42b/6802f26cb1c279ff927f7887_visualelectric-1744594470866.avif"
          alt="cloud"
          className="h-full w-full opacity-0 scale-[1.2] object-cover"
        />

        {/* Text */}
        <div className="h-full w-full absolute z-20 px-4 sm:px-6 lg:px-8 flex items-end pb-4 sm:pb-6 lg:pb-8">
          <div className="w-full flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* Main Title */}
            <p className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[160px] tracking-[.1rem] text-nowrap sm:tracking-[.15rem] lg:tracking-[.2rem] font-black text-[#ff7c4d] leading-none">
              {text.split("").map((char, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    if (el) textRef.current[index] = el;
                  }}
                  className="inline-block opacity-0"
                >
                  {char}
                </span>
              ))}
            </p>

            {/* Description */}
            <p className="font-bold text-white w-full sm:w-[350px] lg:w-[400px] text-sm sm:text-base lg:text-lg xl:text-[20px] leading-relaxed">
              We aim to empower hotels and delight guests by providing a smart,
              responsive, and personalized AI concierge that enhances every
              moment of the hospitality journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
