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
    const memberTypes = await prisma.memberType.findMany({});
    const memberType = memberTypes.find((m) => m.id === id);

    return memberType;
  } else {
    return null;
  }
};

export const createProfileResolver = async (
  parent,
  args: {
    dto: {
      userId: string;
      memberTypeId: string;
      isMale: boolean;
      yearOfBirth: number;
    };
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { dto } = args;
  return prisma.profile.create({
    data: dto,
  });
};

export const deleteProfileResolver = async (
  parent,
  args: {
    id: string;
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = args;
  try {
    await prisma.profile.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const changeProfileResolver = async (
  parent,
  args: {
    id: string;
    dto: {
      memberTypeId?: string;
      isMale?: boolean;
      yearOfBirth?: number;
    };
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id, dto } = args;
  return prisma.profile.update({
    where: { id: id },
    data: dto,
  });
};
