"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import type { FC } from "react";
import { Home, Heart, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MobileBottomBar: FC = () => {
  const pathname = usePathname();
  const { data } = useSession();
  const sessionUser = data?.user;

  const navItems = [
    { href: "/", icon: Home, label: "Asosiy" },
    {
      href: sessionUser ? "/favorites" : "/sign-in",
      icon: Heart,
      label: "Sevimli",
    },
    {
      href: sessionUser ? "/cart" : "/sign-in",
      icon: ShoppingBag,
      label: "Savat",
    },
    {
      href: sessionUser ? "/dashboard" : "/sign-in",
      icon: User,
      label: sessionUser ? "Profil" : "Kirish",
    },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-screen-xl mx-auto px-2">
          <ul className="grid grid-cols-4 h-15">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="relative flex flex-col items-center justify-center gap-1 h-full py-2"
                  >
                    <div className="relative">
                      {active && (
                        <motion.div
                          layoutId="mobileNavIndicator"
                          className="absolute -inset-2 rounded-xl"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <item.icon
                        className={cn(
                          "w-5 h-5 relative transition-colors",
                          active ? "" : "text-muted-foreground",
                        )}
                        style={active ? { color: "#6366f1" } : {}}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-medium transition-colors",
                        active ? "" : "text-muted-foreground",
                      )}
                      style={active ? { color: "#6366f1" } : {}}
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
      <div className="lg:hidden h-15" aria-hidden="true" />
    </>
  );
};

export default MobileBottomBar;
