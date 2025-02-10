'use client';
import { useState } from 'react';

const inverterFields = [
    { label: "Potência de Saída Nominal", type: "text", placeholder: "3000W" },
    { label: "Tensão de Saída", type: "text", placeholder: "220V" },
    { label: "Frequência de Saída", type: "text", placeholder: "60Hz" },
    { label: "Tipo de Onda", type: "text", placeholder: "Senoidal Pura" },
    { label: "Eficiência Máxima", type: "text", placeholder: "97.5%" },
    { label: "Tensão do Banco de Baterias", type: "text", placeholder: "24V" },
    { label: "Corrente Máxima de Entrada", type: "text", placeholder: "50A" },
    { label: "Tensão Máxima de Entrada (Placa Solar)", type: "text", placeholder: "80V" },
    { label: "Potência Máxima de Entrada (Placa Solar)", type: "text", placeholder: "2000W" },
    { label: "Modo de Operação", type: "text", placeholder: "Off-grid / Híbrido / On-grid" },
    { label: "Vida Útil Estimada", type: "text", placeholder: "15 Anos" },
    { label: "Garantia", type: "text", placeholder: "3 Anos" },
    { label: "Proteções Integradas", type: "text", placeholder: "Sobrecarga, Curto-circuito, Alta temperatura" },
    { label: "Interface de Comunicação", type: "text", placeholder: "Wi-Fi / RS485 / Bluetooth" },
    { label: "Peso", type: "text", placeholder: "12kg" },
    { label: "Dimensões", type: "text", placeholder: "450mm x 350mm x 150mm" },
];


export default function InversorComponents() {
    const [cableData, setCableData] = useState<{ [key: string]: any }>({});

    const handleChange = (field: string, value: any) => {
        setCableData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',
            width: '100%', backgroundColor: '#fff', borderRadius: '10px',
            marginTop: '20px', 
        }}>
            {inverterFields.map((field, index) => (
                <div key={index} style={{ width: '100%' }}>
                    <p style={{
                        fontFamily: 'Averia Serif Libre', fontSize: '20px', color: '#333', marginBottom: '5px'
                    }}>
                        {field.label}
                    </p>
                    {field.type === "checkbox" ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                checked={!!cableData[field.label]}
                                onChange={(e) => handleChange(field.label, e.target.checked)}
                                style={{ accentColor: '#333', transform: 'scale(1.2)' }}
                            />
                            <span style={{ fontSize: '16px', color: '#333' }}>{field.label}</span>
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={cableData[field.label] || ""}
                            onChange={(e) => handleChange(field.label, e.target.value)}
                            style={{
                                border: '2px solid #e0e0e0', borderRadius: '10px', width: '100%',
                                backgroundColor: '#f9f9f9', padding: '12px', color: '#333',
                                fontWeight: 'bold', fontFamily: 'Averia Serif Libre'
                            }}
                        />
                    )}
                </div>
            ))}

            <style>{`
                @media (max-width: 768px) {
                    div {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
