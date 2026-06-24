"use client";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

const RegisterScreen = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { doRegister, loading } = useRegister();
  return (
    <div>
      <div>
        Name
        <input
          value={nameInput}
          type="text"
          onChange={(e) => setNameInput(e.target.value)}
        />
        Email
        <input
          value={emailInput}
          type="email"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        Password
        <input
          value={passwordInput}
          type="password"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </div>
      <div>
        <button
          disabled={loading}
          type="submit"
          onClick={() => doRegister(nameInput, emailInput, passwordInput)}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterScreen;
