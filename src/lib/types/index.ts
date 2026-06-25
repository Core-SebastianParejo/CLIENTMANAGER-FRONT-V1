export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
}
