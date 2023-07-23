import { PrismaClient } from '@prisma/client';

export const profilesResover = async (
  parent,
  args,
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  return prisma.profile.findMany();
};

export const profileByIdResover = async (
  parent,
  args: {
    id: string;
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = args;

  const result = await prisma.profile.findUnique({
    where: {
      id: id,
    },
  });
  console.log('id, result: ', id, result);

  return result;
};
