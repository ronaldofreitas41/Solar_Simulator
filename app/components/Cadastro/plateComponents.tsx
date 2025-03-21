'use client';
import { useState, useEffect } from 'react';

const solarPanelFields = [
    { label: "Potência Nominal", type: "text", placeholder: "450W" },
    { label: "Eficiência do Painel", type: "text", placeholder: "21.5%" },
    { label: "Tensão de Operação", type: "text", placeholder: "38V" },
    { label: "Corrente de Operação", type: "text", placeholder: "11.8A" },
    { label: "Tipo de Célula", type: "text", placeholder: "Monocristalino" },
    { label: "Dimensões", type: "text", placeholder: "3m²" },
    { label: "Peso", type: "text", placeholder: "25kg" },
    { label: "Garantia", type: "text", placeholder: "10 Anos (Produto) / 25 Anos (Eficiência)" },
];

interface Props {
    setPlateData: (data: { [key: string]: any }) => void;
}

const toCamelCase = (str: string) => {
    return str
        .normalize('NFD') // Decompor caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

export default function PlateComponents({ setPlateData }: Props) {
    const [plateData, setLocalPlateData] = useState<{ [key: string]: any }>({});

    const handleChange = (field: string, value: any) => {
        const camelCaseField = toCamelCase(field.trim());
        setLocalPlateData((prev) => ({ ...prev, [camelCaseField]: value }));
    };

    useEffect(() => {
        setPlateData(plateData);
    }, [plateData, setPlateData]);

    return (
        <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',
            width: '100%', backgroundColor: '#fff', borderRadius: '10px',
            marginTop: '20px', 
        }}>
            {solarPanelFields.map((field, index) => (
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
                                checked={!!plateData[toCamelCase(field.label)]}
                                onChange={(e) => handleChange(field.label, e.target.checked)}
                                style={{ accentColor: '#333', transform: 'scale(1.2)' }}
                            />
                            <span style={{ fontSize: '16px', color: '#333' }}>{field.label}</span>
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={plateData[toCamelCase(field.label)] || ""}
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