import { PrismaClient } from '@prisma/client';

export const postsResover = async (parent, args, context) => {
  const prisma = context as PrismaClient;
  return prisma.post.findMany();
};
