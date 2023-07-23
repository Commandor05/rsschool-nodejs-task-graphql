import { PrismaClient } from '@prisma/client';

export const usersResover = async (parent, args, context) => {
  const prisma = context as PrismaClient;
  return prisma.user.findMany();
};
