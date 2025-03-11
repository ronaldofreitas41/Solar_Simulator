'use client';
import  { NavBar } from "@/app/components/Common/navBar";
import YellowLine from "@/app/components/Common/yellowLine";
import BlueCard from "@/app/components/History/blueCard";
import React, { useEffect } from "react";

export default function Home() {

  const [historyData, setHistoryData] = React.useState([]);
  
  useEffect(() =>{
    getSimulaitionData();
  });

  async function getSimulaitionData() {
    const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulationData`);

    if (res.ok) {
      const data = await res.json();
      setHistoryData(data);
    }else{
      console.log('Error fetching data');
    }

  }
  
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
        }}>
          
        {historyData.map((item) => (
          <BlueCard key={item.id} title={item.title} data={item.data} />
        ))}
      </div>

    </div>
  );
}
