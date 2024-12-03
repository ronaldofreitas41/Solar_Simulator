'use client';

import { database } from "@/app/services/fbConfig";
import { push, ref, set } from "firebase/database";
import React, { useState } from "react";

// console.log("Database:", database);

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [consumidor, setConsumidor] = useState(0);
    const [fornecedor, setFornecedor] = useState(0);

    function save() {

        console.log("Aqui")
        console.log(database);
        console.log({ name, email, password, consumidor, fornecedor });


        const data = {
            name,
            email,
            password
        }

        const userRef = push(ref(database, 'Users'));

        set(userRef, data)
            .then(() => {
                console.log('Data saved successfully!');
            })
            .catch((error) => {
                console.error('Error saving data:', error.message);
            });
    }

    function handleRoleChange(role: string) {
        if (role === 'consumidor') {
            setConsumidor(1);
            setFornecedor(0);
        } else {
            setConsumidor(0);
            setFornecedor(1);
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
                    <h2 style={{ marginTop: "20px", textAlign: "center" }}>Criar uma conta</h2>
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
                    <a style={{ marginBottom: "20px", color: "#004C80", fontSize: 35, fontFamily: "serif" }}>
                        Registre-se
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
                                color: '#000'
                            }}
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="E-mail"
                            style={{
                                padding: "10px",
                                marginBottom: "10px",
                                border: "1px solid #CCC",
                                borderRadius: "4px",
                                color: '#000'
                            }}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            style={{
                                padding: "10px",
                                marginBottom: "10px",
                                border: "1px solid #CCC",
                                borderRadius: "4px",
                                color: '#000'
                            }}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "20px",
                            }}
                        >
                            <label style={{ color: '#000' }}>
                                <input
                                    type="radio"
                                    id="Consumidor"
                                    name="role"
                                    value="consumidor"
                                    checked={consumidor === 1}
                                    onChange={() => handleRoleChange('consumidor')}
                                />{" "}
                                Consumidor
                            </label>
                            <label style={{ color: '#000' }}>
                                <input
                                    type="radio"
                                    id="Fornecedor"
                                    name="role"
                                    value="fornecedor"
                                    checked={fornecedor === 1}
                                    onChange={() => handleRoleChange('fornecedor')}
                                />{" "}
                                Fornecedor
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={save}
                            style={{
                                background: "#004C80",
                                color: "#FFFFFF",
                                border: "none",
                                padding: "10px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Salvar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
