import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ExternalId      : joi.string().max(255).optional(),
                Name            : joi.string().max(255).required(),
                Mobile          : joi.string().max(255).required(),
                Email           : joi.string().max(255).required(),
                AboutUs         : joi.string().max(255).optional(),
                Logo            : joi.string().optional(),
                DisplayPicture  : joi.string().optional(),
                OverallRating   : joi.number().optional(),
                Address         : joi.string().max(255).optional(),
                ApiKey          : joi.string().max(255).required(),
                Facebook        : joi.string().max(255).optional(),
                Linkedin        : joi.string().max(255).optional(),
                Twitter         : joi.string().max(255).optional(),
                Instagram       : joi.string().max(255).optional(),
                Yelp            : joi.string().max(255).optional(),
                IsActive        : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                isActive        : joi.boolean().optional(),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ExternalId      : joi.string().max(255).optional(),
                Name            : joi.string().max(255).optional(),
                Mobile          : joi.string().max(255).optional(),
                Email           : joi.string().max(255).optional(),
                AboutUs         : joi.string().max(255).optional(),
                Logo            : joi.string().optional(),
                DisplayPicture  : joi.string().optional(),
                Address         : joi.string().max(255).optional(),
                Facebook        : joi.string().max(255).optional(),
                Linkedin        : joi.string().max(255).optional(),
                Twitter         : joi.string().max(255).optional(),
                Instagram       : joi.string().max(255).optional(),
                Yelp            : joi.string().max(255).optional(),
                IsActive        : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
   
}
