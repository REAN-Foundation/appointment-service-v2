import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { AppointmentControllerDelegate } from './appointment.controller.delegate';
import { BaseController } from '../base.controller';

export class AppointmentController extends BaseController {

    //#region member variables and constructors

    _delegate: AppointmentControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new AppointmentControllerDelegate();
    }

     //#endregion
    findAvailableSlots = async(request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Appointment.Search', request, response, false);
            const searchResults = await this._delegate.findAvailableSlots(request.query, request.params.businessId, request.params.businessNodeId, request.params.businessServiceId);
            const message = 'Appointment records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        }
        catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    findAvailableSlotsForUser = async(request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Appointment.FindAvailableSlotsForUser', request, response, false);
            const searchResults = await this._delegate.findAvailableSlotsForUser(request.query, request.params.businessUserId);
            const message = 'Appointments available slots for user retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        }
        catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    canCustomerBookThisSlot = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Appointment.CanCustomerBookThisSlot', request, response, false);
            const record = await this._delegate.canCustomerBookThisSlot(request.body);
            const message = 'Appointments available slots for user retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        }
        catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    bookAppointment = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Appointment.BookAppointment', request, response, false);
            const record = await this._delegate.bookAppointment(request.body);
            const message = 'Appointment is booked successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        }
        catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('Appointment.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Appointment retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
        }catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByDisplayId = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('Appointment.GetByDisplayId', request, response, false);
            const record = await this._delegate.getByDisplayId(request.params.displayId);
            const message ="Appointment retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
        }catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };
    
    getByUser = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('Appointment.GetByUser', request, response, false);
            const record = await this._delegate.getByUser(request.params.businessUserId, request.query);
            const message ="Appointments for user retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
        }catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByNode = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('Appointment.GetByNode', request, response, false);
            const record = await this._delegate.getByNode(request.params.businessNodeId, request.query);
            const message ="Appointments for business node retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
        }catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByCustomer = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('Appointment.GetByCustomer', request, response, false);
            const record = await this._delegate.getByCustomer(request.params.customerId, request.query);
            const message ="Appointments for customer retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);
        }catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Appointment.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Appointment updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    cancelAppointment = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Appointment.Cancel', request, response, false);
            const updatedRecord = await this._delegate.cancelAppointment(request.params.id);
            const message = 'Appointment cancelled!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    complete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Appointment.Complete', request, response, false);
            const updatedRecord = await this._delegate.completeAppointment(request.params.id);
            const message = 'Appointment completed!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    confirm = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Appointment.Confirm', request, response, false);
            const updatedRecord = await this._delegate.confirmAppointment(request.params.id);
            const message = 'Appointment confirmed!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}