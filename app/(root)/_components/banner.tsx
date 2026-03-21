"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  { 
    image: "/banner/maktab.png", 
    alt: "Maktab mavzuli chegirmalar",
    title: "Back to School",
    subtitle: "Up to 40% off on school supplies",
    cta: "Shop Now"
  },
  { 
    image: "/banner/fast-food.png", 
    alt: "Fast food aksiyalari",
    title: "Food Festival",
    subtitle: "Delicious deals await you",
    cta: "Explore"
  },
  { 
    image: "/banner/kiyimlar.png", 
    alt: "Kiyımlar kolleksiyasi",
    title: "Fashion Week",
    subtitle: "New collection available now",
    cta: "Discover"
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const transition = {
  x: { type: "spring" as const, stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide((index + banners.length) % banners.length);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const banner = banners[currentSlide];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-premium aspect-[16/9] sm:aspect-[21/9]"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0"
          aria-live="polite"
        >
          <Image
            src={banner.image}
            alt={banner.alt}
            fill
            className="object-cover"
            priority
          />
          
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
          
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-lg"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-xs font-medium text-white">Featured</span>
              </div>
              
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                {banner.title}
              </h2>
              
              {/* Subtitle */}
              <p className="text-base sm:text-lg text-white/80 mb-6">
                {banner.subtitle}
              </p>
              
              {/* CTA Button */}
              <Button
                variant="gradient"
                size="lg"
                className="rounded-xl font-semibold"
              >
                {banner.cta}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="relative w-8 h-8 flex items-center justify-center rounded-full group"
          >
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "w-6 bg-white shadow-lg shadow-purple-500/25" 
                  : "bg-white/50 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Arrows */}
      <motion.div
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="premium"
          size="icon"
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full backdrop-blur-sm bg-white/90 dark:bg-gray-900/90"
          onClick={() => goTo(currentSlide - 1)}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </motion.div>

      <motion.div
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="premium"
          size="icon"
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full backdrop-blur-sm bg-white/90 dark:bg-gray-900/90"
          onClick={() => goTo(currentSlide + 1)}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </motion.div>
    </div>
  );
}
