import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BusinessNodeControllerDelegate } from './business.node.controller.delegate';
import { BaseController } from '../base.controller';

export class BusinessNodeController extends BaseController {

    //#region member variables and constructors

    _delegate: BusinessNodeControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new BusinessNodeControllerDelegate();
    }

     //#endregion

     create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessNode.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Business node added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try {
            await this.authorize('BusinessNode.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Business node retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
        }catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessNode.Search', request, response ,false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Business node records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessNode.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Business node updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessNode.Delete', request, response, false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Business node deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        }catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}