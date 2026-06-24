"use client";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginScreen = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { doLogin, loading } = useLogin();

  return (
    <div>
      <div>
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
          onClick={() => doLogin(emailInput, passwordInput)}
        >
          Iniciar Sesion
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
