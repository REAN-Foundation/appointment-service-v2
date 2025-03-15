import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessSkillValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
	            BusinessNodeId          : joi.string().guid({version : ['uuidv4'] }).required(),
                Description             : joi.string().optional(),
                Name                    : joi.string().max(255).required(),
                DisplayPicture          : joi.string().optional(),
                IsActive                : joi.boolean().required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                isActive                : joi.boolean().optional(),
	            businessNodeId	        : joi.string().max(255).optional(),
	            name	                : joi.string().optional(),
            });
            return await schema.validateAsync(query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

 static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
	            BusinessNodeId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                Description             : joi.string().optional(),
                Name                    : joi.string().max(255).optional(),
                DisplayPicture          : joi.string().optional(),
                IsActive                : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
