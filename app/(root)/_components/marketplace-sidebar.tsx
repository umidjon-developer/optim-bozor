"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Grid3X3,
  Heart,
  ShoppingBag,
  Tag,
  ChevronDown,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Package,
  Shirt,
  BookOpen,
  Watch,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  name: string;
  href: string;
  icon: FC<{ className?: string }>;
  badge?: string;
}

interface SidebarCategory {
  name: string;
  icon: FC<{ className?: string }>;
  items: SidebarItem[];
}

const mainItems: SidebarItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Catalog", href: "/catalog", icon: Grid3X3 },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "Cart", href: "/cart", icon: ShoppingBag },
];

const categories: SidebarCategory[] = [
  {
    name: "Popular",
    icon: TrendingUp,
    items: [
      { name: "Trending", href: "/catalog?filter=trending", icon: Sparkles, badge: "Hot" },
      { name: "New Arrivals", href: "/catalog?filter=new", icon: Package },
    ],
  },
  {
    name: "Categories",
    icon: Grid3X3,
    items: [
      { name: "All Products", href: "/catalog", icon: Grid3X3 },
      { name: "Clothing", href: "/catalog?category=clothing", icon: Shirt },
      { name: "Books", href: "/catalog?category=books", icon: BookOpen },
      { name: "Accessories", href: "/catalog?category=accessories", icon: Watch },
      { name: "More", href: "/catalog", icon: MoreHorizontal },
    ],
  },
];

const MarketplaceSidebar: FC = () => {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Popular", "Categories"]);

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 z-40 hidden lg:flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/25"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            O
          </motion.div>
          <span className="text-xl font-bold gradient-text tracking-tight">
            optim bozor
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          {mainItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-700 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive(item.href) && "text-purple-600 dark:text-purple-400"
                  )}
                />
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mx-3 mb-4" />

        {/* Collapsible Categories */}
        <div className="space-y-1">
          {categories.map((category) => (
            <div key={category.name} className="mb-1">
              <button
                onClick={() => toggleCategory(category.name)}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              >
                <category.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{category.name}</span>
                <motion.div
                  animate={{ rotate: expandedCategories.includes(category.name) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedCategories.includes(category.name) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 space-y-0.5">
                      {category.items.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <motion.div
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                              isActive(item.href)
                                ? "text-purple-700 dark:text-purple-300 font-medium"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            )}
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="flex-1">{item.name}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-indigo-500/10 border border-purple-200/20 dark:border-purple-800/20">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Premium shopping experience
          </p>
          <Link
            href="/catalog"
            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
          >
            Explore now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default MarketplaceSidebar;
