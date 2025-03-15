import * as joi from 'joi';
import {
    ErrorHandler
} from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserRoleValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                UserId: joi.string().guid({
                    version: ['uuidv4']
                }).optional(),
                RoleId: joi.string().max(16).required()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                UserId: joi.string().guid({
                    version: ['uuidv4']
                }).optional(),
                RoleId: joi.string().max(16).required()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                userId: joi.string().guid({
                    version: ['uuidv4']
                }).optional(),
                roleId: joi.string().max(16).optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}