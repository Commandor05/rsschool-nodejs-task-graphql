import { PrismaClient } from '@prisma/client';

export const profilesResover = async (parent, args, context) => {
  const prisma = context as PrismaClient;
  return prisma.profile.findMany();
};
