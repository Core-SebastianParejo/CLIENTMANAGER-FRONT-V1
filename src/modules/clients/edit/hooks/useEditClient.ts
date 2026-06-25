import { useState, useCallback } from "react";
import { apiFetch } from "@/lib/api/client";
import { Client } from "@/lib/types";
import { ROUTES } from "@/lib/constants/routes";
import { useRouter } from "next/navigation";

export const useEditClient = () => {
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const router = useRouter();

  const getClient = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await apiFetch(`/clients/${id}`, {
        method: "GET",
      });

      const data = await response.json();
      setClient(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateClient = async (
    id: string,
    fullName: string,
    email: string,
    phone: string,
    company: string,
  ) => {
    setLoading(true);
    try {
      await apiFetch(`/clients/${id}`, {
        method: "PUT",
        body: JSON.stringify({ fullName, email, phone, company }),
      });
      router.push(ROUTES.clients);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { client, loading, getClient, updateClient };
};
