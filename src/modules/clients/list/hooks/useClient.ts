import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api/client";
import { Client } from "@/lib/types";

export const useListClient = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refetch = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFetch("/clients", { method: "GET" });
        if (!response.ok) throw new Error("Error al cargar clientes");
        const data = await response.json();
        setClients(data);
      } catch {
        setError("No se pudo cargar la lista de clientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  return { clients, loading, error, refetch };
};
