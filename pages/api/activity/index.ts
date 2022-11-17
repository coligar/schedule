import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{

    const { name, color } = req.body

    try 
    {
        let response: any
        let status_code: number = 200

        if(req.method === 'PUT' || req.method === 'DELETE')
        {
            return resp.status(405).json({message:'Method not allowed'})
        }

        if(req.method === 'GET')
        {
            response = await prisma.areaActivity.findMany({
                orderBy:{name:'asc'}
            })
        }

        if(req.method === 'POST')
        {

            await prisma.areaActivity.create(
            {
                data:
                {
                    name,
                    color
                }
            })
        
            response = {message:'Área de atuação criada com sucesso'}
            status_code = 201
        }

        resp.status(status_code).json(response)
    }
    catch(error)
    {

    }
}