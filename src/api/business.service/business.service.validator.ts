import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessServiceValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId               : joi.string().guid({version : ['uuidv4'] }).required(),
                AllowCancellation            : joi.boolean().required(),
                CancellationCharges          : joi.number().max(255).required(),
                CancellationWindow           : joi.string().max(255).required(),
                Description                  : joi.string().optional(),
                DisplayServicePicture        : joi.string().optional(),
                EnableLoyalty                : joi.boolean().optional(),
                Fees                         : joi.number().max(255).optional(),
                IsActive                     : joi.boolean().optional(),
                IsTaxable                    : joi.boolean().optional(),
                Name                         : joi.string().max(255).required(),
                PaymentPercent               : joi.number().max(255).optional(),
                PaymentRequired              : joi.boolean().optional(),
                PriorBookingWindow           : joi.string().max(255).optional(),
                ReminderType                 : joi.string().max(255).optional(),
                ReminderWindow               : joi.string().max(255).optional(),
                SendReminder                 : joi.boolean().optional(),
                ServiceDuration              : joi.string().max(255).optional(),
                TaxRate                      : joi.number().max(255).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                businessNodeId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                isActive                     : joi.boolean().optional(),
                name                         : joi.string().max(255).optional()
            });
            return await schema.validateAsync(query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                AllowCancellation            : joi.boolean().optional(),
                CancellationCharges          : joi.number().max(255).optional(),
                CancellationWindow           : joi.string().max(255).optional(),
                Description                  : joi.string().optional(),
                DisplayServicePicture        : joi.string().optional(),
                EnableLoyalty                : joi.boolean().optional(),
                Fees                         : joi.number().max(255).optional(),
                IsActive                     : joi.boolean().optional(),
                IsTaxable                    : joi.boolean().optional(),
                Name                         : joi.string().max(255).optional(),
                PaymentPercent               : joi.number().max(255).optional(),
                PaymentRequired              : joi.boolean().optional(),
                PriorBookingWindow           : joi.string().max(255).optional(),
                ReminderType                 : joi.string().max(255).optional(),
                ReminderWindow               : joi.string().max(255).optional(),
                SendReminder                 : joi.boolean().optional(),
                ServiceDuration              : joi.string().max(255).optional(),
                TaxRate                      : joi.number().max(255).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
