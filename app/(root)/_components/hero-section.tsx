"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Zap, Truck, Shield, Star, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-22 lg:py-28">
      {/* Soft mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl" style={{ background: "radial-gradient(circle, #6366f1, #8b5cf6)" }} />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl" style={{ background: "radial-gradient(circle, #a78bfa, #7c3aed)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.03] blur-3xl" style={{ background: "radial-gradient(ellipse, #6366f1, transparent)" }} />
      </div>

      <div className="container relative mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            className="flex flex-col space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit mx-auto lg:mx-0"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                O'zbekistonning premium bozori
              </span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Eng yaxshi{" "}
                <span className="gradient-text">mahsulotlar</span>{" "}
                bir joyda
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Ishonchli sotuvchilar, tez yetkazib berish va qulay narxlar. Optim Bozor — sizning eng yaxshi xarid tajribangiz.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/catalog">
                <motion.button
                  className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:shadow-xl group"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Xarid qilish
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/catalog">
                <motion.button
                  className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-semibold text-sm border-2 border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-foreground"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Katalogni ko'rish
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { num: "10K+", label: "Mahsulotlar", color: "#6366f1" },
                { num: "50K+", label: "Mijozlar", color: "#8b5cf6" },
                { num: "99%", label: "Mamnunlik", color: "#a78bfa" },
              ].map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold" style={{ color: s.color }}>{s.num}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Floating Cards Illustration */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative w-80 h-80">
              {/* Central circle */}
              <div className="absolute inset-8 rounded-full" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.15))", border: "1px solid rgba(99,102,241,0.15)" }} />

              {[
                { icon: ShoppingBag, color: "#6366f1", top: "8%", right: "5%", delay: 0 },
                { icon: Shield, color: "#22c55e", bottom: "15%", left: "5%", delay: 0.5 },
                { icon: Truck, color: "#f59e0b", top: "45%", right: "-5%", delay: 1 },
                { icon: Star, color: "#ec4899", top: "5%", left: "20%", delay: 1.5 },
              ].map(({ icon: Icon, color, delay, ...pos }, i) => (
                <motion.div
                  key={i}
                  className="absolute p-4 rounded-2xl shadow-lg"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: `0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)`,
                    ...pos
                  }}
                  animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay }}
                >
                  <Icon className="w-8 h-8" style={{ color }} />
                </motion.div>
              ))}

              {/* Trust badge */}
              <motion.div
                className="absolute bottom-0 right-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-foreground">Ishonchli platforma</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
