import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessUsersValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId                     : joi.string().guid({version : ['uuidv4'] }).required(),
                FirstName                          : joi.string().max(255).required(),
                LastName                           : joi.string().max(255).required(),
                Prefix                             : joi.string().max(255).required(),
                Mobile                             : joi.string().max(255).required(),
                Email                              : joi.string().email().max(255).optional(),
                DisplayPicture                     : joi.string().optional(),
                AboutMe                            : joi.string().optional(),
                Qualification                      : joi.string().optional(),
                Experience                         : joi.string().max(255).optional(),
                OverallRating                      : joi.number().optional(),
                Dob                                : joi.date().optional(),
                Gender                             : joi.string().valid("Male", "Female", "Other", "M", "F").optional(),
                IsAvailableForEmergency            : joi.boolean().optional(),
                Facebook                           : joi.string().max(255).optional(),
                Linkedin                           : joi.string().max(255).optional(),
                Twitter                            : joi.string().max(255).optional(),
                Instagram                          : joi.string().max(255).optional(),
                Yelp                               : joi.string().max(255).optional(),
                IsActive                           : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                businessNodeId                  : joi.string().guid({version : ['uuidv4'] }).optional(),
                businessId                      : joi.string().guid({version : ['uuidv4'] }).optional(),
                businessServiceId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                name                            : joi.string().max(255).optional(),
            });
            return await schema.validateAsync(query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId                     : joi.string().guid({version : ['uuidv4'] }).optional(),
                FirstName                          : joi.string().max(255).optional(),
                LastName                           : joi.string().max(255).optional(),
                Prefix                             : joi.string().max(255).optional(),
                Mobile                             : joi.string().max(255).optional(),
                Email                              : joi.string().email().max(255).optional(),
                DisplayPicture                     : joi.string().optional(),
                AboutMe                            : joi.string().max(255).optional(),
                Qualification                      : joi.string().max(255).optional(),
                Experience                         : joi.string().optional(),              
                OverallRating                      : joi.number().optional(),
                Dob                                : joi.date().optional(),
                Gender                             : joi.string().valid("Male", "Female", "Other").optional(),
                IsAvailableForEmergency            : joi.boolean().optional(),
                Facebook                           : joi.string().max(255).optional(),
                Linkedin                           : joi.string().max(255).optional(),
                Twitter                            : joi.string().max(255).optional(),
                Instagram                          : joi.string().max(255).optional(),
                Yelp                               : joi.string().max(255).optional(),
                IsActive                           : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }
}