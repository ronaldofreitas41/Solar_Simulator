// BlueModal.js
import React from 'react';
import WhiteButton from '../Common/whiteButton';
import YellowButton from '../Common/yellowButton';
import Line from './line';

type Props = {
    title: string;
    data: {
        date: string;
        area: string;
        estimatedGeneration: string;
        realGeneration: string;
        prediction: string;
        payback: string;
        irradiation: string;
        materiais: string;
    };
};

const BlueCard: React.FC<Props> = ({ title, data }) => {
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
                {title ? (title) : ("Title")}
            </h3>
            {data ? (
                <>
                    <Line id={"Data: "} text={data.date} />
                    <Line id={"Área: "} text={data.area} />
                    <Line id={"Geração Estimada: "} text={data.estimatedGeneration} />
                    <Line id={"Geração Real: "} text={data.realGeneration} />
                    <Line id={"Taxa de Predição: "} text={data.prediction} />
                    <Line id={"Payback: "} text={data.payback} />
                    <Line id={"Irradiação: "} text={data.irradiation} />
                    <div>
                        <strong>Materiais:</strong>
                        {data.materiais.split('\n').map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                </>
            ) : (
                <p>Dados não disponíveis</p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <div style={{ marginRight: '40px' }}>
                    <WhiteButton text="Editar" />
                </div>
                <YellowButton text="Excluir" />
            </div>
        </div>
    );
}
export default BlueCard;