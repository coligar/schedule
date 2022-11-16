import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { email, name, lastname, role, avatar, birth_date, cpf, rg, sex, password} = req.body

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
                lastname,
                role,
                avatar,
                birth_date,
                cpf,
                rg,
                sex,
                password
            }
        })

        resp.status(201).json({ message:'Usuário criado com sucesso'})
    } 
    catch (error) 
    {
        console.log(error)
    }
}