"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, ShoppingBag, Heart, LayoutGrid, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Bosh sahifa", icon: Home },
  { href: "/catalog", label: "Katalog", icon: Grid },
  { href: "/cart", label: "Savat", icon: ShoppingBag },
  { href: "/favorites", label: "Sevimlilar", icon: Heart },
  { href: "/category", label: "Kategoriyalar", icon: LayoutGrid },
];

export default function MarketplaceSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 z-40 hidden lg:flex flex-col border-r border-border bg-card/95 backdrop-blur-sm">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            O
          </div>
          <span className="text-base font-bold gradient-text tracking-tight">optim bozor</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Menyu</p>
        {NAV.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
              style={isActive ? {
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
              } : {}}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
              {label}
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/70" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom promo */}
      <div className="p-4 border-t border-border">
        <div className="rounded-2xl p-4 flex flex-col gap-2" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))", border: "1px solid rgba(99,102,241,0.15)" }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold text-foreground">Premium xarid</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">Eng yaxshi narxlar va tez yetkazib berish</p>
          <Link href="/catalog">
            <button className="w-full h-8 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              Xarid qilish
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
