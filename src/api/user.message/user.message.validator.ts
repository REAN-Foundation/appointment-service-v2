import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
///////////////////////////////////////////////////////////////////////////////////////////////

export class UserMessageValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Body                : joi.string().optional(),
    	        BusinessNodeId      : joi.string().guid({version : ['uuidv4'] }).required(),              
  	            CustomerId          : joi.string().guid({version : ['uuidv4'] }).required(),
                IsSent              : joi.boolean().required(),
                Error               : joi.string().optional(),
                MessageId           : joi.string().max(255).optional(),
                SentOn              : joi.date().optional(),
                Type                : joi.string().max(255).optional(),
                TypeId              : joi.number().required(),
                IsActive            : joi.boolean().required() ,
                IsDeleted           : joi.boolean().optional()
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
                Body                : joi.string().optional(),
    	        BusinessNodeId      : joi.string().guid({version : ['uuidv4'] }).optional(),              
  	            CustomerId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                IsSent              : joi.boolean().optional(),
                Error               : joi.string().optional(),
                MessageId           : joi.string().max(255).optional(),
                SentOn              : joi.date().optional(),
                Type                : joi.string().max(255).optional(),
                TypeId              : joi.number().optional(),
                IsActive            : joi.boolean().optional(),
                IsDeleted           : joi.boolean().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}