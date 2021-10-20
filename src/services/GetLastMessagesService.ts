import { prismaClient } from '../prisma';

export const GetLastMessagesService = async () => {
  const messages = await prismaClient.message.findMany({
    take: 3,
    orderBy: {
      create_at: 'desc',
    },
    include: {
      user: true,
    },
  });

  return messages;
};
