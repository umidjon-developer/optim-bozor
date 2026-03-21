import { getOrders } from "@/actions/user.action";
import Pagination from "@/components/shared/pagination";
import type { SearchParams } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import type { FC } from "react";
import { MapPin, Calendar, Package, CreditCard, ShoppingBag, Check, Clock } from "lucide-react";
import Link from "next/link";

interface Props { searchParams: SearchParams }

function formatPrice(price: number) {
  return new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "UZS", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  "pending confirm": { bg: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  confirmed:         { bg: "rgba(99,102,241,0.1)",  color: "#6366f1", border: "rgba(99,102,241,0.25)" },
  shipped:           { bg: "rgba(139,92,246,0.1)",  color: "#8b5cf6", border: "rgba(139,92,246,0.25)" },
  delivered:         { bg: "rgba(34,197,94,0.1)",   color: "#22c55e", border: "rgba(34,197,94,0.25)" },
  cancelled:         { bg: "rgba(239,68,68,0.1)",   color: "#ef4444", border: "rgba(239,68,68,0.25)" },
};
function getStatus(s: string) { return STATUS_STYLE[s?.toLowerCase()] || { bg: "rgba(100,116,139,0.1)", color: "#64748b", border: "rgba(100,116,139,0.25)" }; }

const OrdersPage: FC<Props> = async (props) => {
  const searchParams = props.searchParams;
  const res = await getOrders({
    searchQuery: `${searchParams.q || ""}`,
    filter: `${searchParams.filter || ""}`,
    page: `${searchParams.page || "1"}`,
  });
  if (!res) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Buyurtmalarni yuklashda xatolik</p>
    </div>
  );

  const orders = (res as any)?.data?.orders || [];
  const isNext = (res as any)?.data?.isNext || false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))", border: "1px solid rgba(99,102,241,0.2)" }}>
          <ShoppingBag className="w-5 h-5" style={{ color: "#6366f1" }} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">Mening buyurtmalarim</h1>
          <p className="text-sm text-muted-foreground">{orders.length} ta buyurtma</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-card border border-border">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
            <Package className="w-8 h-8" style={{ color: "#6366f1" }} />
          </div>
          <p className="text-base font-semibold text-foreground mb-1">Hozircha buyurtmalar yo&apos;q</p>
          <p className="text-sm text-muted-foreground mb-5">Sizning buyurtmalaringiz shu yerda ko&apos;rsatiladi</p>
          <Link href="/">
            <button className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              Xarid qilish
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order: any) => {
            const s = getStatus(order.status);
            return (
              <div key={order._id} className="rounded-2xl bg-card border border-border shadow-premium overflow-hidden hover:shadow-premium-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
                {/* Image */}
                <div className="relative h-44 bg-secondary/30">
                  <Image src={order.product.image || "/"} alt={order.product.title} fill className="object-cover" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 flex-1">{order.product.title}</h3>
                    <p className="text-sm font-bold gradient-text whitespace-nowrap">{formatPrice(order.product.price * order.quantity)}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{order.quantity} ta mahsulot</p>

                  <div className="h-px bg-border" />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#6366f1" }} />
                      <span>{format(new Date(order.createdAt), "dd MMM yyyy")} · {format(new Date(order.createdAt), "HH:mm")}</span>
                    </div>
                    {order.latitude && order.longitude && (
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#6366f1" }} />
                        <Link href={`https://www.google.com/maps/search/?api=1&query=${order.latitude},${order.longitude}`} target="_blank" className="text-indigo-500 hover:text-indigo-600 transition-colors">
                          Manzilni ko&apos;rish
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs">
                      <CreditCard className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#6366f1" }} />
                      {order.isPaid ? (
                        <span className="flex items-center gap-1 text-emerald-500 font-medium"><Check className="w-3 h-3" />To&apos;langan</span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-500 font-medium"><Clock className="w-3 h-3" />Yetkazganda to&apos;lov</span>
                      )}
                    </div>
                  </div>

                  {/* User info */}
                  <div className="flex items-center gap-2.5 pt-1 border-t border-border">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                      {order.user.fullName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{order.user.fullName}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{order.user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {orders.length > 0 && (
        <Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />
      )}
    </div>
  );
};

export default OrdersPage;
