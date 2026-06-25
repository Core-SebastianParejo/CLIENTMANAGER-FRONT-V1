# CLIENTMANAGER-FRONT-V1 — Contexto para Claude Code

## Descripción

Frontend de un gestor de clientes. Consume una API REST (Express + PostgreSQL) con autenticación JWT. Permite registrar usuarios, iniciar sesión, y gestionar clientes (listar, crear, editar, eliminar, ver detalle).

El backend corre en `http://localhost:3000/api`.

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **UI:** React 19
- **Estilos:** Tailwind CSS 4
- **Package manager:** pnpm

---

## Arquitectura — Polaris

El proyecto sigue la arquitectura Polaris de Olímpica S.A., organizada en 4 niveles:

| Nivel | Carpeta           | Responsabilidad                                      |
| ----- | ----------------- | ---------------------------------------------------- |
| 1     | `src/app/`        | Routing exclusivo. Cada `page.tsx` tiene 2-3 líneas. |
| 2     | `src/modules/`    | Lógica de negocio, screens y hooks por módulo.       |
| 3     | `src/components/` | UI global: Sidebar, Header.                          |
| 4     | `src/lib/`        | Tipos TypeScript, rutas constantes, cliente HTTP.    |

**Regla clave:** ningún `page.tsx` contiene lógica de UI. Solo importa el Screen del módulo correspondiente.

---

## Estructura de carpetas

```
src/
├── app/
│   ├── layout.tsx                        # Shell raíz
│   ├── auth/
│   │   ├── login/page.tsx                → LoginScreen
│   │   └── register/page.tsx             → RegisterScreen
│   └── (pages)/
│       ├── layout.tsx                    # Sidebar + Header (rutas autenticadas)
│       ├── dashboard/page.tsx            → DashboardScreen
│       └── clients/
│           ├── page.tsx                  → ClientsListScreen
│           ├── create/page.tsx           → ClientsCreateScreen
│           └── [id]/
│               ├── page.tsx              → ClientDetailScreen (params es Promise)
│               └── edit/page.tsx         → ClientEditScreen (params es Promise)
├── modules/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── screens/LoginScreen.tsx
│   │   │   └── hooks/useLogin.ts
│   │   └── register/
│   │       ├── screens/RegisterScreen.tsx
│   │       └── hooks/useRegister.ts
│   ├── clients/
│   │   ├── list/
│   │   │   ├── screens/ClientsListScreen.tsx
│   │   │   └── hooks/
│   │   │       ├── useClient.ts          # GET /clients
│   │   │       └── useDeleteClient.ts    # DELETE /clients/:id
│   │   ├── create/
│   │   │   ├── screens/ClientsCreateScreen.tsx
│   │   │   └── hooks/useCreateClient.ts  # POST /clients
│   │   ├── detail/
│   │   │   ├── screens/ClientsDetailScreen.tsx
│   │   │   └── hooks/useDetailClient.ts  # GET /clients/:id
│   │   └── edit/
│   │       ├── screens/ClientsEditScreen.tsx
│   │       └── hooks/useEditClient.ts    # GET + PUT /clients/:id
│   └── dashboard/
│       └── list/screens/DashboardScreen.tsx
├── components/
│   ├── Sidebar.tsx                       # Solo estructura base, sin estilos
│   └── Header.tsx                        # Solo estructura base, sin estilos
└── lib/
    ├── types/index.ts                    # Client, AuthResponse
    ├── constants/routes.ts              # ROUTES.*
    └── api/client.ts                    # apiFetch — cliente HTTP con JWT
```

---

## Infraestructura base

### `src/lib/api/client.ts`

Cliente HTTP centralizado. Lee el token JWT de `localStorage` automáticamente en cada request.

### `src/lib/constants/routes.ts`

Todas las rutas tipadas como constantes. Usar siempre `ROUTES.*` en vez de strings hardcodeados.

### `src/lib/types/index.ts`

- `Client` — entidad de cliente (id, fullName, email, phone, company, createdAt)
- `AuthResponse` — respuesta de auth (token)

---

## Autenticación

- Token JWT guardado en `localStorage` con key `'token'`
- `apiFetch` lo incluye automáticamente en el header `Authorization: Bearer <token>`
- Login y register redirigen al dashboard tras guardar el token
- Las rutas de auth (`/auth/login`, `/auth/register`) están fuera del layout con Sidebar/Header

---

## Módulos implementados

### Auth

- **Login** — formulario email + password, llama `POST /api/auth/login`, guarda token, redirige a `/dashboard`
- **Register** — formulario name + email + password, llama `POST /api/auth/register`, guarda token, redirige a `/dashboard`

### Clients

- **List** — tabla con fullName, email, phone, company, createdAt. Botones editar (redirige) y eliminar (soft delete)
- **Create** — formulario para crear cliente, llama `POST /api/clients`, redirige a `/clients`
- **Detail** — vista de solo lectura de un cliente, botón para ir a editar
- **Edit** — formulario prellenado con datos actuales, llama `PUT /api/clients/:id`, redirige a `/clients`

---

## Lo que falta (tarea para Claude Code)

1. **Estilos con Tailwind** en todos los Screens — login, register, list, create, detail, edit, dashboard
2. **Sidebar** — navegación lateral con links a `/dashboard` y `/clients`
3. **Header** — barra superior con nombre de la app y usuario logueado
4. **Validaciones de formularios** — con feedback visual al usuario (errores inline)
5. **Estados vacíos** — cuando no hay clientes en la lista
6. **Estados de error** — cuando falla una llamada al backend
7. **Protección de rutas** — redirigir a `/auth/login` si no hay token
8. **Barra de búsqueda** en la lista de clientes (filtrar por nombre o email)
9. **Dashboard** — contenido real (resumen de clientes, accesos rápidos)

---

## Reglas importantes para mantener la arquitectura

- `page.tsx` solo importa el Screen — máximo 5 líneas
- Los `params` de rutas dinámicas son `Promise<{ id: string }>` en Next.js 16 — usar `async/await`
- Todo componente con `useState`, `useEffect` o eventos lleva `'use client'` al inicio
- La lógica de negocio va en hooks (`use*.ts`), nunca en el Screen
- Los estilos van directamente en los Screens con clases de Tailwind — no crear archivos CSS separados
- Usar siempre `ROUTES.*` para navegación, nunca strings hardcodeados
- `apiFetch` para todas las llamadas al backend — nunca usar `fetch` directamente
