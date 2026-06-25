export const ROUTES = {
  clients: "/clients",
  clientCreate: "/clients/create",
  clientDetails: (id: string) => `/clients/${id}`,
  clientEdit: (id: string) => `/clients/${id}/edit`,
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
};
