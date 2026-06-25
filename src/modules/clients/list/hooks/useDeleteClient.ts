import { useState } from "react";
import { apiFetch } from "@/lib/api/client";

export const useDeleteClient = () => {
  const [loading, setLoading] = useState(false);

  const deleteClient = async (id: string) => {
    setLoading(true);
    try {
      await apiFetch(`clients/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { deleteClient, loading };
};
