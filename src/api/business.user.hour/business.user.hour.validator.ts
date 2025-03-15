import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { BusinessUserHourCreateModel } from '../../domain.types/business/business.user.hour.domain.types';
///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessUserHourValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId      : joi.string().guid({version : ['uuidv4'] }).required(),
                Type                : joi.string().required(),
                Day                 : joi.number().required(),
                Date                : joi.date().optional(),
                IsOpen              : joi.boolean().required(),
                Message             : joi.string().max(255).optional(),
                StartTime           : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional().allow(null),
                EndTime             : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional().allow(null),
                IsActive            : joi.boolean().optional(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateCreateMultipleRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId      : joi.string().guid({version : ['uuidv4'] }).optional(),
                Type                : joi.string().optional(),
                Day                 : joi.number().required(),
                Date                : joi.date().optional(),
                IsOpen              : joi.boolean().optional(),
                Message             : joi.string().max(255).optional(),
                StartTime           : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                EndTime             : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                IsActive            : joi.boolean().optional(), 
            });
            const records : BusinessUserHourCreateModel[] = [];
            for (const wh of requestBody.DayWiseWorkingHours) {
                const request = await schema.validateAsync(wh);
                records.push(request);
            }
            return records;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                businessUserId      : joi.string().guid({version : ['uuidv4'] }).optional(),
                isActive            : joi.boolean().optional(), 
            });
            return await schema.validateAsync(query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId      : joi.string().guid({version : ['uuidv4'] }).optional(),
                Type                : joi.string().optional(),
                Day                 : joi.number().optional(),
                Date                : joi.date().optional(),
                IsOpen              : joi.boolean().optional(),
                Message             : joi.string().max(255).optional(),
                StartTime           : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                EndTime             : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                IsActive            : joi.boolean().optional(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateMultipleRequest = async (requestBody) => {
            try {
                const schema = joi.object({
                    BusinessUserId      : joi.string().guid({version : ['uuidv4'] }).optional(),
                    Type                : joi.string().max(255).optional(),
                    Day                 : joi.number().optional(),
                    Date                : joi.date().optional(),
                    IsOpen              : joi.boolean().optional(),
                    Message             : joi.string().max(255).optional(),
                    StartTime           : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional().allow(null),
                    EndTime             : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional().allow(null),
                    IsActive            : joi.boolean().optional(), 
                });
                const records : BusinessUserHourCreateModel[] = [];
                for (const wh of requestBody.DayWiseWorkingHours) {
                    const request = await schema.validateAsync(wh);
                    records.push(request);
                }
                return records;        
            } catch (error) {
                ErrorHandler.handleValidationError(error);
            }
        };
    }