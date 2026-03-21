"use client";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { login } from "@/actions/auth.action";
import { SessionProvider } from "next-auth/react";

function AutoOAuthLogin() {
  const { data: session, update } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCheckedEmail, setLastCheckedEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const pending = session?.pendingOAuth;
      const hasUser = session?.currentUser?._id;
      
      // If already has user or no pending OAuth, skip
      if (!pending?.email || hasUser || isProcessing) return;
      
      // Prevent duplicate checks for same email
      if (lastCheckedEmail === pending.email) return;
      
      setIsProcessing(true);
      
      try {
        // Try to find if user exists by checking profile
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/profile/${encodeURIComponent(pending.email)}`);
        
        if (response.ok) {
          const result = await response.json();
          const id = result?.user?._id;
          
          if (id) {
            // User found, sign in with credentials
            await signIn("credentials", { userId: id, redirect: false });
            await update(); // Refresh session
            console.log('Auto-logged in Google user with ID:', id);
            setLastCheckedEmail(pending.email); // Mark as checked
          }
        }
      } catch (error) {
        console.error('Error auto-logging in Google user:', error);
      } finally {
        setIsProcessing(false);
      }
    })();
  }, [session?.pendingOAuth?.email, session?.currentUser?._id, update]); // Removed isProcessing from dependencies

  return null;
}
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <AutoOAuthLogin />
      {children}
    </SessionProvider>
  );
}
