import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { id } = req.query

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
        let response
        let status_code: number = 200

        if(req.method === 'POST')
        {
            return resp.status(405).json({message:'Method not allowed'})
        }

        if(req.method === 'PUT')
        {
            response = await prisma.user.update(
            {
                where:{
                    id: id?.toString()
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

            status_code = 202
            response = {message : 'Usuário atualizado com sucesso'}
        }

        if(req.method === 'GET')
        {
            response = await prisma.user.findUnique(
            {
                where:{
                    id: id?.toString()
                },
                include:{
                    address: true,
                    contact: true,
                    schedule: true,
                }
            })
        }

        if(req.method === 'DELETE')
        {
            response = await prisma.user.delete(
            {
                where:{
                    id: id?.toString()
                }
            })

            status_code = 204
            response = {message : 'Usuário excluído com sucesso'}
        }

        
        resp.status(status_code).json(response)
        
    } 
    catch (error:any) 
    {
        console.log(error)
        resp.status(error.code).json({message:error})
    }
}