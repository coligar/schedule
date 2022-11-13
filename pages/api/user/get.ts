import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    try 
    {
        if(req.method !== 'GET')
        {
            return resp.status(405).json({message:'Method not allowed'})
        }

        const users = await prisma.user.findMany()
        resp.status(200).json(users)
        
    } 
    catch (error:any) 
    {
        resp.status(error.code).json({message:error.status.message})
    }
}