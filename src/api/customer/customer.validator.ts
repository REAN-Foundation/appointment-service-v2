import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CustomerValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Prefix          : joi.string().max(16).optional(),
                FirstName       : joi.string().max(64).optional(),
                LastName        : joi.string().max(64).optional(),
                Mobile          : joi.string().max(16).min(6).required(),
                Email           : joi.string().max(256).optional(),
                Gender          : joi.string().valid("Male", "Female", "M", "F", "Other").optional(),
                BirthDate       : joi.date().optional(),
                DisplayPicture  : joi.string().optional(),
                Address         : joi.string().optional(),
                InAppUser       : joi.boolean().required(),
                IsActive        : joi.boolean().required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                firstName    : joi.string().max(256).optional(),
                lastName     : joi.string().max(256).optional(),
                mobile       : joi.string().max(16).min(6).optional(),
                email        : joi.string().max(256).optional(),
                name         : joi.string().max(256).optional(),
                pageIndex    : joi.number().min(0).optional(),
                itemsPerPage : joi.number().min(1).optional(),
                orderBy      : joi.string().max(256).optional(),
                order        : joi.string().valid('ascending', 'descending')
                    .optional()
                    .error(()=> new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Prefix          : joi.string().max(16).optional(),
                FirstName       : joi.string().max(64).optional(),
                LastName        : joi.string().max(64).optional(),
                Mobile          : joi.string().max(16).min(6).optional(),
                Email           : joi.string().max(256).optional(),
                Gender          : joi.string().valid("Male", "Female", "M", "F", "Other").optional(),
                BirthDate       : joi.date().optional(),
                DisplayPicture  : joi.string().optional(),
                Address         : joi.string().max(256).optional(),
                InAppUser       : joi.boolean().optional(),
                IsActive        : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }; 
}
