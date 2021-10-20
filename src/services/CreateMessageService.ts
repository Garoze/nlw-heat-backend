import { io } from '../app';
import { prismaClient } from '../prisma';

export const CreateMessageService = async (
  user_id: string,
  message: string
) => {
  const newMessage = await prismaClient.message.create({
    data: {
      user_id,
      message,
    },
    include: {
      user: true,
    },
  });

  const info = {
    user_id: newMessage.user_id,
    message: newMessage.message,
    create_at: newMessage.create_at,
    user: {
      name: newMessage.user.name,
      avatatar_url: newMessage.user.avatar_url,
    },
  };

  io.emit('new_message', info);

  return newMessage;
};
