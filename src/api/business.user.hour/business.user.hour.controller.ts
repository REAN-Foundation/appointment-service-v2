import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BusinessUserHourControllerDelegate } from './business.user.hour.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class BusinessUserHourController extends BaseController {

    //#region member variables and constructors

    _delegate: BusinessUserHourControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new BusinessUserHourControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
             await this.authorize('BusinessUserHour.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Business user hours added successfully!';
            ResponseHandler.success(request, response, message, 201, record);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    createMultiple = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
             await this.authorize('BusinessUserHour.CreateMultiple', request, response, false);
            const records = await this._delegate.createMultiple(request.body);
            const message = 'Business user hours added successfully!';
            ResponseHandler.success(request, response, message, 201, records);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try {
            await this.authorize('BusinessUserHour.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Business user hours retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);

        } catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserHour.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Business user hours records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserHour.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Business user hours updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateMultiple = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserHour.UpdateMultiple', request, response, false);
            const updatedRecord = await this._delegate.updateMultiple(request.params.businessUserid, request.body);
            const message = 'Business user hours updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserHour.Delete', request, response, false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Business user hours deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
