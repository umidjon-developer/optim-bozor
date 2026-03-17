'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/actions/user.action'
import { toast } from '@/hooks/use-toast'
import { ShoppingCart, Loader2, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
				description: "Mahsulot savatga qo'shildi",
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
}
