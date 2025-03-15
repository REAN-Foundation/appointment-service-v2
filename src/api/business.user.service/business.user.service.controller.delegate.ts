import { ApiError } from "../../common/api.error";
import { BusinessUserServiceService } from '../../database/repository.services/business.user.service.service';
import { BusinessUserServiceCreateModel,
         BusinessUserServiceDto, 
         BusinessUserServiceSearchFilters,
         BusinessUserServiceUpdateModel,
         BusinessUserServiceSearchResults, }
         from "../../domain.types/business/business.user.service.domain.types";
import { BusinessUserServiceValidator as validator } from "./business.user.service.validator";
import { BusinessServiceService } from "../../database/repository.services/business.service.service";
import { BusinessUserService } from "../../database/repository.services/business.user.service";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../../common/error.handler";
import { Helper } from "../../common/helper";

export class BusinessUserServiceControllerDelegate {

    //#region member variables and constructors

    public static instance:BusinessUserServiceService = null;

    _service: BusinessUserServiceService = null;

    _businessUserService: BusinessUserService = null;

    _businessServiceService: BusinessServiceService =null;

    constructor() {
        this._service = new BusinessUserServiceService();

        this._businessUserService = new BusinessUserService();

        this._businessServiceService = new BusinessServiceService();
    }

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);

        var businessUserId = requestBody.BusinessUserId;
        const businessUser = await this._businessUserService.getById(businessUserId);
        if (!businessUser) {
            ErrorHandler.throwNotFoundError(`Business user id not found!`);
        }
        var businessServiceId = requestBody.BusinessServiceId;
        const businessService = await this._businessServiceService.getById(businessServiceId);
        if (!businessService) {
            ErrorHandler.throwNotFoundError(`Business service id not found!`);
        }
        var createModel: BusinessUserServiceCreateModel = await this.getValidCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business user service!', 400);
        }
        return this.getEnrichedDto(record);
    };

    createMultiple = async (requestBody: any) => {
        await validator.validateCreateMultipleRequest(requestBody);
        var createModels = await this.getValidCreateMultipleModel(requestBody);
        for (const createModel of createModels)
        {
            var businessUserId = createModel.BusinessUserId;
            const businessUser = await this._businessUserService.getById(businessUserId);
            if (!businessUser) {
                ErrorHandler.throwNotFoundError(`Business user id not found!`);
            }
            var businessServiceId = createModel.BusinessServiceId;
            const businessService = await this._businessServiceService.getById(businessServiceId);
            if (!businessService) {
                ErrorHandler.throwNotFoundError(`Business service id not found!`);
            }
        }
        const records = await this._service.createMany(createModels);
        if (records === null) {
            throw new ApiError('Unable to create business user service!', 400);
        }
        return records;  
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business user service with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessUserServiceSearchFilters = this.getSearchFilters(query);
        var searchResults: BusinessUserServiceSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid ,requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError("Business user service with id " + id.toString() + "cannot be found!");
        }
        if (Helper.hasProperty(requestBody, 'BusinessUserId')) {
            var businessUserId = requestBody.BusinessUserId;
            var businessUser = await this._businessUserService.getById(businessUserId);
            if(!businessUser) {
                ErrorHandler.throwNotFoundError('Business user id ' + businessUserId.toString() + ' cannot be found!');
            }
        }
        if(Helper.hasProperty(requestBody, 'BusinessServiceId')) {
            var businessServiceId = requestBody.BusinessServiceId;
            var businessService = await this._businessServiceService.getById(businessServiceId);
            if(!businessService) {
                ErrorHandler.throwNotFoundError('Business service id ' + businessServiceId.toString() + ' cannot be found!');
            }
        }
        const updateModel: BusinessUserServiceUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business user service!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record: BusinessUserServiceDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Busieness user service with id ' + id.toString() + ' cannot be found!');
        }
        const businessUserServiceDeleted = await this._service.delete(id);
        return {
            Deleted : businessUserServiceDeleted
        };
    };

    getCreateModel = (requestBody): BusinessUserServiceCreateModel => {
        return {
            BusinessUserId     : requestBody.BusinessUserId ? requestBody.BusinessUserId : null,
            BusinessServiceId  : requestBody.BusinessServiceId ? requestBody.BusinessServiceId : null,
            IsActive           : requestBody.IsActive ? requestBody.IsActive : true
        };     
    };

    getValidCreateModel = async (requestBody) => {

        const existing = await this._service.exists(requestBody.BusinessUserId, requestBody.BusinessServiceId);
        if(existing) {
            ErrorHandler.throwNotFoundError(`Business user service with BusinessUserId = ${requestBody.BusinessUserId} and BusinessServiceId = ${requestBody.BusinessServiceId} already exists!`);
        }
        var createModel : BusinessUserServiceCreateModel = await this.getCreateModel(requestBody);
        return createModel;
    };

    getCreateMultipleModel = (requestBody) => {
        const records: BusinessUserServiceCreateModel[] = [];
        for (const s of requestBody) {
            const record = {
                BusinessUserId     : s.BusinessUserId,
                BusinessServiceId  : s.BusinessServiceId,
                IsActive           : s.IsActive ? s.IsActive : true
            };  
            records.push(record);
        }
        return records
    };

    getValidCreateMultipleModel = async (requestBody) => {
        for (const s of requestBody) {
        const existing = await this._service.exists(s.BusinessServiceId, s.BusinessUserId);
        if(existing){
            ErrorHandler.throwNotFoundError(`Business user service with BusinessServiceId = ${s.BusinessServiceId} and BusinessUserId = ${s.BusinessUserId} already exists!`);
        }
        var createModels = await this.getCreateMultipleModel(requestBody);
        }
        return createModels;
    };

    getSearchFilters = (query) => {
        var filters = {};
        var businessServiceId = query.businessServiceId ? query.businessServiceId : null;
        if (businessServiceId != null) {
            filters['BusinessServiceId'] = businessServiceId;
        }
        var businessUserId = query.businessUserId ? query.businessUserId : null;
        if (businessUserId != null) {
            filters['BusinessUserId'] = businessUserId;
        }
        var isActive= query.isActive ? query.isActive : null;
        if (isActive != null) {
            filters['IsActive'] = isActive;
        }
        return filters;
    };

    getUpdateModel = (requestBody): BusinessUserServiceUpdateModel => {

        const updateModel: BusinessUserServiceUpdateModel = {};
            if (Helper.hasProperty(requestBody, 'BusinessServiceId')) {
                updateModel.BusinessServiceId = requestBody.BusinessServiceId;
            }
            if (Helper.hasProperty(requestBody, 'BusinessUserId')) {
                updateModel.BusinessUserId = requestBody.BusinessUserId;
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
            id                  : record.id,
            BusinessUserId      : record.BusinessUserId,
            BusinessServiceId   : record.BusinessServiceId,
            IsActive            : record.IsActive,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            DeletedAt           : record.DeletedAt 
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            BusinessUserId      : record.BusinessUserId,
            BusinessServiceId   : record.BusinessServiceId,
            IsActive            : record.IsActive    
        };
    };
}