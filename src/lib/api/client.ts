const API_URL = "http://localhost:3000/api/";

const getToken = () => localStorage.getItem("token");

export const apiFetch = async (path: string, options?: RequestInit) => {
  const headers = {
    method: options?.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: options?.body,
    cache: "no-store",
  } as RequestInit;
  return await fetch(`${API_URL}${path}`, headers);
};
