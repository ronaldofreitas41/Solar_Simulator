'use client';
import React, { useEffect, useState } from 'react';
import HeaderItem from './headeritem';

export const NavBar = () => {
    const [userData, setUserData] = useState(null);
    const [userType, setUserType] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const data = typeof window !== "undefined" ? (window.localStorage.getItem('UserData') || '{}') : '{}';
        if (data) {
            const parsedData = JSON.parse(data);
            setUserData(parsedData);
            setUserType(parsedData.type);
        } else {
            console.log("No user data found in localStorage");
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };



    return (
        <div style={{
            backgroundColor: '#0D3048',
            color: 'white',
            padding: '0px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            width: '100%',
            height: '70px',
            zIndex: 50
        }}>
            <img
                src="/images/logo.png"
                alt="Logo"
                style={{
                    width: '300px',
                    maxWidth: '70%',
                }}
            />

            <div
                style={{
                    display: 'flex',
                    cursor: 'pointer',
                    flexDirection: 'column',
                    gap: '5px'
                }}
                onClick={toggleMenu}
            >
                <div style={{ width: '25px', height: '3px', backgroundColor: 'white' }}></div>
                <div style={{ width: '25px', height: '3px', backgroundColor: 'white' }}></div>
                <div style={{ width: '25px', height: '3px', backgroundColor: 'white' }}></div>
            </div>

            <nav className={isMenuOpen ? 'menu aberto' : 'menu fechado'}>
                <HeaderItem text="Home" href="/" />
                {userType === 'Consumidor' && <HeaderItem id="Historico" text="Historico" href="/historico" />}
                {userType === 'Fornecedor' && <HeaderItem id="Produtos" text="Produtos" href="/produtos" />}
                <HeaderItem text="Suporte" href="/suporte" />
                {userType === 'Consumidor' && <HeaderItem id="Simular" text="Simular" href="/simular" />}
                {userType === 'Fornecedor' && <HeaderItem id="Cadastrar" text="Cadastrar" href="/cadastro" />}
                {!userType && <HeaderItem text="Login" href="/login" />}
                {userType && <HeaderItem href='/login' text="Logout" onClick={() => { }} />
                }
            </nav>

            <style jsx>{`
                @media (max-width: 1000px) {
                    nav {
                        display: ${isMenuOpen ? 'flex' : 'none'};
                        flex-direction: column;
                        position: absolute;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background-color: #0D3048;
                        padding: 20px 0;
                        gap: 15px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    }

                    div > div {
                        display: block;
                    }
                }

                @media (min-width: 1000px) {
                    div > div {
                        display: none;
                    }

                    nav {
                        display: flex !important;
                        flex-direction: row;
                    }
                }
            `}</style>
        </div>
    );
};

export default NavBar;
