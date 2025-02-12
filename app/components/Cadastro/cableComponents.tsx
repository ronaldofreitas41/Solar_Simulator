'use client';
import { useState, useEffect } from 'react';

const cableFields = [
    { label: "Seção nominal (bitola)", type: "text", placeholder: "Ex: 4mm²" },
    { label: "Material do condutor", type: "text", placeholder: "Ex: Cobre estanhado" },
    { label: "Material do isolamento", type: "text", placeholder: "Ex: XLPE" },
    { label: "Tensão nominal", type: "text", placeholder: "Ex: 450/750V" },
    { label: "Temperatura máxima de operação", type: "text", placeholder: "Ex: 90°C" },
    { label: "Resistência UV", type: "checkbox" },
    { label: "Resistência ao óleo e produtos químicos", type: "checkbox" },
    { label: "Número de condutores", type: "number", placeholder: "Ex: 1, 2, 3, 4" },
    { label: "Cor da capa externa", type: "text", placeholder: "Ex: Preto" },
    { label: "Blindagem", type: "text", placeholder: "Ex: Trançado de cobre" },
    { label: "Normas aplicáveis", type: "text", placeholder: "Ex: ABNT NBR 16612" },
    { label: "Comprimento do rolo/pacote", type: "number", placeholder: "Ex: 100m" }
];

interface Props {
    setCableData: (data: { [key: string]: any }) => void;
}

export default function CableComponents({ setCableData }: Props) {
    const [localCableData, setLocalCableData] = useState<{ [key: string]: any }>({});

    const handleChange = (field: string, value: any) => {
        setLocalCableData((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        setCableData(localCableData);
    }, [localCableData, setCableData]);

    return (
        <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',
            width: '100%', backgroundColor: '#fff', borderRadius: '10px',
            marginTop: '20px', 
        }}>
            {cableFields.map((field, index) => (
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
                                checked={!!localCableData[field.label]}
                                onChange={(e) => handleChange(field.label, e.target.checked)}
                                style={{ accentColor: '#333', transform: 'scale(1.2)' }}
                            />
                            <span style={{ fontSize: '16px', color: '#333' }}>{field.label}</span>
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={localCableData[field.label] || ""}
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