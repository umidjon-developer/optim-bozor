'use client'

import { useState } from 'react'
<<<<<<< HEAD
=======
import { Button } from '@/components/ui/button'
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
import { addToCart } from '@/actions/user.action'
import { toast } from '@/hooks/use-toast'
import { ShoppingCart, Loader2, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
<<<<<<< HEAD
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
        <><Loader2 className="w-5 h-5 animate-spin" />Qo'shilmoqda...</>
      ) : isSuccess ? (
        <><Check className="w-5 h-5" />Savatga qo'shildi!</>
      ) : (
        <><ShoppingCart className="w-5 h-5" />Savatga qo'shish</>
      )}
    </motion.button>
  )
=======

interface Props {
	productId: string
	selleronId: string
}

export default function AddToCartButton({ productId, selleronId }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const router = useRouter()

	const handleAdd = async () => {
		setIsLoading(true)
		try {
			await addToCart({ productId, quantity: 1, selleronId })
			setIsSuccess(true)
			toast({
				title: 'Muvaffaqiyatli',
				description: "Mahsulot savatga qo&apos;shildi",
			})
			router.refresh()
			setTimeout(() => setIsSuccess(false), 2000)
		} catch {
			toast({
				title: 'Xatolik',
				description: 'Qandaydir xatolik yuz berdi',
				variant: 'destructive',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='space-y-4'>
			{/* Quantity Selector - Future Enhancement */}
			<div className='flex items-center gap-4'>
				<Button
					onClick={handleAdd}
					disabled={isLoading}
					className='w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]'
				>
					{isLoading ? (
						<>
							<Loader2 className='w-5 h-5 mr-2 animate-spin' />
							Qo&apos;shilmoqda...
						</>
					) : isSuccess ? (
						<>
							<Check className='w-5 h-5 mr-2' />
							Qo&apos;shildi!
						</>
					) : (
						<>
							<ShoppingCart className='w-5 h-5 mr-2' />
							Savatga qo&apos;shish
						</>
					)}
				</Button>
			</div>
		</div>
	)
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
}
