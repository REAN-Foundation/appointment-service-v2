import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { BusinessNodeHourCreateModel } from "../../domain.types/business.node.hour/business.node.hour.domain.types";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class BusinessNodeHourValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId                     : joi.string().max(255).required(),
                Type                               : joi.string().max(255).required(),
                Day                                : joi.number().required(),
                Date                               : joi.date().optional(),
                IsOpen                             : joi.boolean().optional(),
                Message                            : joi.string().max(255).optional(),
                StartTime                          : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                EndTime                            : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                IsActive                           : joi.boolean().optional(),
                IsDeleted                          : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateCreateMultipleRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId      : joi.string().max(255).optional(),
                Type                : joi.string().max(255).optional(),
                Day                 : joi.number().required(),
                Date                : joi.date().optional(),
                IsOpen              : joi.boolean().optional(),
                Message             : joi.string().max(255).optional(), 
                IsActive            : joi.boolean().optional(),
                StartTime           : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).required(),
                EndTime             : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).required(),
            });
            const records : BusinessNodeHourCreateModel[] = [];
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
                businessNodeId                     : joi.string().max(255).optional(),
                type                               : joi.string().max(255).optional(),
                day                                : joi.string().max(255).optional(),
                date                               : joi.date().optional(),
                isOpen                             : joi.boolean().optional(),
                message                            : joi.string().max(255).optional(),
                startTime                          : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                endTime                            : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                isActive                           : joi.boolean().optional(),
                isDeleted                          : joi.boolean().optional(),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId                     : joi.string().max(255).optional(),
                Type                               : joi.string().max(255).optional(),
                Day                                : joi.number().optional(),
                Date                               : joi.date().optional(),
                IsOpen                             : joi.boolean().optional(),
                Message                            : joi.string().max(255).optional(),
                StartTime                          : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                EndTime                            : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                IsActive                           : joi.boolean().optional(),
                IsDeleted                          : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateMultipleRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId                     : joi.string().max(255).optional(),
                Type                               : joi.string().max(255).optional(),
                Day                                : joi.number().optional(),
                Date                               : joi.date().optional(),
                IsOpen                             : joi.boolean().optional(),
                Message                            : joi.string().max(255).optional(),
                StartTime                          : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                EndTime                            : joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).optional(),
                IsActive                           : joi.boolean().optional(),
                IsDeleted                          : joi.boolean().optional(),
            });
            const records : BusinessNodeHourCreateModel[] = [];
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