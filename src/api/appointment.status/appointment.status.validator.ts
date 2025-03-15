import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { AppointmentStatusCreateModel } from '../../domain.types/appointment.status/appointment.status.domain.types';
///////////////////////////////////////////////////////////////////////////////////////////////

export class AppointmentStatusValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        BusinessNodeId          : joi.string().guid({version : ['uuidv4'] }).optional(),              
                IsCancellationStatus    : joi.boolean().required(),
                IsCompletedStatus       : joi.boolean().required(),   
                IsConfirmedStatus       : joi.boolean().optional(),
                IsDashboardStatus       : joi.boolean().required(),
                IsWalkinEntryStatus     : joi.boolean().required(),
                NotificationText        : joi.string().optional(),
                SendNotification        : joi.boolean().required(),
                SendSms                 : joi.boolean().required(),
                Sequence                : joi.number().optional(),
                SmsText                 : joi.string().max(255).optional(),
                Status                  : joi.string().max(255).optional(),
                StatusCode              : joi.string().max(255).optional(),
                StatusColor             : joi.string().optional(),
                IsActive                : joi.boolean().required() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateCreateMultipleRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        BusinessNodeId          : joi.string().guid({version : ['uuidv4'] }).optional(),              
                IsCancellationStatus    : joi.boolean().optional(),
                IsCompletedStatus       : joi.boolean().optional(),   
                IsConfirmedStatus       : joi.boolean().optional(),
                IsDashboardStatus       : joi.boolean().optional(),
                IsWalkinEntryStatus     : joi.boolean().optional(),
                NotificationText        : joi.string().optional(),
                SendNotification        : joi.boolean().optional(),
                SendSms                 : joi.boolean().optional(),
                Sequence                : joi.number().optional(),
                SmsText                 : joi.string().max(255).optional(),
                Status                  : joi.string().max(255).optional(),
                StatusCode              : joi.string().max(255).optional(),
                StatusColor             : joi.string().optional(),
                IsActive                : joi.boolean().optional() 
            });
            const records : AppointmentStatusCreateModel[] = [];
            for (const s of requestBody.Statuses) {
                const request = await schema.validateAsync(s);
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
    	        businessNodeId          : joi.string().guid({version : ['uuidv4'] }).optional(),
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
                IsCancellationStatus    : joi.boolean().optional(),
                IsCompletedStatus       : joi.boolean().optional(),   
                IsConfirmedStatus       : joi.boolean().optional(),
                IsDashboardStatus       : joi.boolean().optional(),
                IsWalkinEntryStatus     : joi.boolean().optional(),
                NotificationText        : joi.string().optional(),
                SendNotification        : joi.boolean().optional(),
                SendSms                 : joi.boolean().optional(),
                Sequence                : joi.number().optional(),
                SmsText                 : joi.string().max(255).optional(),
                Status                  : joi.string().max(255).optional(),
                StatusCode              : joi.string().max(255).optional(),
                StatusColor             : joi.string().optional(),
                IsActive                : joi.boolean().optional() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}