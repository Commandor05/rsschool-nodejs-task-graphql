import { PrismaClient } from '@prisma/client';

export const postsResover = async (parent, args, context: { prisma: PrismaClient }) => {
  const { prisma } = context;
  return prisma.post.findMany();
};

export const postByIdResover = async (
  parent,
  args: {
    id: string;
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = args;

  const result = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};
