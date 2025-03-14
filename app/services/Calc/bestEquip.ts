import { getCabos, getControladores, getEstruturas, getInversores, getPlates } from "./apiFunc";

/**
* Função para Calcular custo beneficio das placas
*    @param: plateData: Dados das placas
*    @return: Indice da placa com melhor custo beneficio
* 
*/

export async function melhorCustoBeneficio() {
    let plates = await getPlates();
    console.log(`plates`, plates)
    let plateData: any = Object.values(plates.data); // OK testado

    let max = Number.MAX_VALUE;
    let bestIndex = -1;

    if (Array.isArray(plateData)) {
        plateData.forEach((e, index) => {
            let potenciaNominalf = parseFloat(e.potenciaNominal.split("W")[0]);
            let eficienciaf = parseFloat(e.eficienciaDoPainel.split("%")[0]) / 100;
            let potenciaUtil = potenciaNominalf * eficienciaf;
            let cb = parseFloat(e.preco) / potenciaUtil;
            if (cb < max) {
                max = cb;
                bestIndex = index
            }
        });
    } else {
        console.error('plateData is not an array');
    }

    return plateData[bestIndex];
}

/**
 * Função para retornar melhor controlador em questão de preço
 * @param: geracao: Geração de energia
 * @returns: Melhor Controlador 
 */
export async function escolheControlador(geracao: any) {
    let controladores = await getControladores();
    controladores = Object.values(controladores.data);
    var quant = 0;
    var custo = 0;
    var min = Number.MAX_VALUE;
    var index = 0;
    var cb = 0;

    controladores.forEach((e: any, i: any) => {
        var capacidadef = parseFloat(e.capacidadeMaximaDePaineis);
        var capacidade = capacidadef * (parseFloat(e.eficienciaMaxima) / 100);

        if (capacidade > geracao) {
            console.log("if");
            quant = 1;
            custo = parseFloat(e.preco);
            cb = custo / capacidade
            console.log("Quantidade de controladores: ", quant);
        } else {
            console.log("else");
            quant = capacidade / geracao;
            quant = Math.max(Math.ceil(quant), 1);
            custo = (quant * parseFloat(e.preco));
            cb = custo / capacidade;
            console.log("Quantidade de controladores: ", quant);
        }

        if (cb < min) {
            min = cb;
            index = i;
        }

    });

    return controladores[index];

}

/**
 * Função para escolher o melhor inversor em questão de preço
 * @param: geracao: Geração de energia
 * @returns: Melhor inversor 
 */
export async function escolheInversor(geracao: any) {
    let inversores = await getInversores();
    inversores = Object.values(inversores.data);
    var quant = 0;
    var custo = 0;
    var min = Number.MAX_VALUE;
    var index = 0;
    var cb = 0;
    var cbvu = 0;

    inversores.forEach((e: any, i: any) => {

        var potencia = (parseFloat(e.potenciaMaximaDaPlaca.split("W")[0]));
        var vidaUtil = parseFloat((e.vidaUtilEstimada.split("anos")[0]).split(" ")[0]);
        cbvu = parseFloat(e.preco) / vidaUtil;
        if (potencia > geracao) {
            console.log("if");
            quant = 1;
            custo = parseFloat(e.preco);
            cb = custo / potencia
            cb = cb + cbvu;
            console.log("Quantidade de inversores: ", quant);
        } else {
            console.log("else");
            quant = potencia / geracao;
            quant = Math.max(Math.ceil(quant), 1);
            custo = (quant * parseFloat(e.preco));
            cb = custo / potencia;
            cb = cb + cbvu;
            console.log("Quantidade de inversores: ", quant);
        }

        if (cb < min) {
            min = cb;
            index = i;
        }

    });

    return inversores[index];

}

/**
 * Função para retornar melhor Cabo em questão de preço
 * @param: Nenhum
 * @returns: Melhor cabo 
 */
export async function escolheCabo() {
    let cabos = await getCabos();
    cabos = Object.values(cabos.data);
    var cb = 0;
    var min = Number.MAX_VALUE;
    var index = 0;

    cabos.forEach((e: any, i: any) => {
        var preco = parseFloat(e.preco);
        var comprimento = parseFloat(e.comprimentoDoRoloPacote.split("m")[0]);
        cb = preco / comprimento;

        if (cb < min) {
            min = cb;
            index = i;
        }

    });

    return cabos[index];

}

/**
 * Função para retornar melhor Estrutura em questão de preço
 * @param: Nenhumh
 * @returns: Melhor cabo 
 */
export async function escolheEstrutura() {
    let estruturas = await getEstruturas();
    estruturas = Object.values(estruturas.data);
    var cb = 0;
    var min = Number.MAX_VALUE;
    var index = 0;

    estruturas.forEach((e: any, i: any) => {
        var preco = parseFloat(e.preco);
        var vd = parseFloat(e.peso);
        cb = preco / vd;

        if (cb < min) {
            min = cb;
            index = i;
        }

    });

    return estruturas[index];
}