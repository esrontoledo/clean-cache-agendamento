import { NextApiRequest, NextApiResponse } from "next";

export default async (resquest: NextApiRequest, response: NextApiResponse) => {
    // let environmentBody = resquest.query.ambiente as string;

    // const environments = getEnvironment();

    // let environment = environments.find(a => a.environment === environmentBody);

    await clearCache({environment: 'hom', url: 'http://ws-h.localiza.com/Operacoes/OP.Agendamento.API/api/util/limparCache?senha=AGENDAMENTO2019'});

    response.status(200).json({
        request: 'O cache foi limpo com sucesso.',
        environmentBody: 'hom',
        environment: 'hom',
        environmentUrl: 'http://ws-h.localiza.com/Operacoes/OP.Agendamento.API/api/util/limparCache?senha=AGENDAMENTO2019'
    });
}

const clearCache = async (environment: { environment: string, url: string }) => {
    for (let item = 0; item <= 100; item++) {
        await fetch(environment.url.toString(), {
            method: 'Get',
            credentials: 'include'
        });
        console.log(item)
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




