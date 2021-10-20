import { Router } from 'express';

import { ensureAuthenticate } from './middlewares/ensureAuthenticate';
import { CreateControllerMessage } from './controllers/CreateMessageController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { GetLastMessagesController } from './controllers/GetLastMessagesController';
import { ProfileUserController } from './controllers/ProfileUserController';

export const router = Router();

router.post('/authenticate', AuthenticateUserController);
router.post('/messages', ensureAuthenticate, CreateControllerMessage);

router.get('/messages/last', GetLastMessagesController);
router.get('/profile', ensureAuthenticate, ProfileUserController);
