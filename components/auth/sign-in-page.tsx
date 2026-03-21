"use client";

import { login } from "@/actions/auth.action";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import GoogleButton from "./google-button";
import { motion } from "framer-motion";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onError(message: string) {
    setIsLoading(false);
    toast({ description: message, variant: "destructive" });
  }

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    const res = await login(values);
    if (res?.serverError || res?.validationErrors || !res?.data) return onError("Xatolik yuz berdi");
    if (res.data.failure) return onError(res.data.failure);
    if (res.data.user) {
      toast({ description: "Muvaffaqiyatli kirdingiz!" });
      signIn("credentials", { userId: res.data.user._id, callbackUrl: "/" });
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 24px rgba(99,102,241,0.3)" }}>
          O
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Xush kelibsiz</h1>
        <p className="text-sm text-muted-foreground">Hisobingizga kiring</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-card border border-border shadow-premium p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        {...field}
                        type="email"
                        placeholder="email@example.com"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parol</label>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
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
              className="w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-60 mt-2"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}
            >
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Kirmoqda...</> : <>Kirish<ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </Form>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground font-medium">yoki</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <GoogleButton />
      </div>

      <p className="text-center text-sm text-muted-foreground mt-5">
        Hisobingiz yo'qmi?{" "}
        <Link href="/sign-up" className="font-semibold text-primary hover:text-primary/80 transition-colors">
          Ro'yxatdan o'ting
        </Link>
      </p>
    </motion.div>
  );
};

export default SignInPage;