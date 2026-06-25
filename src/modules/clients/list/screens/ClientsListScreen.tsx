"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useListClient } from "../hooks/useClient";
import { useDeleteClient } from "../hooks/useDeleteClient";
import { ROUTES } from "@/lib/constants/routes";

const ClientsListScreen = () => {
  const { clients, loading, error, refetch } = useListClient();
  const { deleteClient, loading: loadingDelete } = useDeleteClient();
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const filtered = clients.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteClient(id, refetch);
    setDeletingId(null);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Clientes</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {!loading &&
              !error &&
              `${clients.length} cliente${clients.length !== 1 ? "s" : ""} registrado${clients.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          href={ROUTES.clientCreate}
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nuevo cliente
        </Link>
      </div>

      <div className="relative">
        <svg
          className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o email..."
          className="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {error && (
          <div className="p-6 flex items-center gap-2 text-red-600 text-sm">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {!error && loading && (
          <div className="divide-y divide-slate-100">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="px-5 py-4 flex items-center gap-4">
                <div className="w-8 h-8 bg-slate-100 rounded-full animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-slate-100 rounded animate-pulse w-36" />
                  <div className="h-3 bg-slate-100 rounded animate-pulse w-52" />
                </div>
                <div className="h-3 bg-slate-100 rounded animate-pulse w-20" />
              </div>
            ))}
          </div>
        )}

        {!error && !loading && filtered.length === 0 && (
          <div className="py-16 text-center">
            <svg
              className="w-12 h-12 text-slate-300 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {search ? (
              <>
                <p className="text-slate-500 text-sm font-medium">
                  Sin resultados
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  No hay clientes que coincidan con &quot;{search}&quot;
                </p>
              </>
            ) : (
              <>
                <p className="text-slate-500 text-sm font-medium">
                  No hay clientes aún
                </p>
                <Link
                  href={ROUTES.clientCreate}
                  className="text-indigo-600 text-sm font-medium hover:underline mt-1 inline-block"
                >
                  Crear el primero
                </Link>
              </>
            )}
          </div>
        )}

        {!error && !loading && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Teléfono
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Empresa
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Registro
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-indigo-600 font-semibold text-xs">
                            {client.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            router.push(ROUTES.clientDetails(client.id))
                          }
                          className="font-medium text-slate-900 hover:text-indigo-600 transition-colors text-left"
                        >
                          {client.fullName}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {client.email}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 hidden md:table-cell">
                      {client.phone || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 hidden lg:table-cell">
                      {client.company || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 hidden lg:table-cell">
                      {formatDate(client.createdAt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push(ROUTES.clientEdit(client.id))
                          }
                          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-3.5 h-3.5"
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
                        <button
                          disabled={loadingDelete && deletingId === client.id}
                          onClick={() => handleDelete(client.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingDelete && deletingId === client.id ? (
                            <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          )}
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsListScreen;
