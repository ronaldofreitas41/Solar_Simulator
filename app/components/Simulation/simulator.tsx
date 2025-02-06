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


    // Função de callback para atualizar a localização
    const handleLocationChange = (location: string) => {
        setLocalizacao(location);
    };
    /* 
        Método para se calcular o melhor custo beneficio entre as placas
        @Params: plateData -> lista de placas retornadas da base de dados
        @Return: index -> indice da placa que contem o melhor custo beneficio
    */
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

    /* 
        Método para se extrair a latitude e longitude da localização desejada para a simulação
        @Params: localização -> localização contida no formulário que contem esse dado em texto
        @Return: coordenadas -> Coordenadas Cartesianas da localização fornecida
    */
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
    /*
    Função que irá calcular a geração de energia do sistema fotovoltaico e descobrira quantas placas são necessárias
    para atender ao consumo do usuário
    @Params: Nenhum
    @Return: Nenhum
    */
    async function calculaGeracao() {

        //Requisitando dados do servidor
        let plates = await getPlates();
        let irradiation = await getIrradiation();

        //convertendo os dados em arrays contendo os dados
        let plateData: any = Object.values(plates.data);
        let irradiationData: any = Object.values(irradiation.data);

        //Dados extraidos de funções a parte
        const coordenadas = getCoordenadas();
        const bestPlateIndex = melhorCustoBeneficio(plateData);

        if (Array.isArray(irradiationData)) {
            irradiationData.forEach(e => {
                if (Number(e.LAT.toFixed(1)) == coordenadas[0]) {
                    if (Number(e.LON.toFixed(1)) == coordenadas[1]) {
                        //Irradiação Solar media Diaria
                        let irradiacaoMedia = e.ANNUAL;

                        //Área do painel de melhor custo beneficio
                        let area = 2

                        //Potencia do Painel de melhor custo beneficio
                        let potencia = 500
                        /*
                        Eficiencia do Painel: pode ser obtida dividindo a potência do painel pela potência teórica recebida
    
                        Formula:
                        e = p/isp*a
    
                        e -> eficiencia
                        p -> potencia do painel
                        isp -> irradiação solar padrão em condições de teste geralmente = 1000W/m²
                        a -> area
                        */
                        let eficiencia = potencia / (1000 * area)
                        console.log("Eficiencia do Painel: ", eficiencia);
                        /*
                        Geração da placa por dia em kWh/dia
    
                        Formula:
                        g = (i * a * e)/1000
    
                        g -> Geração
                        e -> Eficiencia
                        i -> Irradiação Solar Média Diária
                        a -> Área da placa
                        */
                        let geracaoPlaca = (irradiacaoMedia * area * eficiencia) / 1000;
                        let geracaoPlacaMensal = geracaoPlaca * 30;
                        //Quantidade de placas necessarias para atender ao consumo mensal do usuário
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* NavBar fixa */}
            <NavBar usertype={usertyp} />

            {/* Container principal */}
            <div style={{ display: 'flex', marginTop: '70px', height: 'calc(100vh - 70px)' }}>

                {/* Formulário */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        width: '30%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRight: '1px solid #000',
                        padding: '20px',
                    }}
                >
                    <p style={{
                        color: '#000',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                        Informe os dados abaixo
                    </p>

                    <p style={{
                        color: '#000',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '25px',
                        alignSelf: 'flex-start',
                    }}>
                        Localização
                    </p>

                    <input
                        type="text"
                        id="Localizacao"
                        style={{
                            border: '2px solid #000',
                            borderRadius: '30px',
                            width: '100%',
                            backgroundColor: '#FEC330',
                            padding: '10px',
                            color: '#000',
                            fontWeight: 'bold',
                            fontFamily: 'Averia Serif Libre',
                        }}
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                    />

                    {/* Tipo de Consumo Elétrico */}
                    <p style={{
                        color: '#000',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '25px',
                        marginTop: '20px',
                        alignSelf: 'flex-start',
                    }}>
                        Tipo de Consumo Elétrico:
                    </p>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignSelf: 'flex-start',
                    }}>
                        {[
                            { value: 'Doméstico', icon: <FaHome size={24} /> },
                            { value: 'Agrário', icon: <FaTractor size={24} /> },
                            { value: 'Industrial', icon: <FaIndustry size={24} /> }
                        ].map((item) => (
                            <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="radio"
                                    name="tipo"
                                    value={item.value}
                                    checked={selectedOption === item.value}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    style={{ accentColor: '#000' }}
                                />
                                {item.icon}
                                <span style={{
                                    fontFamily: 'Averia Serif Libre',
                                    fontSize: '20px',
                                    color: '#000',
                                }}>{item.value}</span>
                            </label>
                        ))}
                    </div>

                    {/* Consumo Elétrico */}
                    <p style={{
                        color: '#000',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '25px',
                        marginTop: '20px',
                        alignSelf: 'flex-start',
                    }}>
                        Consumo Elétrico
                    </p>

                    <div style={{ alignSelf: 'flex-start' }}>
                        <label style={{ marginRight: '25px' }}>
                            <input type="radio"
                                name="consumo"
                                value="Consumo Médio"
                                checked={selectedOption2 === 'Consumo Médio'}
                                onChange={(e) => setSelectedOption2(e.target.value)}
                            />
                            <span style={{ fontFamily: 'Averia Serif Libre', fontSize: '20px', color: '#000' }}>
                                Consumo Médio Mensal
                            </span>
                        </label>
                        <label>
                            <input type="radio"
                                name="consumo"
                                value="Consumo Anual"
                                checked={selectedOption2 === 'Consumo Anual'}
                                onChange={(e) => setSelectedOption2(e.target.value)}
                            />
                            <span style={{ fontFamily: 'Averia Serif Libre', fontSize: '20px', color: '#000' }}>
                                Consumo Anual
                            </span>
                        </label>
                    </div>

                    <input
                        type="text"
                        id="consumo"
                        style={{
                            border: '2px solid #000',
                            borderRadius: '30px',
                            width: '100%',
                            backgroundColor: '#FEC330',
                            padding: '10px',
                            color: '#000',
                            fontWeight: 'bold',
                            fontFamily: 'Averia Serif Libre',
                        }}
                        value={consumo}
                        onChange={(e) => setConsumo(e.target.value)}
                    />

                    {/* Área do terreno */}
                    <p style={{
                        color: '#000',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '25px',
                        marginTop: '20px',
                        alignSelf: 'flex-start',
                    }}>
                        Área do terreno disponível
                    </p>

                    <input
                        type="text"
                        id="Area"
                        style={{
                            border: '2px solid #000',
                            borderRadius: '30px',
                            width: '100%',
                            backgroundColor: '#FEC330',
                            padding: '10px',
                            color: '#000',
                            fontWeight: 'bold',
                            fontFamily: 'Averia Serif Libre',
                        }}
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />

                    {/* Botão Enviar */}
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                        <BlueButton text='Enviar' onClick={calculaGeracao} />
                    </div>
                </div>

                {/* Mapa */}
                <div id="mapa" style={{ width: '70%', height: '100%' }}>
                    <MapComponent onLocationChange={handleLocationChange} />
                </div>
            </div>
        </div>
    );
}

export default Simulator;