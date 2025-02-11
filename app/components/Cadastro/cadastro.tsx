'use client';
import { useState } from 'react';
import { FaBolt, FaCogs, FaLayerGroup, FaExchangeAlt, FaSolarPanel } from 'react-icons/fa';
import { NavBar } from '../Common/navBar';
import BlueButton from '../Common/blueButton';
import CableComponents from './cableComponents';
import InversorComponents from './inversorComponents';
import StructureComponents from './structureComponents';
import ControllerComponents from './controlerComponents';
import PlateComponents from './plateComponents';

export default function CadastroProdutos() {
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const categorias = [
        { value: 'Cabos', icon: <FaBolt size={24} style={{ color: '#000' }} /> },
        { value: 'Controladores', icon: <FaCogs size={24} style={{ color: '#000' }} /> },
        { value: 'Estruturas', icon: <FaLayerGroup size={24} style={{ color: '#000' }} /> },
        { value: 'Inversores', icon: <FaExchangeAlt size={24} style={{ color: '#000' }} /> },
        { value: 'Placas', icon: <FaSolarPanel size={24} style={{ color: '#000' }} /> }
    ];

    async function salvar(){
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
            })
        });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            <NavBar/>
            <div style={{
                display: 'flex',
                marginTop: '70px',
                height: 'calc(100vh - 70px)',
                padding: '20px',
            }}>
                <div
                    style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        height: '200%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRight: '1px solid #e0e0e0',
                        padding: '40px',
                        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                    }}
                >
                    <p style={{
                        color: '#333',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}>
                        Cadastro de Produtos
                    </p>

                    {/* Categoria do Produto */}
                    <p style={{
                        color: '#333',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '20px',
                        alignSelf: 'flex-start',
                        marginBottom: '10px',
                    }}>
                        Categoria do Produto
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '15px',
                        width: '100%',
                        marginBottom: '20px',
                    }}>
                        {categorias.map((item) => (
                            <label key={item.value} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '10px',
                                backgroundColor: '#f9f9f9',
                                cursor: 'pointer',
                            }}>
                                <input
                                    type="radio"
                                    name="categoria"
                                    value={item.value}
                                    checked={selectedCategoria === item.value}
                                    onChange={(e) => setSelectedCategoria(e.target.value)}
                                    style={{ accentColor: '#333' }}
                                />
                                {item.icon}
                                <span style={{ fontFamily: 'Averia Serif Libre', fontSize: '16px', color: '#333' }}>{item.value}</span>
                            </label>
                        ))}
                    </div>

                    {/* Nome do Produto */}
                    <p style={{
                        color: '#333',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '20px',
                        alignSelf: 'flex-start',
                        marginBottom: '10px',
                    }}>
                        Nome do Produto
                    </p>
                    <input
                        type="text"
                        value={nomeProduto}
                        onChange={(e) => setNomeProduto(e.target.value)}
                        style={{
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            width: '100%',
                            backgroundColor: '#f9f9f9',
                            padding: '12px',
                            color: '#333',
                            fontWeight: 'bold',
                            fontFamily: 'Averia Serif Libre',
                            marginBottom: '20px',
                        }}
                    />
                    {selectedCategoria === 'Cabos' && (
                        <CableComponents />
                    )}
                    {selectedCategoria === 'Inversores' && (
                        <InversorComponents />
                    )}
                    {selectedCategoria === 'Estruturas' && (
                        <StructureComponents />
                    )}
                    {selectedCategoria === 'Placas' && (
                        <PlateComponents />
                    )}
                    {selectedCategoria === 'Controladores' && (
                        <ControllerComponents />
                    )}
                    {/* Descrição */}
                    <p style={{
                        color: '#333',
                        fontFamily: 'Averia Serif Libre',
                        fontSize: '20px',
                        alignSelf: 'flex-start',
                        marginBottom: '10px',
                    }}>
                        Descrição
                    </p>
                    <input
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        style={{
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            backgroundColor: '#f9f9f9',
                            padding: '12px',
                            color: '#333',
                            fontWeight: 'bold',
                            fontFamily: 'Averia Serif Libre',
                            marginBottom: '20px',
                            resize: 'vertical', // Permite redimensionamento manual
                        }}
                    />


                    {/* Quantidade e Preço em Linha */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px',
                        width: '100%',
                    }}>
                        <div>
                            <p style={{
                                color: '#333',
                                fontFamily: 'Averia Serif Libre',
                                fontSize: '20px',
                                marginBottom: '10px',
                            }}>
                                Quantidade
                            </p>
                            <input
                                type="number"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                style={{
                                    border: '2px solid #e0e0e0',
                                    borderRadius: '10px',
                                    width: '100%',
                                    backgroundColor: '#f9f9f9',
                                    padding: '12px',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    fontFamily: 'Averia Serif Libre',
                                    marginBottom: '20px',
                                }}
                            />
                        </div>
                        <div>
                            <p style={{
                                color: '#333',
                                fontFamily: 'Averia Serif Libre',
                                fontSize: '20px',
                                marginBottom: '10px',
                            }}>
                                Preço (R$)
                            </p>
                            <input
                                type="number"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                style={{
                                    border: '2px solid #e0e0e0',
                                    borderRadius: '10px',
                                    width: '100%',
                                    backgroundColor: '#f9f9f9',
                                    padding: '12px',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    fontFamily: 'Averia Serif Libre',
                                    marginBottom: '20px',
                                }}
                            />
                        </div>


                    </div>

                    {/* Botão Cadastrar */}
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                        <BlueButton text='Cadastrar' onClick={salvar} />
                    </div>
                </div>
            </div>
        </div>
    );
}