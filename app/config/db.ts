import { PrismaClient } from "@prisma/client"

declare global {
   var prismaGlobal: undefined | PrismaClient
 }
 
 const prisma = globalThis.prismaGlobal ?? new PrismaClient()
 
 export default prisma
 
 if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma