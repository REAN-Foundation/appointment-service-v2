import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BusinessUserServiceControllerDelegate } from './business.user.service.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class BusinessUserServiceController extends BaseController {

    //#region member variables and constructors

    _delegate: BusinessUserServiceControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new BusinessUserServiceControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
             await this.authorize('BusinessUserService.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Business user service added successfully!';
            ResponseHandler.success(request, response, message, 201, record);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    createMultiple = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
             await this.authorize('BusinessUserService.CreateMultiple', request, response, false);
            const records = await this._delegate.createMultiple(request.body.records);
            const message = 'Business user services added successfully!';
            ResponseHandler.success(request, response, message, 201, records);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try {
            await this.authorize('BusinessUserService.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Business user service retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);

        } catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserService.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Business user service records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserService.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Business user service updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserService.Delete', request, response, false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Business user service deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);

        }catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}