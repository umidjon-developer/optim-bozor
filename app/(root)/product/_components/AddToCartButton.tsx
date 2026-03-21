'use client'

import { useState } from 'react'
import { addToCart } from '@/actions/user.action'
import { toast } from '@/hooks/use-toast'
import { ShoppingCart, Loader2, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

interface Props {
  productId: string
  selleronId: string
}

export default function AddToCartButton({ productId, selleronId }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const handleAdd = async () => {
    if (!session?.user) {
      toast({ title: 'Kirish kerak', description: "Savatga qo'shish uchun tizimga kiring", variant: 'destructive' })
      router.push('/sign-in')
      return
    }

    setIsLoading(true)
    try {
      const result = await addToCart({ productId, quantity: 1, selleronId })
      if (result?.failure) {
        toast({ title: 'Xatolik', description: result.failure, variant: 'destructive' })
      } else {
        setIsSuccess(true)
        toast({ title: 'Muvaffaqiyatli', description: "Mahsulot savatga qo'shildi ✓" })
        router.refresh()
        setTimeout(() => setIsSuccess(false), 2000)
      }
    } catch {
      toast({ title: 'Xatolik', description: 'Qandaydir xatolik yuz berdi', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.button
      onClick={handleAdd}
      disabled={isLoading}
      className="w-full h-13 rounded-xl font-semibold text-base text-white flex items-center justify-center gap-2.5 transition-all duration-200 hover:opacity-90 disabled:opacity-60 relative overflow-hidden"
      style={{
        background: isSuccess
          ? "linear-gradient(135deg, #22c55e, #16a34a)"
          : "linear-gradient(135deg, #6366f1, #8b5cf6)",
        boxShadow: isSuccess
          ? "0 4px 20px rgba(34,197,94,0.35)"
          : "0 4px 20px rgba(99,102,241,0.35)",
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {isLoading ? (
        <><Loader2 className="w-5 h-5 animate-spin" />Qo&apos;shilmoqda...</>
      ) : isSuccess ? (
        <><Check className="w-5 h-5" />Savatga qo&apos;shildi!</>
      ) : (
        <><ShoppingCart className="w-5 h-5" />Savatga qo&apos;shish</>
      )}
    </motion.button>
  )
}
