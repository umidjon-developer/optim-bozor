"use client";

import { motion } from "framer-motion";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { IProduct } from "@/types";

interface Props {
  products: IProduct[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedProducts({ products, title = "Featured Products", subtitle }: Props) {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {subtitle && (
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2 uppercase tracking-wide">
              {subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/catalog">
            <Button size="lg" variant="gradient">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
