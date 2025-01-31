"use client"
import React, { useState } from "react";
import MapComponent from "./mapComponent";
import { FaHome, FaIndustry, FaTractor } from "react-icons/fa";
import { NavBar } from "../Common/navBar";
import YellowLine from "../Common/yellowLine";
import BlueButton from "../Common/blueButton";

const Simulator = () => {
    const usertyp = 'admin';
    const [localizacao, setLocalizacao] = useState('Localização');
    const [consumo, setConsumo] = useState('Consumo');
    const [selectedOption, setSelectedOption] = useState('Doméstico');
    const [selectedOption2, setSelectedOption2] = useState('Consumo Médio');
    const [area, setArea] = useState('Área');

    function calculaGeracao(){
        let wp: any;
        
    }




    return (
        <div>
            <NavBar usertype={usertyp} />
            <YellowLine />
            <div
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
                    <p
                        style={{
                            color: '#000',
                            fontFamily: 'Averia Serif Libre',
                            fontSize: '25px',
                            marginLeft: '25px',
                        }}
                    >Localização</p>
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
                <p
                    style={{
                        color: '#000',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '25px',
                        marginLeft: '25px',
                        marginTop: '20px',
                    }}
                >Tipo de Consumo Életrico:</p>
                <div style={{ paddingTop: '0px' }}>
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
                    <p
                        style={{
                            color: '#000',
                            fontFamily: 'Averia Serif Libre',
                            fontSize: '25px',
                            marginLeft: '25px',
                        }}
                    >Consumo Életrico</p>
                    <div style={{
                        paddingLeft: '25px',
                        paddingBottom: '20px',
                    }}>
                        <label style={{ marginRight: '25px' }}>
                            <input type="radio"
                                name="consumoMedio"
                                id="consumoMedio"
                                value="Consumo Médio"
                                checked={selectedOption2 === 'Consumo Médio'}
                                onChange={(e) => setSelectedOption2(e.target.value)}
                            />
                            <span style={{
                                fontFamily: 'Averia Serif Libre',
                                fontSize: '20px',
                                color: '#000',
                            }}>Consumo Médio Mensal</span>
                        </label>
                        <label>
                            <input type="radio"
                                name="consumoAnual"
                                id="consumoAnual"
                                value="Consumo Anual"
                                checked={selectedOption2 === 'Consumo Anual'}
                                onChange={(e) => setSelectedOption2(e.target.value)}
                            />
                            <span style={{
                                fontFamily: 'Averia Serif Libre',
                                fontSize: '20px',
                                color: '#000',
                            }}>Consumo Anual</span>
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
                    <p
                        style={{
                            color: '#000',
                            fontFamily: 'Averia Serif Libre',
                            fontSize: '25px',
                            marginTop: '20px',
                            marginLeft: '25px',
                        }}
                    >Área do terreno disponivel</p>
                    <div>
                        <input
                            type="text"
                            id="Area"
                            style={{
                                border: '2px solid #000',
                                borderRadius: '30px',
                                width: '80%',
                                backgroundColor: '#FEC330',
                                marginLeft: '20px',
                                // marginTop: '20px',
                                padding: '10px',
                                color: '#000',
                                fontWeight: 'bold',
                                fontFamily: 'Averia Serif Libre',
                            }}
                            value={area}
                            onChange={(e) => setLocalizacao(e.target.value)}
                        />


                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px',
                        }}
                    >
                        <BlueButton text='Enviar ' />
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
                <MapComponent />
            </div>
        </div>
    );
}

export default Simulator;