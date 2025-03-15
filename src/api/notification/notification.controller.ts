import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { NotificationControllerDelegate } from './notification.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class NotificationController extends BaseController {

    //#region member variables and constructors

    _delegate: NotificationControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new NotificationControllerDelegate ();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Notification.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Notifications added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('Notification.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Notifications retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
        } catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Notification.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Notification records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Notification.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Notification updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Notifications.Delete', request, response,false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Notifications deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}     