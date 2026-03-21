"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { phoneSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { register } from "@/actions/auth.action";
import { motion } from "framer-motion";

export default function OAuthPhonePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  useEffect(() => {
    if (status === "loading") return;
    if (session?.currentUser?._id) {
      router.replace("/");
      return;
    }
    if (!session?.pendingOAuth?.email) {
      signIn("google", { callbackUrl: "/oauth/phone" });
    }
  }, [session, status, router]);

  async function onSubmit(values: z.infer<typeof phoneSchema>) {
    setIsLoading(true);
    try {
      const email = session?.pendingOAuth?.email as string | undefined;
      const fullName = session?.pendingOAuth?.fullName as string | undefined;

      if (!email) {
        toast({
          description: "Google ma'lumoti topilmadi",
          variant: "destructive",
        });
        return;
      }

      const res = await register({
        email,
        fullName: fullName || email.split("@")[0],
        phone: values.phone,
        password: "oauth_dummy_password",
      });

      if (res?.serverError || res?.validationErrors || !res?.data) {
        toast({
          description: "Xatolik yuz berdi. Qayta urinib ko'ring.",
          variant: "destructive",
        });
        return;
      }
      if (res.data.failure) {
        toast({ description: res.data.failure, variant: "destructive" });
        return;
      }
      if (res.data.user?._id) {
        toast({ description: "Muvaffaqiyatli ro'yxatdan o'tildi!" });
        signIn("credentials", { userId: res.data.user._id, callbackUrl: "/" });
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 8px 24px rgba(99,102,241,0.3)",
          }}
        >
          <Phone className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Telefon raqamingiz
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Google orqali kirish tugallandi. Hisobni yakunlash uchun telefon
          raqamingizni kiriting.
        </p>
      </div>

      {/* Google account info */}
      {session?.pendingOAuth?.email && (
        <div
          className="flex items-center gap-3 p-3 rounded-xl mb-5"
          style={{
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(99,102,241,0.15)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            {((session.pendingOAuth.fullName as string) || "U")
              .charAt(0)
              .toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {session.pendingOAuth.fullName as string}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session.pendingOAuth.email as string}
            </p>
          </div>
          <ShieldCheck
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "#22c55e" }}
          />
        </div>
      )}

      {/* Form Card */}
      <div className="rounded-2xl bg-card border border-border shadow-premium p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Telefon raqam
                  </label>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        {...field}
                        type="tel"
                        placeholder="+998 90 123 45 67"
                        disabled={isLoading}
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors disabled:opacity-60"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Tasdiqlanmoqda...
                </>
              ) : (
                <>
                  Tasdiqlash
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </Form>

        <div
          className="flex items-center gap-2 mt-4 p-3 rounded-xl"
          style={{
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.15)",
          }}
        >
          <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-500" />
          <p className="text-xs text-muted-foreground">
            Telefon raqamingiz xavfsizlik uchun talab qilinadi
          </p>
        </div>
      </div>
    </motion.div>
  );
}
