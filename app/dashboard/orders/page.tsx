import { getOrders } from "@/actions/user.action";
import Pagination from "@/components/shared/pagination";
<<<<<<< HEAD
=======
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
import type { SearchParams } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import type { FC } from "react";
<<<<<<< HEAD
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
=======
import { MapPin, Calendar, Clock, Package, CreditCard } from "lucide-react";
import Link from "next/link";

interface Props {
  searchParams: SearchParams;
}

// Helper function to format price
function formatPrice(price: number): string {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "UZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Helper function to get status color
function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "pending confirm":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "confirmed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "shipped":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

// Helper function to get payment status badge
function getPaymentBadge(isPaid: boolean): JSX.Element {
  return isPaid ? (
    <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
      To&apos;langan
    </Badge>
  ) : (
    <Badge className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200">
      Yetkazib berilganda to&apos;lov
    </Badge>
  );
}
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a

const OrdersPage: FC<Props> = async (props) => {
  const searchParams = props.searchParams;
  const res = await getOrders({
    searchQuery: `${searchParams.q || ""}`,
    filter: `${searchParams.filter || ""}`,
    page: `${searchParams.page || "1"}`,
  });

<<<<<<< HEAD
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
          <p className="text-base font-semibold text-foreground mb-1">Hozircha buyurtmalar yo'q</p>
          <p className="text-sm text-muted-foreground mb-5">Sizning buyurtmalaringiz shu yerda ko'rsatiladi</p>
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
                          Manzilni ko'rish
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs">
                      <CreditCard className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#6366f1" }} />
                      {order.isPaid ? (
                        <span className="flex items-center gap-1 text-emerald-500 font-medium"><Check className="w-3 h-3" />To'langan</span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-500 font-medium"><Clock className="w-3 h-3" />Yetkazganda to'lov</span>
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
=======
  if (!res) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium">
            Buyurtmalarni yuklashda xatolik yuz berdi
          </h3>
          <p className="text-muted-foreground mt-2">
            Iltimos, keyinroq qayta urinib ko&apos;ring
          </p>
        </div>
      </div>
    );
  }

  const orders = res?.data?.orders || [];
  const isNext = res?.data?.isNext || false;

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex justify-between items-center w-full mb-6">
        <h1 className="text-2xl font-bold">Mening buyurtmalarim</h1>
      </div>

      <Separator className="my-4" />

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">
            Hozircha buyurtmalar yo&apos;q
          </h3>
          <p className="text-muted-foreground mt-2">
            Sizning buyurtmalaringiz shu yerda ko&apos;rsatiladi
          </p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <Card
              key={order._id}
              className="overflow-hidden hover:shadow-md transition-shadow w-full"
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={order.product.image || "/"}
                  alt={order.product.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={`${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {order.product.title.slice(0, 20).padEnd(10, "...")}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {formatPrice(order.product.price * order.quantity)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.quantity} dona
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Buyurtma:{" "}
                      {format(new Date(order.createdAt), "dd-MMM yyyy")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Vaqt: {format(new Date(order.createdAt), "HH:mm")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="line-clamp-1">
                      Manzil:{" "}
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${order.latitude},${order.longitude}`}
                        target="_blank"
                      >
                        <span className="text-blue-500 hover:underline">
                          Manzilingizni ko&apos;ring
                        </span>
                      </Link>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span>{getPaymentBadge(order.isPaid)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {order.user.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {order.user.fullName}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {order.user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination
          isNext={isNext}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
        />
      </div>
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
    </div>
  );
};

export default OrdersPage;
