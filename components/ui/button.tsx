import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border-2 rounded-xl border-gray-200 dark:border-gray-700 bg-background hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400',
				link: 'text-primary underline-offset-4 hover:underline',
				// Premium gradient variant
				gradient:
					'bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:from-purple-500 hover:via-violet-400 hover:to-indigo-400',
				// Gradient outline variant
				gradientOutline:
					'border-2 border-transparent bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 bg-clip-text text-transparent hover:from-purple-500 hover:via-violet-400 hover:to-indigo-400 [background-image:linear-gradient(white,white),linear-gradient(135deg,#8B5CF6,#6366F1,#3B82F6)] [background-clip:padding-box,border-box] dark:[background-image:linear-gradient(hsl(224_71.4%_4.1%),hsl(224_71.4%_4.1%)),linear-gradient(135deg,#8B5CF6,#6366F1,#3B82F6)]',
				// Glow variant
				glow:
					'bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02]',
				// Premium subtle variant
				premium:
					'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-premium hover:shadow-premium-hover border border-gray-200/50 dark:border-gray-700/50',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-8 rounded-lg px-3 text-xs',
				lg: 'h-12 rounded-xl px-8 text-base',
				xl: 'h-14 rounded-2xl px-10 text-lg',
				icon: 'h-10 w-10',
				smIcon: 'h-8 w-8',
				lgIcon: 'h-12 w-12',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
