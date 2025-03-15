import { ApiError } from "../../common/api.error";
import { AppointmentStatusCreateModel, AppointmentStatusDto, AppointmentStatusSearchFilters, AppointmentStatusSearchResults, AppointmentStatusUpdateModel } from "../../domain.types/appointment.status/appointment.status.domain.types";
import { AppointmentStatusService } from "../../database/repository.services/appointment.status.service";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { AppointmentStatusValidator as validator } from './appointment.status.validator';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import { PrismaClientInit } from "../../startup/prisma.client.init";

export class AppointmentStatusControllerDelegate {
    prisma = PrismaClientInit.instance().prisma();
    //#region member variables and constructors

    _service : AppointmentStatusService = null;

    _businessNodeService : BusinessNodeService = null;
    
    //_appointmentId : AppointmentService =null;

    constructor() {
        this._service = new AppointmentStatusService();
        this._businessNodeService = new BusinessNodeService();
       // this._appointmentId = new AppointmentService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var businessNodeId = requestBody.BusinessNodeId;
        const businessNode = await this._businessNodeService.getById(businessNodeId);
        if (!businessNode) {
            ErrorHandler.throwNotFoundError('Business node with id ' + businessNodeId.toString() + ' not found!');
        }
        var existingStatus = await this.prisma.appointment_statuses.findMany({
            where : { 
                Sequence        : requestBody.Sequence, 
                BusinessNodeId  : businessNodeId,
            },
        });
        if (existingStatus.length > 0) {
            ErrorHandler.throwDuplicateUserError('Appointment status with the same sequence for the same business node exists!')
        }
        var createModel: AppointmentStatusCreateModel = this.getCreateModel(requestBody);
        const record: AppointmentStatusDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create appointment status!', 400);
        }
        return this.getEnrichedDto(record);
    };

    createMultiple = async (requestBody : any) => {
        await validator.validateCreateMultipleRequest(requestBody);
        var statuses = requestBody.Statuses;
        const businessNodeId = requestBody.BusinessNodeId;
        const businessNode = await this._businessNodeService.getById(businessNodeId);
        if (!businessNode) {
            ErrorHandler.throwNotFoundError('Business node with id ' + businessNodeId.toString() + ' not found!');
        }
        for await (var s of statuses) 
        {
            var existing = await this.prisma.appointment_statuses.findMany({
                where : {
                    AND : {
                        BusinessNodeId  : businessNodeId,
                        StatusCode      : s.StatusCode,
                        Sequence        : s.Sequence,
                        IsActive        : true,
                    },
                },
            });
            if (existing.length > 0) {
                var updates = this.getUpdateModel(s);
                var updated = await this._service.update(existing[0].id, updates);
            }
            else {
                const createModel = {
                    BusinessNodeId          : businessNodeId,
                    Status                  : s.Status,
                    StatusCode              : s.StatusCode,
                    StatusColor             : s.StatusColor,
                    Sequence                : s.Sequence,
                    SendNotification        : s.SendNotification ? s.SendNotification : true,
                    NotificationText        : s.NotificationText ? s.NotificationText : null,
                    SendSms                 : s.SendSms ? s.SendSms : true,
                    SmsText                 : s.SmsText ? s.SmsText : null,
                    IsCancellationStatus    : s.IsCancellationStatus ? s.IsCancellationStatus : false, 
                    IsCompletedStatus       : s.IsCompletedStatus ? s.IsCompletedStatus : false,
                    IsConfirmedStatus       : s.IsConfirmedStatus ? s.IsConfirmedStatus : false,
                    IsDashboardStatus       : s.IsDashboardStatus ? s.IsDashboardStatus : true,
                    IsWalkinEntryStatus     : s.IsWalkinEntryStatus ? s.IsWalkinEntryStatus : false,
                    IsActive                : s.IsActive ? s.IsActive : true
                }
                const record = await this._service.create(createModel);
                if (record === null) {
                    throw new ApiError('Unable to create appointment statuses!', 400);
                }
            }
        }
        var appointmentStatuses = await this.prisma.appointment_statuses.findMany({
            where : {
                BusinessNodeId : businessNodeId,
                IsActive : true
            }});
            appointmentStatuses.sort((a, b) => {
            if(a.Sequence != null && b.Sequence != null)
            return a.Sequence - b.Sequence;
            return 0;
            }) 
            return appointmentStatuses;
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Appointment status with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };
    
    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: AppointmentStatusSearchFilters = this.getSearchFilters(query);
        var searchResults: AppointmentStatusSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Appointment status with id ' + id.toString() + ' cannot be found!');
        }
        if (Helper.hasProperty(requestBody, 'Sequence')) {
            var existingStatus = await this.prisma.appointment_statuses.findMany({
                where : { 
                    Sequence        : requestBody.Sequence, 
                    BusinessNodeId  : record.BusinessNodeId,
                },
            });
            if (existingStatus.length > 0) {
                for (var s of existingStatus) {
                    if (s.id != id) {
                        ErrorHandler.throwDuplicateUserError('Appointment status with the same sequence for the same business node exists!');
                    }
                }
            }
        }
        const updateModel: AppointmentStatusUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update appointment status!', 400);
        }
        const status = await this._service.getById(id);
        return this.getEnrichedDto(status);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Appointment status with id ' + id.toString() + ' cannot be found!');
        }
        const notificationDeleted = await this._service.delete(id);
        return {
            Deleted: notificationDeleted
        };
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): AppointmentStatusCreateModel => {
        return {
            BusinessNodeId          : requestBody.BusinessNodeId,
            Status                  : requestBody.Status,
            StatusCode              : requestBody.StatusCode,
            StatusColor             : requestBody.StatusColor,
            Sequence                : requestBody.Sequence,
            IsCancellationStatus    : requestBody.IsCancellationStatus ? requestBody.IsCancellationStatus : false, 
            IsCompletedStatus       : requestBody.IsCompletedStatus ? requestBody.IsCompletedStatus : false,
            IsConfirmedStatus       : requestBody.IsConfirmedStatus ? requestBody.IsConfirmedStatus : false,
            IsDashboardStatus       : requestBody.IsDashboardStatus ? requestBody.IsDashboardStatus : true,
            IsWalkinEntryStatus     : requestBody.IsWalkinEntryStatus ? requestBody.IsWalkinEntryStatus : false,
            NotificationText        : requestBody.NotificationText ? requestBody.NotificationText : null,
            SendNotification        : requestBody.SendNotification ? requestBody.SendNotification : true,
            SendSms                 : requestBody.SendSms ? requestBody.SendSms : true,
            SmsText                 : requestBody.SmsText ? requestBody.SmsText : null,
            IsActive                : requestBody.IsActive ? requestBody.IsActive : true
        };
    };

    getSearchFilters = (query) => {
        var filters = {};

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

    getUpdateModel = (requestBody): AppointmentStatusUpdateModel => {

        let updateModel: AppointmentStatusUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'IsCancellationStatus')) {
            updateModel.IsCancellationStatus = requestBody.IsCancellationStatus;
        }
        if (Helper.hasProperty(requestBody, 'IsCompletedStatus')) {
            updateModel.IsCompletedStatus = requestBody.IsCompletedStatus;
        }
        if (Helper.hasProperty(requestBody, 'IsConfirmedStatus')) {
            updateModel.IsConfirmedStatus = requestBody.IsConfirmedStatus;
        }
        if (Helper.hasProperty(requestBody, 'IsDashboardStatus')) {
            updateModel.IsDashboardStatus = requestBody.IsDashboardStatus;
        }
        if (Helper.hasProperty(requestBody, 'IsWalkinEntryStatus')) {
            updateModel.IsWalkinEntryStatus = requestBody.IsWalkinEntryStatus;
        }
        if (Helper.hasProperty(requestBody, 'NotificationText')) {
            updateModel.NotificationText = requestBody.NotificationText;
        }
        if (Helper.hasProperty(requestBody, 'SendNotification')) {
            updateModel.SendNotification = requestBody.SendNotification;
        }
        if (Helper.hasProperty(requestBody, 'SendSms')) {
            updateModel.SendSms = requestBody.SendSms;
        }
        if (Helper.hasProperty(requestBody, 'Sequence')) {
            updateModel.Sequence = requestBody.Sequence;
        }
        if (Helper.hasProperty(requestBody, 'SmsText')) {
            updateModel.SmsText = requestBody.SmsText;
        }
        if (Helper.hasProperty(requestBody, 'Status')) {
            updateModel.Status = requestBody.Status;
        }
        if (Helper.hasProperty(requestBody, 'StatusCode')) {
            updateModel.StatusCode = requestBody.StatusCode;
        }
        if (Helper.hasProperty(requestBody, 'StatusColor')) {
            updateModel.StatusColor = requestBody.StatusColor;
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
            IsCancellationStatus    : record.IsCancellationStatus,
            IsCompletedStatus       : record.IsCompletedStatus,
            IsConfirmedStatus       : record.IsConfirmedStatus,
            IsDashboardStatus       : record.IsDashboardStatus,
            IsWalkinEntryStatus     : record.IsWalkinEntryStatus,
            SendNotification        : record.SendNotification,
            NotificationText        : record.NotificationText,
            SendSms                 : record.SendSms,
            Sequence                : record.Sequence,
            SmsText                 : record.SmsText,
            Status                  : record.Status,
            StatusCode              : record.StatStatusCodeus,
            StatusColor             : record.StatusColor,
            IsActive                : record.IsActive,
            CreatedAt               : record.CreatedAt,
            UpdatedAt               : record.UpdatedAt,
            IsDeleted               : record.IsDeleted,
            DeletedAt               : record.DeletedAt      
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                      : record.id,
            BusinessNodeId          : record.BusinessNodeId,
            IsCancellationStatus    : record.IsCancellationStatus,
            IsCompletedStatus       : record.IsCompletedStatus,
            IsConfirmedStatus       : record.IsConfirmedStatus,
            IsDashboardStatus       : record.IsDashboardStatus,
            IsWalkinEntryStatus     : record.IsWalkinEntryStatus,
            SendNotification        : record.SendNotification,
            NotificationText        : record.NotificationText,
            SendSms                 : record.SendSms,
            Sequence                : record.Sequence,
            SmsText                 : record.SmsText,
            Status                  : record.Status,
            StatusCode              : record.StatStatusCodeus,
            StatusColor             : record.StatusColor,
            IsActive                : record.IsActive,
            CreatedAt               : record.CreatedAt,
            UpdatedAt               : record.UpdatedAt,
            IsDeleted               : record.IsDeleted,
            DeletedAt               : record.DeletedAt      
        };
    };
}
