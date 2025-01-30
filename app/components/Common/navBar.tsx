import React from 'react';
import HeaderItem from './headeritem';

interface Props {
    usertype: string;
}

export const NavBar: React.FC<Props> = ({ usertype }) => {
    return (
        // Container principal
        <header className="navbar" style={{
            background: '#083553',
            height: '8%',
            minHeight: '8%',
            maxHeight: '110px',
            width: '100%',
            maxWidth: '100%',
            position: 'relative', // Use 'relative' em vez de 'absolute'
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            color: '#fff'
        }}>
            <img src="/images/logo.png" alt="Logo" className="logo" style={{width:'20%',height:'100%'}}/>
            <nav>
                <HeaderItem text="Home" href="localhost:3000/"/>
                <HeaderItem text="Histórico" href="localhost:3000/historico"/>
                <HeaderItem text="Suporte" href="localhost:3000/suporte"/>
                <HeaderItem text="Simular" href="localhost:3000/simular"/>
                <HeaderItem text="Contato" href="localhost:3000/contato"/>
                <HeaderItem text="Login" href="localhost:3000/login"/>
            </nav>
        </header>
    );
};

export default NavBar;