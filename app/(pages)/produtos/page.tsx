"use client";
import Footer from "@/app/components/Common/footer";
import { NavBar } from "@/app/components/Common/navBar";
import YellowLine from "@/app/components/Common/yellowLine";
import { FaBolt, FaCogs, FaLayerGroup, FaExchangeAlt, FaSolarPanel } from 'react-icons/fa';
import React, { useEffect, useState } from "react";
import { CabosData, ControllerData, InverterData, PlateData, StructureData } from "@/app/types/types";
import BlueCard from "@/app/components/Produtos/blueCard";
const categorias = [
  { name: 'Cabos', value: 'cabos', icon: <FaBolt size={24} style={{ color: '#000' }} /> },
  { name: 'Controladores', value: 'controlador', icon: <FaCogs size={24} style={{ color: '#000' }} /> },
  { name: 'Estruturas', value: 'estrutura', icon: <FaLayerGroup size={24} style={{ color: '#000' }} /> },
  { name: 'Inversores', value: 'inversores', icon: <FaExchangeAlt size={24} style={{ color: '#000' }} /> },
  { name: 'Placas', value: 'plates', icon: <FaSolarPanel size={24} style={{ color: '#000' }} /> }
];
export default function Home() {
  const [estruturas, setEstruturas] = useState<StructureData[]>([]);
  const [placas, setPlacas] = useState<PlateData[]>([]);
  const [cabos, setCabos] = useState<CabosData[]>([]);
  const [inversores, setInversores] = useState<InverterData[]>([]);
  const [controladores, setControladores] = useState<ControllerData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const user = typeof window !== "undefined" ? (window.localStorage.getItem("UserData") || "{}") : "{}";
  const cnpj = JSON.parse(user).document;

console.log("body: ", JSON.stringify({ cnpj: cnpj }));
  useEffect(() => {
    getSimulationData(selectedCategory.toLowerCase());
  }, [selectedCategory]);

  async function getSimulationData(url: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/${url}`
        , {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ cnpj: cnpj }),
        }
      );
      if (res.ok) {
        const dat = await res.json();
        const formattedData: any = Object.entries(dat.data).map(([id, data]) => (
          typeof data === 'object' && data !== null ? { id, ...data } : { id }
        ));

        switch (url) {
          case 'estrutura':
            setEstruturas(formattedData as StructureData[]);
            break;
          case 'plates':
            setPlacas(formattedData as PlateData[]);
            break;
          case 'cabos':
            setCabos(formattedData as CabosData[]);
            break;
          case 'inversores':
            setInversores(formattedData as InverterData[]);
            break;
          case 'controlador':
            setControladores(formattedData as ControllerData[]);
            break;
          default:
            console.error("Erro ao buscar dados");
        }
      } else {
        console.log("Erro ao buscar dados");
      }
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  }

  const renderCategory = () => {
    switch (selectedCategory) {
      case 'estrutura':

        return (
          estruturas.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
              Nenhuma estrutura cadastrada até o momento.
            </p>
          ) : (
            estruturas.map((item, index) =>
              <BlueCard
                key={index}
                data={item}
                type={selectedCategory}
                nome={item.nome}
                descricao={item.descricao}
                quantidade={item.quantidade}
                preco={item.preco}
              />
            )
          )
        );
      case 'plates':
        return (
          placas.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
              Nenhuma placa cadastrada até o momento.
            </p>
          ) : (
            placas.map((item, index) =>
              <BlueCard
                key={index}
                data={item}
                type={selectedCategory}
                nome={item.nome}
                descricao={item.descricao}
                quantidade={item.quantidade}
                preco={item.preco} />
            )
          )
        );
      case 'cabos':
        return (
          estruturas.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
              Nenhuma cabo cadastrado até o momento.
            </p>
          ) : (
            cabos.map((item, index) =>
              <BlueCard
                key={index}
                data={item}
                type={selectedCategory}
                nome={item.nome}
                descricao={item.descricao}
                quantidade={item.quantidade}
                preco={item.preco} />
            )
          )
        );
      case 'inversores':
        return (
          estruturas.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
              Nenhum inversor cadastrado até o momento.
            </p>
          ) : (
            inversores.map((item, index) =>
              <BlueCard
                key={index}
                data={item}
                type={selectedCategory}
                nome={item.nome}
                descricao={item.descricao}
                quantidade={item.quantidade}
                preco={item.preco} />
            )
          )
        );
      case 'controlador':
        return (
          estruturas.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
              Nenhum controlador cadastrado até o momento.
            </p>
          ) : (
            controladores.map((item, index) =>
              <BlueCard
                key={index}
                data={item}
                type={selectedCategory}
                nome={item.nome}
                descricao={item.descricao}
                quantidade={item.quantidade}
                preco={item.preco} />
            )
          )
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <NavBar />
      <YellowLine />
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
            marginTop: '90px',
            cursor: 'pointer',
          }}>
            <input
              type="radio"
              name="categoria"
              value={item.value}
              checked={selectedCategory === item.value}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ accentColor: '#333' }}
            />
            {item.icon}
            <span style={{ fontFamily: 'Averia Serif Libre', fontSize: '16px', color: '#333' }}>{item.name}</span>
          </label>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          backgroundColor: '#F5F5F5',
          padding: '10px',
          marginBottom: '20%',
          height: '90vh',
        }}
      >
        {renderCategory()}
      </div>

    </div>
  );
}
