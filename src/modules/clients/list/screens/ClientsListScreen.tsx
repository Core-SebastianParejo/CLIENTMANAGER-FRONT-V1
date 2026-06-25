"use client";
import { useListClient } from "../hooks/useClient";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

const ClientsListScreen = () => {
  const { clients, loading } = useListClient();
  const router = useRouter();
  if (loading) return <div>Cargando...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.fullName}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>{client.company}</td>
            <td>{client.createdAt}</td>
            <td>
              <button onClick={() => router.push(ROUTES.clientEdit(client.id))}>
                Editar
              </button>
            </td>
            <td>
              <button onClick={() => console.log(client.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsListScreen;
