import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { email, name, role, avatar } = req.body

    try 
    {
        if(req.method !== 'POST')
        {
            return resp.status(405).json({message:'Method not allowed'});
        }

        await prisma.user.create(
        {
            data:
            {
                email, 
                name,
                role,
                avatar,
            }
        })

        resp.status(200).json({ message:'Usuário criado com sucesso'})
    } 
    catch (error) 
    {
        console.log(error)
    }
}