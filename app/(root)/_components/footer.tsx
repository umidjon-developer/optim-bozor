import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const SOCIAL_LINKS = [
  { href: "https://instagram.com/optimbozor", label: "Instagram", icon: "IG", color: "#E1306C" },
  { href: "https://t.me/optimbozor_2025", label: "Telegram", icon: "TG", color: "#229ED9" },
  { href: "https://facebook.com/optimbozor", label: "Facebook", icon: "FB", color: "#1877F2" },
  { href: "https://youtube.com/@optimbozor", label: "YouTube", icon: "YT", color: "#FF0000" },
];

const CATEGORIES = ["Elektr asboblar", "Qurilish materiallari", "Bog'-tomorqa anjomlari", "Uy anjomlari", "Avtomobil ehtiyot qismlari", "Sport anjomlari"];
const CUSTOMER = ["Yetkazib berish", "To'lov usullari", "Qaytarish va almashtirish", "Yordam markazi", "Bizning do'konlarimiz", "Aloqa"];

export default function Footer() {
  return (
    <footer className="bg-gray-950 dark:bg-[#050812] text-white mt-16">
      {/* Top CTA strip */}
      <div
        className="py-8 px-4"
        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white text-base">Yangi mahsulotlardan birinchi xabar toping</p>
            <p className="text-sm text-white/50 mt-0.5">Maxsus takliflar va chegirmalar haqida bilib oling</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Email manzilingiz"
              className="flex-1 md:w-64 px-4 py-2.5 text-sm rounded-xl bg-white/8 border border-white/10 text-white placeholder:text-white/35 outline-none focus:border-indigo-500/60 transition-colors"
            />
            <button
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              Obuna
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              O
            </div>
            <span className="text-lg font-bold tracking-tight">optim bozor</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            O'zbekistondagi eng yaxshi onlayn do'kon. Sifatli mahsulotlar, tez yetkazib berish va qulay narxlar.
          </p>
          <div className="space-y-2.5">
            {[
              { icon: Phone, text: "+998 (90) 123-45-67" },
              { icon: Mail, text: "info@optimbozor.uz" },
              { icon: MapPin, text: "Toshkent, O'zbekiston" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-sm text-white/50">
                <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#6366f1" }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
          {/* Socials */}
          <div className="flex gap-2 pt-1">
            {SOCIAL_LINKS.map(({ href, label, icon, color }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white transition-all hover:scale-110"
                style={{ background: `${color}20`, border: `1px solid ${color}30` }}
              >
                <span style={{ color }}>{icon}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Kategoriyalar</h4>
          <ul className="space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link href="#" className="text-sm text-white/45 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#6366f1" }} />
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Mijozlar uchun</h4>
          <ul className="space-y-2.5">
            {CUSTOMER.map((c) => (
              <li key={c}>
                <Link href="#" className="text-sm text-white/45 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#6366f1" }} />
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust badges */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Nima uchun biz?</h4>
          <div className="space-y-3">
            {[
              { title: "Ishonchli sotuvchilar", desc: "Barcha sotuvchilar tekshirilgan" },
              { title: "Tez yetkazib berish", desc: "Buxoro bo'ylab 1 kunda" },
              { title: "Xavfsiz to'lov", desc: "100% himoyalangan" },
              { title: "24/7 qo'llab-quvvatlash", desc: "Doim yordam beramiz" },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#6366f1" }} />
                <div>
                  <p className="text-sm font-medium text-white/70">{title}</p>
                  <p className="text-xs text-white/35">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/6">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30">© 2025 Optim Bozor. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-5">
            {["Maxfiylik siyosati", "Foydalanish shartlari", "Sayt xaritasi"].map((t) => (
              <Link key={t} href="#" className="text-xs text-white/30 hover:text-white/70 transition-colors">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
