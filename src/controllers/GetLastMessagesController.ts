import { Request, Response } from 'express';

import { GetLastMessagesService } from '../services/GetLastMessagesService';

export const GetLastMessagesController = async (
  request: Request,
  response: Response
) => {
  const result = await GetLastMessagesService();

  return response.json(result);
};
