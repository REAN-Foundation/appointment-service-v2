import express from 'express';
import { BusinessUserHourController } from './business.user.hour.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new BusinessUserHourController();

    router.post('', controller.create);
    router.post('/add-multiple', controller.createMultiple);
    router.get('/search', authenticator.authenticateClient, controller.search);
    router.get('/:id', authenticator.authenticateClient, controller.getById);
    router.put('/:id', authenticator.authenticateClient, controller.update);
    router.put('/update-multiple/:businessUserid', authenticator.authenticateClient, controller.updateMultiple);
    router.delete('/:id', authenticator.authenticateClient, controller.delete);

    app.use('/api/v1/business-user-hours', router);
};
