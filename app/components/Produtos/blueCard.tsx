import React from "react";
import WhiteButton from "../Common/whiteButton";
import YellowButton from "../Common/yellowButton";
import Line from "@/app/components/History/line";

interface Props {
  type: string;
  nome: string;
  descricao: string;
  quantidade: string;
  preco: string;
  data: any;
}

const BlueCard: React.FC<Props> = ({
  type,
  nome,
  descricao,
  quantidade,
  preco,
  data
}) => {
  async function deleteItem(iden: String, type: String) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/${type}`,
      {
        method: "DELETE",
        body: JSON.stringify({ "id": iden }),
      }
    );
    if (res.ok) {
      console.log(`Simulation ${iden} deleted successfully`);
      window.location.reload();
    } else {
      console.error(`Error deleting simulation ${iden}`);
    }
  }

  async function editSimulation(iden: String) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/simulationData`,
      {
        method: "PUT",
        body: JSON.stringify({ "id": iden }),
      }
    );
    if (res.ok) {
      console.log(`Simulation ${iden} updated successfully`);
      window.location.reload();
    } else {
      console.error(`Error updating simulation ${iden}`);
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
      </h3>

      {type === 'estrutura' && (
        <div>
          <Line id="Material: " text={data.material} />
          <Line id="Inclinação: " text={data.inclinacaoAjustavel} />
          <Line id="Resistência ao Vento: " text={data.resistenciaVento} />
          <Line id="Vida Útil: " text={data.vidaUtil} />
          <Line id="Peso: " text={data.peso} />
          <Line id="Tipo Fixação: " text={data.tipoFixacao} />
          <Line id="Capacidade de Painéis:" text={data.capacidadePaineis} />
        </div>
      )}

      {type === 'plates' && (
        <div>
          <Line id="Corrente de Operação: " text={data.correnteOperacao} />
          <Line id="Dimensões: " text={data.dimensoes} />
          <Line id="Eficiência: " text={data.eficiencia} />
          <Line id="Garantia: " text={data.garantia} />
          <Line id="Peso: " text={data.peso} />
          <Line id="Potência Nominal: " text={data.potenciaNominal} />
          <Line id="Tensão de Operação: " text={data.tensaoOperacao} />
          <Line id="Tipo de Célula: " text={data.tipoCelula} />
        </div>
      )}

      {type === 'cabos' && (
        <div>
          <Line id="Bitola: " text={data.bitola} />
          <Line id="Blindagem: " text={data.blindagem} />
          <Line id="Comprimento do Rolo/Pacote: " text={data.comprimentoRoloPacote} />
          <Line id="Cor da Capa Externa: " text={data.corDaCapaExterna} />
          <Line id="Resistência ao Óleo: " text={data.resistenciaOleo} />
        </div>
      )}

      {type === 'inversores' && (

        <div>
          <Line id="Vida Útil: " text={data.vidaUtil} />
          <Line id="Modo de Operação: " text={data.modoOperacao} />
          <Line id="Tensão de Saída: " text={data.tensaoSaida} />
          <Line id="Tensão da Bateria: " text={data.tensaoBateria} />
          <Line id="Tipo de Onda: " text={data.tipoOnda} />
          <Line id="Potência Nominal: " text={data.potenciaNominal} />
          <Line id="Potência Máxima Placas: " text={data.potenciaMaximaPlacas} />
          <Line id="Tensão Máxima Placas: " text={data.tensaoMaximaPlacas} />
        </div>
      )
      }
      {
        type === 'controlador' && (
          <div>
            <Line id="Capacidade Máxima Placas: " text={data.capacidadeMaxP} />
            <Line id="Corrente Nominal: " text={data.correnteNominal} />
            <Line id="Eficiência: " text={data.eficiencia} />
            <Line id="Tensão de Operação: " text={data.tensaoOperacao} />
            <Line id="Tensão Máxima Entrada: " text={data.tensaoMaxEntrada} />
            <Line id="Tipo: " text={data.tipo} />
          </div>
        )
      }
      <Line id={'Nome do Produto: '} text={nome} />
      <Line id={'Descricao do Produto: '} text={descricao} />
      <Line id={'Quantidade do Produto: '} text={quantidade} />
      <Line id={'Preco do Produto: '} text={preco} />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div style={{ marginRight: "40px" }}>
          <WhiteButton
            text="Editar"
            onClick={() => editSimulation(data.id)}
          />
        </div>
        <div
          style={{ marginLeft: "20px" }}
        >
          <YellowButton
            text="Excluir"
            onClick={() => deleteItem(data.id, type)}
          />
        </div>
      </div>
    </div >
  );
};

export default BlueCard;
