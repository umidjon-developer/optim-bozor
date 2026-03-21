<<<<<<< HEAD
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, Home, Package } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-md"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(16,185,129,0.12))", border: "1px solid rgba(34,197,94,0.25)" }}
        >
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h1 className="text-2xl font-bold text-foreground mb-2">Buyurtma qabul qilindi!</h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Buyurtmangiz muvaffaqiyatli yuborildi. Sotuvchi siz bilan tez orada bog'lanadi.
          </p>

          <div
            className="flex items-center gap-3 p-4 rounded-2xl mb-6 text-left"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.06))", border: "1px solid rgba(99,102,241,0.15)" }}
          >
            <Package className="w-5 h-5 flex-shrink-0" style={{ color: "#6366f1" }} />
            <div>
              <p className="text-sm font-semibold text-foreground">Buyurtmangiz jarayonda</p>
              <p className="text-xs text-muted-foreground mt-0.5">Yetkazib berish vaqti: 1–3 ish kuni</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/orders">
              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}
              >
                <ShoppingBag className="w-4 h-4" />
                Buyurtmalarni ko'rish
              </button>
            </Link>
            <Link href="/">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-semibold text-sm border border-border hover:bg-secondary transition-colors text-foreground">
                <Home className="w-4 h-4" />
                Bosh sahifa
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
=======
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

const Successfully = () => {
	return (
		<div className='flex justify-center items-center w-full h-[80vh]'>
			<div className='relative p-4 w-full max-w-md h-full md:h-auto'>
				<div className='relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
					<div className='w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5'>
						<Check />
					</div>
					<p className='mb-4 text-lg text-gray-900 dark:text-white'>
						Sizga tez orada mahsulotiz yetkazib beriladi
					</p>
					<Button asChild>
						<Link href={'/dashboard'}>
							<span>Back to home</span>
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Successfully
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
