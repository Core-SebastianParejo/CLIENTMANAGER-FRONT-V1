"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDetailClient } from "../hooks/useDetailClient";
import { ROUTES } from "@/lib/constants/routes";

const ClientDetailScreen = ({ id }: { id: string }) => {
  const { client, loading, getClient } = useDetailClient();
  const router = useRouter();

  useEffect(() => {
    getClient(id);
  }, [id, getClient]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="h-6 bg-slate-200 rounded animate-pulse w-24" />
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 bg-slate-100 rounded animate-pulse w-20" />
              <div className="h-5 bg-slate-200 rounded animate-pulse w-56" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="max-w-2xl text-center py-16">
        <p className="text-slate-500">Cliente no encontrado.</p>
        <button
          onClick={() => router.push(ROUTES.clients)}
          className="text-indigo-600 text-sm font-medium hover:underline mt-2 inline-block"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  const fields = [
    { label: "Nombre completo", value: client.fullName },
    { label: "Email", value: client.email },
    { label: "Teléfono", value: client.phone || "—" },
    { label: "Empresa", value: client.company || "—" },
    { label: "Fecha de registro", value: formatDate(client.createdAt) },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push(ROUTES.clients)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-600 font-bold text-xl">
              {client.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {client.fullName}
            </h2>
            <p className="text-slate-500 text-sm">
              {client.company || "Sin empresa"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push(ROUTES.clientEdit(client.id))}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Editar
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {fields.map((field) => (
          <div key={field.label} className="px-6 py-4 flex items-start gap-4">
            <div className="w-36 flex-shrink-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {field.label}
              </p>
            </div>
            <p className="text-sm text-slate-900">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDetailScreen;
