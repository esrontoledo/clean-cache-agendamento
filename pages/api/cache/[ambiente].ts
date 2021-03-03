import { NextApiRequest, NextApiResponse } from "next";

const ambientes = ['hom', 'prd', 'rolbh', 'rolsp']

export default async (resquest: NextApiRequest, response: NextApiResponse) => {
    let ambiente = resquest.query.ambiente as string;
    const ambientesEscolhido = populateAmbientes().find(a => a.name === ambiente);

    if (!ambientesEscolhido) {
        response.status(401).json({
            error: `Ambiente não foi encontrado, por favor selecione um desses ambientes: (${ambientes.toString()})`
        })
    }

    try {
        await cleanCahe(ambientesEscolhido);
    }
    catch {
        response.status(500).json({
            error: 'Erro ao limpar o cache'
        });
    }

    response.status(200).json({
        mensagem: 'O cache foi limpo com sucesso.',
        ambiente: ambientesEscolhido.name,
        url: ambientesEscolhido.url
    });
}


const cleanCahe = async (ambienteEscolhido: {name: string, url: string}) => {

    for (let item = 0; item <= 80; item++) {
        const response = await fetch(ambienteEscolhido.url, {
            method: 'Get',
            credentials: 'include'
        });

        const json = await response.json();
    }
}

const populateAmbientes = () => {
    return [
        { name: 'hom', url: 'http://ws-h.localiza.com/Operacoes/OP.Agendamento.API/api/util/limparCache?senha=AGENDAMENTO2019' },
        { name: 'prd', url: 'http://ws.localiza.com/Operacoes/OP.Agendamento.API/api/util/limparCache?senha=AGENDAMENTO2019' },
        { name: 'rolbh', url: 'http://ws.localiza.com/Operacoes/OP.Agendamento.API_Rollout_BH/api/util/limparCache?senha=AGENDAMENTO2019' },
        { name: 'rolsp', url: 'http://ws.localiza.com/Operacoes/OP.Agendamento.API_Rollout_SP/api/util/limparCache?senha=AGENDAMENTO2019' }
    ];
}