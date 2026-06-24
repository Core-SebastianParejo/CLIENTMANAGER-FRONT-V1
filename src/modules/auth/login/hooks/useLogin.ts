import { useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const doLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push(ROUTES.dashboard);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { doLogin, loading };
};
