var _a;
import { PrismaClient } from "@prisma/client";
/**
 * Creates a singleton instance of Prisma Client.
 * @returns the Prisma Client singleton
 */
const prismaClientSingleton = () => {
    return new PrismaClient();
};
const prisma = (_a = globalThis.prismaGlobal) !== null && _a !== void 0 ? _a : prismaClientSingleton();
export default prisma;
if (process.env.NODE_ENV !== "production")
    globalThis.prismaGlobal = prisma;
