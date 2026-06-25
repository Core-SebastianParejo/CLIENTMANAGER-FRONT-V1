"use client";
import Link from "next/link";
import { useDashboard } from "../hooks/useDashboard";
import { ROUTES } from "@/lib/constants/routes";

const DashboardListScreen = () => {
  const { total, recentClients, loading, error } = useDashboard();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Resumen de tu gestión de clientes
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total de clientes
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {loading ? (
                  <span className="inline-block w-10 h-8 bg-slate-200 animate-pulse rounded" />
                ) : (
                  total
                )}
              </p>
            </div>
            <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:col-span-2">
          <p className="text-sm font-medium text-slate-500 mb-3">
            Accesos rápidos
          </p>
          <div className="flex flex-wrap gap-3">
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
            <Link
              href={ROUTES.clients}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg transition-colors"
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Ver todos
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900">
            Clientes recientes
          </h3>
        </div>

        {error && (
          <div className="p-5 flex items-center gap-2 text-red-600 text-sm">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {!error && loading && (
          <div className="divide-y divide-slate-100">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-4">
                <div className="w-8 h-8 bg-slate-100 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-slate-100 rounded animate-pulse w-40" />
                  <div className="h-3 bg-slate-100 rounded animate-pulse w-56" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!error && !loading && recentClients.length === 0 && (
          <div className="px-5 py-10 text-center">
            <svg
              className="w-10 h-10 text-slate-300 mx-auto mb-3"
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
            <p className="text-slate-500 text-sm">
              No hay clientes registrados aún.
            </p>
            <Link
              href={ROUTES.clientCreate}
              className="text-indigo-600 text-sm font-medium hover:underline mt-1 inline-block"
            >
              Crear el primero
            </Link>
          </div>
        )}

        {!error && !loading && recentClients.length > 0 && (
          <div className="divide-y divide-slate-100">
            {recentClients.map((client) => (
              <Link
                key={client.id}
                href={ROUTES.clientDetails(client.id)}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-semibold text-xs">
                    {client.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {client.fullName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {client.email}
                  </p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">
                  {client.company || "—"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardListScreen;
