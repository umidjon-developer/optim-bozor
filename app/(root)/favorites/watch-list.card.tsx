"use client";

import { IProduct } from '@/types';
import { FC, MouseEvent } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import useAction from '@/hooks/use-action';
import { deleteFavorite } from '@/actions/user.action';
import { toast } from '@/hooks/use-toast';
import NoSSR from '@/components/shared/NoSSR';
import Link from 'next/link';
import CustomImage from '@/components/shared/custom-image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  product: Partial<IProduct>;
}

const WatchListCard: FC<Props> = ({ product }) => {
  const { isLoading, onError, setIsLoading } = useAction();

  async function onDelete(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    const res = await deleteFavorite({ id: product._id! });
    if (res?.serverError || res?.validationErrors || !res?.data) {
      setIsLoading(false);
      return onError('Something went wrong');
    }
    if (res.data.failure) {
      setIsLoading(false);
      return onError(res.data.failure);
    }
    if (res.data.status === 200) {
      toast({ description: "Removed from favorites" });

      // Remove from localStorage
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updatedFavs = favs.filter((id: string) => id !== product._id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavs));
    }
    setIsLoading(false);
  }

  return (
    <Link href={`/product/${product._id}`} className="group">
      <motion.div
        className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover border border-gray-100 dark:border-gray-800 transition-all duration-300 h-full"
        whileHover={{ y: -4 }}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <CustomImage
              src={product.image!}
              alt={product.title!}
            />
          </motion.div>

          {/* Remove Button */}
          <motion.button
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
              "bg-red-500 text-white hover:bg-red-600"
            )}
            onClick={onDelete}
            disabled={isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Remove from favorites"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Heart className="w-4 h-4 fill-current" />
            )}
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
            {product.title}
          </h3>

          <NoSSR>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {formatPrice(+product.price!)}
            </span>
          </NoSSR>
        </div>
      </motion.div>
    </Link>
  );
};

export default WatchListCard;
