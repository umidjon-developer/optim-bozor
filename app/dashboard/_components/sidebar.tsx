"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardSidebar } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
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
          const isActive = pathname === item.route;
          return (
            <Link key={item.route} href={item.route}>
              <motion.div
                className={cn(
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
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Back link */}
      <div className="p-4 border-t border-border">
        <Link href="/" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-150">
          <ArrowLeft className="w-4 h-4" />
          Do'konga qaytish
        </Link>
        <p className="text-[11px] text-muted-foreground/50 text-center mt-3">© 2025 Optim Bozor</p>
      </div>
    </aside>
  );
};

export default Sidebar;
