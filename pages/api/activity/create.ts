import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { name, color} = req.body

    try 
    {
        if(req.method !== 'POST')
        {
            return resp.status(405).json({message:'Method not allowed'});
        }

        await prisma.areaActivity.create(
        {
            data:
            {
                name,
                color
            }
        })

        resp.status(201).json({ message:'Área de atuação criada com sucesso'})
    } 
    catch (error) 
    {
        console.log(error)
    }
}