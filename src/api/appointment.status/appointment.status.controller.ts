import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { AppointmentStatusControllerDelegate } from './appointment.status.controller.delegate';
import { BaseController } from '../base.controller';

export class AppointmentStatusController extends BaseController {

    //#region member variables and constructors

    _delegate: AppointmentStatusControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new AppointmentStatusControllerDelegate();
    }

     //#endregion

     create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
             await this.authorize('AppointmentStatus.Create', request, response, false);
             
            const record = await this._delegate.create(request.body);
            const message = 'Appointment status added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    createMultiple = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
             await this.authorize('AppointmentStatus.CreateMultiple', request, response, false);
            const records = await this._delegate.createMultiple(request.body);
            const message = 'Appointment statuses added successfully!';
            ResponseHandler.success(request, response, message, 201, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('AppointmentStatus.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Appointment status retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
            

        }catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('AppointmentStatus.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Appointment status records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('AppointmentStatus.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Appointment status updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('AppointmentStatus.Delete', request, response,false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Appointment status deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
