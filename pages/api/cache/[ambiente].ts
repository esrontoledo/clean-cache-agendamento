import { NextApiRequest, NextApiResponse } from "next";

const ambientes = ['hom', 'prd', 'rolbh', 'rolsp']

export default async (resquest: NextApiRequest, response: NextApiResponse) => {
    let environmentBody = resquest.query.ambiente as string;

    let environment = getEnvironment().find(a => a.environment === environmentBody);

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
    ];
}




