import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BusinessUserSkillControllerDelegate } from './business.user.skill.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class BusinessUserSkillController extends BaseController {

    //#region member variables and constructors

    _delegate: BusinessUserSkillControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new BusinessUserSkillControllerDelegate ();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessUserSkill.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Business user skills added successfully!';
            ResponseHandler.success(request, response, message, 201, record);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    createMultiple = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('BusinessUserSkill.CreateMultiple', request, response, false);
            const skills = await this._delegate.createMultiple(request.body.skills);
            const message = 'Business user skills added successfully!';
            ResponseHandler.success(request, response, message, 201, skills);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request:express.Request, response:express.Response): Promise <void>=>{
        try{
            await this.authorize('BusinessUserSkill.GetById', request, response,false);
            const record = await this._delegate.getById(request.params.id);
            const message ="Business user skills retrieved successfully!";
            ResponseHandler.success(request, response, message, 200, record);

        } catch(error){
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserSkill.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Business user skill records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserSkill.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Business user skills updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('BusinessUserSkill.Delete', request, response,false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Business user skills deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}     