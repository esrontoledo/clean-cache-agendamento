import { NextApiRequest, NextApiResponse } from "next";

export default async (resquest: NextApiRequest, response: NextApiResponse) => {
    let environmentBody = resquest.query.ambiente as string;

    let environment = getEnvironment().find(a => a.environment === environmentBody);

    if (!environment) {
        response.status(500).json({
            error: 'Erro',
        });
    }

    response.status(200).json({
        mensagem: 'O cache foi limpo com sucesso.',
        environmentBody: environmentBody,
        environment: environment.environment,
        environmentUrl: environment.url
    });
}

const clearCache = async () => {

}

const getEnvironment = () => {
    return [
        { environment: 'hom', url: 'teste' },
        { environment: 'prd', url: 'teste1' },
        { environment: 'rolbh', url: 'teste2' },
        { environment: 'rolsp', url: 'teste3' }
    ];
}




