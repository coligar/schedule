import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { email, name, lastname, role, avatar, birth_date, cpf, rg, sex, password} = req.body

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
            response = await prisma.user.findMany(
            {
                orderBy:{role:'desc'},
                include:{address:true}
            })
        }

        if(req.method === 'POST')
        {
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
        
            response = {message:'Usuário cadastrado com sucesso'}
            status_code = 201
        }

        resp.status(status_code).json(response)
        
    } 
    catch (error:any) 
    {
        console.log(error)
        //resp.status(error.code).json({message:error})
    }
}