// NavBar Component
import React from 'react';
import HeaderItem from './headeritem';

interface Props {
    usertype: string;
}

export const NavBar: React.FC<Props> = ({ usertype }) => {
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
                <HeaderItem text="Simular" href="/simular" />
                <HeaderItem text="Contato" href="/contato" />
                <HeaderItem text="Login" href="/login" />
            </nav>
        </div>
    );
};