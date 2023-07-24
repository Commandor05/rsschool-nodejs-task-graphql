import { PrismaClient } from '@prisma/client';

export const usersResover = async (parent, args, context: { prisma: PrismaClient }) => {
  const { prisma } = context;
  const users = await prisma.user.findMany();

  return users;
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

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const subscribedToUserResover = async (
  parent: {
    id?: string;
  },
  args,
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = parent;
  const userSubscribedTo = await prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: id,
        },
      },
    },
  });

  return userSubscribedTo;
};

export const userSubscribedToResover = async (
  parent: {
    id?: string;
  },
  args,
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = parent;
  const subscribedToUser = await prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: id,
        },
      },
    },
  });

  return subscribedToUser;
};

export const userPtofileResover = async (
  parent: {
    id?: string;
  },
  args,
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = parent;
  const profile = await prisma.profile.findUnique({
    where: {
      userId: id,
    },
  });

  const profileRes = profile !== null && profile.id !== null ? profile : null;

  return profileRes;
};

export const userPostsResover = async (
  parent: {
    id?: string;
  },
  args,
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = parent;
  const posts = await prisma.post.findMany({
    where: {
      authorId: id,
    },
  });

  return posts;
};
