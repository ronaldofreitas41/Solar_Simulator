'use client';
import React from 'react';
import { NavBar } from './components/Common/navBar';
import YellowLine from './components/Common/yellowLine';
import { BiStats } from "react-icons/bi";
import { FaCalculator } from 'react-icons/fa6';
import { FaHistory } from 'react-icons/fa';
import Footer from './components/Common/footer';

export default function Home() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar/>
      <YellowLine />

      {/* Hero Section */}
      <div style={{ position: 'relative', width: '100%', height: '500px', background: 'url(/images/hero-bg.jpg) center/cover no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', padding: '20px', overflow: 'hidden' }}>
        <img
          src="/images/img1.jpg"
          alt="Solar Simulator Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            marginTop:'60px',
            top: 0,
            left: 0,
            zIndex: 0 
          }}
        />
      </div>

      {/* Features Section */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '50px 10%', backgroundColor: '#0D3048', color: 'white', borderRadius: '0 0 100px 100px', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', maxWidth: '300px', margin: '20px', flex: '1 1 300px' }}>
          <FaCalculator style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
          <h3>Simulações Precisas</h3>
          <p>Utilize algoritmos avançados para prever sua geração de energia solar.</p>
        </div>
        <div style={{ textAlign: 'center', maxWidth: '300px', margin: '20px', flex: '1 1 300px' }}>
          <FaHistory style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
          <h3>Otimização Inteligente</h3>
          <p>Melhore o posicionamento dos seus painéis solares para máxima eficiência.</p>
        </div>
        <div style={{ textAlign: 'center', maxWidth: '300px', margin: '20px', flex: '1 1 300px' }}>
          <BiStats style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
          <h3>Economia Garantida</h3>
          <p>Analise o retorno do seu investimento com relatórios detalhados.</p>
        </div>
      </div>

      {/* About Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '50px 10%', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '600px', flex: '1 1 400px' }}>
          <h2 style={{ color: '#0D3048', fontSize: '36px', fontWeight: 'bold' }}>Sobre o Solar Simulator</h2>
          <p style={{ fontSize: '20px', color:'#0D3048', textAlign: 'justify' }}>
          O Solar Simulator é a solução perfeita para maximizar a eficiência da energia solar. Nossa plataforma inovadora permite simular diversos cenários climáticos e geográficos, ajudando você a otimizar a captação de luz solar e prever com precisão a produção energética. Com tecnologia de ponta e análises detalhadas, oferecemos uma experiência completa para quem busca sustentabilidade e economia.
          </p>
        </div>
        <img src="/images/placas.png" alt="Placas solares" style={{ width: '50%', maxWidth: '500px', flex: '1 1 400px' }} />
      </div>

      {/* Footer Section */}
          <Footer/>
    </div>
  );
}
