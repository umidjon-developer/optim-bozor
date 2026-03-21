"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Map,
<<<<<<< HEAD
  Loader2,
  ShoppingBag,
  ArrowLeft,
  Package,
} from "lucide-react";
=======
  Loader,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
import CreateOrderButton from "../product/_components/create-order.btn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import dynamic from "next/dynamic";
const MapUser = dynamic(() => import("./_components/map"), { ssr: false });
<<<<<<< HEAD
=======
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
import {
  addOrdersZakaz,
  addToCart,
  removeFromCart,
} from "@/actions/user.action";
import { useRouter } from "next/navigation";
import Link from "next/link";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";

type Seller = { _id: string; fullName: string; email: string; phone?: string };
type Product = {
  productId: {
    _id: string;
    userId: object;
=======

type Seller = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
};

type Product = {
  productId: {
    _id: string;
    userId: object; // Assuming userId is an object, you can define this more precisely if needed.
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    imageKey: string;
    createdAt: string;
    updatedAt: string;
  };
  quantity: number;
  selleronId: Seller;
  _id: string;
};
<<<<<<< HEAD
type CartProps = { products: Product[] };
=======

type CartProps = {
  products: Product[]; // This would be the array of products in the cart.
};

>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
type LocationData = {
  lat: string;
  lng: string;
  address?: string;
  isInBukhara: boolean;
  totalPrice: number;
};

<<<<<<< HEAD
function formatPrice(price: number) {
=======
function formatPrice(price: number): string {
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "UZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function groupBySeller(products: Product[]) {
  if (!Array.isArray(products)) return {};
<<<<<<< HEAD
  const grouped: Record<string, { seller: Seller; items: Product[] }> = {};
  products.forEach((item) => {
    const seller = item.selleronId;
    const sellerId = seller._id;
    if (!grouped[sellerId]) grouped[sellerId] = { seller, items: [] };
    grouped[sellerId].items.push(item);
  });
=======

  const grouped: Record<string, { seller: Seller; items: Product[] }> = {};

  products.forEach((item) => {
    const seller = item.selleronId;
    const sellerId = seller._id;

    if (!grouped[sellerId]) {
      grouped[sellerId] = {
        seller: seller,
        items: [],
      };
    }
    grouped[sellerId].items.push(item);
  });

>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
  return grouped;
}

const CartPage: React.FC<CartProps> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
<<<<<<< HEAD
    null,
=======
    null
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
  );
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLocationSelect = (location: LocationData | null) => {
<<<<<<< HEAD
    if (location) setSelectedLocation(location);
  };
  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center max-w-sm"
        >
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <ShoppingBag className="w-12 h-12" style={{ color: "#6366f1" }} />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Savat bo'sh
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Hali hech qanday mahsulot qo'shilmagan. Xarid qilishni boshlang!
          </p>
          <Link href="/">
            <button
              className="flex items-center gap-2 h-11 px-6 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              Xarid qilish
            </button>
          </Link>
        </motion.div>
=======
    if (location) {
      setSelectedLocation(location);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-16">
        {/* Gradient background */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 rounded-full blur-3xl" />
          
          {/* Icon container */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 dark:text-purple-500" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Your cart is empty
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
          Looks like you haven&apos;t added any products yet. Start shopping to fill your cart!
        </p>

        <Link href={"/"}>
          <Button variant="gradient" className="rounded-xl font-medium">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Browse Products
          </Button>
        </Link>
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
      </div>
    );
  }

  async function updateQuantity(productId: string, newQuantity: number) {
    if (newQuantity < 1) return;
<<<<<<< HEAD
    const product = products.find((p) => p._id === productId);
    if (!product) return;
    try {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, quantity: newQuantity } : p,
        ),
      );
      const updatedCart = await addToCart({
        productId: product.productId._id,
        quantity: newQuantity,
        selleronId: product.selleronId._id,
      });
      if (updatedCart?.serverError) setProducts(initialProducts);
    } catch {
=======

    // Find the product in the cart to get the correct productId and selleronId
    const product = products.find((product) => product._id === productId);

    if (!product) return;

    try {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, quantity: newQuantity }
            : product
        )
      );

      // Then send the update to the server
      const updatedCart = await addToCart({
        productId: product.productId._id, // Use the actual product ID from the database
        quantity: newQuantity,
        selleronId: product.selleronId._id,
      });

      if (updatedCart?.serverError) {
        // Revert the UI change if there was an error
        setProducts(initialProducts);
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      // Revert the UI change if there was an error
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
      setProducts(initialProducts);
    }
  }

<<<<<<< HEAD
  const removeProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  const calculateTotalPrice = (items: Product[]) =>
    items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0,
    );
=======
  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  const calculateTotalPrice = (items: Product[]) => {
    return items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  const handleInputChange = (e: boolean) => {
    setChecked(e);
  };
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a

  const groupedBySeller = groupBySeller(products);

  async function handleOrderZakaz() {
    try {
      setIsLoading(true);
<<<<<<< HEAD
      if (!products || products.length === 0) {
        setIsLoading(false);
        return;
      }
      const response = await addOrdersZakaz({
        totalPrice: formatPrice(calculateTotalPrice(products)),
        products: products.map((p) => ({
          productId: p.productId._id,
          selleronId: p.selleronId._id,
          quantity: p.quantity,
        })),
        latitude: selectedLocation?.lat,
        longitude: selectedLocation?.lng,
        isPaid: !checked,
      });
      if (response?.serverError) {
        setIsLoading(false);
        return;
      }
      const removeResponse = await removeFromCart();
      if (removeResponse?.success === "Product removed from cart") {
        router.push("/success");
      } else {
        setIsLoading(false);
      }
    } catch {
=======

      if (products === null || products.length === 0) {
        setIsLoading(false);
        return console.error("No products in cart");
      }

      const response = await addOrdersZakaz({
        totalPrice: formatPrice(calculateTotalPrice(products)),
        products: products.map((product) => ({
          productId: product.productId._id,
          selleronId: product.selleronId._id,
          quantity: product.quantity,
        })),
        latitude: selectedLocation?.lat,
        longitude: selectedLocation?.lng,
        isPaid: checked ? false : true,
      });

      if (response?.serverError) {
        console.error("Error creating order:", response.serverError);
        setIsLoading(false);
        return;
      }

      const removeResponse = await removeFromCart();

      if (removeResponse?.success === "Product removed from cart") {
        router.push("/success"); // ✅ sahifaga o'tkazadi
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating order:", error);
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
      setIsLoading(false);
    }
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Savat</h1>
            <p className="text-sm text-muted-foreground">
              {products.length} ta mahsulot
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {Object.entries(groupedBySeller).map(([sellerId, group]) => (
                <motion.div
                  key={sellerId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="rounded-2xl overflow-hidden border border-border bg-card shadow-premium"
                >
                  {/* Seller header */}
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-secondary/40 border-b border-border">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      }}
                    >
                      {group.seller.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {group.seller.fullName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {group.seller.email}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-border">
                    {group.items.map((item) => (
                      <motion.div
                        key={item._id}
                        layout
                        className="flex gap-4 p-4"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
                          <Image
                            src={item.productId.image || "/placeholder.svg"}
                            alt={item.productId.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                            {item.productId.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                            {item.productId?.description?.slice(0, 60)}...
                          </p>

                          <div className="flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center gap-1 rounded-xl border border-border overflow-hidden">
                              <button
                                className="h-7 w-7 flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground"
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity - 1)
                                }
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                className="h-7 w-7 flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground"
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity + 1)
                                }
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold gradient-text">
                                {formatPrice(
                                  item.productId.price * item.quantity,
                                )}
                              </span>
                              <button
                                className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 text-muted-foreground hover:text-rose-500 transition-colors"
                                onClick={() => removeProduct(item._id)}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Seller subtotal */}
                  <div className="flex justify-between items-center px-5 py-3 bg-secondary/20 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      Sotuvchi bo'yicha jami
                    </span>
                    <span className="text-sm font-bold gradient-text">
                      {formatPrice(
                        group.items.reduce(
                          (t, i) => t + i.productId.price * i.quantity,
                          0,
                        ),
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card shadow-premium p-5 sticky top-20">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-4 h-4" style={{ color: "#6366f1" }} />
                Buyurtma xulosasi
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Mahsulotlar ({products.length})
                  </span>
                  <span className="font-medium text-foreground">
                    {formatPrice(calculateTotalPrice(products))}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Yetkazib berish</span>
                  <span className="font-semibold text-emerald-500">Bepul</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-bold text-foreground">Jami</span>
                  <span className="font-bold gradient-text text-lg">
                    {formatPrice(calculateTotalPrice(products))}
                  </span>
                </div>
              </div>

              {/* Pay on delivery */}
              <label className="flex items-start gap-2.5 cursor-pointer p-3 rounded-xl bg-secondary/50 mb-4 hover:bg-secondary transition-colors">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${checked ? "bg-indigo-500" : "border-2 border-border bg-background"}`}
                  >
                    {checked && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-foreground leading-relaxed">
                  Yetkazib berilgandan keyin to'lov qilish
                </span>
              </label>

              {/* Location picker */}
              <AlertDialog
                open={isLocationDialogOpen}
                onOpenChange={setIsLocationDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <button className="w-full flex items-center justify-center gap-2 h-10 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors mb-3">
                    <Map className="w-4 h-4" style={{ color: "#6366f1" }} />
                    {selectedLocation
                      ? "Manzilni o'zgartirish"
                      : "Manzilni tanlang"}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90vw] max-w-[1200px]">
                  <AlertDialogHeader>
                    <MapUser
                      onLocationSelect={(location) =>
                        location &&
                        handleLocationSelect({
                          ...location,
                          lat: location.lat.toString(),
                          lng: location.lng.toString(),
                          totalPrice: calculateTotalPrice(products),
                        })
                      }
                    />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                    <AlertDialogAction
                      disabled={
                        !selectedLocation || !selectedLocation.isInBukhara
                      }
                      onClick={() => setIsLocationDialogOpen(false)}
                    >
                      Tasdiqlash
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Location status */}
              {selectedLocation && (
                <div
                  className={`flex items-start gap-2.5 p-3 rounded-xl mb-3 text-sm ${selectedLocation.isInBukhara ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900" : "bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900"}`}
                >
                  {selectedLocation.isInBukhara ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-emerald-700 dark:text-emerald-300 mb-0.5">
                          Manzil tasdiqlandi
                        </p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">
                          {selectedLocation.address ||
                            `${parseFloat(selectedLocation.lat).toFixed(5)}, ${parseFloat(selectedLocation.lng).toFixed(5)}`}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-rose-700 dark:text-rose-300 mb-0.5">
                          Noto'g'ri manzil
                        </p>
                        <p className="text-xs text-rose-600 dark:text-rose-400">
                          Buxoro viloyati chegarasidan tashqarida
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Order buttons */}
              <div className="space-y-2">
=======
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Savat</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(groupedBySeller).map(([sellerId, group]) => (
            <Card key={sellerId} className="overflow-hidden">
              <div className="bg-gray-50 p-4">
                <h2 className="text-xl font-semibold">
                  Sotuvchi: {group.seller.fullName}
                </h2>
                <p className="text-sm text-gray-600">{group.seller.email} </p>
              </div>

              <CardContent className="p-0">
                {group.items.map((item) => (
                  <div key={item._id} className="p-4 border-b last:border-b-0">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative w-full sm:w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.productId.image || "/placeholder.svg"}
                          alt={item.productId.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-lg">
                            {item.productId.title?.slice(0, 20)}...
                          </h3>
                          <p className="font-semibold">
                            {formatPrice(item.productId.price * item.quantity)}
                          </p>
                        </div>

                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                          {item.productId?.description?.slice(0, 30)}...
                        </p>
                        <span className="font-bold text-lg">
                          {formatPrice(
                            group.items.reduce(
                              (total, item) =>
                                total + item.productId?.price * item.quantity,
                              0
                            )
                          )}
                        </span>

                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeProduct(item._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <span className="font-medium">
                  Sotuvchi bo&apos;yicha jami:
                </span>
                <span className="font-bold text-lg">{}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">
                Buyurtma ma&apos;lumotlari
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Mahsulotlar ({products.length})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yetkazib berish</span>
                  <span>Bepul</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Jami</span>
                  <span>{formatPrice(calculateTotalPrice(products))}</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    id="terms"
                    checked={checked}
                    onCheckedChange={handleInputChange}
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Yetqazib berilgandan keyin to&apos;lov qilish
                  </Label>
                </div>

                <AlertDialog
                  open={isLocationDialogOpen}
                  onOpenChange={setIsLocationDialogOpen}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {selectedLocation ? (
                        <Map className="mr-2 h-4 w-4" />
                      ) : (
                        <Map className="mr-2 h-4 w-4" />
                      )}
                      {selectedLocation
                        ? "Manzilni o'zgartirish"
                        : "Turgan joyizni tanlang"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[90vw] max-w-[1200px]">
                    <AlertDialogHeader>
                      <MapUser
                        onLocationSelect={(location) =>
                          location &&
                          handleLocationSelect({
                            ...location,
                            lat: location.lat.toString(),
                            lng: location.lng.toString(),
                            totalPrice: calculateTotalPrice(products),
                          })
                        }
                      />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={
                          !selectedLocation || !selectedLocation.isInBukhara
                        }
                        onClick={() => setIsLocationDialogOpen(false)}
                      >
                        Tasdiqlash
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {selectedLocation && (
                  <div className="mt-4">
                    {selectedLocation.isInBukhara ? (
                      <Alert
                        variant="default"
                        className="bg-green-50 border-green-200"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertTitle>Manzil tasdiqlandi</AlertTitle>
                        <AlertDescription className="text-sm">
                          {selectedLocation.address ||
                            `${Number.parseFloat(selectedLocation?.lat).toFixed(
                              6
                            )}, ${Number.parseFloat(
                              selectedLocation?.lng
                            ).toFixed(6)}`}
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Noto&apos;g&apos;ri manzil</AlertTitle>
                        <AlertDescription className="text-sm">
                          Tanlangan manzil Buxoro viloyati chegarasidan
                          tashqarida. Iltimos, boshqa manzil tanlang.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
                <CreateOrderButton
                  productId={""}
                  disabled={
                    !selectedLocation ||
                    !selectedLocation.isInBukhara ||
                    checked
                  }
                />
<<<<<<< HEAD
                <button
                  className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.25)",
                  }}
=======

                <Button
                  className="w-full mt-4"
                  size="lg"
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
                  disabled={
                    !selectedLocation ||
                    !selectedLocation.isInBukhara ||
                    !checked ||
                    isLoading
                  }
                  onClick={handleOrderZakaz}
                >
                  {isLoading ? (
<<<<<<< HEAD
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    "Buyurtma berish"
                  )}
                </button>
              </div>
            </div>
          </div>
=======
                    <Loader className="animate-spin" />
                  ) : (
                    "Buyurtma berish"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
        </div>
      </div>
    </div>
  );
};

export default CartPage;
