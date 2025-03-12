import React from 'react';

interface SimulationPopupProps {
    simulationData: any;
    onClose: () => void;
}

const SimulationPopup: React.FC<SimulationPopupProps> = ({ simulationData, onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>

            <div style={{
                backgroundColor: '#0D3048',
                padding: '20px',
                borderRadius: '10px',
                width: '80%',
                maxWidth: '600px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}>
                <p
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight:'bold',
                        fontSize: '24px',
                    }}
                >Resultados da Simulação</p>
                <p><strong>Nome da Simulação:</strong> {simulationData.nomeSimulacao}</p>
                <p><strong>Data:</strong> {simulationData.data}</p>
                <p><strong>Área Necessária:</strong> {simulationData.areaNecessaria}</p>
                <p><strong>Geração Estimada:</strong> {simulationData.geracaoEstimada}</p>
                <p><strong>Geração Real:</strong> {simulationData.geracaoReal}</p>
                <p><strong>Predição:</strong> {simulationData.predicao}</p>
                <p><strong>Custo Estimado:</strong> {simulationData.custoEstimado}</p>
                <p><strong>Custo Cemig:</strong> {simulationData.custoCemig}</p>
                <p><strong>Placas:</strong> {simulationData.placas}</p>
                <p><strong>Cabos:</strong> {simulationData.cabos}</p>
                <p><strong>Inversores:</strong> {simulationData.inversores}</p>
                <p><strong>Controladores:</strong> {simulationData.controladores}</p>
                <p><strong>Estruturas:</strong> {simulationData.estruturas}</p>
                <p><strong>Redução de Carbono:</strong> {simulationData.reducaoCarbono}</p>
                <p><strong>Payback:</strong> {simulationData.payback}</p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        marginTop: '20px',
                    }}
                >
                    <button onClick={onClose} style={{
                        backgroundColor: '#FFC531',
                        color: '#0D3048',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'right',
                    }}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default SimulationPopup;