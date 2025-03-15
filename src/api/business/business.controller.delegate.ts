import { ApiError } from "../../common/api.error";
import { BusinessCreateModel, BusinessUpdateModel,
        BusinessSearchFilters, BusinessSearchResults } 
        from "../../domain.types/business/business.domain.types";
import { BusinessValidator as validator } from './business.validator';
import { BusinessService } from '../../database/repository.services/business.service';
import { BusinessNodeService } from '../../database/repository.services/business.node.service';
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import * as apikeyGenerator from 'uuid-apikey';

export class BusinessControllerDelegate {

    //#region member variables and constructors

    _service: BusinessService = null;

    _businessNodeService: BusinessNodeService = null;

    _businessNodeHourService : BusinessNodeHourService = null;

    constructor() {
        this._service = new BusinessService();
        this._businessNodeService = new BusinessNodeService();
        this._businessNodeHourService = new BusinessNodeHourService(); 
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        
        var businessWithEmail = await this._service.getBusinessWithEmail(requestBody.Email);
        if (businessWithEmail) {
            ErrorHandler.throwDuplicateUserError(`Business with email ${requestBody.Email} already exists!`);
        }
        var businessWithMobile = await this._service.getBusinessWithMobile(requestBody.Mobile);
        if (businessWithMobile) {
            ErrorHandler.throwDuplicateUserError(`Business with mobile ${requestBody.Mobile} already exists!`);
        }
        var createModel: BusinessCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create Business!', 400);
        }
        var defaultBusinessNode = await this._businessNodeService.createDefaultNodeForBusiness(record);
        var defaultServiceHours = await this._businessNodeHourService.createDefaultHoursForNode(defaultBusinessNode);
        const business = {
            BusinessRecords     : record,
            DefaultBusinessNode : defaultBusinessNode,
            DefaultServiceHours : defaultServiceHours,
        }
        return business;
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessSearchFilters = this.getSearchFilters(query);
        var searchResults: BusinessSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business with id ' + id.toString() + ' cannot be found!');
        }
        if (Helper.hasProperty(requestBody, 'Mobile')) {
            var mobile = requestBody.Mobile;
            var otherEntity = await this._service.getBusinessWithMobile(mobile);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business with mobile ${requestBody.Mobile} already exists!`);
            }
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            var email = requestBody.Email;
            var otherEntity = await this._service.getBusinessWithEmail(email);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business with email ${requestBody.Email} already exists!`);
            }
        }
        const updateModel: BusinessUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update Business!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business with id ' + id.toString() + ' cannot be found!');
        }
        const businessDeleted = await this._service.delete(id);
        return {
            Deleted: businessDeleted
        };
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessCreateModel => {
        return {
            ExternalId          : requestBody.ExternalId,
            Name                : requestBody.Name,
            Mobile              : requestBody.Mobile,
            Email               : requestBody.Email,
            AboutUs             : requestBody.AboutUs? requestBody.AboutUs: null,
            Logo                : requestBody.Logo ? requestBody.Logo : null,
            DisplayPicture      : requestBody.DisplayPicture? requestBody.DisplayPicture: '',
            OverallRating       : requestBody.OverallRating? requestBody.OverallRating: null,
            Address             : requestBody.Address ? requestBody.Address : null,
            ApiKey              : requestBody.ApiKey ? requestBody.ApiKey : apikeyGenerator.default.create().apiKey,
            Facebook            : requestBody.Facebook ? requestBody.Facebook : null,
            Linkedin            : requestBody.Linkedin ? requestBody.Linkedin : null,
            Twitter             : requestBody.Twitter ? requestBody.Twitter : null,
            Instagram           : requestBody.Instagram ? requestBody.Instagram : null,
            Yelp                : requestBody.Yelp ? requestBody.Yelp : null,
            IsActive            : true,
           
        };
    };

    getSearchFilters = (query) => {
        var filters = {};
        
        var isActive = query.isActive ? query.isActive : true;
        if (isActive == true) {
            filters['IsActive'] = isActive;
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

    getUpdateModel = (requestBody): BusinessUpdateModel => {
    let updateModel: BusinessUpdateModel = {};

    if (Helper.hasProperty(requestBody, 'ExternalId')) {
        updateModel.ExternalId = requestBody.ExternalId;
    }
    if (Helper.hasProperty(requestBody, 'Name')) {
        updateModel.Name = requestBody.Name;
    }
    if (Helper.hasProperty(requestBody, 'Mobile')) {
        updateModel.Mobile = requestBody.Mobile;
    }
    if (Helper.hasProperty(requestBody, 'Email')) {
        updateModel.Email = requestBody.Email;
    }
    if (Helper.hasProperty(requestBody, 'AboutUs')) {
        updateModel.AboutUs = requestBody.AboutUs
    }
    if (Helper.hasProperty(requestBody, 'Logo')) {
        updateModel.Logo = requestBody.Logo
    }
    if (Helper.hasProperty(requestBody, 'ApiKey')) {
        updateModel.ApiKey = requestBody.ApiKey;
    }
    if (Helper.hasProperty(requestBody, 'DisplayPicture')) {
        updateModel.DisplayPicture = requestBody.DisplayPicture
    }
    if (Helper.hasProperty(requestBody, 'Address')) {
        updateModel.Address = requestBody.Address
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

    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            ExternalId          : record.ExternalId,
            Name                : record.Name,
            Email               : record.Email,
            Mobile              : record.Mobile,
            AboutUs             : record.AboutUs,
            Logo                : record.Logo,
            DisplayPicture      : record.DisplayPicture,
            OverallRating       : record.OverallRating,
            Address             : record.Address,
            ApiKey              : record.ApiKey,
            Facebook            : record.Facebook,
            Linkedin            : record.Linkedin,
            Twitter             : record.Twitter,
            Instagram           : record.Instagram,
            Yelp                : record.Yelp,
            IsActive            : record.IsActive,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            IsDeleted           : record.IsDeleted,
            DeletedAt           : record.DeletedAt 
        };
    };

    //This function returns a response DTO which has only public parameters

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            ExternalId          : record.ExternalId,
            Name                : record.Name,
            Email               : record.Email,
            Mobile              : record.Mobile,
            AboutUs             : record.AboutUs,
            Logo                : record.Logo,
            DisplayPicture      : record.DisplayPicture,
            OverallRating       : record.OverallRating,
            Address             : record.Address,
            ApiKey              : record.ApiKey,
            Facebook            : record.Facebook,
            Linkedin            : record.Linkedin,
            Twitter             : record.Twitter,
            Instagram           : record.Instagram,
            Yelp                : record.Yelp,
            IsActive            : record.IsActive,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            IsDeleted           : record.IsDeleted,
            DeletedAt           : record.DeletedAt
        };
    };

}
