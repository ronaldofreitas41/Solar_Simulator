'use client';
import { useState, useEffect } from 'react';

const structureFields = [
    { label: "Material", type: "text", placeholder: "Alumínio Anodizado" },
    { label: "Inclinação Ajustável", type: "text", placeholder: "Sim (15° a 45°)" },
    { label: "Capacidade de Painéis", type: "text", placeholder: "Até 4 placas de 500W" },
    { label: "Resistência ao Vento", type: "text", placeholder: "Até 150 km/h" },
    { label: "Tipo de Fixação", type: "text", placeholder: "Solo / Telhado / Parede" },
    { label: "Vida Útil", type: "text", placeholder: "25 Anos" },
    { label: "Peso", type: "text", placeholder: "10kg" },
];

interface Props {
    setStructureData: (data: { [key: string]: any }) => void;
}

const toCamelCase = (str: string) => {
    return str
        .normalize('NFD') // Decompor caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

export default function StructureComponents({ setStructureData }: Props) {
    const [structureData, setLocalStructureData] = useState<{ [key: string]: any }>({});

    const handleChange = (field: string, value: any) => {
        const camelCaseField = toCamelCase(field.trim());
        setLocalStructureData((prev) => ({ ...prev, [camelCaseField]: value }));
    };

    useEffect(() => {
        setStructureData(structureData);
    }, [structureData, setStructureData]);

    return (
        <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',
            width: '100%', backgroundColor: '#fff', borderRadius: '10px',
            marginTop: '20px', 
        }}>
            {structureFields.map((field, index) => (
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
                                checked={!!structureData[toCamelCase(field.label)]}
                                onChange={(e) => handleChange(field.label, e.target.checked)}
                                style={{ accentColor: '#333', transform: 'scale(1.2)' }}
                            />
                            <span style={{ fontSize: '16px', color: '#333' }}>{field.label}</span>
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={structureData[toCamelCase(field.label)] || ""}
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