import { useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export const useCreateClient = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createClient = async (
    fullName: string,
    email: string,
    phone: string,
    company: string,
  ) => {
    setLoading(true);
    try {
      await apiFetch("/clients", {
        method: "POST",
        body: JSON.stringify({ fullName, email, phone, company }),
      });

      router.push(ROUTES.clients);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { createClient, loading };
};
