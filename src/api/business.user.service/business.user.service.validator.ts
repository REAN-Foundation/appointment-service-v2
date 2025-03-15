import * as joi from 'joi';
import { BusinessUserServiceCreateModel } from '../../domain.types/business/business.user.service.domain.types';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessUserServiceValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId               : joi.string().guid({version : ['uuidv4'] }).required(),
                BusinessServiceId            : joi.string().guid({version : ['uuidv4'] }).required(),
                IsActive                     : joi.boolean().required(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateCreateMultipleRequest = async (requestBody) => {
        const records: BusinessUserServiceCreateModel[] = [];
        try {
            const schema = joi.object({
                BusinessUserId               : joi.string().guid({version : ['uuidv4'] }).required(),
                BusinessServiceId            : joi.string().guid({version : ['uuidv4'] }).required(),
                IsActive                     : joi.boolean().required(),  
            });

            for (const r of requestBody){
                const request = await schema.validateAsync(r);
                records.push(request)
            }
            return records;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                businessUserId               : joi.string().max(36).guid({version : ['uuidv4'] }).optional(),
                businessServiceId            : joi.string().max(36).guid({version : ['uuidv4'] }).optional(),
                isActive                     : joi.boolean().optional(),
            });
            return await schema.validateAsync(query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId               : joi.string().max(36).guid({version : ['uuidv4'] }).optional(),
                BusinessServiceId            : joi.string().max(36).guid({version : ['uuidv4'] }).optional(),
                IsActive                     : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}