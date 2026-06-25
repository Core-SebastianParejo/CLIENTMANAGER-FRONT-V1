"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditClient } from "../hooks/useEditClient";
import { ROUTES } from "@/lib/constants/routes";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = {
  fullName?: string;
  email?: string;
};

const inputClass = (hasError: boolean) =>
  `block w-full rounded-lg border px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition ${
    hasError ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
  }`;

const ClientEditScreen = ({ id }: { id: string }) => {
  const { client, loading, getClient, updateClient } = useEditClient();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  useEffect(() => {
    getClient(id);
  }, [id, getClient]);

  useEffect(() => {
    if (client) {
      setNameInput(client.fullName);
      setEmailInput(client.email);
      setPhoneInput(client.phone ?? "");
      setCompanyInput(client.company ?? "");
    }
  }, [client]);

  const validate = () => {
    const next: Errors = {};
    if (!nameInput.trim()) next.fullName = "El nombre completo es requerido.";
    else if (nameInput.trim().length < 2)
      next.fullName = "Mínimo 2 caracteres.";
    if (!emailInput.trim()) next.email = "El email es requerido.";
    else if (!EMAIL_REGEX.test(emailInput))
      next.email = "Ingresa un email válido.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate())
      updateClient(id, nameInput, emailInput, phoneInput, companyInput);
  };

  if (loading && !client) {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="h-6 bg-slate-200 rounded animate-pulse w-24" />
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 bg-slate-100 rounded animate-pulse w-24" />
              <div className="h-10 bg-slate-100 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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

      <div>
        <h2 className="text-2xl font-bold text-slate-900">Editar cliente</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Actualiza los datos del cliente.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (errors.fullName)
                    setErrors((p) => ({ ...p, fullName: undefined }));
                }}
                placeholder="Juan Pérez"
                className={inputClass(!!errors.fullName)}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (errors.email)
                    setErrors((p) => ({ ...p, email: undefined }));
                }}
                placeholder="juan@empresa.com"
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Teléfono
              </label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+57 300 000 0000"
                className={inputClass(false)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Empresa
              </label>
              <input
                type="text"
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                placeholder="Acme Inc."
                className={inputClass(false)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg transition-colors"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              type="button"
              onClick={() => router.push(ROUTES.clients)}
              className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientEditScreen;
