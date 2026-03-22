import { NextRequest, NextResponse } from "next/server";

// Middleware'da getToken ISHLATMAYMIZ — bu Vercel'da state cookie'ni buzadi
// Faqat oddiy rate limiting qoladi

const getClientIp = (req: NextRequest): string => {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
};

// Simple in-memory rate limiter
const rateMap = new Map<string, { count: number; resetAt: number }>();

function rateLimiter(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000; // 1 daqiqa
  const max = 100;

  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count++;
  return entry.count <= max;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // NextAuth va static fayllarni o'tkazib yuborish
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Rate limiting
  const ip = getClientIp(req);
  if (!rateLimiter(ip)) {
    return NextResponse.json(
      { message: "Too many requests, please try again later." },
      { status: 429 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
