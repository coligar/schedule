import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { get } = req.query

    try 
    {
        if(req.method !== 'GET')
        {
            return resp.status(405).json({message:'Method not allowed'})
        }

        let users:any;

        if(get?.length === 1)
        {
            users = await prisma.user.findMany(
            {
                orderBy:{name:'asc'}
            })
        }
        else
        {
            users = await prisma.user.findMany(
            {
                where:{id:get?.[1]}
            })
        }
        
        resp.status(200).json(users)
        
    } 
    catch (error:any) 
    {
        console.log(error)
        resp.status(error.code).json({message:error})
    }
}