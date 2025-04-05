'use client';

import React, { useState } from "react";
import { redirect } from "next/navigation";
import BlueButton from "../Common/blueButton";
import WhiteButton from "../Common/whiteButton";

const AuthUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/checkUsers`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('UserData', JSON.stringify(data));
            alert('Usuário autenticado com sucesso!');
            redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
        } else {
            alert('Usuário não encontrado na base de dados.');
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
                background: "#F4F4F4",
            }}
        >
            <div className="auth-container">
                {/* Lado esquerdo */}
                <div className="left-side">
                    <img src="/images/logo.png" alt="Logo" style={{ maxWidth: "325px" }} />
                    <h2 style={{ marginTop: "20px", textAlign: "center" }}>Criar uma conta</h2>
                    <WhiteButton text="Registre-se" onClick={mudaRegister} />
                    <p style={{ marginTop: "10px" }}>Já tem uma conta?</p>
                    <BlueButton text="Entrar" onClick={mudaLogin} />
                </div>

                {/* Lado direito */}
                <div className="right-side">
                    <h1 style={{ marginBottom: "20px", color: "#004C80", fontSize: 35, fontFamily: "serif" }}>
                        Login
                    </h1>
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
                                marginBottom: "20px",
                                border: "1px solid #CCC",
                                borderRadius: "4px",
                                color: '#000'
                            }}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <BlueButton text="Enviar" onClick={submit} />
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
}

export default AuthUser;
