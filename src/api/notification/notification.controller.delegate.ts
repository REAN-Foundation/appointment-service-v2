import { ApiError } from "../../common/api.error";
import { NotificationCreateModel, NotificationUpdateModel,
        NotificationDto, NotificationSearchFilters, NotificationSearchResults } 
        from "../../domain.types/notification/notification.domain.types";
import { NotificationService } from "../../database/repository.services/notification.service";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { CustomerService } from "../../database/repository.services/customer.service";
import { NotificationValidator as validator } from './notification.validator';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import { TimeHelper as th } from "../../common/time.helper";

export class NotificationControllerDelegate {

    //#region member variables and constructors

    _service : NotificationService = null;

    _businessNodeService : BusinessNodeService = null;

    _customerService : CustomerService =null;

    constructor() {
        this._service = new NotificationService();
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
        var createModel: NotificationCreateModel = this.getCreateModel(requestBody);
        const record: NotificationDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create notification!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Notification with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: NotificationSearchFilters = this.getSearchFilters(query);
        var searchResults: NotificationSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Notification with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: NotificationUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update notifications!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Notification with id ' + id.toString() + ' cannot be found!');
        }
        const notificationDeleted = await this._service.delete(id);
        return {
            Deleted: notificationDeleted
        };
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): NotificationCreateModel => {
        return {
            Body            : requestBody.Body,
            BusinessNodeId  : requestBody.BusinessNodeId,
            CustomerId      : requestBody.CustomerId,
            Type            : requestBody.Type,
            TypeId          : requestBody.TypeId,
            IsRead          : requestBody.IsRead ? requestBody.IsRead : false,
            IsSent          : requestBody.IsSent ? requestBody.IsSent : true,
            Message         : requestBody.Message ? requestBody.Message : null,
            ReadOn          : requestBody.ReadOn ? th.getDate(requestBody.ReadOn) : null,
            SentOn          : requestBody.SentOn ? th.getDate(requestBody.SentOn) : null,
            Title           : requestBody.Title ? requestBody.Title : '',
            IsActive        : requestBody.IsActive ? requestBody.IsActive : true,
            DeletedAt       : requestBody.DeletedAt ? th.getDate(requestBody.DeletedAt) : null,
            IsDeleted       : requestBody.IsDeleted ? requestBody.IsDeleted : false
        }
    };

    getSearchFilters = (query) => {
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

    getUpdateModel = (requestBody): NotificationUpdateModel => {

        let updateModel: NotificationUpdateModel = {};

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
        if (Helper.hasProperty(requestBody, 'Title')) {
            updateModel.Title = requestBody.Title;
        }
        if (Helper.hasProperty(requestBody, 'Message')) {
            updateModel.Message = requestBody.Message;
        }
        if (Helper.hasProperty(requestBody, 'IsSent')) {
            updateModel.IsSent = requestBody.IsSent;
        }
        if (Helper.hasProperty(requestBody, 'SentOn')) {
            updateModel.SentOn = th.getDate(requestBody.SentOn);
        }
        if (Helper.hasProperty(requestBody, 'IsRead')) {
            updateModel.IsRead = requestBody.IsRead;
        }
        if (Helper.hasProperty(requestBody, 'ReadOn')) {
            updateModel.ReadOn = th.getDate(requestBody.ReadOn);
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
            IsActive            : record.IsActive,
            IsRead              : record.IsRead,
            IsSent              : record.IsSent,
            Message             : record.Message,
            ReadOn              : record.ReadOn,
            SentOn              : record.SentOn,
            Title               : record.Title,
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
            IsActive            : record.IsActive,
            IsRead              : record.IsRead,
            IsSent              : record.IsSent,
            Message             : record.Message,
            ReadOn              : record.ReadOn,
            SentOn              : record.SentOn,
            Title               : record.Title,
            Type                : record.Type,
            TypeId              : record.TypeId,     
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            IsDeleted           : record.IsDeleted,
            DeletedAt           : record.DeletedAt,
        }
    };
}
