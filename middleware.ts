import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { rateLimiter } from "./lib/rate-limiter";

const getClientIp = (req: NextRequest): string => {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
};

// Login talab qiladigan sahifalar
const PROTECTED = ["/cart", "/favorites", "/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rate limiting — faqat API va asosiy sahifalar uchun
  if (!pathname.startsWith("/_next") && !pathname.includes(".")) {
    const ip = getClientIp(req);
    if (!rateLimiter(ip)) {
      return NextResponse.json(
        { message: "Too many requests, please try again later." },
        { status: 429 },
      );
    }
  }

  // Static fayllar va NextAuth API ni o'tkazib yuborish
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/uploadthing") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Token olish
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.NEXT_AUTH_SECRET,
  });

  // pendingOAuth → /oauth/phone ga yo'naltirish
  const isPendingOAuth =
    token?.pendingOAuth &&
    !token?.userId &&
    pathname !== "/oauth/phone" &&
    !pathname.startsWith("/sign-");

  if (isPendingOAuth) {
    return NextResponse.redirect(new URL("/oauth/phone", req.url));
  }

  // Himoyalangan sahifalar → login yo'q bo'lsa /sign-in
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  if (isProtected && !token) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
