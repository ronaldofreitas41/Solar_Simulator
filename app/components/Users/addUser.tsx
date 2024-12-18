"use client";

import React, { useState } from "react";
import BlueButton from "../Common/blueButton";

export const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCPF] = useState("");
  const [consumidor, setConsumidor] = useState(0);
  const [fornecedor, setFornecedor] = useState(0);
  const [userType, setUserType] = useState("");

  async function save() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        cpf: cpf,
        password: password,
        type: userType,
      }),
    });

    if (res.ok) {
        alert("Usuário cadastrado com sucesso");
    } else {
      alert("Erro no cadastro de usuário");
    }
  }

  function handleRoleChange(role: string) {
    if (role === "consumidor") {
      setConsumidor(1);
      setFornecedor(0);
      setUserType("Consumidor");
    } else {
      setConsumidor(0);
      setFornecedor(1);
      setUserType("Fornecedor");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#F4F4F4", // Cor de fundo da página
      }}
    >
      {/* Container Principal */}
      <div
        style={{
          display: "flex",
          width: "80%",
          maxWidth: "900px",
          height: "80%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Lado esquerdo (Azul) */}
        <div
          style={{
            display: "flex",
            flex: 1,
            background: "#004C80",
            justifyContent: "center",
            alignItems: "center",
            color: "#FFF",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <img src="/images/logo.png" alt="Logo" />
          <h2 style={{ marginTop: "20px", textAlign: "center" }}>
            Criar uma conta
          </h2>
          <button
            style={{
              background: "#FFFFFF",
              color: "#004C80",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            <a style={{ fontFamily: "monospace" }}>Registre-se</a>
          </button>
          <p style={{ marginTop: "10px" }}>Já tem uma conta?</p>
          <button
            style={{
              background: "transparent",
              color: "#FFFFFF",
              border: "1px solid #FFFFFF",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
        </div>

        {/* Lado direito (Formulário) */}
        <div
          style={{
            display: "flex",
            flex: 1,
            background: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <a
            style={{
              marginBottom: "20px",
              color: "#004C80",
              fontSize: 35,
              fontFamily: "serif",
            }}
          >
            Login
          </a>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <input
              type="text"
              placeholder="Nome"
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #CCC",
                borderRadius: "4px",
                color: "#000",
              }}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
              placeholder="CPF"
              maxLength={11}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #CCC",
                borderRadius: "4px",
                color: "#000",
              }}
              onChange={(event) => setCPF(event.target.value)}
            />
            <input
              type="text"
              placeholder="E-mail"
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #CCC",
                borderRadius: "4px",
                color: "#000",
              }}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #CCC",
                borderRadius: "4px",
                color: "#000",
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <label style={{ color: "#000" }}>
                <input
                  type="radio"
                  id="Consumidor"
                  name="role"
                  value="consumidor"
                  checked={consumidor === 1}
                  onChange={() => handleRoleChange("consumidor")}
                />{" "}
                Consumidor
              </label>
              <label style={{ color: "#000" }}>
                <input
                  type="radio"
                  id="Fornecedor"
                  name="role"
                  value="fornecedor"
                  checked={fornecedor === 1}
                  onChange={() => handleRoleChange("fornecedor")}
                />{" "}
                Fornecedor
              </label>
            </div>
            <BlueButton text="Salvar" onClick={save} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
