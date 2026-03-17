"use client";

import { login } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Mail, Lock, ArrowRight } from "lucide-react";
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
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return onError("Something went wrong");
    }
    if (res.data.failure) {
      return onError(res.data.failure);
    }
    if (res.data.user) {
      toast({ description: "Logged in successfully" });
      signIn("credentials", { userId: res.data.user._id, callbackUrl: "/" });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-premium border border-gray-100 dark:border-gray-700 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="you@example.com"
                        disabled={isLoading}
                        className="pl-10 h-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        disabled={isLoading}
                        className="pl-10 h-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                disabled={isLoading}
                variant="gradient"
                className="w-full h-12 rounded-xl font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              or continue with
            </span>
          </div>
        </div>

        <GoogleButton variant="signin" route={"/sign-in"} />

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignInPage;
