import { ApiError } from "../../common/api.error";
import { UserMessageCreateModel, UserMessageUpdateModel,
    UserMessageDto, UserMessageSearchFilters, UserMessageSearchResults } 
        from "../../domain.types/user.message/user.message.domain.types";
import { UserMessageService } from "../../database/repository.services/user.message.service";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { CustomerService } from "../../database/repository.services/customer.service";
import { UserMessageValidator as validator } from './user.message.validator';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import { TimeHelper as th } from "../../common/time.helper";

export class UserMessageControllerDelegate {

    //#region member variables and constructors

    _service : UserMessageService = null;

    _businessNodeService : BusinessNodeService = null;

    _customerService : CustomerService =null;

    constructor() {
        this._service = new UserMessageService();
        this._businessNodeService = new BusinessNodeService();
        this._customerService = new CustomerService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        var businessNodeId = requestBody.BusinessNodeId;
        const businessNode = await this._businessNodeService.getById(businessNodeId);
        if (!businessNode) {
            ErrorHandler.throwNotFoundError(`Business node id not found!`);
        }
        var customerId = requestBody.CustomerId;
        const customer = await this._customerService.getById(customerId);
        if (!customer) {
            ErrorHandler.throwNotFoundError(`Customer id not found!`);
        }
        var createModel: UserMessageCreateModel = this.getCreateModel(requestBody);
        const record: UserMessageDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create user messages!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User message with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: UserMessageSearchFilters = this.getSearchFilters(query);
        var searchResults: UserMessageSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User message with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: UserMessageUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update user message!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('User message with id ' + id.toString() + ' cannot be found!');
        }
        const userMessageDeleted = await this._service.delete(id);
        return {
            Deleted: userMessageDeleted
        };
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): UserMessageCreateModel => {
        return {
            Body            : requestBody.Body,
            BusinessNodeId  : requestBody.BusinessNodeId,
            CustomerId      : requestBody.CustomerId,
            Type            : requestBody.Type,
            TypeId          : requestBody.TypeId,
            Error           : requestBody.Error ? requestBody.Error : null,
            IsSent          : requestBody.IsSent ? requestBody.IsSent : true,
            MessageId       : requestBody.MessageId ? requestBody.MessageId : null,
            SentOn          : requestBody.SentOn ? th.getDate(requestBody.SentOn) : null,
            IsActive        : requestBody.IsActive ? requestBody.IsActive : true,
            IsDeleted       : requestBody.IsDeleted ? requestBody.IsDeleted : false,
            DeletedAt       : requestBody.DeletedAt ? th.getDate(requestBody.DeletedAt) : null
        }
    };

    getSearchFilters = (query): UserMessageSearchFilters => {
        var filters = {};

            var businessNodeId= query.businessNodeId ? query.businessNodeId : null;
            if (businessNodeId != null) {
                filters['BusinessNodeId'] = businessNodeId;
            }
            var customerId= query.customerId ? query.customerId : null;
            if (customerId != null) {
                filters['CustomerId'] = customerId;
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

    getUpdateModel = (requestBody): UserMessageUpdateModel => {

        let updateModel: UserMessageUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'CustomerId')) {
            updateModel.CustomerId = requestBody.CustomerId;
        }
        if (Helper.hasProperty(requestBody, 'IsActive')) {
            updateModel.IsActive = requestBody.IsActive;
        }
        if (Helper.hasProperty(requestBody, 'Body')) {
            updateModel.Body = requestBody.Body;
        }
        if (Helper.hasProperty(requestBody, 'Type')) {
            updateModel.Type = requestBody.Type;
        }
        if (Helper.hasProperty(requestBody, 'TypeId')) {
            updateModel.TypeId = requestBody.TypeId;
        }
        if (Helper.hasProperty(requestBody, 'MessageId')) {
            updateModel.MessageId = requestBody.MessageId;
        }
        if (Helper.hasProperty(requestBody, 'IsSent')) {
            updateModel.IsSent = requestBody.IsSent;
        }
        if (Helper.hasProperty(requestBody, 'SentOn')) {
            updateModel.SentOn = th.getDate(requestBody.SentOn);
        }
        if (Helper.hasProperty(requestBody, 'Error')) {
            updateModel.Error = requestBody.Error;
        }
        if (Helper.hasProperty(requestBody, 'DeletedAt')) {
            updateModel.DeletedAt = th.getDate(requestBody.DeletedAt);
        }
        return updateModel;
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            Body                : record.Body,
            BusinessNodeId      : record.BusinessNodeId,
            CustomerId          : record.CustomerId,
            Error               : record.Error,
            IsActive            : record.IsActive,
            IsSent              : record.IsSent,
            MessageId           : record.MessageId,
            SentOn              : record.SentOn,
            Type                : record.Type,
            TypeId              : record.TypeId,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            IsDeleted           : record.IsDeleted,
            DeletedAt           : record.DeletedAt,      
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
		    id                  : record.id,
            Body                : record.Body,
            BusinessNodeId      : record.BusinessNodeId,
            CustomerId          : record.CustomerId,
            Error               : record.Error,
            IsActive            : record.IsActive,
            IsSent              : record.IsSent,
            MessageId           : record.MessageId,
            SentOn              : record.SentOn,
            Type                : record.Type,
            TypeId              : record.TypeId,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            IsDeleted           : record.IsDeleted,
            DeletedAt           : record.DeletedAt,  
        }
    };
}