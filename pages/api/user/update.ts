import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { get } = req.query
    const { 
        email, 
        name, 
        lastname, 
        role, 
        avatar, 
        birth_date, 
        cpf, 
        rg, 
        sex,
        have_desability, 
        own_car,
        status,
        area_activityId 
    } = req.body

    try 
    {
        if(req.method !== 'PUT')
        {
            return resp.status(405).json({message:'Method not allowed'});
        }

        await prisma.user.update(
        {
            where:{
                id: get?.[1]
            },
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
                have_desability,
                own_car,
                status,
                area_activityId 
            }
        })

        resp.status(202).json({ message:'Usuário atualizado com sucesso'})
    } 
    catch (error) 
    {
        console.log(error)
    }
}