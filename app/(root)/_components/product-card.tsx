"use client";

import Link from "next/link";
import { useState, useEffect, type FC, type MouseEvent } from "react";
import { Heart, ShoppingCart, Star, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addFavorite, addToCart } from "@/actions/user.action";
import { toast } from "@/hooks/use-toast";
import useAction from "@/hooks/use-action";
import NoSSR from "@/components/shared/NoSSR";
import CustomImage from "@/components/shared/custom-image";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import type { IProduct } from "@/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  product: IProduct;
}

const ProductCard: FC<Props> = ({ product }) => {
  const { isLoading, onError, setIsLoading } = useAction();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favs.includes(product._id)) {
      setIsFavorite(true);
    }
  }, [product._id]);

  const onFavourite = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    const res = await addFavorite({ id: product._id });
    if (res?.serverError || res?.validationErrors || !res?.data) {
      setIsLoading(false);
      return onError("Something went wrong");
    }
    if (res.data.failure) {
      setIsLoading(false);
      return onError(res.data.failure);
    }
    if (res.data.status === 200) {
      toast({ description: "Added to favorites" });
      setIsFavorite(true);
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (!favs.includes(product._id)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...favs, product._id])
        );
      }
    }
    setIsLoading(false);
  };

  // Mock rating for demo - in real app this would come from product data
  const rating = 4.5;
  const reviewCount = 128;

  return (
    <Link href={`/product/${product?._id}`} className="group">
      <motion.div
        className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover border border-gray-100 dark:border-gray-800 transition-all duration-300 h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CustomImage src={product.image! ?? ""} alt={product.title!} />
          </motion.div>
          
          {/* Gradient Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Wishlist Button */}
          <motion.button
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-red-500"
            )}
            onClick={onFavourite}
            disabled={isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Add to favorites"
          >
            <Heart
              className={cn("w-4 h-4", isFavorite && "fill-current")}
            />
          </motion.button>

          {/* Quick View Button - Shows on Hover */}
          <motion.div
            className="absolute bottom-3 left-3 right-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="premium"
              size="sm"
              className="w-full backdrop-blur-sm bg-white/90 dark:bg-gray-800/90"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </motion.div>

          {/* Category Badge */}
          {product?.category?.name && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/90 to-indigo-500/90 text-white rounded-full backdrop-blur-sm">
                {product.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2 leading-snug">
            {product?.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5",
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviewCount})
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between gap-2">
            <NoSSR>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {formatPrice(product.price!)}
                </span>
              </div>
            </NoSSR>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="gradient"
                size="smIcon"
                className="rounded-xl"
                disabled={isAddingToCart}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  // Get seller ID from product
                  const selleronId = product?.userId?._id;
                  
                  if (!selleronId) {
                    toast({ 
                      description: "Unable to add product to cart",
                      variant: "destructive"
                    });
                    return;
                  }
                  
                  setIsAddingToCart(true);
                  try {
                    const result = await addToCart({
                      productId: product._id,
                      quantity: 1,
                      selleronId: selleronId,
                    });
                    
                    if (result?.failure) {
                      toast({ 
                        description: result.failure,
                        variant: "destructive"
                      });
                    } else {
                      toast({ 
                        description: "Added to cart",
                      });
                      // Refresh the cart page data
                      router.refresh();
                    }
                  } catch (error) {
                    toast({ 
                      description: "Failed to add to cart",
                      variant: "destructive"
                    });
                  } finally {
                    setIsAddingToCart(false);
                  }
                }}
              >
                {isAddingToCart ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
