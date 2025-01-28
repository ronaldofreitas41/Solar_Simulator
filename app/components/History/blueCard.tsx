// BlueModal.js
import React from 'react';
import WhiteButton from '../Common/whiteButton';
import YellowButton from '../Common/yellowButton';

type Props = {
    title: string;
    data: {
        date: string;
        area: string;
        estimatedGeneration: string;
        realGeneration: string;
        prediction: string;
        payback: string;
    };
};

const BlueModal: React.FC<Props> = (title, data) => {
    return (
        <div
            style={{
                backgroundColor: '#0D3048',
                borderRadius: '10px',
                padding: '20px',
                color: '#FFF',
                width: '300px',
                margin: '30px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h3
                style={{
                    marginBottom: '20px',
                    fontSize: '22px',
                    color: '#FFC531',
                }}
            >
                {"title"}
            </h3>
            <p>
                <strong>Data:</strong> {"teste"}
            </p>
            <p>
                <strong>Área:</strong> {"teste"}
            </p>
            <p>
                <strong>Geração Estimada:</strong> {"teste"}
            </p>
            <p>
                <strong>Geração Real:</strong> {"data.realGeneration"}
            </p>
            <p>
                <strong>Predição:</strong> {"data.prediction"}
            </p>
            <p>
                <strong>Payback:</strong> {"data.payback"}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <WhiteButton text="Editar" />
                <YellowButton text="Excluir"/>

            </div>
        </div>
    );
}
export default BlueModal;