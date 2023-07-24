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

export const createPostResolver = async (
  parent,
  args: {
    dto: {
      title: string;
      content: string;
      authorId: string;
    };
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { dto } = args;
  return prisma.post.create({
    data: dto,
  });
};

export const changePostResolver = async (
  parent,
  args: {
    id: string;
    dto: {
      title?: string;
      content?: string;
      authorId?: string;
    };
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id, dto } = args;
  return prisma.post.update({
    where: { id: id },
    data: dto,
  });
};

export const postUserResover = async (
  parent: {
    authorId?: string;
  },
  args,
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { authorId } = parent;
  const user = await prisma.user.findUnique({
    where: {
      id: authorId,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const deletePostResolver = async (
  parent,
  args: {
    id: string;
  },
  context: { prisma: PrismaClient },
) => {
  const { prisma } = context;
  const { id } = args;
  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};
