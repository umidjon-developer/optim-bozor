'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const Loading = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/30'>
			<div className='container mx-auto px-4 py-8 max-w-7xl'>
				{/* Breadcrumb Skeleton */}
				<div className='flex items-center gap-2 mb-6'>
					<Skeleton className='h-4 w-20 bg-slate-200/50 dark:bg-slate-800/50' />
					<Skeleton className='h-4 w-1 bg-slate-200/50 dark:bg-slate-800/50' />
					<Skeleton className='h-4 w-24 bg-slate-200/50 dark:bg-slate-800/50' />
					<Skeleton className='h-4 w-1 bg-slate-200/50 dark:bg-slate-800/50' />
					<Skeleton className='h-4 w-32 bg-slate-200/50 dark:bg-slate-800/50' />
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
					{/* Product Image Section Skeleton */}
					<div className='relative'>
						{/* Image Container */}
						<div className='relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl shadow-purple-500/5 border border-white/50 dark:border-slate-800/50'>
							{/* Gradient Overlay */}
							<div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 pointer-events-none' />
							
							{/* Favorite Button Skeleton */}
							<div className='absolute top-4 right-4 z-10'>
								<Skeleton className='w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800/50' />
							</div>

							{/* Product Image Skeleton */}
							<Skeleton className='w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-slate-200/50 dark:bg-slate-800/50' />
						</div>

						{/* Trust Badges Skeleton */}
						<div className='grid grid-cols-3 gap-3 mt-4'>
							{[1, 2, 3].map((i) => (
								<div 
									key={i}
									className='flex flex-col items-center gap-1.5 p-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border border-white/50 dark:border-slate-800/50'
								>
									<Skeleton className='w-5 h-5 rounded-full bg-slate-200/50 dark:bg-slate-800/50' />
									<Skeleton className='h-3 w-16 bg-slate-200/50 dark:bg-slate-800/50' />
								</div>
							))}
						</div>
					</div>

					{/* Product Details Section Skeleton */}
					<div className='flex flex-col'>
						<Card className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/50 dark:border-slate-800/50 shadow-xl shadow-purple-500/5 rounded-2xl overflow-hidden'>
							<CardContent className='p-6 sm:p-8'>
								{/* Category Badge Skeleton */}
								<Skeleton className='h-6 w-24 rounded-full bg-slate-200/50 dark:bg-slate-800/50 mb-4' />

								{/* Title Skeleton */}
								<Skeleton className='h-10 w-3/4 bg-slate-200/50 dark:bg-slate-800/50 mb-4' />

								{/* Rating Skeleton */}
								<div className='flex items-center gap-2 mb-4'>
									<div className='flex items-center gap-1'>
										{[1, 2, 3, 4, 5].map((star) => (
											<Skeleton key={star} className='w-4 h-4 rounded bg-slate-200/50 dark:bg-slate-800/50' />
										))}
									</div>
									<Skeleton className='h-4 w-24 bg-slate-200/50 dark:bg-slate-800/50' />
								</div>

								<Separator className='my-6 bg-slate-200/50 dark:bg-slate-700/50' />

								{/* Price Skeleton */}
								<Skeleton className='h-12 w-40 bg-slate-200/50 dark:bg-slate-800/50 mb-6' />

								{/* Description Skeleton */}
								<div className='mb-8'>
									<Skeleton className='h-6 w-20 bg-slate-200/50 dark:bg-slate-800/50 mb-2' />
									<div className='space-y-2'>
										<Skeleton className='h-4 w-full bg-slate-200/50 dark:bg-slate-800/50' />
										<Skeleton className='h-4 w-full bg-slate-200/50 dark:bg-slate-800/50' />
										<Skeleton className='h-4 w-3/4 bg-slate-200/50 dark:bg-slate-800/50' />
									</div>
								</div>

								<Separator className='my-6 bg-slate-200/50 dark:bg-slate-700/50' />

								{/* Add to Cart Button Skeleton */}
								<Skeleton className='h-14 w-full rounded-xl bg-slate-200/50 dark:bg-slate-800/50' />
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Seller Information Skeleton */}
				<Card className='mt-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/50 dark:border-slate-800/50 shadow-xl shadow-purple-500/5 rounded-2xl overflow-hidden'>
					<CardContent className='p-6 sm:p-8'>
						<div className='flex items-center gap-3 mb-6'>
							<Skeleton className='w-10 h-10 rounded-xl bg-slate-200/50 dark:bg-slate-800/50' />
							<Skeleton className='h-6 w-40 bg-slate-200/50 dark:bg-slate-800/50' />
						</div>
						
						<div className='flex flex-col sm:flex-row sm:items-center gap-6'>
							{/* Seller Avatar Skeleton */}
							<div className='flex items-center gap-4'>
								<Skeleton className='w-16 h-16 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50' />
								<div className='space-y-2'>
									<Skeleton className='h-5 w-32 bg-slate-200/50 dark:bg-slate-800/50' />
									<Skeleton className='h-4 w-24 bg-slate-200/50 dark:bg-slate-800/50' />
								</div>
							</div>

							<Separator orientation='vertical' className='hidden sm:block h-16' />

							{/* Contact Info Skeleton */}
							<div className='flex flex-wrap gap-4 sm:gap-6'>
								<Skeleton className='h-5 w-40 bg-slate-200/50 dark:bg-slate-800/50' />
								<Skeleton className='h-5 w-32 bg-slate-200/50 dark:bg-slate-800/50' />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default Loading
