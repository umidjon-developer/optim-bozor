import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { getProduct } from '@/actions/user.action'
import type { Params } from '@/types'
import { notFound } from 'next/navigation'
import AddToCartButton from '../_components/AddToCartButton'
import CustomImage from '@/components/shared/custom-image'
import { FC } from 'react'
import HearComponent from '../../_components/HearComponent'
import { Store, Mail, Phone, ShieldCheck, Truck, RotateCcw, Star, ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import NoSSR from '@/components/shared/NoSSR'

interface Props { params: Params }

export async function generateMetadata({ params }: Props) {
  const { productId } = params
  const res = await getProduct({ id: productId })
  const product = res?.data?.product
  return { title: product?.title, description: product?.description, openGraph: { images: product?.image } }
}

const Page: FC<Props> = async ({ params }: Props) => {
  const { productId } = await params
  const res = await getProduct({ id: productId })
  const product = res?.data?.product
  if (!product) return notFound()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
          <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="w-3 h-3" />Bosh sahifa
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-foreground cursor-pointer transition-colors">{product?.category?.name}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium truncate max-w-[180px]">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-premium aspect-square">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(99,102,241,0.04), transparent 60%)" }} />
              <div className="absolute top-4 right-4 z-10">
                <HearComponent productId={productId} />
              </div>
              <CustomImage src={product.image || '/placeholder.svg'} className="object-contain mx-auto p-8" alt={product.title} />
            </div>
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: 'Sifat kafolati', color: '#22c55e' },
                { icon: Truck, label: 'Tez yetkazish', color: '#6366f1' },
                { icon: RotateCcw, label: 'Qaytarish', color: '#f59e0b' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border text-center">
                  <Icon className="w-5 h-5" style={{ color }} />
                  <span className="text-xs text-muted-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-card border border-border shadow-premium p-6 sm:p-8 flex flex-col gap-5">
              {/* Category */}
              {product?.category?.name && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold w-fit" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}>
                  {product.category.name}
                </span>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-sm text-muted-foreground">(4.8) · 120 sharh</span>
              </div>

              <div className="h-px bg-border" />

              {/* Price */}
              <NoSSR>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold gradient-text">{formatPrice(+product.price)}</span>
                </div>
              </NoSSR>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Tavsif</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="h-px bg-border" />

              {/* Add to cart */}
              <AddToCartButton productId={product._id} selleronId={product?.userId?._id} />
            </div>

            {/* Seller card */}
            <div className="rounded-3xl bg-card border border-border shadow-premium p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))", border: "1px solid rgba(99,102,241,0.2)" }}>
                  <Store className="w-4 h-4" style={{ color: "#6366f1" }} />
                </div>
                <h2 className="text-sm font-semibold text-foreground">Sotuvchi ma&apos;lumoti</h2>
              </div>

              <div className="flex items-center gap-4">
                {product?.userId?.phone1 ? (
                  <Image src={product.userId.phone1} width={52} height={52} className="rounded-2xl object-cover ring-2 ring-border" alt={product?.userId?.fullName} />
                ) : (
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-base font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                    {product?.userId?.fullName?.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-foreground">{product?.userId?.fullName}</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
                      <ShieldCheck className="w-2.5 h-2.5" />Tasdiqlangan
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1.5">
                    {product?.userId?.email && (
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" style={{ color: "#6366f1" }} />{product.userId.email}
                      </span>
                    )}
                    {product?.userId?.phone1 && (
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" style={{ color: "#6366f1" }} />{product.userId.phone1}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
