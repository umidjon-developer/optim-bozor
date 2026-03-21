"use client";

import UserBox from "@/components/shared/user-box";
import { Button } from "@/components/ui/button";
import {
  User,
  Heart,
  ShoppingBag,
  Search,
  Bell,
  X,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { FC, useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import MobileBottomBar from "./mobile-bottom-bar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Header: FC = () => {
  const { data } = useSession();
  const sessionUser = data?.user;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isSearchOpen]);

  const popularSearches = [
    "Smartfon",
    "Laptop",
    "Kiyimlar",
    "Kitoblar",
    "Aksessuarlar",
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass shadow-sm" : "bg-background/95 backdrop-blur-sm",
        )}
      >
        <div className="container max-w-screen-xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-15 py-2.5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 lg:hidden">
              <motion.div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                O
              </motion.div>
              <span className="text-base font-bold gradient-text tracking-tight">
                optim bozor
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
                  }}
                />
                <div className="relative flex items-center bg-secondary/60 dark:bg-secondary/40 rounded-xl border border-border focus-within:border-primary/40 transition-all duration-200">
                  <Search className="w-4 h-4 text-muted-foreground ml-3.5 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Mahsulot qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2.5 px-3 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setSearchQuery("")}
                        className="p-1.5 mr-1.5 hover:bg-muted rounded-lg transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 lg:gap-2">
              {/* Mobile Search */}
              <button
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? (
                  <X className="w-4.5 h-4.5" />
                ) : (
                  <Search className="w-4.5 h-4.5" />
                )}
              </button>

              {/* Notifications */}
              <button className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted transition-colors relative">
                <Bell className="w-4.5 h-4.5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
              </button>

              {/* Favorites */}
              <Link
                href={sessionUser ? "/favorites" : "/sign-in"}
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted transition-colors group"
              >
                <Heart className="w-4.5 h-4.5 text-muted-foreground group-hover:text-rose-500 transition-colors" />
              </Link>

              {/* Cart */}
              <Link
                href={sessionUser ? "/cart" : "/sign-in"}
                className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl hover:bg-muted transition-colors group"
              >
                <ShoppingBag className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="hidden md:inline text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Savat
                </span>
              </Link>

              {/* Auth */}
              {sessionUser ? (
                <UserBox user={sessionUser} />
              ) : (
                <Link href="/sign-in">
                  <button
                    className="h-9 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-indigo-500/25"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    }}
                  >
                    <span className="hidden sm:inline">Kirish</span>
                    <User className="w-4 h-4 sm:hidden" />
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pb-3 pt-1">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Mahsulot qidirish..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-2.5 pl-10 pr-4 bg-secondary/50 rounded-xl border border-border text-sm outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 text-xs font-medium bg-secondary rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      <MobileBottomBar />
    </>
  );
};

export default Header;
