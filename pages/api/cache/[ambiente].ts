import { NextApiRequest, NextApiResponse } from "next";

const ambientes = ['hom', 'prd', 'rolbh', 'rolsp']

export default async (resquest: NextApiRequest, response: NextApiResponse) => {

    let ambiente = resquest.query.ambiente as string;
    response.status(200).json({
        mensagem: 'O cache foi limpo com sucesso.',
        ambiente: ambiente
    });
}




