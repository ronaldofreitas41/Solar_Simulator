'use client';
import  { NavBar } from "@/app/components/Common/navBar";
import YellowLine from "@/app/components/Common/yellowLine";
import BlueCard from "@/app/components/History/blueCard";
import React from "react";

export default function Home() {

  const historyData = [
    {
      id: 1,
      title: 'Simulação 1',
      data: {
        date: '20/10/2024',
        area: '500m2',
        estimatedGeneration: '300 W/h',
        realGeneration: '280 W/h',
        prediction: '93,33%',
        payback: '3 anos',
        irradiation: '5,5 kWh/m2/dia',
        materiais: '5 x Placa Solar;\n'
          + '1 x Inversor,\n'
          + '35M x Cabos,\n'
          + '1 x Controlador,\n'
          + 'Estrutura de Fixação.'
      },
    },
    {
      id: 2,
      title: 'Simulação 2',
      data: {
        date: '21/10/2024',
        area: '600m2',
        estimatedGeneration: '350 W/h',
        realGeneration: '340 W/h',
        prediction: '97,14%',
        payback: '2 anos',
        irradiation: '5,5 kWh/m2/dia',
        materiais: '5 x Placa Solar;\n'
        + '1 x Inversor,\n'
        + '35M x Cabos,\n'
        + '1 x Controlador,\n'
        + 'Estrutura de Fixação.'
      },
    },
    {
      id: 3,
      title: 'Simulação 3',
      data: {
        date: '22/10/2024',
        area: '450m2',
        estimatedGeneration: '280 W/h',
        realGeneration: '260 W/h',
        prediction: '92,86%',
        payback: '4 anos',
        irradiation: '5,5 kWh/m2/dia',
        materiais: '5 x Placa Solar;\n'
        + '1 x Inversor,\n'
        + '35M x Cabos,\n'
        + '1 x Controlador,\n'
        + 'Estrutura de Fixação.'
      },
    },
  ];
  return (
    <div>
      <NavBar/>
      <YellowLine />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          backgroundColor: '#F5F5F5',
          padding: '20px',
          height: '90vh',
        }}
      >
        {historyData.map((item) => (
          <BlueCard key={item.id} title={item.title} data={item.data} />
        ))}
      </div>

    </div>
  );
}
