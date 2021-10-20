import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface Payload {
  sub: string;
}

export const ensureAuthenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authToken = request.headers.authorization;

  if (!authToken)
    return response.status(401).json({
      errorCode: 'token.invalid',
    });

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    request.user_id = sub;

    return next();
  } catch (e) {
    return response.status(401).json({
      errorCode: 'token.expired',
    });
  }
};
