import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessNodeValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessId               : joi.string().guid({version : ['uuidv4'] }).required(),
                Name                     : joi.string().max(255).required(),
                Mobile                   : joi.string().max(255).required(),
                Email                    : joi.string().email().required(),
                DisplayPicture           : joi.string().optional(),
                Address                  : joi.string().max(255).required(),
                Longitude                : joi.string().optional(),              
                Lattitude                : joi.string().optional(),             
                OverallRating            : joi.number().optional(),
                TimeZone                 : joi.string().optional(),         
                AllowWalkinAppointments  : joi.boolean().optional(),
                AllowFutureBookingFor    : joi.string().max(255).optional(),
                IsActive                 : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                businessId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                name                     : joi.string().max(255).optional(),
               
                isActive                 : joi.boolean().optional(),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                Name                     : joi.string().max(255).optional(),
                Mobile                   : joi.string().max(255).optional(),
                Email                    : joi.string().email().optional(),
                DisplayPicture           : joi.string().optional(),
                Address                  : joi.string().max(255).optional(),
                Longitude                : joi.string().optional(),             
                Lattitude                : joi.string().optional(),            
                OverallRating            : joi.number().optional(),
                TimeZone                 : joi.string().optional(),      
                AllowWalkinAppointments  : joi.boolean().optional(),
                AllowFutureBookingFor    : joi.string().max(255).optional(),
                IsActive                 : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
   
}


