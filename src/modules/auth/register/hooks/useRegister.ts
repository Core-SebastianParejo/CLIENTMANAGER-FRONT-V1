import { useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const doRegister = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
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
  return { doRegister, loading };
};
