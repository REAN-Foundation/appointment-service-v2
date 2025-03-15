import { ApiError } from "../../common/api.error";
import { BusinessServiceService } from '../../database/repository.services/business.service.service';
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { BusinessService } from "../../database/repository.services/business.service";
import { BusinessServiceValidator as validator } from "./business.service.validator";
import { BusinessServiceCreateModel, BusinessServiceDto,
         BusinessServiceUpdateModel, BusinessServiceSearchFilters,
         BusinessServiceSearchResults }
         from "../../domain.types/business/business.service.domain.types";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../../common/error.handler";
import { Helper } from "../../common/helper";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { BusinessUserService } from "../../database/repository.services/business.user.service";

export class BusinessServiceControllerDelegate {

    prisma = PrismaClientInit.instance().prisma();
    public static instance:BusinessUserService=null;
    //#region member variables and constructors

    _service: BusinessServiceService = null;

    _businessNodeService: BusinessNodeService = null;

    _businessService: BusinessService =null;

    constructor() {
        this._service = new BusinessServiceService();
        this._businessNodeService = new BusinessNodeService();
        this._businessService = new BusinessService();
    }

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var businessNodeId = requestBody.BusinessNodeId;
        const businessNode = await this._businessNodeService.getById(businessNodeId);
        if (!businessNode) {
            ErrorHandler.throwNotFoundError(`Business node id not found!`);
        }

        if (Helper.hasProperty(requestBody, 'AllowCancelltion') && requestBody.AllowCancellation == true) {
            if(!requestBody.CancellationWindow || !requestBody.CancellationCharges) {
                ErrorHandler.throwNotFoundError(`Cancellation is allowed please specify cancellation window and cancellation charges!`);
            }
        }

        if (Helper.hasProperty(requestBody, 'SendReminder') && requestBody.SendReminder == true) {
            if(!requestBody.ReminderWindow || !requestBody.ReminderType) {
                ErrorHandler.throwNotFoundError(`Sending reminders on appointment status change is opted. Please specify reminder window and reminder type!`);
            }
        }        

        var createModel: BusinessServiceCreateModel = this.getCreateModel(requestBody);
        const record: BusinessServiceDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business service!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business service with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    getByBusiness = async (businessId: uuid, query: any) => {       
        var filters = this.getSearchFilters(query);
        var searchResults = await this._service.getByBusiness(filters);
        return searchResults;
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessServiceSearchFilters = this.getSearchFilters(query);
        var searchResults: BusinessServiceSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid ,requestBody: any) =>{
        await validator.validateUpdateRequest(requestBody);
        const record: BusinessServiceDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business service with id ' + id.toString() + 'cannot be found!');
        }

        const updateModel: BusinessServiceUpdateModel = this.getUpdateModel(requestBody);
        const updated: BusinessServiceDto = await this._service.update(id , updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business service!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Customer with id ' + id.toString() + ' cannot be found!');
        }

        const businessServiceDeleted = await this._service.delete(id);
        return {
            Deleted : businessServiceDeleted
        };
    };

    getCreateModel = (requestBody): BusinessServiceCreateModel => {
        return {
            BusinessNodeId             : requestBody.BusinessNodeId,
            Name                       : requestBody.Name,
            Description                : requestBody.Description,
            ServiceDuration            : requestBody.ServiceDuration ? requestBody.ServiceDuration : 0,
            Fees                       : requestBody.Fees ? requestBody.Fees : 0.0,
            IsTaxable                  : requestBody.IsTaxable ? requestBody.IsTaxable : false,
            TaxRate                    : requestBody.TaxRate ? requestBody.TaxRate : 0.0,
            PaymentPercent             : requestBody.PaymentPercent ? requestBody.PaymentPercent : 0.0,
            PaymentRequired            : requestBody.PaymentRequired ? requestBody.PaymentRequired : false,
            PriorBookingWindow         : requestBody.PriorBookingWindow ? requestBody.PriorBookingWindow : '1h',
            SendReminder               : requestBody.SendReminder ? requestBody.SendReminder : false,
            ReminderWindow             : requestBody.ReminderWindow ? requestBody.ReminderWindow : null,
            ReminderType               : requestBody.ReminderType ? requestBody.ReminderType : null,
            AllowCancellation          : requestBody.AllowCancellation ? requestBody.AllowCancellation : false,
            CancellationWindow         : requestBody.CancellationWindow ? requestBody.CancellationWindow : '1h',
            CancellationCharges        : requestBody.CancellationCharges ? requestBody.CancellationCharges : 0.0,
            EnableLoyalty              : requestBody.EnableLoyalty ? requestBody.EnableLoyalty : true,
            DisplayServicePicture      : requestBody.DisplayServicePicture ? requestBody.DisplayServicePicture : null,
            IsActive                   : requestBody.IsActive ? requestBody.IsActive : true,
        };
    };

    getSearchFilters = (query) => {

        var filters = {};
        
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var isActive= query.isActive ? query.isActive : null;
        if (isActive != null) {
            filters['IsActive'] = isActive;
        }
        var businessNodeId= query.businessNodeId ? query.businessNodeId : null;
        if (businessNodeId != null) {
            filters['BusinessNodeId'] = businessNodeId;
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

    getUpdateModel = (requestBody): BusinessServiceUpdateModel => {

        let updateModel: BusinessServiceUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        if (Helper.hasProperty(requestBody, 'Fees')) {
            updateModel.Fees = requestBody.Fees;
        }
        if (Helper.hasProperty(requestBody, 'ServiceDuration')) {
            updateModel.ServiceDuration = requestBody.ServiceDuration
        }
        if (Helper.hasProperty(requestBody, 'IsTaxable')) {
            updateModel.IsTaxable = requestBody.IsTaxable
        }
        if (Helper.hasProperty(requestBody, 'TaxRate')) {
            updateModel.TaxRate = requestBody.TaxRate;
        }
        if (Helper.hasProperty(requestBody, 'PriorBookingWindow')) {
            updateModel.PriorBookingWindow = requestBody.PriorBookingWindow
        }
        if (Helper.hasProperty(requestBody, 'PaymentRequired')) {
            updateModel.PaymentRequired = requestBody.PaymentRequired
        }
        if (Helper.hasProperty(requestBody, 'PaymentPercent')) {
            updateModel.PaymentPercent = requestBody.PaymentPercent;
        }
        if (Helper.hasProperty(requestBody, 'SendReminder')) {
            updateModel.SendReminder = requestBody.SendReminder;
        }
        if (Helper.hasProperty(requestBody, 'ReminderType')) {
            updateModel.ReminderType = requestBody.ReminderType;
        }
        if (Helper.hasProperty(requestBody, 'AllowCancellation')) {
            updateModel.AllowCancellation = requestBody.AllowCancellation;
        }
        if (Helper.hasProperty(requestBody, 'CancellationWindow')) {
            updateModel.CancellationWindow = requestBody.CancellationWindow;
        }
        if (Helper.hasProperty(requestBody, 'CancellationCharges')) {
            updateModel.CancellationCharges = requestBody.CancellationCharges;
        }
        if (Helper.hasProperty(requestBody, 'EnableLoyalty')) {
            updateModel.EnableLoyalty = requestBody.EnableLoyalty;
        }
        if (Helper.hasProperty(requestBody, 'CancellationWindow')) {
            updateModel.CancellationWindow = requestBody.CancellationWindow;
        }
        if (Helper.hasProperty(requestBody, 'DisplayServicePicture')) {
            updateModel.DisplayServicePicture = requestBody.DisplayServicePicture;
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
            id                      : record.id,
            BusinessNodeId          : record.BusinessNodeId,
            Name                    : record.Name,
            Description             : record.Description,
            Fees                    : record.Fees,
            ServiceDuration         : record.ServiceDuration,
            IsTaxable               : record.IsTaxable,
            TaxRate                 : record.TaxRate,
            PriorBookingWindow      : record.PriorBookingWindow,
            PaymentRequired         : record.PaymentRequired,
            PaymentPercent          : record.PaymentPercent,
            SendReminder            : record.SendReminder,
            ReminderType            : record.ReminderType,
            ReminderWindow          : record.ReminderWindow,
            AllowCancellation       : record.AllowCancellation,
            CancellationWindow      : record.CancellationWindow,
            CancellationCharges     : record.CancellationCharges,
            EnableLoyalty           : record.EnableLoyalty,
            DisplayServicePicture   : record.DisplayServicePicture,
            IsActive                : record.IsActive,
            CreatedAt               : record.CreatedAt,
            UpdatedAt               : record.UpdatedAt,
            IsDeleted               : record.IsDeleted,
            DeletedAt               : record.DeletedAt
        }
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                      : record.id,
            BusinessNodeId          : record.BusinessNodeId,
            Name                    : record.Name,
            Description             : record.Description,
            Fees                    : record.Fees,
            ServiceDuration         : record.ServiceDuration,
            IsTaxable               : record.IsTaxable,
            TaxRate                 : record.TaxRate,
            PriorBookingWindow      : record.PriorBookingWindow,
            PaymentRequired         : record.PaymentRequired,
            PaymentPercent          : record.PaymentPercent,
            SendReminder            : record.SendReminder,
            ReminderType            : record.ReminderType,
            ReminderWindow          : record.ReminderWindow,
            AllowCancellation       : record.AllowCancellation,
            CancellationWindow      : record.CancellationWindow,
            CancellationCharges     : record.CancellationCharges,
            EnableLoyalty           : record.EnableLoyalty,
            DisplayServicePicture   : record.DisplayServicePicture,
            IsActive                : record.IsActive,
            CreatedAt               : record.CreatedAt,
            UpdatedAt               : record.UpdatedAt,
            IsDeleted               : record.IsDeleted,
            DeletedAt               : record.DeletedAt
        }
    };
}
