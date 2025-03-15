import { ApiError } from "../../common/api.error";
import { PaymentTransactionCreateModel, PaymentTransactionUpdateModel,
        PaymentTransactionDto, PaymentTransactionSearchFilters, PaymentTransactionSearchResults } 
        from "../../domain.types/payment.transaction/payment.transaction.domain.types";
import { PaymentTransactionService } from "../../database/repository.services/payment.transaction.service";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { CustomerService } from "../../database/repository.services/customer.service";
import { AppointmentService } from "../../database/repository.services/appointment.service";
import { PaymentTransactionValidator as validator } from './payment.transaction.validator';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import { TimeHelper as th } from "../../common/time.helper";

export class PaymentTransactionControllerDelegate {

    //#region member variables and constructors

    _service : PaymentTransactionService = null;

    _businessNodeService : BusinessNodeService = null;
    
    _customerService : CustomerService = null;

    _appointmentService : AppointmentService = null;

    constructor() {
        this._service = new PaymentTransactionService();
        this._businessNodeService = new BusinessNodeService();
        this._customerService = new CustomerService();
        this._appointmentService = new AppointmentService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        var businessNodeId = requestBody.BusinessNodeId;
        const businessNode = await this._businessNodeService.getById(businessNodeId);
        if (!businessNode) {
            ErrorHandler.throwNotFoundError('Business node with id ' + businessNodeId.toString() + ' not found!');
        }
        var customerId = requestBody.CustomerId;
        const customer = await this._customerService.getById(customerId);
        if (!customer) {
            ErrorHandler.throwNotFoundError('Customer with id ' + customerId.toString() + ' not found!');
        }
        // var appointmentId = requestBody.AppointmentId;
        // const appointment = await this._appointmentService.getById(appointmentId);
        // if (!appointment) {
        //     ErrorHandler.throwNotFoundError('Appointment with id ' + appointmentId.toString() + ' not found!');
        // }
        var createModel: PaymentTransactionCreateModel = this.getCreateModel(requestBody);
        const record: PaymentTransactionDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create payment transactions!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Payment transactions with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: PaymentTransactionSearchFilters = this.getSearchFilters(query);
        var searchResults: PaymentTransactionSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Payment transactions with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: PaymentTransactionUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update payment transactions!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Payment transactions with id ' + id.toString() + ' cannot be found!');
        }
        const notificationDeleted = await this._service.delete(id);
        return {
            Deleted: notificationDeleted
        };
    };
        
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): PaymentTransactionCreateModel => {
        return {
            AppointmentId   : requestBody.AppointmentId,
            BusinessNodeId  : requestBody.BusinessNodeId,
            CustomerId      : requestBody.CustomerId,
            TotalAmount     : requestBody.TotalAmount,
            ExternalId      : requestBody.ExternalId ? requestBody.ExternalId : null,
            Currency        : requestBody.Currency ? requestBody.Currency : '',
            InitiatedOn     : requestBody.InitiatedOn ? th.getDate(requestBody.InitiatedOn) : null,
            Status          : requestBody.Status ? requestBody.Status : null,
            CompletedOn     : requestBody.CompletedOn ? th.getDate(requestBody.CompletedOn) : null,
            IsComplete      : requestBody.IsComplete ? requestBody.IsComplete : false,
            IsActive        : requestBody.IsActive ? requestBody.IsActive : true,
        }
    };

    getSearchFilters = (query) => {
        var filters = {};

            var businessNodeId = query.businessNodeId ? query.businessNodeId : null;
            if (businessNodeId != null) {
                filters['BusinessNodeId'] = businessNodeId;
            }
            var customerId = query.customerId ? query.customerId : null;
            if (customerId != null) {
                filters['CustomerId'] = customerId;
            }
            var appointmentId = query.appointmentId ? query.appointmentId : null;
            if (appointmentId != null) {
                filters['AppointmentId'] = appointmentId;
            }
            var isActive = query.isActive ? query.isActive : null;
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

    getUpdateModel = (requestBody): PaymentTransactionUpdateModel => {

        let updateModel: PaymentTransactionUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'CustomerId')) {
            updateModel.CustomerId = requestBody.CustomerId;
        }
        if (Helper.hasProperty(requestBody, 'AppointmentId')) {
            updateModel.AppointmentId = requestBody.AppointmentId;
        }
        if (Helper.hasProperty(requestBody, 'IsActive')) {
            updateModel.IsActive = requestBody.IsActive;
        }
        if (Helper.hasProperty(requestBody, 'ExternalId')) {
            updateModel.ExternalId = requestBody.ExternalId;
        }
        if (Helper.hasProperty(requestBody, 'TotalAmount')) {
            updateModel.TotalAmount = requestBody.TotalAmount;
        }
        if (Helper.hasProperty(requestBody, 'Currency')) {
            updateModel.Currency = requestBody.Currency;
        }
        if (Helper.hasProperty(requestBody, 'Status')) {
            updateModel.Status = requestBody.Status;
        }
        if (Helper.hasProperty(requestBody, 'IsComplete')) {
            updateModel.IsComplete = requestBody.IsComplete;
        }
        if (Helper.hasProperty(requestBody, 'InitiatedOn')) {
            updateModel.InitiatedOn = requestBody.InitiatedOn;
        }
        if (Helper.hasProperty(requestBody, 'CompletedOn')) {
            updateModel.CompletedOn = requestBody.CompletedOn;
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
            AppointmentId       : record.AppointmentId,
            ExternalId          : record.ExternalId,
            IsActive            : record.IsActive,
            InitiatedOn         : record.InitiatedOn,
            CompletedOn         : record.CompletedOn,
            Currency            : record.Currency,
            IsComplete          : record.IsComplete,
            Status              : record.Status,
            Title               : record.Title,
            TotalAmount         : record.TotalAmount,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            IsDeleted           : record.IsDeleted,
            DeletedAt           : record.DeletedAt      
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
            AppointmentId       : record.AppointmentId,
            ExternalId          : record.ExternalId,
            IsActive            : record.IsActive,
            InitiatedOn         : record.InitiatedOn,
            CompletedOn         : record.CompletedOn,
            Currency            : record.Currency,
            IsComplete          : record.IsComplete,
            Status              : record.Status,
            Title               : record.Title,
            TotalAmount         : record.TotalAmount,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            IsDeleted           : record.IsDeleted,
            DeletedAt           : record.DeletedAt
        }
    };
}
