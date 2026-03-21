import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { rateLimiter } from "./lib/rate-limiter";

const getClientIp = (req: NextRequest): string => {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
};

// Himoya talab qiladigan sahifalar
const PROTECTED_PATHS = ["/cart", "/favorites", "/dashboard"];
// Faqat pendingOAuth uchun ruxsat berilgan sahifalar
const OAUTH_ALLOWED = ["/oauth/phone", "/api/auth", "/sign-in", "/sign-out"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rate limiting
  const ip = getClientIp(req);
  if (!rateLimiter(ip)) {
    return NextResponse.json(
      { message: "Too many requests, please try again later." },
      { status: 429 }
    );
  }

  // Static / API route larni o'tkazib yuborish
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Token ni tekshirish
  const token = await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  });

  // 1. pendingOAuth holati — user Google orqali kirgan lekin backend ro'yxati yo'q
  //    Faqat /oauth/phone sahifasiga ruxsat, qolganlar redirect
  const isPendingOAuth = token?.pendingOAuth && !token?.userId;
  if (isPendingOAuth) {
    const isAllowed = OAUTH_ALLOWED.some((p) => pathname.startsWith(p));
    if (!isAllowed && pathname !== "/oauth/phone") {
      const url = req.nextUrl.clone();
      url.pathname = "/oauth/phone";
      return NextResponse.redirect(url);
    }
  }

  // 2. Himoyalangan sahifalar — login bo'lmasa /sign-in ga
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
