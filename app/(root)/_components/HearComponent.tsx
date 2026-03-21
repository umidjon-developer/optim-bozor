'use client'
import React, { MouseEvent, useEffect, useState } from 'react'
import { Heart, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useAction from '@/hooks/use-action'
import { toast } from 'react-toastify'
import { addFavorite } from '@/actions/user.action'

function HearComponent({ productId }: { productId: string }) {
	const { isLoading, onError, setIsLoading } = useAction()
	const [isFavorite, setIsFavorite] = useState<boolean>(false)

	useEffect(() => {
		const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
		if (favs.includes(productId)) {
			setIsFavorite(true)
		}
	}, [productId])

	const onFavourite = async (e: MouseEvent) => {
		e.preventDefault()
		setIsLoading(true)
		const res = await addFavorite({ id: productId })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			setIsLoading(false)
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success("Siz mahsulot saralanganlarga qo&apos;shdingiz")
			setIsFavorite(true)
			const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
			if (!favs.includes(productId)) {
				localStorage.setItem('favorites', JSON.stringify([...favs, productId]))
			}
		}
		setIsLoading(false)
	}

	return (
		<Button
			size='icon'
			disabled={isLoading}
			onClick={onFavourite}
			aria-label='Add to favorites'
			className={`
				w-12 h-12 rounded-full 
				backdrop-blur-xl 
				shadow-lg 
				transition-all duration-300 
				hover:scale-110 
				active:scale-95
				border-0
				${isFavorite 
					? 'bg-gradient-to-br from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-500/25' 
					: 'bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 shadow-slate-500/10'
				}
			`}
		>
			{isLoading ? (
				<Loader2 className='w-5 h-5 animate-spin text-white' />
			) : (
				<Heart 
					className={`w-5 h-5 transition-all duration-300 ${
						isFavorite 
							? 'fill-white text-white' 
							: 'fill-none text-slate-600 dark:text-slate-300 hover:text-rose-500'
					}`} 
				/>
			)}
		</Button>
	)
}

export default HearComponent
