import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { UserMessageControllerDelegate } from './user.message.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class UserMessageController extends BaseController {

    //#region member variables and constructors

    _delegate: UserMessageControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new UserMessageControllerDelegate ();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('UserMessage.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'User messages added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('UserMessage.GetById', request, response,false);
            const record = await this._delegate.getById(request.params.id);
            const message ="User messages retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
        } catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserMessage.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'User message records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserMessage.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'User messages updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserMessage.Delete', request, response,false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'User messages deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}     