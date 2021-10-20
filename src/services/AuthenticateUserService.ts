import axios from 'axios';
import { sign } from 'jsonwebtoken';

import { prismaClient } from '../prisma';

interface AccessTokenResponse {
  access_token: string;
}

interface UserResponse {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
}

export const AuthenticateUserService = async (code: string) => {
  const url = 'https://github.com/login/oauth/access_token';

  const { data: accessTokenResponse } = await axios.post<AccessTokenResponse>(
    url,
    null,
    {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    }
  );

  const response = await axios.get<UserResponse>(
    'https://api.github.com/user',
    {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    }
  );

  const { id, name, login, avatar_url }: UserResponse = response.data;

  let user = await prismaClient.user.findFirst({
    where: {
      github_id: id,
    },
  });

  if (!user) {
    user = await prismaClient.user.create({
      data: {
        github_id: id,
        name,
        login,
        avatar_url,
      },
    });
  }

  const token = sign(
    {
      user: {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
      },
    },
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: '1d',
    }
  );

  return { token, user };
};
