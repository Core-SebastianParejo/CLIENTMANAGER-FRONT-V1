# ClientManager — Frontend

Aplicación web para la gestión de clientes. Permite registrar usuarios, iniciar sesión y administrar un directorio de clientes con operaciones CRUD completas.

Consume una API REST construida con **Express + PostgreSQL** que debe correr en `http://localhost:3000/api`.

---

## ¿Para qué sirve?

- Registrar e iniciar sesión con autenticación JWT
- Listar, buscar, crear, editar, ver detalle y eliminar clientes
- Panel principal (dashboard) con resumen de clientes y accesos rápidos
- Protección de rutas — redirige automáticamente a login si no hay sesión activa

---

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | Framework — App Router |
| [React](https://react.dev) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org) | 5 | Lenguaje |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilos |
| [pnpm](https://pnpm.io) | — | Gestor de paquetes |

---

## Requisitos previos

- **Node.js** 18 o superior
- **pnpm** instalado globalmente (`npm install -g pnpm`)
- El **backend** corriendo en `http://localhost:3000/api`

---

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/Core-SebastianParejo/CLIENTMANAGER-FRONT-V1.git
cd CLIENTMANAGER-FRONT-V1

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3001](http://localhost:3001) en tu navegador.

> El puerto puede variar si el 3000 está ocupado por el backend. Next.js lo indica en la terminal al iniciar.

---

## Scripts disponibles

```bash
pnpm dev      # Servidor de desarrollo con Turbopack
pnpm build    # Build de producción
pnpm start    # Inicia el build de producción
pnpm lint     # Análisis estático con ESLint
pnpm format   # Formatea el código con Prettier
```

---

## Estructura del proyecto

```
src/
├── app/                        # Routing (Next.js App Router)
│   ├── page.tsx                # Landing page
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── (pages)/                # Rutas protegidas (requieren sesión)
│       ├── layout.tsx          # Layout con Sidebar + Header + AuthGuard
│       ├── dashboard/page.tsx
│       └── clients/
│           ├── page.tsx
│           ├── create/page.tsx
│           └── [id]/
│               ├── page.tsx
│               └── edit/page.tsx
├── modules/                    # Lógica de negocio por módulo
│   ├── auth/                   # Login y registro
│   ├── clients/                # CRUD de clientes
│   └── dashboard/              # Pantalla principal
├── components/                 # Componentes globales
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── AuthGuard.tsx
└── lib/
    ├── api/client.ts           # Cliente HTTP con JWT automático
    ├── constants/routes.ts     # Rutas tipadas
    └── types/index.ts          # Tipos TypeScript
```

---

## Autenticación

El token JWT se guarda en `localStorage` con la clave `token`. Todas las rutas dentro de `(pages)/` están protegidas — si no hay token, el usuario es redirigido a `/auth/login`.
