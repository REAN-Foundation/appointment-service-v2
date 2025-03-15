import express from 'express';
import { BusinessNodeHourController } from './business.node.hour.controller';
import { Loader } from '../../startup/loader';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new BusinessNodeHourController();

    router.post('', controller.create);
    router.post('/add-multiple', controller.createMultiple);
    router.get('/search', authenticator.authenticateClient, controller.search);
    router.get('/:id', authenticator.authenticateClient, controller.getById);
    router.put('/:id', authenticator.authenticateClient,controller.update);
    router.put('/update-multiple/:businessNodeId', authenticator.authenticateClient,controller.updateMultiple);
    router.delete('/:id', authenticator.authenticateClient, controller.delete);
    
    app.use('/api/v1/business-node-hours', router);
};