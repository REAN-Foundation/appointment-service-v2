import { ApiError } from "../../common/api.error";
import { BusinessNodeHourCreateModel, BusinessNodeHourUpdateModel, BusinessNodeHourDto,BusinessNodeHourSearchFilters, BusinessNodeHourSearchResults  } from "../../domain.types/business.node.hour/business.node.hour.domain.types";
import { BusinessNodeHourValidator as validator } from '../business.node.hour/business.node.hour.validator';
import { BusinessNodeHourService } from '../../database/repository.services/business.node.hour.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { TimeHelper as th } from "../../common/time.helper";
export class BusinessNodeHourControllerDelegate {

    prisma = PrismaClientInit.instance().prisma();
    public static instance:BusinessNodeHourService=null;

    _service: BusinessNodeHourService = null;
    _businessNodeService : BusinessNodeService = null;

    constructor() {
        this._service = new BusinessNodeHourService();
        this._businessNodeService = new BusinessNodeService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        var businessNodeId = requestBody.BusinessNodeId;
        const businessNode = await this._businessNodeService.getById(businessNodeId);
        if (!businessNode) {
            ErrorHandler.throwNotFoundError(`Business node id not found!`);
        }
        const createModel: BusinessNodeHourCreateModel = await this.getValidCreateModel(requestBody);
        const record: BusinessNodeHourDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business node hour!', 400);
        }
        return this.getEnrichedDto(record);
    };

    createMultiple = async (requestBody: any) => {
        await validator.validateCreateMultipleRequest(requestBody);
        const businessNodeId = requestBody.BusinessNodeId;
        const businessNode = await this._businessNodeService.getById(businessNodeId);
        var dayWiseWorkingHours = requestBody.DayWiseWorkingHours;
        if (!businessNode) {
            ErrorHandler.throwNotFoundError(`Business node id not found!`);
        }
        for await (var wh of dayWiseWorkingHours)
        { 
            var nodeHoursList = await this.prisma.business_node_hours.findMany({
                where : {
                    AND : {
                        BusinessNodeId  : businessNodeId,
                        Day             : wh.Day,
                        IsActive        : true,
                    },
                },
            });
            const updateIsOpen = Helper.hasProperty(wh ,'IsOpen') ? wh.IsOpen : true;
            var type = "WORK-DAY";
            if(!updateIsOpen) {
                type = "NON-WORKING-DAY";
            }
            if(nodeHoursList.length > 0 ) {
                var record = {
                    Type        : type,
                    Date        : null,
                    IsOpen      : updateIsOpen,
                    Message     : null,
                    StartTime   : wh.StartTime != null ? wh.StartTime : '',
                    EndTime     : wh.EndTime != null ? wh.EndTime : '',
                    IsActive    : true
                }
                var updated = await this._service.update(nodeHoursList[0].id, record);
            } else {
                const createModel = {
                    BusinessNodeId  : businessNodeId,
                    Type            : type,
                    Day             : wh.Day,
                    Date            : null,
                    IsOpen          : updateIsOpen,
                    Message         : null,
                    StartTime       : wh.StartTime != null ? wh.StartTime : '',
                    EndTime         : wh.EndTime != null ? wh.EndTime : '',
                    IsActive        : true
                }
                const record = await this._service.create(createModel);
                if (record === null) {
                    throw new ApiError('Unable to create business node hour service!', 400);
                }
            }
        }
        var nodeHours = await this.prisma.business_node_hours.findMany({
            where : {
                BusinessNodeId  : businessNodeId,
                IsActive        : true,
            },
        });
        return nodeHours;
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business node hour with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessNodeHourSearchFilters = this.getSearchFilters(query);
        var searchResults : BusinessNodeHourSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business node hour with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: BusinessNodeHourUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business node hour!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    updateMultiple = async (businessNodeId: uuid, requestBody: any) => {
        await validator.validateUpdateMultipleRequest(requestBody);
        var dayWiseWorkingHours = requestBody.DayWiseWorkingHours;

        const businessNode = await this._businessNodeService.getById(businessNodeId);
        if (!businessNode) {
            ErrorHandler.throwNotFoundError('Business node with id ' + businessNodeId.toString() + ' cannot be found!');
        }
        for await (var wh of dayWiseWorkingHours)
        { 
            var nodeHoursList = await this.prisma.business_node_hours.findMany({
                where : {
                    AND : {
                        BusinessNodeId: businessNodeId,
                        Day: wh.Day,
                        IsActive: true,
                    },
                },
            });
            const updateIsOpen = Helper.hasProperty(wh ,'IsOpen') ? wh.IsOpen : true;
            var type = "WORK-DAY";
            if(!updateIsOpen) {
                type = "NON-WORKING-DAY";
            }
            if(nodeHoursList.length > 0 ) {
                var record = {
                    Type        : type,
                    Date        : null,
                    IsOpen      : updateIsOpen,
                    Message     : null,
                    StartTime   : wh.StartTime != null ? wh.StartTime : '',
                    EndTime     : wh.EndTime != null ? wh.EndTime : '',
                    IsActive    : true
                }
                var updated = await this._service.update(nodeHoursList[0].id, record);
            } else {
                const createModel = {
                    BusinessNodeId  : businessNodeId,
                    Type            : type,
                    Day             : wh.Day,
                    Date            : null,
                    IsOpen          : updateIsOpen,
                    Message         : null,
                    StartTime       : wh.StartTime != null ? wh.StartTime : '',
                    EndTime         : wh.EndTime != null ? wh.EndTime : '',
                    IsActive        : true
                }
                const record = await this._service.create(createModel);
                if (record === null) {
                    throw new ApiError('Unable to create business node hour service!', 400);
                }
            }
        }
        var nodeHours = await this.prisma.business_node_hours.findMany({
            where : {
                BusinessNodeId : businessNodeId,
                IsActive : true,
            },
        });
        return nodeHours;
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business node hour with id ' + id.toString() + ' cannot be found!');
        }
        const businessNodeHourDeleted = await this._service.delete(id);
        return {
            Deleted: businessNodeHourDeleted
        };
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessNodeHourCreateModel => {
        return {
            BusinessNodeId      : requestBody.BusinessNodeId? requestBody.BusinessNodeId:null,
            Type                : requestBody.Type,
            Day                 : requestBody.Day,
            Date                : requestBody.Date? th.getDate(requestBody.Date): null,
            IsOpen              : requestBody.IsOpen? requestBody.IsOpen: true,
            Message             : requestBody.Message ? requestBody.Message : null,
            StartTime           : requestBody.StartTime? requestBody.StartTime: '10:00:00',
            EndTime             : requestBody.EndTime ? requestBody.EndTime : '21:00:00',
            IsActive            : requestBody.IsActive ? requestBody.IsActive : true,
        };
    };

    getValidCreateModel = async (requestBody) => {

        const existing = await this._service.exists(requestBody);
        if(existing) {
            ErrorHandler.throwNotFoundError("Business node hour with same characteristics are found!");
        }
        var createModel : BusinessNodeHourCreateModel = await this.getCreateModel(requestBody);
        return createModel;
    };
  
    getSearchFilters = (query) => {
        var filters = {};
        var businessNodeId = query.businessNodeId ? query.businessNodeId : null;
        if (businessNodeId != null) {
            filters['BusinessNodeId'] = businessNodeId;
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

    getUpdateModel = (requestBody): BusinessNodeHourUpdateModel => {

        let updateModel: BusinessNodeHourUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'Type')) {
            updateModel.Type = requestBody.Type;
        }
        if (Helper.hasProperty(requestBody, 'Day')) {
            updateModel.Day = requestBody.Day;
        }
        if (Helper.hasProperty(requestBody, 'Date')) {
            updateModel.Date = requestBody.Date;
        }
        if (Helper.hasProperty(requestBody, 'IsOpen')) {
            updateModel.IsOpen = requestBody.IsOpen;
        }
        if (Helper.hasProperty(requestBody, 'Message')) {
            updateModel.Message = requestBody.Message;
        }
        if (Helper.hasProperty(requestBody, 'StartTime')) {
            updateModel.StartTime = requestBody.StartTime;
        }
        if (Helper.hasProperty(requestBody, 'EndTime')) {
            updateModel.EndTime = requestBody.EndTime;
        }
        if (Helper.hasProperty(requestBody, 'IsActive')) {
            updateModel.IsActive = requestBody.IsActive;
        }
        if (Helper.hasProperty(requestBody, 'IsDeleted')) {
            updateModel.IsDeleted = requestBody.IsDeleted;
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
            Type                : record.Type,
            Day                 : record.Day,
            Date                : record.Date,
            IsOpen              : record.IsOpen,
            Message             : record.Message,
            StartTime           : record.StartTime,
            EndTime             : record.EndTime,
            IsActive            : record.IsActive,
            IsDeleted           : record.IsDeleted,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            DeletedAt           : record.DeletedAt 
        };
    };

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                             : record.id,
            BusinessNodeId                 : record.BusinessNodeId,
            Type                           : record.Type,
            Day                            : record.Day,
            Date                           : record.Date,
            IsOpen                         : record.IsOpen,
            Message                        : record.Message,
            StartTime                      : record.StartTime,
            EndTime                        : record.EndTime,
            IsActive                       : record.IsActive,
            IsDeleted                      : record.IsDeleted,
            CreatedAt                      : record.CreatedAt,
            UpdatedAt                      : record.UpdatedAt,
            DeletedAt                      : record.DeletedAt 
        };
    };

}