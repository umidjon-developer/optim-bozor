"use client";

import UserBox from "@/components/shared/user-box";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { User, Heart, ShoppingBag, Search, Bell, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { FC, useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
=======
import { User, Heart, ShoppingBag, LogIn, Search, Bell, X } from "lucide-react";
import Link from "next/link";
import { FC, useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
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
<<<<<<< HEAD
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
=======
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
=======
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
  }, [isSearchOpen]);

  const popularSearches = ["Smartfon", "Laptop", "Kiyimlar", "Kitoblar", "Aksessuarlar"];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
<<<<<<< HEAD
            ? "glass shadow-sm"
            : "bg-background/95 backdrop-blur-sm"
        )}
      >
        <div className="container max-w-screen-xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-15 py-2.5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 lg:hidden">
              <motion.div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                whileHover={{ scale: 1.05 }}
=======
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-800/50"
            : "bg-white dark:bg-gray-900"
        )}
      >
        <div className="container max-w-screen-xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo - Hidden on desktop since sidebar has it */}
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <motion.div
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/25"
                whileHover={{ scale: 1.05, rotate: 5 }}
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
                whileTap={{ scale: 0.95 }}
              >
                O
              </motion.div>
<<<<<<< HEAD
              <span className="text-base font-bold gradient-text tracking-tight">
=======
              <span className="text-lg font-bold gradient-text tracking-tight">
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
                optim bozor
              </span>
            </Link>

<<<<<<< HEAD
            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-lg" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))" }} />
                <div className="relative flex items-center bg-secondary/60 dark:bg-secondary/40 rounded-xl border border-border focus-within:border-primary/40 transition-all duration-200">
                  <Search className="w-4 h-4 text-muted-foreground ml-3.5 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Mahsulot qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2.5 px-3 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
=======
            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-indigo-500/20 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus-within:border-purple-500 dark:focus-within:border-purple-500 transition-colors">
                  <Search className="w-5 h-5 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2.5 px-3 bg-transparent text-sm outline-none placeholder:text-gray-400"
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
                  />
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setSearchQuery("")}
<<<<<<< HEAD
                        className="p-1.5 mr-1.5 hover:bg-muted rounded-lg transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
=======
                        className="p-2 mr-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-400" />
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Actions */}
<<<<<<< HEAD
            <div className="flex items-center gap-1 lg:gap-2">
              {/* Mobile Search */}
              <button
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? <X className="w-4.5 h-4.5" /> : <Search className="w-4.5 h-4.5" />}
              </button>

              {/* Notifications */}
              <button className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted transition-colors relative">
                <Bell className="w-4.5 h-4.5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
              </button>

              {/* Favorites */}
              <Link href={sessionUser ? "/favorites" : "/sign-in"} className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted transition-colors group">
                <Heart className="w-4.5 h-4.5 text-muted-foreground group-hover:text-rose-500 transition-colors" />
              </Link>

              {/* Cart */}
              <Link href={sessionUser ? "/cart" : "/sign-in"} className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl hover:bg-muted transition-colors group">
                <ShoppingBag className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="hidden md:inline text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Savat</span>
              </Link>
=======
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </Button>

              {/* Notifications - Desktop */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                className="hidden sm:flex h-10 px-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 items-center gap-2"
              >
                <Link
                  href={sessionUser ? "/favorites" : "/sign-in"}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="hidden md:inline text-sm font-medium">Favorites</span>
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                className="hidden sm:flex h-10 px-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 items-center gap-2"
              >
                <Link
                  href={sessionUser ? "/cart" : "/sign-in"}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="hidden md:inline text-sm font-medium">Cart</span>
                </Link>
              </Button>
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a

              {/* Auth */}
              {sessionUser ? (
                <UserBox user={sessionUser} />
              ) : (
                <Link href="/sign-in">
<<<<<<< HEAD
                  <button
                    className="h-9 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-indigo-500/25"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    <span className="hidden sm:inline">Kirish</span>
                    <User className="w-4 h-4 sm:hidden" />
                  </button>
                </Link>
              )}
=======
                  <Button className="h-10 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 hover:from-purple-500 hover:via-violet-400 hover:to-indigo-400 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all">
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
              )}

              {/* Mobile Logout */}
              {sessionUser && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => signOut()}
                >
                  <LogIn className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </Button>
              )}
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
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
<<<<<<< HEAD
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
=======
                <div className="pb-4 pt-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-3 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  {/* Popular Searches */}
                  <div className="mt-3 flex flex-wrap gap-2">
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
<<<<<<< HEAD
                        className="px-3 py-1.5 text-xs font-medium bg-secondary rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
=======
                        className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
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
