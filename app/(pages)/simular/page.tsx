'use client';
import NavBar from '@/app/components/Common/navBar';
import YellowLine from '@/app/components/Common/yellowLine';
import React, { useState } from 'react';
import MapComponent from '@/app/components/Simulation/mapComponent';

// Ícones podem ser importados de uma biblioteca como react-icons
import { FaHome, FaTractor, FaIndustry } from 'react-icons/fa';

export default function Home() {
    const usertyp = 'admin';
    const [localizacao, setLocalizacao] = useState('Localização');
    const [consumo, setConsumo] = useState('Consumo');
    const [selectedOption, setSelectedOption] = useState('Doméstico');

    return (
        <div>
            <NavBar usertype={usertyp} />
            <YellowLine />
            <div
                id='localização'
                style={{
                    backgroundColor: '#fff',
                    height: '100%',
                    width: '30%',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: '1px solid #000',
                }}
            >
                <div>
                    <p style={{
                        color: '#000',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        width: '100%',
                        textAlign: 'center',
                        padding: '20px',
                    }}>Informe os dados abaixo</p>
                    <input
                        type="text"
                        id="Localizacao"
                        style={{
                            border: '2px solid #000',
                            borderRadius: '30px',
                            width: '80%',
                            backgroundColor: '#FEC330',
                            marginLeft: '20px',
                            padding: '10px',
                            color: '#000',
                            fontWeight: 'bold',
                            fontFamily: 'Averia Serif Libre',
                        }}
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                    />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'flex-start',
                            paddingLeft: '20px',
                            paddingBottom: '20px',
                        }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="radio"
                                name="tipo"
                                value="Doméstico"
                                checked={selectedOption === 'Doméstico'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                style={{ accentColor: '#000' }}
                            />
                            <FaHome size={24} style={{ color: '#000' }} />
                            <span style={{
                                fontFamily: 'Averia Serif Libre',
                                fontSize: '20px',
                                color: '#000',
                            }}>Doméstico</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="radio"
                                name="tipo"
                                value="Agrário"
                                checked={selectedOption === 'Agrário'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                style={{ accentColor: '#000' }}
                            />
                            <FaTractor size={24} style={{ color: '#000' }} />
                            <span style={{
                                fontFamily: 'Averia Serif Libre',
                                fontSize: '20px',
                                color: '#000',
                            }}>Agrário</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="radio"
                                name="tipo"
                                value="Industrial"
                                checked={selectedOption === 'Industrial'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                style={{ accentColor: '#000' }}
                            />
                            <FaIndustry size={24} style={{ color: '#000' }} />
                            <span style={{
                                fontFamily: 'Averia Serif Libre',
                                fontSize: '20px',
                                color: '#000',
                            }}>Industrial</span>
                        </label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="consumo"
                            style={{
                                border: '2px solid #000',
                                borderRadius: '30px',
                                width: '80%',
                                backgroundColor: '#FEC330',
                                marginLeft: '20px',
                                padding: '10px',
                                color: '#000',
                                fontWeight: 'bold',
                                fontFamily: 'Averia Serif Libre',
                            }}
                            value={consumo}
                            onChange={(e) => setLocalizacao(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div
                id='mapa'
                style={{
                    backgroundColor: '#fff',
                    height: '100%',
                    width: '70%',
                    position: 'absolute',
                    right: '0',
                }}>
                <MapComponent/>
                </div>
        </div>
    );
}
