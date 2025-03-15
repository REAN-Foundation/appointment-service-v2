import { ApiError } from "../../common/api.error";
import { BusinessNodeCustomerCreateModel, BusinessNodeCustomerUpdateModel, 
        BusinessNodeCustomerDto, BusinessNodeCustomerSearchFilters, 
        BusinessNodeCustomerSearchResults  } 
        from "../../domain.types/business.node.customer/business.node.customer.domain.types";
import { BusinessNodeCustomerValidator as validator } from './business.node.customer.validator';
import { BusinessNodeCustomerService } from '../../database/repository.services/business.node.customer.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { CustomerService } from "../../database/repository.services/customer.service";

export class BusinessNodeCustomerControllerDelegate {

    //#region member variables and constructors

    _service: BusinessNodeCustomerService = null;

    _businessNodeService: BusinessNodeService = null;

    _customerService: CustomerService = null;

    constructor() {
        this._service = new BusinessNodeCustomerService();
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
        var createModel: BusinessNodeCustomerCreateModel = this.getCreateModel(requestBody);
        const record: BusinessNodeCustomerDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business node customer!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business node customer with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessNodeCustomerSearchFilters = this.getSearchFilters(query);
        var searchResults : BusinessNodeCustomerSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults; 
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business node customer with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: BusinessNodeCustomerUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business node customer!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business node customer with id ' + id.toString() + ' cannot be found!');
        }
        const nodeCustomerDeleted = await this._service.delete(id);
        return {
            Deleted: nodeCustomerDeleted
        };
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessNodeCustomerCreateModel => {
        return {
            BusinessNodeId      : requestBody.BusinessNodeId ? requestBody.BusinessNodeId : null,
            CustomerId          : requestBody.CustomerId ? requestBody.CustomerId : null,
            SmsConsent          : requestBody.SmsConsent ? requestBody.SmsConsent : "NOT_REPLIED",
            IsActive            : requestBody.IsActive ? requestBody.IsActive : true,
        };
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

    getUpdateModel = (requestBody): BusinessNodeCustomerUpdateModel => {

        let updateModel: BusinessNodeCustomerUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'CustomerId')) {
            updateModel.CustomerId = requestBody.CustomerId;
        }
        if (Helper.hasProperty(requestBody, 'SmsConsent')) {
            updateModel.SmsConsent = requestBody.SmsConsent;
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
            BusinessNodeId      : record.BusinessNodeId,
            CustomerId          : record.CustomerId,
            SmsConsent          : record.SmsConsent,
            IsActive            : record.IsActive,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            DeletedAt           : record.DeletedAt,
            IsDeleted           : record.IsDeleted
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            BusinessNodeId      : record.BusinessNodeId,
            CustomerId          : record.CustomerId,
            SmsConsent          : record.SmsConsent,
            IsActive            : record.IsActive,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            DeletedAt           : record.DeletedAt,
            IsDeleted           : record.IsDeleted
        };
    };
}