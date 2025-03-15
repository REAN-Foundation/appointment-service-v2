import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BusinessServiceControllerDelegate } from './business.service.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class BusinessServiceController extends BaseController {

    //#region member variables and constructors

    _delegate: BusinessServiceControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new BusinessServiceControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessService.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Business service added successfully!';
            ResponseHandler.success(request, response, message, 201, record);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try {
            await this.authorize('BusinessService.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Business service retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);

        } catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByBusiness = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessService.SearchByBusiness', request, response, false);
            const searchResults = await this._delegate.getByBusiness(request.params.id, request.query);
            const message = 'Business service records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessService.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Business service records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessService.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Business service updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessService.Delete', request, response, false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Business service deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
            
        }catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
