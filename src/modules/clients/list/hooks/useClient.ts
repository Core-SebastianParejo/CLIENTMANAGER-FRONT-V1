import { useState } from "react";
import { useEffect } from "react";
import { apiFetch } from "@/lib/api/client";
import { Client } from "@/lib/types";

export const useListClient = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFetch("/clients", { method: "GET" });
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { clients, loading };
};
