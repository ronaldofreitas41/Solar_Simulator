"use client"
import React, { useEffect, useState } from "react";
import MapComponent from "./mapComponent";
import { FaHome, FaIndustry, FaTractor } from "react-icons/fa";
import { NavBar } from "../Common/navBar";
import BlueButton from "../Common/blueButton";

const Simulator = () => {
    const usertyp = 'admin';
    const [localizacao, setLocalizacao] = useState('Localização');
    const [consumo, setConsumo] = useState('Consumo');
    const [selectedOption, setSelectedOption] = useState('Doméstico');
    const [selectedOption2, setSelectedOption2] = useState('Consumo Médio');
    const [area, setArea] = useState('Área');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocalizacao(`Lat: ${latitude}, Lon: ${longitude}`);
            });
        } else {
            alert("Geolocalização não é suportada pelo seu navegador.");
        }
    }, []);

    const handleLocationChange = (location: string) => {
        setLocalizacao(location);
    };

    function melhorCustoBeneficio(plateData: any) {
        let max = Number.MAX_VALUE;
        let bestIndex = -1;

        if (Array.isArray(plateData)) {
            plateData.forEach((e, index) => {
                let cb = e.price / e.power;
                if (cb < max) {
                    max = cb;
                    bestIndex = index
                }
            });
        } else {
            console.error('plateData is not an array');
        }

        return bestIndex;
    }

    function getCoordenadas() {
        let labelLoc: string[] = localizacao.split(":");
        let lonLabel = parseFloat(labelLoc[2]);
        labelLoc = labelLoc[1].split(",");
        let latLabel = parseFloat(labelLoc[0]);
        latLabel = Number(latLabel.toFixed(1));
        lonLabel = Number(lonLabel.toFixed(1));
        const cordenadas = [latLabel, lonLabel];
        return cordenadas;
    }

    async function calculaGeracao() {
        let plates = await getPlates();
        let irradiation = await getIrradiation();

        let plateData: any = Object.values(plates.data);
        let irradiationData: any = Object.values(irradiation.data);

        const coordenadas = getCoordenadas();
        const bestPlateIndex = melhorCustoBeneficio(plateData);

        if (Array.isArray(irradiationData)) {
            irradiationData.forEach(e => {
                if (Number(e.LAT.toFixed(1)) == coordenadas[0]) {
                    if (Number(e.LON.toFixed(1)) == coordenadas[1]) {
                        let irradiacaoMedia = e.ANNUAL;
                        let area = 2
                        let potencia = 500
                        let eficiencia = potencia / (1000 * area)
                        console.log("Eficiencia do Painel: ", eficiencia);
                        let geracaoPlaca = (irradiacaoMedia * area * eficiencia) / 1000;
                        let geracaoPlacaMensal = geracaoPlaca * 30;
                        let n = parseFloat(consumo) / geracaoPlacaMensal;

                        alert('Em um sistema composto por placas com potencial de 500w em condições ideais com 80% de aproveitamento da geração na sua localização é necessário: ' + n + "placas");
                        return;
                    }
                }
            });
        }
    }

    async function getIrradiation() {
        let option = '';
        switch (selectedOption) {
            case 'Doméstico':
                option = 'planoInclinado';
                break;
            case 'Agrário':
                option = 'fotossinteticamenteAtiva'
                break;
            case 'Industrial':
                option = 'planoInclinado';
                break;
            case 'UsinaCSP':
                option = 'normalDireta';
                break;
        }
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/irradiation/${option}`;
        console.log("URL:", url);
        const res = await fetch(url, {
            method: 'GET',
        });

        if (res.ok) {
            const irradiationData = await res.json();
            return irradiationData;
        } else {
            throw new Error('Sem dados de irradiação disponníveis')
        }
    }

    async function getPlates() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/plates`, {
            method: 'GET',
        });

        if (res.ok) {
            const plateData = await res.json();
            return plateData;
        } else {
            throw new Error('Sem Placas cadastradas');
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            <NavBar usertype={usertyp} />
            <div style={{ display: 'flex', marginTop: '70px', height: 'calc(100vh - 70px)' }}>
                <div
                    style={{
                        backgroundColor: '#fff',
                        width: '30%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRight: '1px solid #e0e0e0',
                        padding: '40px',
                        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <p style={{
                        color: '#333',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}>
                        Informe os dados abaixo
                    </p>

                    <p style={{
                        color: '#333',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '20px',
                        alignSelf: 'flex-start',
                        marginBottom: '10px',
                    }}>
                        Localização em Coordenadas
                    </p>

                    <input
                        type="text"
                        id="Localizacao"
                        readOnly
                        style={{
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            width: '100%',
                            backgroundColor: '#f9f9f9',
                            padding: '12px',
                            color: '#333',
                            fontWeight: 'bold',
                            fontFamily: 'Averia Serif Libre',
                            marginBottom: '20px',
                        }}
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                    />

                    <p style={{
                        color: '#333',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '20px',
                        marginTop: '20px',
                        alignSelf: 'flex-start',
                        marginBottom: '10px',
                    }}>
                        Tipo de Consumo Elétrico:
                    </p>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignSelf: 'flex-start',
                        marginBottom: '20px',
                    }}>
                        {[
                            { value: 'Doméstico', icon: <FaHome size={24} style={{ color: '#000' }} /> },
                            { value: 'Agrário', icon: <FaTractor size={24} style={{ color: '#000' }} /> },
                            { value: 'Industrial', icon: <FaIndustry size={24} style={{ color: '#000' }} /> }
                        ].map((item) => (
                            <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="radio"
                                    name="tipo"
                                    value={item.value}
                                    checked={selectedOption === item.value}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    style={{ accentColor: '#333' }}
                                />
                                {item.icon}
                                <span style={{
                                    fontFamily: 'Averia Serif Libre',
                                    fontSize: '18px',
                                    color: '#333',
                                }}>{item.value}</span>
                            </label>
                        ))}
                    </div>

                    <p style={{
                        color: '#333',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '20px',
                        marginTop: '20px',
                        alignSelf: 'flex-start',
                        marginBottom: '10px',
                    }}>
                        Consumo Elétrico
                    </p>

                    <div style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
                        <label style={{ marginRight: '25px' }}>
                            <input type="radio"
                                name="consumo"
                                value="Consumo Médio"
                                checked={selectedOption2 === 'Consumo Médio'}
                                onChange={(e) => setSelectedOption2(e.target.value)}
                                style={{ accentColor: '#333' }}
                            />
                            <span style={{ fontFamily: 'Averia Serif Libre', fontSize: '18px', color: '#333' }}>
                                Consumo Médio Mensal
                            </span>
                        </label>
                        <label>
                            <input type="radio"
                                name="consumo"
                                value="Consumo Anual"
                                checked={selectedOption2 === 'Consumo Anual'}
                                onChange={(e) => setSelectedOption2(e.target.value)}
                                style={{ accentColor: '#333' }}
                            />
                            <span style={{ fontFamily: 'Averia Serif Libre', fontSize: '18px', color: '#333' }}>
                                Consumo Anual
                            </span>
                        </label>
                    </div>

                    <input
                        type="text"
                        id="consumo"
                        style={{
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            width: '100%',
                            backgroundColor: '#f9f9f9',
                            padding: '12px',
                            color: '#333',
                            fontWeight: 'bold',
                            fontFamily: 'Averia Serif Libre',
                            marginBottom: '20px',
                        }}
                        value={consumo}
                        onChange={(e) => setConsumo(e.target.value)}
                    />

                    <p style={{
                        color: '#333',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '20px',
                        marginTop: '20px',
                        alignSelf: 'flex-start',
                        marginBottom: '10px',
                    }}>
                        Área do terreno disponível
                    </p>

                    <input
                        type="text"
                        id="Area"
                        style={{
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            width: '100%',
                            backgroundColor: '#f9f9f9',
                            padding: '12px',
                            color: '#333',
                            fontWeight: 'bold',
                            fontFamily: 'Averia Serif Libre',
                            marginBottom: '20px',
                        }}
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                        <BlueButton text='Enviar' onClick={calculaGeracao} />
                    </div>
                </div>

                <div id="mapa" style={{ width: '70%', height: '100%', backgroundColor: '#fff' }}>
                    <MapComponent onLocationChange={handleLocationChange} />
                </div>
            </div>
        </div>
    );
}

export default Simulator;