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

        let schedules:any;

        if(get?.length === 1)
        {
            schedules = await prisma.schedule.findMany(
            {
                orderBy:{day:'asc'},
                where:{type:'ATIVO'}
            })
        }
        else
        {
            schedules = await prisma.schedule.findMany(
            {
                where:{id:get?.[1]}
            })
        }
        
        resp.status(200).json(schedules)
        
    } 
    catch (error:any) 
    {
        console.log(error)
        resp.status(error.code).json({message:error})
    }
}