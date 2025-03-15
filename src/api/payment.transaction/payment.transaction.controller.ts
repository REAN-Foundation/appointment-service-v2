import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { PaymentTransactionControllerDelegate } from './payment.transaction.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////////////////

export class PaymentTransactionController extends BaseController {

    //#region member variables and constructors

    _delegate: PaymentTransactionControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new PaymentTransactionControllerDelegate ();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('PaymentTransaction.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Payment transactions added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('PaymentTransaction.GetById', request, response,false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Payment transactions retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
        } catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('PaymentTransaction.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Payment transactions records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('PaymentTransaction.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Payment transactions updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('PaymentTransaction.Delete', request, response,false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Payment transactions deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}     