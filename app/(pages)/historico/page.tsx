'use client';
import NavBar from "@/app/components/Common/navBar";
import YellowLine from "@/app/components/Common/yellowLine";
import BlueModal from "@/app/components/History/blueCard";
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
          },
        },
      ];
    return (
        <div>
            <NavBar usertype="none" />
            <YellowLine />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    backgroundColor: '#F5F5F5',
                    padding: '20px',
                    height: '90%',
                }}
            >
                {historyData.map((item) => (
                    <BlueModal key={item.id} title={item.title} data={item.data} />
                ))}
            </div>

        </div>
    );
}
