import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, title: "100% Xavfsiz", desc: "Barcha to'lovlar himoyalangan", color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.18)" },
  { icon: Truck, title: "Tez yetkazish", desc: "Buxoro bo'ylab 1 kunda", color: "#6366f1", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.18)" },
  { icon: RotateCcw, title: "Oson qaytarish", desc: "14 kun ichida qaytaring", color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.18)" },
  { icon: Headphones, title: "24/7 Qo'llab-quvvatlash", desc: "Doim yordam beramiz", color: "#8b5cf6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.18)" },
];

export default function TrustBadges() {
  return (
    <section className="py-10">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES.map(({ icon: Icon, title, desc, color, bg, border }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-card border border-border shadow-premium hover:shadow-premium-hover transition-all duration-200 hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: bg, border: `1px solid ${border}` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
