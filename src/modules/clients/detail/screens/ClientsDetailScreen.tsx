"use client";
import { useEffect, useState } from "react";
import { useDetailClient } from "../hooks/useDetailClient";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

const ClientDetailScreen = ({ id }: { id: string }) => {
  const { client, loading, getClient } = useDetailClient();
  const router = useRouter();

  useEffect(() => {
    getClient(id);
  }, [id, getClient]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <div>
        <p>{client?.fullName}</p>
        <p>{client?.email}</p>
        <p>{client?.phone}</p>
        <p>{client?.company}</p>
        <p>{client?.createdAt}</p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => client && router.push(ROUTES.clientEdit(client.id))}
        >
          Ir a Editar
        </button>
      </div>
    </div>
  );
};

export default ClientDetailScreen;
