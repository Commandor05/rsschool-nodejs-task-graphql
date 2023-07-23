import { PrismaClient } from '@prisma/client';

export const usersResover = async (parent, args, context: { prisma: PrismaClient }) => {
  const { prisma } = context;
  return prisma.user.findMany();
};

export const userByIdResover = async (
  parent,
  args: {
    id: string;
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = args;

  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};
