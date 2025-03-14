'use client';

import React, { useState } from "react";
import { auth } from "../../services/firebaseClient";  // Importação do banco de dados
import { redirect } from "next/navigation";
import BlueButton from "../Common/blueButton";
import WhiteButton from "../Common/whiteButton";

const AuthUser = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function submit() {
        // Envio dos dados ao servidor para verificação
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/checkUsers`, {
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('UserData', JSON.stringify(data));
            alert('Usuário autenticado como correto')
            redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
        } else {
            throw new Error('Usuário não está presente na base de dados');
        }
    }

    function mudaRegister() {
        redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/register`);
    }

    function mudaLogin() {
        redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
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
                    <WhiteButton text="Registre-se" onClick={mudaRegister} />
                    <p style={{ marginTop: "10px" }}>Já tem uma conta?</p>
                    <BlueButton text="Entrar" onClick={mudaLogin} />
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
                        </div>
                        <BlueButton text="Enviar" onClick={submit} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthUser;
