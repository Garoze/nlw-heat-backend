import { Request, Response } from 'express';

import { CreateMessageService } from '../services/CreateMessageService';

export const CreateControllerMessage = async (
  request: Request,
  response: Response
) => {
  const { message } = request.body;
  const { user_id } = request;

  const result = await CreateMessageService(user_id, message);

  return response.json(result);
};
