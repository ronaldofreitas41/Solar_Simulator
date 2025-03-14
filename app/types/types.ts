export interface SimulationData {
    nomeSimulacao: string;
    user: string
    data: string;
    areaNecessaria: string;
    geracaoEstimada: string;
    geracaoReal: string;
    predicao: string;
    custoEstimado: string;
    custoCemig: string;
    placas: string;
    cabos: string;
    inversores: string;
    id: string;
    controladores: string;
    estruturas: string;
    payback: string;
    creditos: string;
}

export interface CabosData {
    nome: string;
    categoria: string;
    descricao: string;
    quantidade: string;
    preco: string;
    cnpj: string;
    
    bitola: string;
    blindagem: string;
    comprimentoRoloPacote: string;
    corDaCapaExterna: string;
    resisteciaOleo: string;
}


export interface PlateData {
    catergoria: string;
    correteDeOperacao: string;
    cnpj: string;
    descricao: string;
    dimensoes: string;
    nome: string;
    preco: string;
    peso: string;
    quantidade: string;

    eficienciaDoPainel: string;
    garantia: string;
    potenciaNominal: string;
    tensaoOperacao: string;
    tipoCelula: string;
}

export interface InverterData {
    nome: string;
    descricao: string;
    quantidade: string;
    preco: string;
    cnpj: string;
    categoria: string;
    
    vidaUtil: string;
    modoOperacao: string;
    tensaosaida: string;
    tensaoBateria: string;
    tipoOnda: string;
    potenciaNominal: string;
    potenciaPlaca: string;
    tensaoPlaca: string;
}

export interface ControllerData {
    categoria: string;
    cnpj: string;
    descricao: string;
    quantidade: string;
    preco: string;
    nome: string;
    
    capacidaeMaxP: string;
    correnteNominal: string;
    eficiencia: string;
    tensaoOperacao: string;
    tensaoMaxEntrada: string;
    tipo: string;
}

export interface StructureData {
    categoria: string;
    cnpj: string;
    descricao: string;
    nome: string;
    preco: string;
    quantidade: string;
    
    material: string;
    inclinacaoAjustavel: string;
    resistenciaVento: string;
    vidaUtil: string;
    tipoFixacao: string;
    peso: string;
    capacidadePaineis: string;
}

