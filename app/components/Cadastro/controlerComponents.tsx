'use client';
import { useState, useEffect } from 'react';

const controllerFields = [
    { label: "Corrente Nominal", type: "text", placeholder: "30A" },
    { label: "Tensão de Trabalho", type: "text", placeholder: "12V / 24V" },
    { label: "Tipo de Controlador", type: "text", placeholder: "PWM / MPPT" },
    { label: "Eficiência Máxima", type: "text", placeholder: "98%" },
    { label: "Tensão Máxima de Entrada", type: "text", placeholder: "100V" },
    { label: "Capacidade Máxima de Painéis", type: "text", placeholder: "1000W" },
];

interface Props {
    setControllerData: (data: { [key: string]: any }) => void;
}

const toCamelCase = (str: string) => {
    return str
        .normalize('NFD') // Decompor caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

export default function ControllerComponents({ setControllerData }: Props) {
    const [controllerData, setLocalControllerData] = useState<{ [key: string]: any }>({});

    const handleChange = (field: string, value: any) => {
        const camelCaseField = toCamelCase(field.trim());
        setLocalControllerData((prev) => ({ ...prev, [camelCaseField]: value }));
    };

    useEffect(() => {
        setControllerData(controllerData);
    }, [controllerData, setControllerData]);

    return (
        <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',
            width: '100%', backgroundColor: '#fff', borderRadius: '10px',
            marginTop: '20px', 
        }}>
            {controllerFields.map((field, index) => (
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
                                checked={!!controllerData[toCamelCase(field.label)]}
                                onChange={(e) => handleChange(field.label, e.target.checked)}
                                style={{ accentColor: '#333', transform: 'scale(1.2)' }}
                            />
                            <span style={{ fontSize: '16px', color: '#333' }}>{field.label}</span>
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={controllerData[toCamelCase(field.label)] || ""}
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