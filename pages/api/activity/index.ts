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

        let activity: any

        activity = await prisma.areaActivity.findMany({
            orderBy:{name:'asc'}
        })

        resp.status(200).json(activity)
    }
    catch(error)
    {

    }
}