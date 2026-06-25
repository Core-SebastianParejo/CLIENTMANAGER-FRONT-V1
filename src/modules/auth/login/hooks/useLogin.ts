import { useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(
          errorData.message || "Credenciales incorrectas. Intenta de nuevo.",
        );
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push(ROUTES.dashboard);
    } catch {
      setError("No se pudo conectar con el servidor. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return { doLogin, loading, error };
};
