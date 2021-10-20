import { Request, Response } from 'express';

import { ProfileUserService } from '../services/ProfileUserService';

export const ProfileUserController = async (
  request: Request,
  response: Response
) => {
  const { user_id } = request;

  const result = await ProfileUserService(user_id);

  return response.json(result);
};
