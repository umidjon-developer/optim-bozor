import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  ctaHref?: string;
  ctaText?: string;
  imageSrc?: string;
}

export default function EmptyState({
  title,
  description,
  ctaHref = "/",
  ctaText = "Go Back",
  imageSrc,
}: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center text-center py-16 sm:py-24">
      {/* Illustration */}
      {imageSrc ? (
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 mb-8">
          <Image src={imageSrc} alt={title} fill className="object-contain" />
        </div>
      ) : (
        <div className="mb-8 relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 rounded-full blur-2xl" />
          
          {/* Icon container */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 dark:text-purple-500" />
          </div>
        </div>
      )}

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      
      {description ? (
        <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md">
          {description}
        </p>
      ) : null}

      {ctaHref ? (
        <Link href={ctaHref} className="mt-8">
          <Button variant="gradient" className="rounded-xl font-medium">
            <ShoppingBag className="w-4 h-4 mr-2" />
            {ctaText}
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
