import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { get } = req.query
    
    try 
    {
        if(req.method !== 'DELETE')
        {
            return resp.status(405).json({message:'Method not allowed'});
        }

        await prisma.user.delete({
            where:
            {
                id:get?.[1]
            }
        })

        resp.status(204).json({ message:'Usuário excluído com sucesso'})
    } 
    catch (error) 
    {
        
    }
}
