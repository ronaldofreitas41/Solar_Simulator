import React, { useState } from "react";
import WhiteButton from "../Common/whiteButton";
import YellowButton from "../Common/yellowButton";
import Line from "./line";

type Props = {
  nomeSimulacao: String;
  userData: String;
  date: String;
  areaNecessaria: String;
  geracaoEstimada: String;
  geracaoReal: String;
  predicao: String;
  custoEstimado: String;
  custoCemig: String;
  placas: String;
  cabos: String;
  inversores: String;
  id: String;
  controladores: String;
  estruturas: String;
  creditos?: String;
  payback: String;
};

async function deleteItem(iden: String) {
  console.log("iden: ", iden);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/simulationData`,
    {
      method: "DELETE",
      body: JSON.stringify({ id: iden }),
    }
  );
  if (res.ok) {
    console.log(`Simulation ${iden} deleted successfully`);
    window.location.reload();
  } else {
    console.error(`Error deleting simulation ${iden}`);
  }
}

async function atualizarSimulacao(id: string, realGeneration: number, newPrediction: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/simulationData`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        geracaoReal: realGeneration,
        predicao: newPrediction,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Erro ao atualizar a simulação");
    }

    return res;
  } catch (error) {
    console.error("Erro ao atualizar a simulação:", error);
    return null;
  }
}

const BlueCard: React.FC<Props> = ({
  date,
  nomeSimulacao,
  areaNecessaria,
  cabos,
  controladores,
  custoCemig,
  custoEstimado,
  estruturas,
  geracaoEstimada,
  geracaoReal,
  inversores,
  payback,
  id,
  predicao,
  placas,
  creditos,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [realGeneration, setRealGeneration] = useState(geracaoReal);
  const [prediction, setPrediction] = useState(predicao);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRealGeneration(event.target.value);
  };

  async function handleSaveClick(iden: String) {
    const estimatedGeneration = parseFloat(geracaoEstimada);
    const realGenerationValue = parseFloat(realGeneration);
    const newPrediction = (realGenerationValue / estimatedGeneration).toFixed(2);
  
    setPrediction(newPrediction); // Atualiza o estado da predição
    console.log("Id: ", iden);
    const res = await atualizarSimulacao(iden, realGenerationValue, parseFloat(newPrediction));
  
    if (res && res.ok) {
      console.log("Simulação atualizada com sucesso");
    } else {
      console.error("Erro ao atualizar a simulação");
    }
  }
  

  return (
    <div
      style={{
        backgroundColor: "#0D3048",
        borderRadius: "10px",
        padding: "20px",
        color: "#FFF",
        width: "300px",
        margin: "30px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          fontSize: "22px",
          color: "#FFC531",
        }}
      >
        {nomeSimulacao ? nomeSimulacao : "Title"}
      </h3>

      <Line id={"Data: "} text={date} />
      <Line id={"Área: "} text={areaNecessaria} />
      <Line id={"Geração Estimada: "} text={geracaoEstimada} />
      <Line
        id={"Geração Real: "}
        text={
          isEditing ? (
            <input
              type="text"
              value={realGeneration}
              onChange={handleInputChange}
              style={{
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #CCC",
                color: "#000",
              }}
            />
          ) : (
            realGeneration
          )
        }
      />
      <Line id={"Taxa de Predição: "} text={prediction} />
      <Line id={"Payback: "} text={payback} />
      <Line id={"Custo Estimado: "} text={custoEstimado} />
      <Line id={"Custo Cemig: "} text={custoCemig} />
      <Line id={"Placas: "} text={placas} />
      <Line id={"Cabos: "} text={cabos} />
      <Line id={"Inversor: "} text={inversores} />
      <Line id={"Controlador: "} text={controladores} />
      <Line
        id={"Redução de carbono por mês: "}
        text={creditos ? creditos : "Undefined"}
      />
      <Line id={"Estrutura: "} text={estruturas} />

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div style={{ marginRight: "40px" }}>
          <WhiteButton
            text={isEditing ? "Cancelar" : "Editar"}
            onClick={handleEditClick}
          />
        </div>
        {isEditing && (
          <div style={{ marginLeft: "20px" }}>
            <YellowButton text="Salvar" onClick={() =>handleSaveClick(id)} />
          </div>
        )}
        {!isEditing && (
          <div style={{ marginLeft: "20px" }}>
            <YellowButton text="Excluir" onClick={() => deleteItem(id)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlueCard;