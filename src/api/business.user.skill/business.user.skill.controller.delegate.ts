import { ApiError } from "../../common/api.error";
import { BusinessUserSkillCreateModel, BusinessUserSkillUpdateModel,
         BusinessUserSkillDto,BusinessUserSkillSearchFilters, BusinessUserSkillSearchResults } 
         from "../../domain.types/business/business.user.skill.domain.types";
import { BusinessUserSkillValidator as validator } from './business.user.skill.validator';
import { BusinessUserSkillService } from '../../database/repository.services/business.user.skill.service';
import { BusinessSkillService } from '../../database/repository.services/business.skill.service';
import { BusinessUserService } from '../../database/repository.services/business.user.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";

export class BusinessUserSkillControllerDelegate {

    //#region member variables and constructors

    _service: BusinessUserSkillService = null;

    _businessUserService: BusinessUserService = null;

    _businessSkillService: BusinessSkillService = null;
    constructor() {
        this._service = new BusinessUserSkillService();
        this._businessUserService = new BusinessUserService();
        this._businessSkillService = new BusinessSkillService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        const createModel: BusinessUserSkillCreateModel = await this.getValidCreateModel(requestBody);
        const record: BusinessUserSkillDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business user skills!', 400);
        }
        return this.getEnrichedDto(record);
    };

    createMultiple = async (requestBody: any) => {
        await validator.validateCreateManyRequest(requestBody);
        var createModels = await this.getValidCreateManyModel(requestBody);
        {
            for (const createModel of createModels)
            {
                var businessSkillId = createModel.BusinessSkillId;
                const businessSkill = await this._businessSkillService.getById(businessSkillId);
                if (!businessSkill) {
                    ErrorHandler.throwNotFoundError(`Business skill id not found!`);
                }
	            var businessUserId = createModel.BusinessUserId;
                const businessUser = await this._businessUserService.getById(businessUserId);
                if (!businessUser) {
                    ErrorHandler.throwNotFoundError(`Business user id not found!`);
                }
            }
        const records = await this._service.createMany(createModels);
        if (records === null) {
            throw new ApiError('Unable to create business user skills!', 400);
        }
        return records;
        }
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business user skill with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessUserSkillSearchFilters = this.getSearchFilters(query);
        var searchResults: BusinessUserSkillSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business user skill with id ' + id.toString() + ' cannot be found!');
        }
        if (Helper.hasProperty(requestBody, 'BusinessUserId')) {
            var businessUserId = requestBody.BusinessUserId;
            var businessUser = await this._businessUserService.getById(businessUserId);
            if(!businessUser) {
                ErrorHandler.throwNotFoundError('Business user id ' + businessUserId.toString() + ' cannot be found!');
            }
        }
        if(Helper.hasProperty(requestBody, 'BusinessSkillId')) {
            var businessSkillId = requestBody.BusinessSkillId;
            var businessSkill = await this._businessSkillService.getById(businessSkillId);
            if(!businessSkill) {
                ErrorHandler.throwNotFoundError('Business skill id ' + businessSkillId.toString() + ' cannot be found!');
            }
        }
        const updateModel: BusinessUserSkillUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business user skill!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business user skill with id ' + id.toString() + ' cannot be found!');
        }
        const businessUserSkillDeleted = await this._service.delete(id);
        return {
            Deleted: businessUserSkillDeleted
        };
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessUserSkillCreateModel => {
        return {
            BusinessUserId	    : requestBody.BusinessUserId,
            BusinessSkillId     : requestBody.BusinessSkillId,
            IsActive            : requestBody.IsActive ? requestBody.IsActive : true
        };
    };

    getValidCreateModel = async (requestBody) => {

        const existing = await this._service.exists(requestBody.BusinessSkillId, requestBody.BusinessUserId);
        if(existing){
            ErrorHandler.throwNotFoundError(`Business user skill with BusinessSkillId = ${requestBody.BusinessSkillId} and BusinessUserId = ${requestBody.BusinessUserId} already exists!`);
        }
        var createModel : BusinessUserSkillCreateModel = await this.getCreateModel(requestBody);
        return createModel;
    };

    getCreateManyModel = (requestBody) => {
        const records : BusinessUserSkillCreateModel[] = [];
        for (const s of requestBody) {
            const record = {
                BusinessUserId     	: s.BusinessUserId,
                BusinessSkillId 	: s.BusinessSkillId,
                IsActive          	: s.IsActive ? s.IsActive : true
            };  
            records.push(record);
        }
        return records;
    };

    getValidCreateManyModel = async (requestBody) => {
        for (const s of requestBody) {
            const existing = await this._service.exists(s.BusinessSkillId, s.BusinessUserId);
            if(existing){
                ErrorHandler.throwNotFoundError(`Business user skill with BusinessSkillId = ${s.BusinessSkillId} and BusinessUserId = ${s.BusinessUserId} already exists!`);
            }
            var createModels = await this.getCreateManyModel(requestBody);
        }
        return createModels;
    };

    getSearchFilters = (query) => {
        var filters = {};

        var businessUserId= query.businessUserId ? query.businessUserId : null;
        if (businessUserId != null) {
            filters['BusinessUserId'] = businessUserId;
        }
        var businessSkillId= query.businessSkillId ? query.businessSkillId : null;
        if (businessSkillId != null) {
            filters['BusinessSkillId'] = businessSkillId;
        }
        var isActive= query.isActive ? query.isActive : null;
        if (isActive != null) {
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

    getUpdateModel = (requestBody): BusinessUserSkillUpdateModel => {

        let updateModel: BusinessUserSkillUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessUserId')) {
            updateModel.BusinessUserId = requestBody.BusinessUserId;
        }
        if (Helper.hasProperty(requestBody, 'BusinessSkillId')) {
            updateModel.BusinessSkillId = requestBody.BusinessSkillId;
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
		    id		        : record.id,
		    BusinessUserId	: record.BusinessUserId,
		    BusinessSkillId	: record.BusinessSkillId,
        	IsActive        : record.IsActive
        }
    };

    getEnrichedDtos = (records) => {
        if (records == null) {
            return null;
        }
        for (const r of records){
            const record = {
                id                  : r.id,
                BusinessUserId      : r.BusinessUserId,
                BusinessSkillId     : r.BusinessSkillId,
                IsActive            : r.IsActive   
            }
            records.push(record);
        }
        return records;
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
		    id		        : record.id,
		    BusinessUserId	: record.BusinessUserId,
		    BusinessSkillId	: record.BusinessSkillId,
            IsActive        : record.IsActive
        }
    };
}
