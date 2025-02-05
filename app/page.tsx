import React from 'react';
import { NavBar } from './components/Common/navBar';
import YellowLine from './components/Common/yellowLine';
import { BiStats } from "react-icons/bi";
import { FaCalculator } from 'react-icons/fa6';
import { FaHistory } from 'react-icons/fa';

export default function Home() {
  const usertyp = 'admin';

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#f5f5f5', zIndex:'-2'}}>
      <NavBar usertype={usertyp} />
      <YellowLine />

      {/* Hero Section */}
      <div style={{ position: 'relative', width: '100%', height: '500px', background: 'url(/images/hero-bg.jpg) center/cover no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
        <img src="/images/img1.jpg" alt="Solar Simulator Logo" style={{ width: '100%', zIndex:'-1', maxHeight:"900px" }}  />
      </div>

      {/* Features Section */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '50px 10%', backgroundColor: '#0D3048', color: 'white', borderRadius: '0 0 100px 100px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center', maxWidth: '300px', margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FaCalculator style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
          </div>
          <h3>Simulações Precisas</h3>
          <p>Utilize algoritmos avançados para prever sua geração de energia solar.</p>
        </div>
        <div style={{ textAlign: 'center', maxWidth: '300px', margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FaHistory style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
          </div>
          <h3>Otimização Inteligente</h3>
          <p>Melhore o posicionamento dos seus painéis solares para máxima eficiência.</p>
        </div>
        <div style={{ textAlign: 'center', maxWidth: '300px', margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BiStats style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
          </div>
          <h3>Economia Garantida</h3>
          <p>Analise o retorno do seu investimento com relatórios detalhados.</p>
        </div>
      </div>    

      {/* About Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '50px 10%' }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ color: '#0D3048', fontSize: '36px', fontWeight: 'bold' }}>Sobre o Solar Simulator</h2>
          <p style={{ fontSize: '20px', textAlign: 'justify' }}>
            Descubra como maximizar a eficiência da energia solar! Nossa plataforma inovadora permite simular diferentes cenários climáticos e geográficos para otimizar a captação de luz e prever a produção de energia com precisão.
          </p>
          <button style={{ marginTop: '20px', backgroundColor: '#FFC531', color: '#0D3048', fontWeight: 'bold', padding: '12px 24px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Saiba Mais</button>
        </div>
        <img src="/images/placas.png" alt="Placas solares" style={{ width: '50%', maxWidth: '500px', borderRadius: '20px', boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.3)' }} />
      </div>
    </div>
  );
}
