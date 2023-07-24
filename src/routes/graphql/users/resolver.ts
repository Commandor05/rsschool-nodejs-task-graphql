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

export const createUserResolver = async (
  parent,
  args: {
    dto: {
      name: string;
      balance: number;
    };
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { dto } = args;
  return prisma.user.create({
    data: dto,
  });
};

export const deleteUserResolver = async (
  parent,
  args: {
    id: string;
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = args;
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const changeUserResolver = async (
  parent,
  args: {
    id: string;
    dto: {
      name: string;
      balance: number;
    };
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id, dto } = args;
  return prisma.user.update({
    where: { id: id },
    data: dto,
  });
};

export const subscribeToResolver = async (
  parent,
  args: {
    userId: string;
    authorId: string;
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { userId, authorId } = args;
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userSubscribedTo: {
        create: {
          authorId: authorId,
        },
      },
    },
  });
};

export const unsubscribeFromResolver = async (
  parent,
  args: {
    userId: string;
    authorId: string;
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { userId, authorId } = args;

  try {
    await prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: userId,
          authorId: authorId,
        },
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};
