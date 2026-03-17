"use client";

import React from "react";
import { motion } from "framer-motion";

// Skeleton component with shimmer effect
const Skeleton = ({ className }: { className: string }) => (
  <div className={`relative overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-lg ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

// Banner Skeleton
const BannerSkeleton = () => (
  <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl aspect-[16/9] sm:aspect-[21/9] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
    {/* Content overlay skeleton */}
    <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
      <div className="max-w-lg space-y-4">
        {/* Badge skeleton */}
        <Skeleton className="w-24 h-6 rounded-full" />
        
        {/* Title skeleton */}
        <Skeleton className="w-3/4 h-10 sm:h-12" />
        
        {/* Subtitle skeleton */}
        <Skeleton className="w-full h-5 sm:h-6" />
        
        {/* Button skeleton */}
        <Skeleton className="w-32 h-10 rounded-xl" />
      </div>
    </div>
    
    {/* Navigation dots skeleton */}
    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="w-2 h-2 rounded-full" />
      ))}
    </div>
  </div>
);

// Category Card Skeleton
const CategoryCardSkeleton = () => (
  <div className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800 shadow-premium">
    <div className="flex items-center gap-3 sm:gap-4 min-h-[56px]">
      {/* Icon skeleton */}
      <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl" />
      
      {/* Text skeleton */}
      <div className="flex-1 space-y-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-16 h-3" />
      </div>
    </div>
  </div>
);

// Product Card Skeleton
const ProductCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-premium border border-gray-100 dark:border-gray-800">
    {/* Image skeleton */}
    <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <Skeleton className="absolute inset-0" />
      
      {/* Category badge skeleton */}
      <div className="absolute top-3 left-3">
        <Skeleton className="w-16 h-5 rounded-full" />
      </div>
      
      {/* Wishlist button skeleton */}
      <div className="absolute top-3 right-3">
        <Skeleton className="w-9 h-9 rounded-full" />
      </div>
    </div>
    
    {/* Content skeleton */}
    <div className="p-4 space-y-3">
      {/* Title skeleton */}
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
      
      {/* Rating skeleton */}
      <div className="flex items-center gap-1.5">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-3.5 h-3.5 rounded-sm" />
        ))}
        <Skeleton className="w-8 h-3 ml-1" />
      </div>
      
      {/* Price and button skeleton */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-9 h-9 rounded-xl" />
      </div>
    </div>
  </div>
);

const Loading = () => {
  return (
    <div className="min-h-screen">
      <div className="container max-w-7xl py-4 lg:py-6">
        {/* Banner Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <BannerSkeleton />
        </motion.div>

        {/* Categories Skeleton */}
        <div className="py-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-16 h-4" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <CategoryCardSkeleton />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4" />

        {/* Products Skeleton */}
        <div className="py-8">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <Skeleton className="w-40 h-7" />
              <Skeleton className="w-24 h-4" />
            </div>
            <Skeleton className="w-20 h-4" />
          </div>
          
          {/* Products grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              >
                <ProductCardSkeleton />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center gap-2 mt-8">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
