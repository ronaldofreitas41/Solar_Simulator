import { NavBar } from "@/app/components/Common/navBar";
import YellowLine from "@/app/components/Common/yellowLine";
import React from "react";

export default function page() {
    return (
        <body>
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
                            Relate por auqi o seu problema, e entraremos em contato o mais rápido possível.
                        </p>
                        <div style={{ marginTop: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', color: '#000' }}>
                                Nome:
                                <input type="text" style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    border: '3px solid #083553'
                                }} />
                            </label>
                            <label style={{
                                display: 'block',
                                marginBottom: '10px',
                                color: '#000'

                            }}>
                                Conteúdo do E-mail:
                                <textarea style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    border: '3px solid #083553'
                                }} rows={5}></textarea>
                            </label>
                        </div>
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
            </div>
        </body >
    );


}