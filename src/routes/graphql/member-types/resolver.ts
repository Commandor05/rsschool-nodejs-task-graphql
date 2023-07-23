import { PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../../member-types/schemas.js';

export const memberTypesResolver = async (
  parent,
  args,
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  return prisma.memberType.findMany();
};

export const memberTypeByIdResolver = async (
  parent,
  args: {
    id: MemberTypeId;
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = args;

  const result = await prisma.memberType.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};
