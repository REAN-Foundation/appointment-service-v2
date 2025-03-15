import { ApiError } from "../../common/api.error";
import { BusinessUserCreateModel, BusinessUserUpdateModel, BusinessUserDto, BusinessUserSearchFilters } from "../../domain.types/business.user/business.user.domain.types";
import { BusinessUsersValidator as validator } from '../business.user/business.user.validator';
import { BusinessUserService } from '../../database/repository.services/business.user.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { BusinessUserHourService } from "../../database/repository.services/business.user.hour.service";

export class BusinessUserControllerDelegate {

    //#region member variables and constructors
    prisma = PrismaClientInit.instance().prisma();
    public static instance:BusinessNodeHourService=null;

    _service: BusinessUserService = null;

    _businessNodeService: BusinessNodeService = null;

    _businessUserHourService: BusinessUserHourService = null;

    constructor() {
        this._service = new BusinessUserService();
        this._businessNodeService = new BusinessNodeService();
        this._businessUserHourService = new BusinessUserHourService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        const { userCreateModel } =
            await this.getValidUserCreateModel(requestBody);
        const record: BusinessUserDto = await this._service.create(userCreateModel);
        if (record === null) {
            throw new ApiError('Unable to create business user!', 400);
        }
        var defaultUserHours = await this._businessUserHourService.createDefaultHoursForUser(record);
        const businessUser = {
            UserRecords      : record,
            DefaultUserHours : defaultUserHours,
        }
        return businessUser;
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business user with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessUserSearchFilters = this.getSearchFilters(query);
        var searchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };
    
    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business user with id ' + id.toString() + ' cannot be found!');
        }

        if (Helper.hasProperty(requestBody, 'Mobile')) {
            var mobile = requestBody.Mobile;
            var otherEntity = await this._service.getBusinessUserWithMobile(mobile);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business user with mobile ${requestBody.Mobile} already exists!`);
            }
        }

        if (Helper.hasProperty(requestBody, 'Email')) {
            var email = requestBody.Email;
            var otherEntity = await this._service.getBusinessUserWithEmail(email);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business user with email ${requestBody.Email} already exists!`);
            }
        }

        const updateModel: BusinessUserUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business user!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business user with id ' + id.toString() + ' cannot be found!');
        }
        const businessuserDeleted = await this._service.delete(id);
        return {
            Deleted: businessuserDeleted
        };
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getUserCreateModel = (requestBody): BusinessUserCreateModel => {

        const dob = requestBody.BirthDate ? Date.parse(requestBody.BirthDate) : null;

        return {
            BusinessNodeId                 : requestBody.BusinessNodeId,
            FirstName                      : requestBody.FirstName,
            LastName                       : requestBody.LastName,
            Prefix                         : requestBody.Prefix,
            Mobile                         : requestBody.Mobile,
            Email                          : requestBody.Email,
            Gender                         : requestBody.Gender,
            DisplayPicture                 : requestBody.DisplayPicture? requestBody.DisplayPicture : null,
            AboutMe                        : requestBody.AboutMe ? requestBody.AboutMe : null,
            Qualification                  : requestBody.Qualification ? requestBody.Qualification : null,
            Experience                     : requestBody.Experience ? requestBody.Experience : null,
            OverallRating                  : null,
            Dob                            : new Date(dob),
            IsAvailableForEmergency        : requestBody.IsAvailableForEmergency ? requestBody.IsAvailableForEmergency : true,
            Facebook                       : requestBody.Facebook? requestBody.Facebook : null,
            Linkedin                       : requestBody.Linkedin? requestBody.Linkedin : null,
            Twitter                        : requestBody.Twitter? requestBody.Twitter : null,
            Instagram                      : requestBody.Instagram ? requestBody.Instagram : null,
            Yelp                           : requestBody.Yelp? requestBody.Yelp : null,
            IsActive                       : true
        };
    };

    getValidUserCreateModel = async (requestBody) => {

        const userService = new BusinessUserService();

        var userWithPhone = await userService.getBusinessUserWithMobile( requestBody.Mobile);
        if (userWithPhone) {
            ErrorHandler.throwDuplicateUserError(`Business user with phone ${requestBody.Mobile} already exists!`);
        }
        var userWithEmail = await userService.getBusinessUserWithEmail(requestBody.Email);
        if (userWithEmail) {
            ErrorHandler.throwDuplicateUserError(`Business user with email ${requestBody.Email} already exists!`);
        }
        var userCreateModel: BusinessUserCreateModel = await this.getUserCreateModel(requestBody);
        return { userCreateModel};
    };

    getSearchFilters = (query) => {
        
        var filters = {};

        var businessNodeId = (typeof query.businessNodeId != 'undefined') ? query.businessNodeId : null;
        if (businessNodeId != null) {
            filters['BusinessNodeId'] = businessNodeId;
        } 
        var businessId = (typeof query.businessId != 'undefined') ? query.businessId : null;
        if (businessId != null) {
            filters['BusinessId'] = businessId;
        } 
        var businessServiceId = (typeof query.businessServiceId != 'undefined') ? query.businessServiceId : null;
        if (businessServiceId != null) {
            filters['BusinessServiceId'] = businessServiceId;
        } 
        var name = (typeof query.name != 'undefined') ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : null;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = itemsPerPage;
        }
        var order = query.order ? query.order : null;
        if (order != null) {
            filters['Order'] = order;
        }
        return filters;
    };

    getUpdateModel = (requestBody): BusinessUserUpdateModel => {

        let updateModel: BusinessUserUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'FirstName')) {
            updateModel.FirstName = requestBody.FirstName;
        }
        if (Helper.hasProperty(requestBody, 'LastName')) {
            updateModel.LastName = requestBody.LastName;
        }
        if (Helper.hasProperty(requestBody, 'Prefix')) {
            updateModel.Prefix = requestBody.Prefix;
        }
        if (Helper.hasProperty(requestBody, 'Mobile')) {
            updateModel.Mobile = requestBody.Mobile;
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            updateModel.Email = requestBody.Email;
        }
        if (Helper.hasProperty(requestBody, 'DisplayPicture')) {
            updateModel.DisplayPicture = requestBody.DisplayPicture;
        }
        if (Helper.hasProperty(requestBody, 'AboutMe')) {
            updateModel.AboutMe = requestBody.AboutMe;
        }
        if (Helper.hasProperty(requestBody, 'Qualification')) {
            updateModel.Qualification = requestBody.Qualification;
        }
        if (Helper.hasProperty(requestBody, 'Experience')) {
            updateModel.Experience = requestBody.Experience;
        }
        if (Helper.hasProperty(requestBody, 'Dob')) {
            updateModel.Dob = requestBody.Dob;
        }
        if (Helper.hasProperty(requestBody, 'Gender')) {
            updateModel.Gender = requestBody.Gender;
        }
        if (Helper.hasProperty(requestBody, 'IsAvailableForEmergency')) {
            updateModel.IsAvailableForEmergency = requestBody.IsAvailableForEmergency;
        }
        if (Helper.hasProperty(requestBody, 'Facebook')) {
            updateModel.Facebook = requestBody.Facebook;
        }
        if (Helper.hasProperty(requestBody, 'Linkedin')) {
            updateModel.Linkedin = requestBody.Linkedin;
        }
        if (Helper.hasProperty(requestBody, 'Twitter')) {
            updateModel.Twitter = requestBody.Twitter;
        }
        if (Helper.hasProperty(requestBody, 'Instagram')) {
            updateModel.Instagram = requestBody.Instagram;
        }
        if (Helper.hasProperty(requestBody, 'Yelp')) {
            updateModel.Yelp = requestBody.Yelp;
        }
        if (Helper.hasProperty(requestBody, 'IsActive')) {
            updateModel.IsActive = requestBody.IsActive;
        }
        return updateModel;
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                             : record.id,
            BusinessNodeId                 : record.BusinessNodeId,
            FirstName                      : record.FirstName,
            LastName                       : record.LastName,
            Prefix                         : record.Prefix,
            Mobile                         : record.Mobile,
            Email                          : record.Email,
            DisplayPicture                 : record.DisplayPicture,
            AboutMe                        : record.AboutMe,
            Qualification                  : record.Qualification,
            Experience                     : record.Experience,
            OverallRating                  : record.OverallRating,
            Dob                            : record.Dob,
            Gender                         : record.Gender,
            IsAvailableForEmergency        : record.IsAvailableForEmergency,
            Facebook                       : record.Facebook,
            Linkedin                       : record.Linkedin,
            Twitter                        : record.Twitter,
            Instagram                      : record.Instagram,
            Yelp                           : record.Yelp,
            IsActive                       : record.IsActive,
            CreatedAt                      : record.CreatedAt,
            UpdatedAt                      : record.UpdatedAt,
            IsDeleted                      : record.IsDeleted,
            DeletedAt                      : record.DeletedAt
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                             : record.id,
            BusinessNodeId                 : record.BusinessNodeId,
            FirstName                      : record.FirstName,
            LastName                       : record.LastName,
            Prefix                         : record.Prefix,
            Mobile                         : record.Mobile,
            Email                          : record.Email,
            DisplayPicture                 : record.DisplayPicture,
            AboutMe                        : record.AboutMe,
            Qualification                  : record.Qualification,
            Experience                     : record.Experience,
            OverallRating                  : record.OverallRating,
            Dob                            : record.Dob,
            Gender                         : record.Gender,
            IsAvailableForEmergency        : record.IsAvailableForEmergency,
            Facebook                       : record.Facebook,
            Linkedin                       : record.Linkedin,
            Twitter                        : record.Twitter,
            Instagram                      : record.Instagram,
            Yelp                           : record.Yelp,
            IsActive                       : record.IsActive,
            CreatedAt                      : record.CreatedAt,
            UpdatedAt                      : record.UpdatedAt,
            IsDeleted                      : record.IsDeleted,
            DeletedAt                      : record.DeletedAt   
        };
    };

}