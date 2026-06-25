"use client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

const getUserName = (): string => {
  if (typeof window === "undefined") return "";
  try {
    const token = localStorage.getItem("token");
    if (!token) return "";
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.name || payload.email || "Usuario";
  } catch {
    return "Usuario";
  }
};

const Header = () => {
  const router = useRouter();
  const userName = getUserName();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push(ROUTES.login);
  };

  return (
    <header className="h-16 flex-shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8">
      <h1 className="text-sm font-medium text-slate-500 hidden sm:block">
        Sistema de Gestión de Clientes
      </h1>

      <div className="flex items-center gap-3 ml-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          {userName && (
            <span className="text-sm font-medium text-slate-700 hidden md:block">
              {userName}
            </span>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
