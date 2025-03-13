'use client';
import BlueButton from "@/app/components/Common/blueButton";
import Footer from "@/app/components/Common/footer";
import { NavBar } from "@/app/components/Common/navBar";
import YellowLine from "@/app/components/Common/yellowLine";
import React, { useState } from "react";

export default function Page() {
    const [name, setName] = useState('');
    const [emailContent, setEmailContent] = useState('');

    async function enviar() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/sender`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, emailContent }),
            });

            if (response.ok) {
                alert('E-mail enviado com sucesso!');
            } else {
                alert('Erro ao enviar e-mail');
            }
        } catch (error) {
            alert('Erro ao enviar e-mail');
        }
    }

    return (
        <div>
            <NavBar />
            <YellowLine />
            <div
                style={{
                    backgroundColor: '#fff',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                }}>
                    <div style={{
                        paddingLeft: '10%',
                        paddingTop: '5%',
                    }}>
                        <h1 style={{
                            paddingLeft: '35%',
                            fontFamily: 'Averia Serif Libre',
                            fontSize: '40px',
                            color: '#000'
                        }}>Suporte</h1>
                        <p style={{
                            paddingTop: '5%',
                            color: '#000',
                            fontFamily: 'Averia Serif Libre',
                            fontSize: '18px',
                        }}>
                            Relate por aqui o seu problema, e entraremos em contato o mais rápido possível.
                        </p>
                        <div style={{ marginTop: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', color: '#000' }}>
                                Nome:
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '5px',
                                        border: '3px solid #083553'
                                    }}
                                />
                            </label>
                            <label style={{
                                display: 'block',
                                marginBottom: '10px',
                                color: '#000'
                            }}>
                                Conteúdo do E-mail:
                                <textarea
                                    value={emailContent}
                                    onChange={(e) => setEmailContent(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '5px',
                                        border: '3px solid #083553'
                                    }}
                                    rows={5}
                                ></textarea>
                            </label>
                        </div>
                        <BlueButton text="Enviar" onClick={enviar} />
                    </div>

                    <img
                        src="/images/suporte.png"
                        alt="suporteimg"
                        style={{
                            height: '90%',
                            width: '50%',
                            float: 'right'
                        }} />
                </div>
                <Footer />
            </div>
        </div>
    );
}