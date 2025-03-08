// NavBar Component
'use client';
import React, { useEffect, useState } from 'react';
import HeaderItem from './headeritem';



export const NavBar = () => {
    const [userData, setUserData] = useState(null);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        console.log("useEffect executed");
        const data = localStorage.getItem('UserData');
        if (data) {
            const parsedData = JSON.parse(data);
            setUserData(parsedData);
            setUserType(parsedData.type);
            console.log("User Type", parsedData.type);
            console.log("User Data: ", parsedData);
        } else {
            console.log("No user data found in sessionStorage");
        }
    }, []);

    return (
        <div style={{
            backgroundColor: '#0D3048',
            color: 'white',
            padding: '0px 50px',
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
                    width: '25%'
                }} />
            <nav style={{
                display: 'flex',
                gap: '25px'
            }}>
                <HeaderItem text="Home" href="/" />
                <HeaderItem text="Histórico" href="/historico" />
                <HeaderItem text="Suporte" href="/suporte" />
                {userType === 'Consumidor' && <HeaderItem id="Simular" text="Simular" href="/simular" />}
                {userType === 'Fornecedor' && <HeaderItem id="Cadastrar" text="Cadastrar" href="/cadastrar" />}
                <HeaderItem text="Sobre Nós" href="/about" />
                {!userType && <HeaderItem text="Login" href="/login" />}
                {userType && <HeaderItem text="Logout" href="/login" />}
            </nav>
        </div>
    );
};

export default NavBar;