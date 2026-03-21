"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-premium">
      {/* Image Placeholder */}
      <Skeleton className="w-full aspect-square" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
        
        {/* Price and Cart */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <Skeleton className="h-12 w-48 mx-auto lg:mx-0 rounded-full" />
            <Skeleton className="h-16 w-full md:h-24" />
            <Skeleton className="h-20 w-full md:h-24" />
            <div className="flex gap-4 justify-center lg:justify-start">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          
          {/* Right Content */}
          <div className="hidden lg:block">
            <Skeleton className="w-full aspect-square rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-premium p-6">
      <Skeleton className="w-16 h-16 rounded-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function BannerSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-gradient-to-r">
      <div className="p-8 md:p-12 lg:p-16">
        <div className="space-y-4 max-w-2xl">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-12 w-full md:h-16" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-12 w-40 mt-6" />
        </div>
      </div>
    </div>
  );
}
