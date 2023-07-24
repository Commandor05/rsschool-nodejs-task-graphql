import { PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../../member-types/schemas.js';

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

  return result;
};

export const profileUserResover = async (
  parent: {
    userId?: string;
  },
  args,
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { userId } = parent;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const profileMemberTypeResover = async (
  parent,
  args,
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, no-prototype-builtins
  if (parent && typeof parent === 'object' && parent.hasOwnProperty('memberTypeId')) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const id = parent.memberTypeId as MemberTypeId;
    const memberType = await prisma.memberType.findUnique({
      where: {
        id: id,
      },
    });

    return memberType;
  } else {
    return null;
  }
};
