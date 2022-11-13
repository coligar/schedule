import { PrismaClient } from '@prisma/client'

// Avoid instantiating too many instances of Prisma in development
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem

declare global{
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') global.prisma = prisma;