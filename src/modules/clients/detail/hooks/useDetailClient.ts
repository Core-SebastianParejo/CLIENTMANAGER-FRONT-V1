import { useCallback, useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { Client } from "@/lib/types";

export const useDetailClient = () => {
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);

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

  return { getClient, client, loading };
};
