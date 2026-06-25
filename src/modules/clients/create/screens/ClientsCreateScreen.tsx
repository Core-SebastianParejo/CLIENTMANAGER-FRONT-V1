"use client";
import { useState } from "react";
import { useCreateClient } from "../hooks/useCreateClient";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

const ClientsCreateScreen = () => {
  const [fullNameInput, setFullNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const { createClient, loading } = useCreateClient();
  const router = useRouter();

  return (
    <form>
      <div>
        <input
          value={fullNameInput}
          type="text"
          onChange={(e) => setFullNameInput(e.target.value)}
        />
        <input
          value={emailInput}
          type="email"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <input
          value={phoneInput}
          type="text"
          onChange={(e) => setPhoneInput(e.target.value)}
        />
        <input
          value={companyInput}
          type="text"
          onChange={(e) => setCompanyInput(e.target.value)}
        />
      </div>

      <div>
        <button
          disabled={loading}
          type="submit"
          onClick={() =>
            createClient(fullNameInput, emailInput, phoneInput, companyInput)
          }
        >
          Crear
        </button>
        <button type="button" onClick={() => router.push(ROUTES.clients)}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ClientsCreateScreen;
