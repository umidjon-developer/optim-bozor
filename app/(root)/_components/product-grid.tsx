"use client";

import { IProduct } from "@/types";
import ProductCard from "./product-card";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

interface Props {
  products: IProduct[];
  title?: string;
}

const ProductGrid = ({ products, title = "Featured Products" }: Props) => {
  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {products.length} products available
          </p>
        </div>
        <motion.a
          href="/catalog"
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 transition-colors"
          whileHover={{ x: 4 }}
        >
          View all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((item, index) => (
          <motion.div key={item._id} variants={itemVariants}>
            <ProductCard product={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductGrid;
