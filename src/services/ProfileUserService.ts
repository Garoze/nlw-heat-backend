import { prismaClient } from '../prisma';

export const ProfileUserService = async (user_id: string) => {
  const userProfile = await prismaClient.user.findFirst({
    where: {
      id: user_id,
    },
  });

  return userProfile;
};
