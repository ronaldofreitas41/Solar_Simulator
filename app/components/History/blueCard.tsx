
import React from "react";
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
  controladores: String;
  estruturas: String;
  payback: String;
};

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
  predicao,
  placas,
}) => {
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
      <Line id={"Geração Real: "} text={geracaoReal} />
      <Line id={"Taxa de Predição: "} text={predicao} />
      <Line id={"Payback: "} text={payback} />
      <Line id={"Custo Estimado: "} text={custoEstimado} />
      <Line id={"Custo Cemig: "} text={custoCemig} />
      <Line id={"Placas: "} text={placas} />
      <Line id={"Cabos: "} text={cabos} />
      <Line id={"Inversor: "} text={inversores} />
      <Line id={"Controlador: "} text={controladores} />
      <Line id={"Estrutura: "} text={estruturas} />

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div style={{ marginRight: "40px" }}>
          <WhiteButton text="Editar" />
        </div>
        <YellowButton text="Excluir" />
      </div>
    </div>
  );
};
export default BlueCard;
