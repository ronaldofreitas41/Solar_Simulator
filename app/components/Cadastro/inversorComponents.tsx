'use client';
import { useState, useEffect } from 'react';

const inverterFields = [
    { label: "Potência de Saída Nominal", type: "text", placeholder: "3000W" },
    { label: "Tensão de Saída", type: "text", placeholder: "220V" },
    { label: "Tipo de Onda", type: "text", placeholder: "Senoidal Pura" },
    { label: "Tensão do Banco de Baterias", type: "text", placeholder: "24V" },
    { label: "Tensão Máxima de Entrada (Placa Solar)", type: "text", placeholder: "80V" },
    { label: "Potência Máxima de Entrada (Placa Solar)", type: "text", placeholder: "2000W" },
    { label: "Modo de Operação", type: "text", placeholder: "Off-grid / Híbrido / On-grid" },
    { label: "Vida Útil Estimada", type: "text", placeholder: "15 Anos" },
];

interface Props {
    setInversorData: (data: { [key: string]: any }) => void;
}

const toCamelCase = (str: string) => {
    return str
        .normalize('NFD') // Decompor caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

export default function InversorComponents({ setInversorData }: Props) {
    const [inversorData, setLocalInversorData] = useState<{ [key: string]: any }>({});

    const handleChange = (field: string, value: any) => {
        const camelCaseField = toCamelCase(field.trim());
        setLocalInversorData((prev) => ({ ...prev, [camelCaseField]: value }));
    };

    useEffect(() => {
        setInversorData(inversorData);
    }, [inversorData, setInversorData]);

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
                                checked={!!inversorData[toCamelCase(field.label)]}
                                onChange={(e) => handleChange(field.label, e.target.checked)}
                                style={{ accentColor: '#333', transform: 'scale(1.2)' }}
                            />
                            <span style={{ fontSize: '16px', color: '#333' }}>{field.label}</span>
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={inversorData[toCamelCase(field.label)] || ""}
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