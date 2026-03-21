<<<<<<< HEAD
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { getCart } from "@/actions/user.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartPage = dynamic(() => import("./CartPage"), { ssr: false });

const Cart = async () => {
  const session = await getServerSession(authOptions);
  console.log("Session in Cart page:", session);
  // Login bo'lmagan foydalanuvchi
  if (!session) {
    redirect("/sign-in?callbackUrl=/cart");
  }

  // pendingOAuth — Google bilan kirgan lekin ro'yxat tugallanmagan
  if (session.pendingOAuth && !session.currentUser) {
    redirect("/oauth/phone");
  }

  const data = await getCart();
  console.log("Cart data:", data);

  const cart = data?.cart?.products || [];

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">
              Savat yuklanmoqda...
            </p>
          </div>
        </div>
      }
    >
      <CartPage products={cart} />
    </Suspense>
  );
};

export default Cart;
=======
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getCart } from '@/actions/user.action'

// Dynamically import CartPage to reduce the bundle size
const CartPage = dynamic(() => import('./CartPage'), { ssr: false })

// Fetch cart data on the server-side for better performance
const Cart = async () => {
	// Optimized fetching
	const data = await getCart()
	const cart = data?.data?.cart?.products || []
	console.log(data)
	return (
		<Suspense fallback={<div>Loading cart...</div>}>
			<CartPage products={cart} />
		</Suspense>
	)
}

export default Cart
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
