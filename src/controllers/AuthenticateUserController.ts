import { Request, Response } from 'express';

import { AuthenticateUserService } from '../services/AuthenticateUserService';

export const AuthenticateUserController = async (
  request: Request,
  response: Response
) => {
  const { code } = request.body;
  try {
    const result = await AuthenticateUserService(code);
    return response.json(result);
  } catch (e) {
    return response.json({ error: e.message });
  }
};
