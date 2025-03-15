import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { BusinessUserSkillCreateModel } from '../../domain.types/business/business.user.skill.domain.types';
///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessUserSkillValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        BusinessSkillId           : joi.string().guid({version : ['uuidv4'] }).required(),              
  	            BusinessUserId            : joi.string().guid({version : ['uuidv4'] }).required(),
                IsActive                  : joi.boolean().required(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateCreateManyRequest = async (requestBody) => {
        const records : BusinessUserSkillCreateModel[] = [];
        try {
            const schema = joi.object({
    	        BusinessSkillId           : joi.string().guid({version : ['uuidv4'] }).optional(),              
  	            BusinessUserId            : joi.string().guid({version : ['uuidv4'] }).optional(),
                IsActive                  : joi.boolean().required(), 
            });
            for (const r of requestBody) {
                const request = await schema.validateAsync(r);
                records.push(request);
            }
           return records;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        businessSkillId             : joi.string().guid({version : ['uuidv4'] }).optional(),              
  	            businessUserId              : joi.string().guid({version : ['uuidv4'] }).optional(),
                isActive                    : joi.boolean().optional(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        BusinessSkillId           : joi.string().guid({version : ['uuidv4'] }).optional(),              
  	            BusinessUserId            : joi.string().guid({version : ['uuidv4'] }).optional(),
                IsActive                  : joi.boolean().optional(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
