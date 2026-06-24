export const ROUTES = {
    clients: '/clients',
    clientsCreate: '/clients/create',
    clientsDetails: (id:string) => `/clients/${id}`,
    clientsEdit: (id:string) => `/clients/${id}/edit`,
    login: '/login',
    register: '/register',
    dashboard: '/dashboard'
}