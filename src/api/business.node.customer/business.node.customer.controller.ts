import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BusinessNodeCustomerControllerDelegate } from './business.node.customer.controller.delegate';
import { BaseController } from '../base.controller';

export class BusinessNodeCustomerController extends BaseController {

    //#region member variables and constructors

    _delegate: BusinessNodeCustomerControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new BusinessNodeCustomerControllerDelegate();
    }
     //#endregion

     create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessNodeCustomer.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Business node customer added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
            
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('BusinessNodeCustomer.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Business node customer retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);

        }catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessNodeCustomer.Search', request, response ,false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Business node customer records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessNodeCustomer.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Business node customer updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessNodeCustomer.Delete', request, response, false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Business node customer deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);

        }catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}