"use client";
<<<<<<< HEAD
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardSidebar } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronRight } from "lucide-react";
=======

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { dashboardSidebar } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeft } from "lucide-react";
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
import { motion } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
<<<<<<< HEAD
  return (
    <aside className="sticky top-0 left-0 h-screen w-60 flex flex-col border-r border-border bg-card/95 backdrop-blur-sm">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>O</div>
          <span className="text-base font-bold gradient-text tracking-tight">optim bozor</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Dashboard</p>
        {dashboardSidebar.map((item, i) => {
=======

  return (
    <aside className="sticky top-0 left-0 h-screen w-64 flex flex-col border-r border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
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

      {/* Dashboard Header */}
      <div className="p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
            <LayoutDashboard className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
        </div>
      </div>

      <Separator className="mx-4" />

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
        {dashboardSidebar.map((item, index) => {
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
          const isActive = pathname === item.route;
          return (
            <Link key={item.route} href={item.route}>
              <motion.div
                className={cn(
<<<<<<< HEAD
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive ? "text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
                style={isActive ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" } : {}}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-white" : "")} />
                <span>{item.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/70" />}
=======
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-700 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive && "text-purple-600 dark:text-purple-400"
                  )}
                />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600"
                    layoutId="activeDashboardIndicator"
                  />
                )}
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
              </motion.div>
            </Link>
          );
        })}
      </nav>

<<<<<<< HEAD
      {/* Back link */}
      <div className="p-4 border-t border-border">
        <Link href="/" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-150">
          <ArrowLeft className="w-4 h-4" />
          Do'konga qaytish
        </Link>
        <p className="text-[11px] text-muted-foreground/50 text-center mt-3">© 2025 Optim Bozor</p>
=======
      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Button>
        </Link>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">
          © 2025 Optim Bozor
        </p>
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
      </div>
    </aside>
  );
};

export default Sidebar;
