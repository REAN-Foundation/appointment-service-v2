import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessNodeCustomerValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        BusinessNodeId      : joi.string().guid({version : ['uuidv4'] }).required(),              
  	            CustomerId          : joi.string().guid({version : ['uuidv4'] }).required(),
                SmsConsent          : joi.string().max(255).optional(),
                IsActive            : joi.boolean().required() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        businessNodeId      : joi.string().guid({version : ['uuidv4'] }).optional(),              
  	            customerId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                isActive            : joi.boolean().optional() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId      : joi.string().guid({version : ['uuidv4'] }).optional(),              
                CustomerId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                SmsConsent          : joi.string().max(255).optional(),
                IsActive            : joi.boolean().optional() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}