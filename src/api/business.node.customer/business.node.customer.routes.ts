import express from 'express';
import { BusinessNodeCustomerController } from './business.node.customer.controller';
import { Loader } from '../../startup/loader';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new BusinessNodeCustomerController();

    router.post('', controller.create);
    router.get('/search', authenticator.authenticateClient, controller.search);
    router.get('/:id', authenticator.authenticateClient, controller.getById);
    router.put('/:id', authenticator.authenticateClient,controller.update);
    router.delete('/:id', authenticator.authenticateClient, controller.delete);
    
    app.use('/api/v1/business-node-customers', router);
};
