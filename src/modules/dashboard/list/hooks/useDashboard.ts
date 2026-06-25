import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api/client";
import { Client } from "@/lib/types";

export const useDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFetch("/clients", { method: "GET" });
        if (!response.ok) throw new Error("Error al cargar datos");
        const data = await response.json();
        setClients(data);
      } catch {
        setError("No se pudieron cargar los datos del dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const recentClients = clients.slice(0, 5);

  return { total: clients.length, recentClients, loading, error };
};
