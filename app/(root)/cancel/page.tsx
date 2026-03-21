"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center max-w-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <XCircle className="w-12 h-12 text-rose-500" />
        </motion.div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Buyurtma bekor qilindi</h1>
        <p className="text-muted-foreground text-sm mb-8">Buyurtmangiz bekor qilindi. Savatingiz saqlanib qoldi.</p>
        <div className="flex gap-3">
          <Link href="/cart">
            <button className="flex items-center gap-2 h-11 px-5 rounded-xl font-semibold text-sm border border-border hover:bg-secondary transition-colors text-foreground">
              <ArrowLeft className="w-4 h-4" />Savatga qaytish
            </button>
          </Link>
          <Link href="/">
            <button className="flex items-center gap-2 h-11 px-5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-all" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <ShoppingBag className="w-4 h-4" />Xarid qilish
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
