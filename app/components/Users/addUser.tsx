"use client";

import React, { useState } from "react";
import BlueButton from "../Common/blueButton";
import WhiteButton from "../Common/whiteButton";
import { useRouter } from "next/navigation";

export const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [document, setDocument] = useState("");
  const [consumidor, setConsumidor] = useState(0);
  const [fornecedor, setFornecedor] = useState(0);
  const [userType, setUserType] = useState("");
  const [isCNPJ, setIsCNPJ] = useState(false);
  const router = useRouter();

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto entre o terceiro e o quarto dígitos
      .replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto entre o sexto e o sétimo dígitos
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca um hífen entre o nono e o décimo dígitos
  };

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d{2})(\d)/, "$1.$2") // Coloca um ponto entre o segundo e o terceiro dígitos
      .replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto entre o quinto e o sexto dígitos
      .replace(/(\d{3})(\d)/, "$1/$2") // Coloca uma barra entre o oitavo e o nono dígitos
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2"); // Coloca um hífen entre o décimo terceiro e o décimo quarto dígitos
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDocument(isCNPJ ? formatCNPJ(value) : formatCPF(value));
  };

  async function save() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        document: document,
        password: password,
        type: userType,
      }),
    });
    if (res.ok) {
      alert("Usuário cadastrado com sucesso");
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
    } else {
      alert("Erro no cadastro de usuário");
    }
  }

  function handleRoleChange(role: string) {
    if (role === "consumidor") {
      setConsumidor(1);
      setFornecedor(0);
      setUserType("Consumidor");
      setIsCNPJ(false);
    } else {
      setConsumidor(0);
      setFornecedor(1);
      setUserType("Fornecedor");
      setIsCNPJ(true);
    }
  }

  function mudaRegister() {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/register`);
  }

  function mudaLogin() {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
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
      <div className="auth-container">
        {/* Lado esquerdo (Azul) */}
        <div className="left-side">
          <img src="/images/logo.png" alt="Logo" style={{maxWidth:"325px"}} />
          <h2 style={{ marginTop: "20px", textAlign: "center" }}>
            Criar uma conta
          </h2>
          <WhiteButton text="Registre-se" onClick={mudaRegister} />
          <p style={{ marginTop: "10px" }}>Já tem uma conta?</p>

          <BlueButton text="Entrar" onClick={mudaLogin} />
        </div>

        {/* Lado direito (Formulário) */}
        <div className="right-side">
          <a
            style={{
              marginBottom: "20px",
              color: "#004C80",
              fontSize: 35,
              fontFamily: "serif",
            }}
          >
            Registro de Usuário
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
              placeholder={isCNPJ ? "CNPJ" : "CPF"}
              value={document}
              maxLength={isCNPJ ? 18 : 14}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #CCC",
                borderRadius: "4px",
                color: "#000",
              }}
              onChange={handleDocumentChange}
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
      <style jsx>{`
                .auth-container {
                    display: flex;
                    flex-direction: column;
                    width: 90%;
                    max-width: 900px;
                    height: auto;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    border-radius: 8px;
                    overflow: hidden;
                }

                .left-side {
                        display: flex;
                        flex: 1;
                        background: #004c80;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                        flex-direction: column;
                        padding: 20px;
                }

                .right-side {
                    display: flex;
                    flex: 1;
                    background: #ffffff;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    padding: 20px;
                }

                @media (min-width: 800px) {
                    .auth-container {
                        flex-direction: row;
                        height: 80%;
                    }

                    .left-side {
                        display: flex;
                        flex: 1;
                        background: #004c80;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                        flex-direction: column;
                        padding: 20px;
                    }

                    .right-side {
                        flex: 1;
                        padding: 40px;
                    }
                }
            `}</style>
    </div>
  );
};

export default AddUser;