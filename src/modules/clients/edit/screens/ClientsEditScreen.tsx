"use client";
import { useEffect, useState } from "react";
import { useEditClient } from "../hooks/useEditClient";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

const ClientEditScreen = ({ id }: { id: string }) => {
  const { client, loading, getClient, updateClient } = useEditClient();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    getClient(id);
  }, [id, getClient]);

  useEffect(() => {
    if (client) {
      setNameInput(client.fullName);
      setEmailInput(client.email);
      setPhoneInput(client.phone);
      setCompanyInput(client.company);
    }
  }, [client]);

  if (loading) return <div>Cargando...</div>;

  return (
    <form>
      <div>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <input
          type="text"
          value={phoneInput}
          onChange={(e) => setPhoneInput(e.target.value)}
        />
        <input
          type="text"
          value={companyInput}
          onChange={(e) => setCompanyInput(e.target.value)}
        />
      </div>
      <div>
        <button
          disabled={loading}
          onClick={() =>
            updateClient(id, nameInput, emailInput, phoneInput, companyInput)
          }
        >
          Actualizar
        </button>
        <button type="button" onClick={() => router.push(ROUTES.clients)}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ClientEditScreen;
