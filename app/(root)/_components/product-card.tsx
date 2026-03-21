"use client";

import Link from "next/link";
import { useState, useEffect, type FC, type MouseEvent } from "react";
import { Heart, ShoppingCart, Star, Eye, Loader2 } from "lucide-react";
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
import { useSession } from "next-auth/react";

interface Props {
  product: IProduct;
}

const ProductCard: FC<Props> = ({ product }) => {
  const { isLoading, onError, setIsLoading } = useAction();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favs.includes(product._id)) setIsFavorite(true);
  }, [product._id]);

  const onFavourite = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user) {
      router.push("/sign-in");
      return;
    }
    setIsLoading(true);
    const res = await addFavorite({ id: product._id });
    if (res?.serverError || res?.validationErrors || !res?.data) {
      setIsLoading(false);
      return onError("Xatolik yuz berdi");
    }
    if (res.data.failure) {
      setIsLoading(false);
      return onError(res.data.failure);
    }
    if (res.data.status === 200) {
      toast({ description: "Sevimlilar ro'yxatiga qo'shildi" });
      setIsFavorite(true);
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (!favs.includes(product._id)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...favs, product._id]),
        );
      }
    }
    setIsLoading(false);
  };

  const handleAddToCart = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user) {
      toast({
        description: "Savatga qo'shish uchun tizimga kiring",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }
    const selleronId = product?.userId?._id;
    if (!selleronId) {
      toast({ description: "Sotuvchi topilmadi", variant: "destructive" });
      return;
    }
    setIsAddingToCart(true);
    try {
      const result = await addToCart({
        productId: product._id,
        quantity: 1,
        selleronId,
      });
      if (result?.failure) {
        toast({ description: result.failure, variant: "destructive" });
      } else {
        toast({ description: "Savatga qo'shildi ✓" });
        router.refresh();
      }
    } catch {
      toast({ description: "Xatolik yuz berdi", variant: "destructive" });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const rating = 4.5;
  const reviewCount = 128;

  return (
    <Link href={`/product/${product?._id}`} className="group block">
      <motion.div
        className="relative bg-card rounded-2xl overflow-hidden border border-border shadow-premium hover:shadow-premium-hover transition-all duration-300 h-full flex flex-col"
        whileHover={{ y: -3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CustomImage src={product.image ?? ""} alt={product.title!} />
          </motion.div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite btn */}
          <motion.button
            className={cn(
              "absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
              isFavorite
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                : "bg-white/90 dark:bg-gray-900/90 text-muted-foreground hover:text-rose-500",
            )}
            onClick={onFavourite}
            disabled={isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={cn("w-3.5 h-3.5", isFavorite && "fill-current")}
            />
          </motion.button>

          {/* Category badge */}
          {product?.category?.name && (
            <div className="absolute top-2.5 left-2.5">
              <span
                className="px-2.5 py-1 text-[11px] font-semibold text-white rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(139,92,246,0.9))",
                }}
              >
                {product.category.name}
              </span>
            </div>
          )}

          {/* Quick view - hover */}
          <motion.div
            className="absolute bottom-2.5 left-2.5 right-2.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-center gap-1.5 h-8 rounded-xl text-xs font-medium bg-white/90 dark:bg-gray-900/90 border border-white/50 dark:border-gray-700/50 backdrop-blur-sm text-foreground">
              <Eye className="w-3.5 h-3.5" />
              Tafsilotlar
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-3.5 flex flex-col gap-2.5 flex-1">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {product?.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-muted-foreground/30",
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">
              ({reviewCount})
            </span>
          </div>

          {/* Price & Cart */}
          <div className="flex items-center justify-between gap-2 mt-auto pt-1">
            <NoSSR>
              <span className="text-base font-bold gradient-text">
                {formatPrice(product.price!)}
              </span>
            </NoSSR>

            <motion.button
              className="h-8 w-8 flex items-center justify-center rounded-xl text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
              disabled={isAddingToCart}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAddingToCart ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
