"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import type { FC } from "react";
import { Home, Heart, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const isActivePath = (pathname: string | null, href: string) => {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};

const MobileBottomBar: FC = () => {
  const pathname = usePathname();
  const { data } = useSession();
  const sessionUser = data?.user;

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: sessionUser ? "/favorites" : "/sign-in", icon: Heart, label: "Favorites" },
    { href: sessionUser ? "/cart" : "/sign-in", icon: ShoppingBag, label: "Cart" },
    { href: sessionUser ? "/dashboard" : "/sign-in", icon: User, label: sessionUser ? "Profile" : "Sign In" },
  ];

  return (
    <>
      {/* Fixed bottom nav (mobile only) */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
        aria-label="Mobile navigation"
      >
        <div className="max-w-screen-xl mx-auto px-2">
          <ul className="grid grid-cols-4 h-16">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);
              const Icon = item.icon;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative flex flex-col items-center justify-center gap-0.5 h-full"
                    aria-current={isActive ? "page" : undefined}
                    aria-label={item.label}
                  >
                    <div className="relative">
                      {isActive && (
                        <motion.div
                          layoutId="mobileNavIndicator"
                          className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <Icon
                        className={cn(
                          "w-6 h-6 relative transition-colors",
                          isActive
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-gray-400 dark:text-gray-500"
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-medium transition-colors",
                        isActive
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-500 dark:text-gray-400"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Spacer */}
      <div className="lg:hidden h-16" aria-hidden="true" />
    </>
  );
};

export default MobileBottomBar;
