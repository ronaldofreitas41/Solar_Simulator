import React from 'react';

interface SimulationData {
    nomeSimulacao: string;
    userData: string;
    data: string;
    areaNecessaria: string;
    geracaoEstimada: string;
    geracaoReal: string;
    predicao: string;
    custoEstimado: string;
    custoCemig: string;
    placas: string;
    cabos: string;
    inversores: string;
    controladores: string;
    estruturas: string;
    reducaoCarbono: string;
    payback: string;
}

interface Props {
    data: SimulationData;
    onClose: () => void;
    onSave: () => void;
}

const SimulationPopup: React.FC<Props> = ({ data, onClose, onSave }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h2 style={styles.title}>Confirme os Dados da Simulação</h2>
                <div style={styles.content}>
                    <p><strong>Nome da Simulação:</strong> {data.nomeSimulacao}</p>
                    <p><strong>Data:</strong> {data.data}</p>
                    <p><strong>Área Necessária:</strong> {data.areaNecessaria}</p>
                    <p><strong>Geração Estimada:</strong> {data.geracaoEstimada}</p>
                    <p><strong>Custo Estimado:</strong> {data.custoEstimado}</p>
                    <p><strong>Custo Cemig:</strong> {data.custoCemig}</p>
                    <p><strong>Placas:</strong> {data.placas}</p>
                    <p><strong>Cabos:</strong> {data.cabos}</p>
                    <p><strong>Inversores:</strong> {data.inversores}</p>
                    <p><strong>Controladores:</strong> {data.controladores}</p>
                    <p><strong>Estruturas:</strong> {data.estruturas}</p>
                    <p><strong>Redução de Carbono:</strong> {data.reducaoCarbono}</p>
                    <p><strong>Payback:</strong> {data.payback}</p>
                </div>
                <div style={styles.actions}>
                    <button onClick={onClose} style={styles.button}>Cancelar</button>
                    <button onClick={onSave} style={styles.button}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    popup: {
        backgroundColor: '#FFF',
        borderRadius: '10px',
        padding: '20px',
        width: '400px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center' as 'center',
    },
    title: {
        marginBottom: '20px',
        fontSize: '22px',
        color: '#0D3048',
    },
    content: {
        textAlign: 'left' as 'left',
        marginBottom: '20px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#FFC531',
        color: '#0D3048',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
};

export default SimulationPopup;