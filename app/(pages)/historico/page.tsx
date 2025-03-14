"use client";
import Footer from "@/app/components/Common/footer";
import { NavBar } from "@/app/components/Common/navBar";
import YellowLine from "@/app/components/Common/yellowLine";
import BlueCard from "@/app/components/History/blueCard";
import { SimulationData } from "@/app/types/types";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [historyData, setHistoryData] = useState<SimulationData[]>([]);

  useEffect(() => {
    getSimulationData();
  }, []);

  useEffect(() => {
    console.log('historyData', historyData);
  }, [historyData]);


  async function getSimulationData() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/simulationData`);
      if (res.ok) {
        const simulationData = await res.json();
        console.log("simulationData", simulationData.data);
        const formattedData = Object.entries(simulationData.data).map(([id, data]) => (typeof data === 'object' && data !== null ? { id, ...data } : { id }));
        console.log("formattedData", formattedData);
        if (Array.isArray(formattedData)) {
          setHistoryData(formattedData as SimulationData[]); // Certifique-se de que a resposta está no formato correto
        } else {
          console.error("Data fetched is not an array", formattedData);
        }
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  return (
    <div>
      <NavBar />
      <YellowLine />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          backgroundColor: '#F5F5F5',
          padding: '20px',
          marginTop: '70px',
          marginBottom: '20%',
          height: '90vh',
        }}
      >
        {Array.isArray(historyData) && historyData.map((item: SimulationData, index) => (
              <BlueCard
              key={index}
              nomeSimulacao={item.nomeSimulacao}
              userData={item.user}
              date={item.data}
              areaNecessaria={item.areaNecessaria}
              geracaoEstimada={item.geracaoEstimada}
              geracaoReal={item.geracaoReal}
              predicao={item.predicao}
              custoEstimado={item.custoEstimado}
              custoCemig={item.custoCemig}
              placas={item.placas}
              id={item.id}
              cabos={item.cabos}
              inversores={item.inversores}
              controladores={item.controladores}
              estruturas={item.estruturas}
              creditos={item.creditos}
              payback={item.payback}
            />
        ))}
      </div>
      
    </div>
  );
}