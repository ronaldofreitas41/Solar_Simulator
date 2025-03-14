'use client';
import React, { useEffect, useState } from 'react';
import HeaderItem from './headeritem';

export const NavBar = () => {
    const [userData, setUserData] = useState(null);
    const [userType, setUserType] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar a visibilidade do menu

    useEffect(() => {

        const data = sessionStorage.getItem('UserData');
        if (data) {
            const parsedData = JSON.parse(data);
            setUserData(parsedData);
            setUserType(parsedData.type);
        } else {
            console.log("No user data found in sessionStorage");
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Alterna entre abrir e fechar o menu
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
            {/* Logo */}
            <img
                src="/images/logo.png"
                alt="Logo"
                style={{
                    width: '300px', // Tamanho fixo para o logo
                    maxWidth: '70%', // Limita o tamanho máximo
                }}
            />

            {/* Menu de Hambúrguer para telas pequenas */}
            <div 
                style={{ 
                    display: 'none', // Oculta o ícone em telas maiores
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

            {/* Menu Principal */}
            <nav style={{
                display: 'flex',
                gap: '25px',
                alignItems: 'center',
                transition: 'all 0.3s ease'
            }}>
                <HeaderItem text="Home" href="/" />
                {userType === 'Consumidor' && <HeaderItem id="Historico" text="Historico" href="/historico" />}
                {userType === 'Fornecedor' && <HeaderItem id="Produtos" text="Produtos" href="/produtos" />}
                <HeaderItem text="Suporte" href="/suporte" />
                {userType === 'Consumidor' && <HeaderItem id="Simular" text="Simular" href="/simular" />}
                {userType === 'Fornecedor' && <HeaderItem id="Cadastrar" text="Cadastrar" href="/cadastro" />}
                {!userType && <HeaderItem text="Login" href="/login" />}
                {userType && <HeaderItem text="Logout" href="/login" />}
            </nav>

            {/* Estilos responsivos com media queries */}
            <style jsx>{`
                @media (max-width: 768px) {
                    /* Oculta o menu principal em telas pequenas */
                    nav {
                        display: ${isMenuOpen ? 'flex' : 'none'};
                        flex-direction: column;
                        position: absolute;
                        top: 70px; /* Alinha abaixo da NavBar */
                        left: 0;
                        width: 100%;
                        background-color: #0D3048;
                        padding: 20px 0;
                        gap: 15px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    }

                    /* Exibe o ícone de hambúrguer em telas pequenas */
                    div > div {
                        display: flex;
                    }
                }

                @media (min-width: 769px) {
                    /* Oculta o ícone de hambúrguer em telas maiores */
                    div > div {
                        display: none;
                    }

                    /* Garante que o menu principal seja exibido horizontalmente */
                    nav {
                        display: flex;
                        flex-direction: row;
                    }
                }
            `}</style>
        </div>
    );
};

export default NavBar;