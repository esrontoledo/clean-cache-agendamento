import { NextApiRequest, NextApiResponse } from "next";

export default async (resquest: NextApiRequest, response: NextApiResponse) => {
    let environmentBody = resquest.query.ambiente as string;

    let environment = getEnvironment().find(a => a.environment === environmentBody); //erro 

    await clearCache(environment);

    response.status(200).json({
        mensagem: 'O cache foi limpo com sucesso.',
        environmentBody: environmentBody,
        environment: environment.environment,
        environmentUrl: environment.url
    });
}

const clearCache = async (environment: { environment: string, url: string }) => {
    for (let item = 0; item <= 80; item++) {
        const response = await fetch(environment.url, {
            method: 'Get',
            credentials: 'include'
        });
        const json = await response.json();

        console.log(json, environment.url);
    }
}

const getEnvironment = () => {
    return [
        { environment: 'hom', url: 'http://ws-h.localiza.com/Operacoes/OP.Agendamento.API/api/util/limparCache?senha=AGENDAMENTO2019' },
        { environment: 'prd', url: 'http://ws.localiza.com/Operacoes/OP.Agendamento.API/api/util/limparCache?senha=AGENDAMENTO2019' },
        { environment: 'rolbh', url: 'http://ws.localiza.com/Operacoes/OP.Agendamento.API_Rollout_BH/api/util/limparCache?senha=AGENDAMENTO2019' },
        { environment: 'rolsp', url: 'http://ws.localiza.com/Operacoes/OP.Agendamento.API-Rollout_SP/api/util/limparCache?senha=AGENDAMENTO2019' }
    ];
}




