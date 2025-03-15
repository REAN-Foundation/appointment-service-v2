import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BusinessNodeHourControllerDelegate } from './business.node.hour.controller.delegate';
import { BaseController } from '../base.controller';

export class BusinessNodeHourController extends BaseController {

    //#region member variables and constructors

    _delegate: BusinessNodeHourControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new BusinessNodeHourControllerDelegate();
    }

     //#endregion

     create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessNodeHour.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Business node hours added successfully!';
            ResponseHandler.success(request, response, message, 201, record);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    createMultiple = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessNodeHour.CreateMultiple', request, response, false);
            const records = await this._delegate.createMultiple(request.body);
            const message = 'Business node hours added successfully!';
            ResponseHandler.success(request, response, message, 201, records);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try {
            await this.authorize('BusinessNodeHour.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Business node hours retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
            
        } catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessNodeHour.Search', request, response ,false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Business node hour records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessNodeHour.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Business node hour updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateMultiple = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessNodeHour.UpdateMultiple', request, response, false);
            const updatedRecord = await this._delegate.updateMultiple(request.params.businessNodeId, request.body);
            const message = 'Business node hours updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessNodeHour.Delete', request, response, false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Business node hours deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);

        }catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}