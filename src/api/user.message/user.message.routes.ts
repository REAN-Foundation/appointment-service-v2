import express from 'express';
import { UserMessageController } from './user.message.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new UserMessageController();

    router.post('', controller.create);
    router.get('/search', authenticator.authenticateClient, controller.search);
    router.get('/:id', authenticator.authenticateClient, controller.getById);
    router.put('/:id', authenticator.authenticateClient,controller.update);
    router.delete('/:id', authenticator.authenticateClient, controller.delete);
    
    app.use('/api/v1/user-messages', router);
};