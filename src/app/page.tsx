import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

const features = [
  {
    title: "Clientes centralizados",
    desc: "Toda la información de tus clientes en un solo lugar, siempre accesible y ordenada.",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Operaciones sin fricción",
    desc: "Crea, edita y elimina registros en segundos. Flujos directos, sin pantallas innecesarias.",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Acceso seguro",
    desc: "Autenticación JWT. Solo tú y tu equipo acceden a la información de tus clientes.",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col text-slate-100"
      style={{
        background: "#080d1a",
        backgroundImage:
          "radial-gradient(rgba(99,102,241,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Nav */}
      <nav className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span className="font-bold text-white tracking-tight">
            ClientManager
          </span>
        </div>

        <Link
          href={ROUTES.login}
          className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
        >
          Iniciar sesión
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-12 pb-20 relative">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            style={{
              width: "600px",
              height: "400px",
              background:
                "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <div className="relative flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Gestión profesional de clientes
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-white max-w-3xl"
            style={{ lineHeight: "1.06", textWrap: "balance" }}
          >
            Tus clientes,{" "}
            <span className="text-indigo-400">siempre organizados.</span>
          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-lg leading-relaxed">
            Una plataforma centralizada para registrar, editar y gestionar todos
            tus clientes con rapidez y seguridad.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <Link
              href={ROUTES.login}
              className="px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm transition-colors duration-150"
              style={{ boxShadow: "0 0 28px rgba(99,102,241,0.4)" }}
            >
              Iniciar sesión
            </Link>
            <Link
              href={ROUTES.register}
              className="px-7 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-lg text-sm transition-colors duration-150"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-24">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(15,20,40,0.7)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.05]">
            {features.map((f) => (
              <div key={f.title} className="px-8 py-9">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.2)",
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 text-[0.9375rem]">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-5 px-6 text-center text-xs text-slate-700"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        © {new Date().getFullYear()} ClientManager — Sistema de gestión de
        clientes
      </footer>
    </div>
  );
}
