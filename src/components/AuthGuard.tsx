"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // Lazy initializer runs during render, not inside an effect — no setState in effect
  const [hasToken] = useState<boolean>(
    () => typeof window !== "undefined" && !!localStorage.getItem("token"),
  );

  useEffect(() => {
    if (!hasToken) {
      router.push(ROUTES.login);
    }
  }, [router, hasToken]);

  if (!hasToken) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
