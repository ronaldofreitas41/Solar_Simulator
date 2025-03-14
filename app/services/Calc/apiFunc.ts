/**
 * Função para pegar as placas
 * @param: Nenhum
 * @return: Dados das placas
 */
export async function getPlates() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/plates`, {
        method: 'GET',
    });

    if (res.ok) {
        const plateData = await res.json();
        return plateData;
    } else {
        throw new Error('Sem Placas cadastradas');
    }
}
/**
 * Função para buscar os dados dos controladores
 * @param: Nenhum
 * @return: Dados dos controladores
 */

export async function getControladores() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/controlador`, {
        method: 'GET',
    });

    if (res.ok) {
        const controladoresData = await res.json();
        return controladoresData;
    } else {
        throw new Error('Sem Controladores cadastrados');
    }
}


/**
 * Função para buscar os dados dos Inversores
 * @param: Nenhum
 * @return: Dados dos Inversores
 */

export async function getInversores() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/inversores`, {
        method: 'GET',
    });

    if (res.ok) {
        const inversoresData = await res.json();
        return inversoresData;
    } else {
        throw new Error('Sem Inversores cadastrados');
    }
}

/**
 * Função para buscar os dados dos Cabos
 * @param: Nenhum
 * @return: Dados dos Cabos
 */

export async function getCabos() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/cabos`, {
        method: 'GET',
    });

    if (res.ok) {
        const CabosData = await res.json();
        return CabosData;
    } else {
        throw new Error('Sem Cabos cadastrados');
    }
}

/**
 * Função para buscar os dados das estruturas
 * @param: Nenhum
 * @return: Dados das estruturas
 */
export async function getEstruturas() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/estrutura`, {
        method: 'GET',
    });

    if (res.ok) {
        const estruturasData = await res.json();
        return estruturasData;
    } else {
        throw new Error('Sem Estruturas cadastradas');
    }
}

/**
 * Função para pegar os dados de irradiação
 * @param: opção selecionada
 * @return: Dados de irradiação
 */
export async function getIrradiation(selectedOption: any,lat:number,lon:number) {
    let option = '';
    switch (selectedOption) {
        case 'Doméstico':
            option = 'planoInclinado';
            break;
        case 'Agrário':
            option = 'fotossinteticamenteAtiva'
            break;
        case 'Industrial':
            option = 'planoInclinado';
            break;
        case 'UsinaCSP':
            option = 'normalDireta';
            break;
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/irradiation/${option}`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            LAT:lat,
            LON:lon
        })
        
    });

    if (res.ok) {
        const irradiationData = await res.json();
        return irradiationData;
    } else {
        throw new Error('Sem dados de irradiação disponníveis')
    }
}