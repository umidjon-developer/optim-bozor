import { ChildProps } from "@/types";
import { FC } from "react";
import Link from "next/link";

const AuthLayout: FC<ChildProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-500">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
              O
            </div>
            <span className="text-2xl font-bold text-white">optim bozor</span>
          </Link>
          
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
            Premium shopping experience
          </h1>
          
          <p className="text-lg text-white/80 max-w-md">
            Discover amazing products, enjoy seamless shopping, and experience the future of e-commerce.
          </p>
          
          {/* Feature list */}
          <div className="mt-8 space-y-4">
            {[
              "Fast & secure checkout",
              "Wide product selection",
              "24/7 customer support"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold">
                O
              </div>
              <span className="text-xl font-bold gradient-text">optim bozor</span>
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
