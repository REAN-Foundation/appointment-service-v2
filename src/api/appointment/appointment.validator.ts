import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

export class AppointmentValidator {

static validateSearchRequest = async (query) => {
    try {
        const schema = joi.object({
            fromDate            : joi.date().iso().optional(),
            toDate              : joi.date().iso().optional(),
            businessUserId      : joi.string().guid({version : ['uuidv4']}).optional()
        });
            return await schema.validateAsync(query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
    
    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId          : joi.string().guid({version : ['uuidv4'] }).required(),
                CustomerId              : joi.string().guid({version : ['uuidv4'] }).required(),
                BusinessUserId          : joi.string().guid({version : ['uuidv4'] }).required(),
                BusinessServiceId       : joi.string().guid({version : ['uuidv4'] }).required(),
                DisplayId               : joi.string().max(255).optional(),
                // StartTime               : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                // EndTime                 : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                StartTime               : joi.date().optional(),
                EndTime                 : joi.date().optional(),
                Type                    : joi.string().max(255).optional(),
                Status                  : joi.string().max(255).optional(),
                StatusCode              : joi.string().max(255).optional(),
                Note                    : joi.string().optional(),
                Fees                    : joi.number().optional(),
                Tax                     : joi.number().optional(),
                Tip                     : joi.number().optional(),
                Total                   : joi.number().optional(),
                Discount                : joi.number().optional(),
                CouponCode              : joi.string().max(255).optional(),
                TransactionId           : joi.string().max(36).optional(),
                IsPaid                  : joi.boolean().optional(),
                CancelledOn             : joi.date().optional(),
                CompletedOn             : joi.date().optional(),
                ConfirmedOn             : joi.date().optional(),
                IsActive                : joi.boolean().optional(),
                IsCompleted             : joi.boolean().optional(),
                IsConfirmed             : joi.boolean().optional(),
                IsCancelled             : joi.boolean().optional(),
                IsRescheduled           : joi.boolean().optional(),
                RescheduledAppointmentId : joi.number().optional(),
                RescheduledOn            : joi.date().optional(),


            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                CustomerId              : joi.string().guid({version : ['uuidv4'] }).optional(),
                BusinessUserId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                BusinessServiceId       : joi.string().guid({version : ['uuidv4'] }).optional(),
                StartTime               : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                EndTime                 : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                Type                    : joi.string().max(255).optional(),
                Status                  : joi.string().max(255).optional(),
                StatusCode              : joi.string().max(255).optional(),
                Note                    : joi.string().optional(),
                Fees                    : joi.number().optional(),
                Tax                     : joi.number().optional(),
                Tip                     : joi.number().optional(),
                Total                   : joi.number().optional(),
                Discount                : joi.number().optional(),
                CouponCode              : joi.string().max(255).optional(),
                TransactionId           : joi.string().max(36).optional(),
                IsPaid                  : joi.boolean().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}