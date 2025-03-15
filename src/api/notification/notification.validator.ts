import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
///////////////////////////////////////////////////////////////////////////////////////////////

export class NotificationValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Body                : joi.string().optional(),
    	        BusinessNodeId      : joi.string().guid({version : ['uuidv4'] }).required(),              
  	            CustomerId          : joi.string().guid({version : ['uuidv4'] }).required(),
                IsRead              : joi.boolean().required(),   
                IsSent              : joi.boolean().required(),
                Message             : joi.string().optional(),
                ReadOn              : joi.date().optional(),
                SentOn              : joi.date().optional(),
                Title               : joi.string().max(255).optional(),
                Type                : joi.string().max(255).optional(),
                TypeId              : joi.number().required(),
                IsActive            : joi.boolean().required(),
                DeletedAt           : joi.boolean().optional(),
                IsDeleted           : joi.boolean().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
    	        businessNodeId      : joi.string().guid({version : ['uuidv4'] }).optional(),              
  	            customerId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                isActive            : joi.boolean().optional() 
            });
            return await schema.validateAsync(query);
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
                IsRead              : joi.boolean().optional(),   
                IsSent              : joi.boolean().optional(),
                Message             : joi.string().optional(),
                ReadOn              : joi.date().optional(),
                SentOn              : joi.date().optional(),
                Title               : joi.string().max(255).optional(),
                Type                : joi.string().max(255).optional(),
                TypeId              : joi.number().optional(),
                IsActive            : joi.boolean().optional(),
                DeletedAt           : joi.date().optional(),
                IsDeleted           : joi.boolean().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}