import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
///////////////////////////////////////////////////////////////////////////////////////////////

export class PaymentTransactionValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        BusinessNodeId      : joi.string().guid({version : ['uuidv4'] }).required(),              
                AppointmentId       : joi.string().guid({version : ['uuidv4'] }).optional(),
                CustomerId          : joi.string().guid({version : ['uuidv4'] }).required(),
                ExternalId          : joi.string().max(255).optional(),
                CompletedOn         : joi.date().optional(),
                InitiatedOn         : joi.date().optional(),
                Currency            : joi.string().max(255).optional(),
                Status              : joi.string().max(255).optional(),
                TotalAmount         : joi.number().required(),
                IsComplete          : joi.boolean().required(),   
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
                appointmentId       : joi.string().guid({version : ['uuidv4'] }).optional(),
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
                AppointmentId       : joi.string().guid({version : ['uuidv4'] }).optional(),
                CustomerId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                ExternalId          : joi.string().max(255).optional(),
                CompletedOn         : joi.date().optional(),
                InitiatedOn         : joi.date().optional(),
                Currency            : joi.string().max(255).optional(),
                Status              : joi.string().max(255).optional(),
                TotalAmount         : joi.number().optional(),
                IsComplete          : joi.boolean().optional(),   
                IsActive            : joi.boolean().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}