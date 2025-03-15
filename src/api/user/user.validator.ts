import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
             //   RoleId      : joi.string().max(16).required(),
                UserName    : joi.string().max(16).optional(),
                Prefix      : joi.string().max(16).optional(),
                FirstName   : joi.string().max(64).optional(),
                LastName    : joi.string().max(64).optional(),
                CountryCode : joi.string().max(10).optional(),
                Phone       : joi.string().max(16).min(6).required(),
                Email       : joi.string().max(256).required(),
                Gender      : joi.string().valid("Male", "Female", "Other").required(),
                BirthDate   : joi.string().optional(),
                Password    : joi.string().max(512).required(),
              
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                roleId      : joi.string().max(16).optional(),
                prefix      : joi.string().max(16).optional(),
                firstName   : joi.string().max(64).optional(),
                lastName    : joi.string().max(64).optional(),
                phone       : joi.string().max(16).min(6).optional(),
                email       : joi.string().max(256).optional(),
                gender      : joi.string().valid("Male", "Female", "Other").optional(),
                itemsPerPage: joi.number().min(1).optional(),
                orderBy     : joi.string().max(256).optional(),
                order       : joi.string().valid('ascending', 'descending')
                    .optional()
                    .error(()=> new Error("order param: 'ascending' and 'descending' are the only valid values.")),
          
                addedByUserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                lastUpdatedByUserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                // RoleId      : joi.string().max(16).required(),
                UserName    : joi.string().max(16).optional(),
                Prefix      : joi.string().max(16).optional(),
                FirstName   : joi.string().max(64).optional(),
                LastName    : joi.string().max(64).optional(),
                CountryCode : joi.string().max(10).optional(),
                Phone       : joi.string().max(16).min(6).optional(),
                Email       : joi.string().max(256).optional(),
                Gender      : joi.string().valid("Male", "Female", "Other").optional(),
                BirthDate   : joi.string().optional(),
                Password    : joi.string().max(512).optional(),
                // State       : joi.string().max(64).optional(),
                // Country     : joi.string().max(64).optional(),
                // Address     : joi.string().max(256).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validatePasswordChangeRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                CurrentUserId : joi.string().guid({ version: ['uuidv4'] }).required(),
                OldPassword   : joi.string().required(),
                NewPassword   : joi.string().required()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateResetPasswordLinkRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Email : joi.string().email().required()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSetPasswordRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ResetPasswordToken : joi.string().required(),
                Password           : joi.string().required()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateLoginWithPasswordRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                CountryCode : joi.string().max(10).optional(),
                Phone       : joi.string().max(16).min(6).optional(),
                Email       : joi.string().max(256).optional(),
                UserName    : joi.string().max(64).optional(),
                Password    : joi.string().max(512).required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateLoginWithOtpRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                CountryCode : joi.string().max(10).optional(),
                Phone       : joi.string().max(16).min(6).optional(),
                Email       : joi.string().max(256).optional(),
                UserName    : joi.string().max(64).optional(),
                Otp         : joi.string().max(10).required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validatePasswordResetRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Email    : joi.string().max(256).optional(),
                UserName : joi.string().max(64).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSendOtpRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                CountryCode : joi.string().max(10).optional(),
                Phone       : joi.string().max(16).min(6).optional(),
                Email       : joi.string().max(256).optional(),
                UserName    : joi.string().max(64).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
