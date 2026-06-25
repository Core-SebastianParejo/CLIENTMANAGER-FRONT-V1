import { useState } from "react";
import { apiFetch } from "@/lib/api/client";

export const useDeleteClient = () => {
  const [loading, setLoading] = useState(false);

  const deleteClient = async (id: string, onSuccess?: () => void) => {
    setLoading(true);
    try {
      await apiFetch(`/clients/${id}`, { method: "DELETE" });
      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteClient, loading };
};
