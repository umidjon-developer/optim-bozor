import { axiosClient } from "@/http/axios";
import { ReturnActionType } from "@/types";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";

/**
 * Google OAuth: user topish yoki yaratish.
 * Backend /api/auth/oauth-login: email mavjud bo'lsa qaytaradi,
 * bo'lmasa yangi user yaratadi.
 * Bu endpoint email + fullName qabul qiladi, _id qaytaradi.
 */
async function oauthLoginOrRegister(
  email: string,
  fullName: string,
): Promise<string | null> {
  try {
    const res = await fetch(`${SERVER_URL}/api/auth/oauth-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fullName }),
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data?.user?._id ?? null;
  } catch {
    return null;
  }
}

// Development da secure cookie o'chirish (HTTPS yo'q)
const useSecureCookies =
  process.env.NEXTAUTH_URL?.startsWith("https://") ?? false;

export const authOptions: NextAuthOptions = {
  cookies: {
    sessionToken: {
      name: useSecureCookies
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: useSecureCookies
        ? "__Secure-next-auth.callback-url"
        : "next-auth.callback-url",
      options: { sameSite: "lax", path: "/", secure: useSecureCookies },
    },
    csrfToken: {
      name: useSecureCookies
        ? "__Host-next-auth.csrf-token"
        : "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    state: {
      name: useSecureCookies ? "__Secure-next-auth.state" : "next-auth.state",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 900,
      },
    },
    pkceCodeVerifier: {
      name: useSecureCookies
        ? "__Secure-next-auth.pkce.code_verifier"
        : "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 900,
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { userId: { label: "User ID", type: "text" } },
      async authorize(credentials) {
        if (!credentials?.userId) return null;
        try {
          const { data } = await axiosClient.get<ReturnActionType>(
            `/api/user/profile/${credentials.userId}`,
          );
          const u = data?.user;
          if (!u) return null;
          return {
            id: u._id,
            email: u.email,
            name: u.fullName,
            phone: u.phone,
            role: u.role,
            image: u.phone1,
          } as User & { phone?: string; role?: string };
        } catch {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  callbacks: {
    // ─────────────────────────────────────────────────────────────
    async jwt({ token, user, account }) {
      // 1. Credentials provider — to'g'ridan-to'g'ri userId o'rnatamiz
      if (account?.provider === "credentials" && user) {
        token.userId = user.id;
        token.phone = ((user as Record<string, unknown>).phone as string) ?? "";
        token.role = ((user as Record<string, unknown>).role as string) ?? "";
        delete token.pendingOAuth;
        return token;
      }

      // 2. Google provider — oauth-login orqali userId topamiz
      if (account?.provider === "google" && user?.email) {
        const fullName = user.name || user.email.split("@")[0];
        const userId = await oauthLoginOrRegister(user.email, fullName);

        if (userId) {
          // Muvaffaqiyat — to'liq session
          token.userId = userId;
          delete token.pendingOAuth;
        } else {
          // Backend ishlamayapti — telefon sahifasiga yuboramiz
          token.pendingOAuth = { email: user.email, fullName };
        }
        return token;
      }

      // 3. Token refresh — pendingOAuth holatida qayta urinib ko'ramiz
      if (!token.userId && token.pendingOAuth?.email) {
        const email = token.pendingOAuth.email as string;
        const fullName =
          (token.pendingOAuth.fullName as string) || email.split("@")[0];
        const userId = await oauthLoginOrRegister(email, fullName);
        if (userId) {
          token.userId = userId;
          delete token.pendingOAuth;
        }
      }

      return token;
    },

    // ─────────────────────────────────────────────────────────────
    async session({ session, token }) {
      const userId = token?.userId as string | undefined;
      const pendingOAuth = token?.pendingOAuth as
        | { email?: string | null; fullName?: string | null }
        | undefined;

      if (userId) {
        try {
          const { data } = await axiosClient.get<ReturnActionType>(
            `/api/user/profile/${userId}`,
          );
          const u = data?.user;
          if (u) {
            session.currentUser = { ...u };
            session.user = {
              ...(session.user ?? {}),
              id: u._id,
              name: u.fullName,
              email: u.email,
              phone: u.phone,
              image: u.phone1,
            };
          }
        } catch {
          // DB xatosida session'ni yo'q qilmaymiz
        }
      }

      if (pendingOAuth) {
        session.pendingOAuth = pendingOAuth;
      }

      return session;
    },

    // ─────────────────────────────────────────────────────────────
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET || process.env.NEXT_AUTH_SECRET,
};
