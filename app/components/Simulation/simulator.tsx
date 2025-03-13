"use client"
import React, { useEffect, useState } from "react";
import MapComponent from "./mapComponent";
import { FaHome, FaIndustry, FaTractor } from "react-icons/fa";
import { NavBar } from "../Common/navBar";
import BlueButton from "../Common/blueButton";
import Loading from "../Common/Loading";
import { escolheCabo, escolheControlador, escolheEstrutura, escolheInversor, melhorCustoBeneficio } from "@/app/services/Calc/bestEquip";
import { getIrradiation, getPlates } from "@/app/services/Calc/apiFunc";
import SimulationPopup from "../Common/SimulationPopup";

const Simulator = () => {
    const [localizacao, setLocalizacao] = useState('Localização');
    const [consumo, setConsumo] = useState('Consumo');
    const [selectedOption, setSelectedOption] = useState('Doméstico');
    const [selectedOption2, setSelectedOption2] = useState('Consumo Médio');
    const [area, setArea] = useState('Área');
    const [custoPlacas, setCustoPlacas] = useState(0);
    const [geracao, setGeracao] = useState(0);
    const [loading, setLoading] = useState(false);
    const [placa, setPlaca] = useState("");
    const [controlador, setControlador] = useState("");
    const [inversor, setInversor] = useState("");
    const [cabo, setCabo] = useState("");
    const [estrutura, setEstrutura] = useState("");
    const [userData, setUserData] = useState([]);
    const [areau, setAreaU] = useState(0);
    const [creditos, setCreditosCarbono] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    interface SimulationData {
        nomeSimulacao: string;
        data: string;
        areaNecessaria: string;
        geracaoEstimada: string;
        geracaoReal: string;
        predicao: string;
        custoEstimado: number;
        custoCemig: string;
        placas: string;
        cabos: string;
        inversores: string;
        controladores: string;
        estruturas: string;
        reducaoCarbono: number;
        payback: string;
    }

    const [simulationData, setSimulationData] = useState<SimulationData | null>(null);

    // Adicionando a localização inicial ao carregar a página
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocalizacao(`Lat: ${latitude}, Lon: ${longitude}`);
            });
        } else {
            alert("Geolocalização não é suportada pelo seu navegador.");
        }

        const storedUserData = sessionStorage.getItem("UserData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    // Mudando a localização conforme a mesma for pesquisada
    const handleLocationChange = (location: string) => {
        setLocalizacao(location);
    };

    /*
     * Função para pegar as coordenadas da localização
     * @param: Nenhum
     * @return: Coordenadas da localização
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

    /**
     * Função para calcular a geração de energia e definir quantas placas são 
     * necessárias para atender ao consumo
     * @param: Nenhum
     * @return: Custo de placas solares no sistema
     */
    async function calculaGeracao() {
        let plates = await getPlates();
        let irradiation = await getIrradiation(selectedOption);
        let consumof = parseFloat(consumo); // OK testado
        if (selectedOption2 == 'Consumo Anual') {
            consumof = consumof / 12;
        }

        let plateData: any = Object.values(plates.data); // OK testado
        let irradiationData: any = Object.values(irradiation.data); // OK testado

        const coordenadas = getCoordenadas(); // OK testado
        const bestPlateIndex = melhorCustoBeneficio(plateData); // OK testado
        const bestPlate = plateData[bestPlateIndex]; // OK testado
        const bestPlatePrice = parseFloat(bestPlate.preco); // OK testado
        const bestPlateArea = parseFloat(bestPlate.dimensoes.split("m")[0]);
        setAreaU(bestPlateArea);

        console.log("Melhor placa em preco: ", bestPlatePrice);
        if (Array.isArray(irradiationData)) {
            for (const e of irradiationData) {
                if (Number(e.LAT.toFixed(1)) === coordenadas[0] && Number(e.LON.toFixed(1)) === coordenadas[1]) {
                    let irradiacaoMedia = e.ANNUAL / 1000; // Irradiação média anual (kWh/m²/dia)
                    let potencia = parseFloat(bestPlate.potenciaNominal.split("W")[0]) / 1000; // Potência em KW
                    let eficiencia = 1 - parseFloat(bestPlate.eficienciaDoPainel.split("%")[0]) / 100; // Eficiência em decimal

                    let geracaoPlaca = potencia * irradiacaoMedia * eficiencia;
                    let geracaoPlacaMensal = geracaoPlaca * 30;
                    const creditosCarbono = 0.453 * geracaoPlacaMensal;

                    let n = consumof / geracaoPlacaMensal;
                    n = Math.max(Math.ceil(n), 1);
                    const geracaoSistema = geracaoPlaca * n;

                    // Atualize o estado uma vez após todos os cálculos
                    setPlaca(n + " x " + bestPlate.nome);
                    setGeracao(geracaoSistema);
                    setCustoPlacas(bestPlatePrice * n);
                    setCreditosCarbono(creditosCarbono);

                    return bestPlatePrice * n;
                }
            }
        }

        return 0;
    }

    /**
     * Função para pegar a data atual formatada
     */
    const getFormattedDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); // Dia com dois dígitos
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês com dois dígitos (janeiro é 0)
        const year = today.getFullYear(); // Ano com quatro dígitos
        return `${day}/${month}/${year}`; // Retorna a data formatada
    };

    /**
     * Função para calcular o preço final do sistema
     * @param: Nenhum
     * @return: Nenhum
     */
    async function calculaPreçoFinal() {
        setLoading(true);
        var precoFinal = 0;
        try {
            const controladorr = await escolheControlador(geracao);
            setControlador("1 x " + controladorr.nome);
            const inversorr = await escolheInversor(geracao);
            setInversor("1 x " + inversorr.nome);
            const caboo = await escolheCabo();
            setCabo("1 rolo do: " + caboo.nome);
            const estruturaa = await escolheEstrutura();
            setEstrutura("1 x " + estruturaa.nome);
            const res = await calculaGeracao();
            precoFinal = parseFloat(controladorr.preco) + parseFloat(inversorr.preco) + parseFloat(caboo.preco) + parseFloat(estruturaa.preco) + custoPlacas;
        } catch (e: any) {
            console.log(e);
        } finally {
            const custoCemigg = parseFloat(consumo) * 0.75 + 15;
            const paybackk = precoFinal / custoCemigg;
            setLoading(false);
            getSimulacoes(userData);
            var simulation: SimulationData = {
                nomeSimulacao: 'Simulacao',//Falta colocar um Id concatenado
                // userData: userData.cpf,//Falta buscar os dados do usuario
                data: getFormattedDate(),//Esse ta ok
                areaNecessaria: areau + 'm²',//OK
                geracaoEstimada: geracao + "KW/dia",//OK
                geracaoReal: '',//vai em branco que quem preenhe é o usuário
                predicao: '',//Calculada dividindo a geração real pela estimada então aqui vai em branco
                custoEstimado: precoFinal,//OK
                custoCemig: custoCemigg,//Não sei como fazer ele ainda
                placas: placa,//OK 
                cabos: cabo,//OK 
                inversores: inversor,//OK 
                controladores: controlador,//OK 
                estruturas: estrutura,//OK
                reducaoCarbono: creditos,//OK 
                payback: paybackk,//Num sei como calcular ainda
            }
            setSimulationData(simulation);
            saveSimulation(simulationData);
            setShowPopup(true);
        }
    }

    /**
     * Funcao usada para definir quantas simulacoes o usuario ja realizou(Tem que arrumnar aqui)
     * @param:UserData
     * @return:Quantidade de simulacoes de um usuario
     */
    async function getSimulacoes(userData: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/simulationData/${userData.cpf}`, {
            method: 'GET',
        });

        if (res.ok) {
            const data = await res.json();
            setUserData(data);
            sessionStorage.setItem("UserData", JSON.stringify(data));
        } else {
            console.log('Error fetching data');
        }
    }

    /**
     * Funçãoo para salvar os dados de Simulação
     * @param: SimulationData
     * @return: Nenhum
     */
    async function saveSimulation(simulationData: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/simulationData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(simulationData),
        });

        if (res.ok) {
            alert("Simulação salva com sucesso!");
        } else {
            alert("Erro ao salvar simulação");
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            <NavBar />
            <div style={{ display: 'flex', marginTop: '70px', height: 'calc(100vh - 70px)' }}>
                <div
                    style={{
                        backgroundColor: '#fff',
                        width: '30%',
                        height: '135%',
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
                        Consumo Elétrico (KW)
                    </p>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignSelf: 'flex-start',
                        marginBottom: '20px',
                    }}>
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
                        Área do terreno disponível (M²)
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
                        <BlueButton text='Enviar' onClick={calculaPreçoFinal} />
                    </div>
                </div>

                <div id="mapa" style={{ width: '70%', height: '100%', backgroundColor: '#fff' }}>
                    <MapComponent onLocationChange={handleLocationChange} />
                </div>
            </div>
            {loading && <Loading />}
            {showPopup && simulationData && (
                <SimulationPopup
                    simulationData={simulationData}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
}

export default Simulator;