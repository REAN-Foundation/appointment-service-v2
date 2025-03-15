import { ApiError } from "../../common/api.error";
import { BusinessUserHourService } from '../../database/repository.services/business.user.hour.service';
import { BusinessUserHourCreateModel, 
         BusinessUserHourSearchFilters,
         BusinessUserHourUpdateModel,
         BusinessUserHourSearchResults, }
         from "../../domain.types/business/business.user.hour.domain.types";
import { BusinessUserHourValidator as validator } from "./business.user.hour.validator";
import { BusinessUserService } from "../../database/repository.services/business.user.service";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../../common/error.handler";
import { Helper } from "../../common/helper";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { TimeHelper as th } from "../../common/time.helper";

export class BusinessUserHourControllerDelegate {

    //#region member variables and constructors

    prisma = PrismaClientInit.instance().prisma();
    public static instance:BusinessNodeHourService=null;

    _service: BusinessUserHourService = null;

    _businessUserService: BusinessUserService = null;

    _businessNodeHourService : BusinessNodeHourService = null;

    constructor() {
        this._service = new BusinessUserHourService();
        this._businessUserService = new BusinessUserService();
        this._businessNodeHourService = new BusinessNodeHourService();
    }

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);

        const businessUserId = requestBody.BusinessUserId;    
        var businessUser = await this._businessUserService.getById(businessUserId);
        if (!businessUser) {
            ErrorHandler.throwNotFoundError("Business user with id " + businessUserId.toString() + " does not exist!");
        }
        var existing = await this.exists(requestBody);
        if(existing != null) {
            ErrorHandler.throwDuplicateUserError("Business user hours with same characteristics found, please update!");
        }
        if(requestBody.Day != null && requestBody.Date == null) 
        {
            var nodeHoursList = await this.prisma.business_node_hours.findMany({
                where : {
                    AND : {
                        BusinessNodeId : businessUser.BusinessNodeId,
                        Day : requestBody.Day,
                        Date : null,
                        IsActive : true
                    },
                },
            });

            var nodeHoursForDay = nodeHoursList.length > 0 ? nodeHoursList[0] : null;
            if (nodeHoursForDay != null && requestBody.StartTime != null && requestBody.EndTime != null) {

                var nodeStartTime = nodeHoursForDay.StartTime;
                var nodeEndTime = nodeHoursForDay.EndTime;

                if (th.isBefore(requestBody.StartTime, nodeStartTime)) {
                    requestBody.StartTime = nodeStartTime;
                }
                if (th.isAfter(requestBody.EndTime, nodeEndTime)) {
                    requestBody.EndTime = nodeEndTime;
                }   
            }
        }
        var createModel: BusinessUserHourCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business user hours!', 400);
        }
        return this.getEnrichedDto(record);
    };

    createMultiple = async (requestBody: any) => {
        await validator.validateCreateMultipleRequest(requestBody);
        const businessUserId = requestBody.BusinessUserId;
        const businessUser = await this._businessUserService.getById(businessUserId);
        var dayWiseWorkingHours = requestBody.DayWiseWorkingHours;
        if (!businessUser) {
            ErrorHandler.throwNotFoundError("Business user with id " + businessUserId.toString() + " does not exist!");
        }
        for await (var wh of dayWiseWorkingHours) 
        {
            var userHoursList = await this.prisma.business_user_hours.findMany({
                where : {
                    AND: { 
                        BusinessUserId  : businessUserId,
                        Day             : wh.Day,
                        IsActive        : true,
                    },
                },
            });
            var nodeHoursList = await this.prisma.business_node_hours.findMany({
                where : {
                    AND: { 
                        BusinessNodeId  : businessUser.BusinessNodeId,
                        Day             : wh.Day,
                        Date            : null,
                        IsActive        : true,
                    },
                },
            });

            var nodeHoursForDay = nodeHoursList.length > 0 ? nodeHoursList[0] : null;
            if (nodeHoursForDay !=null && wh.StartTime != null && wh.EndTime != null) {
                var nodeStartTime = nodeHoursForDay.StartTime;
                var nodeEndTime = nodeHoursForDay.EndTime;

                if (th.isBefore(wh.StartTime, nodeStartTime)) {
                        wh.StartTime = nodeStartTime;
                }
                if (th.isAfter(wh.EndTime, nodeEndTime)) {
                        wh.EndTime = nodeEndTime;
                }
            }
            const updateIsOpen = Helper.hasProperty(wh ,'IsOpen') ? wh.IsOpen : true;
            var type = "WORK-DAY";
            if(!updateIsOpen || nodeHoursForDay == null) {
                type = "NON-WORKING-DAY";
            }

            if(userHoursList.length > 0 ) {
                var record = {
                    Type        : type,
                    Date        : null,
                    IsOpen      : updateIsOpen,
                    Message     : null,
                    StartTime   : wh.StartTime != null ? wh.StartTime : '',
                    EndTime     : wh.EndTime != null ? wh.EndTime : '',
                    IsActive    : true
                }
                var updated = await this._service.update(userHoursList[0].id, record);
            } else {
                const createModel = {
                    BusinessUserId  : businessUserId,
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
                    throw new ApiError('Unable to create business user hours!', 400);
                }
                }
        }
        var userHours = await this.prisma.business_user_hours.findMany({
            where : {
                BusinessUserId : businessUserId,
                IsActive : true,
            },
        });
        userHours.sort((a, b) => {
            if(a.Day != null && b.Day != null){
                return a.Day - b.Day;
            }
            return 0;
        }) 
        return userHours;
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business user hours with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessUserHourSearchFilters = this.getSearchFilters(query);
        var searchResults: BusinessUserHourSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid ,requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const userHours = await this._service.getById(id);
        if (userHours === null) {
            ErrorHandler.throwNotFoundError("Business user hours with id " + id.toString() + "cannot be found!");
        }

        var businessUserId = userHours.BusinessUserId;
        var businessUser = await this._businessUserService.getById(businessUserId);
        if(!businessUser) {
            ErrorHandler.throwNotFoundError("Business user with id " + businessUserId.toString() + "cannot be found!");
        }

        if (requestBody.Day != null && requestBody.Date == null) {
            var nodeHoursList = await this.prisma.business_node_hours.findMany({
                where : {
                    AND: { 
                        BusinessNodeId : businessUser.BusinessNodeId,
                        Day : requestBody.Day,
                        Date : null,
                        IsActive : true,
                    },
                },
            });

            var nodeHoursForDay = nodeHoursList.length > 0 ? nodeHoursList[0] : null;
            if (nodeHoursForDay !=null && requestBody.StartTime != null && requestBody.EndTime != null) {
                var nodeStartTime = nodeHoursForDay.StartTime;
                var nodeEndTime = nodeHoursForDay.EndTime;

                if (th.isBefore(requestBody.StartTime, nodeStartTime)) {
                    requestBody.StartTime = nodeStartTime;
                }

                if (th.isAfter(requestBody.EndTime, nodeEndTime)) {
                    requestBody.EndTime = nodeEndTime;
                }
            }
        }
        const updateModel: BusinessUserHourUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business user hours!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    updateMultiple = async (businessUserId: uuid, requestBody: any) => {
        await validator.validateUpdateMultipleRequest(requestBody);
        var dayWiseWorkingHours = requestBody.DayWiseWorkingHours;

        const businessUser = await this._businessUserService.getById(businessUserId);
        if(!businessUser) {
            ErrorHandler.throwNotFoundError("Business user with id " + businessUserId.toString() + "cannot be found!");
        } 
        for await (var wh of dayWiseWorkingHours){
            var userHoursList = await this.prisma.business_user_hours.findMany({
                where : {
                    AND: { 
                        BusinessUserId : businessUserId,
                        Day : wh.Day,
                        IsActive : true,
                    },
                },
            });  
            var nodeHoursList = await this.prisma.business_node_hours.findMany({
                where : {
                    AND: { 
                        BusinessNodeId : businessUser.BusinessNodeId,
                        Day : wh.Day,
                        Date : null,
                        IsActive : true,
                    },
                },
            });
            var nodeHoursForDay = nodeHoursList.length > 0 ? nodeHoursList[0] : null;
            if (nodeHoursForDay !=null && wh.StartTime != null && wh.EndTime != null) {
                var nodeStartTime = nodeHoursForDay.StartTime;
                var nodeEndTime = nodeHoursForDay.EndTime;

                if (th.isBefore(wh.StartTime, nodeStartTime)) {
                        wh.StartTime = nodeStartTime;
                }
                if (th.isAfter(wh.EndTime, nodeEndTime)) {
                        wh.EndTime = nodeEndTime;
                }
            }
            var updateIsOpen = Helper.hasProperty(wh ,'IsOpen') ? wh.IsOpen : true;
            var type = "WORK-DAY";
            if(!updateIsOpen || nodeHoursForDay == null) {
                type = "NON-WORKING-DAY";
            }
            if(userHoursList.length > 0 ) {
                var record = {
                    Type        : type,
                    Date        : null,
                    IsOpen      : updateIsOpen,
                    Message     : null,
                    StartTime   : wh.StartTime != null ? wh.StartTime : '',
                    EndTime     : wh.EndTime != null ? wh.EndTime : '',
                    IsActive    : true
                }
                var updated = await this._service.update(userHoursList[0].id, record);
            } else {
                const createModel = {
                    BusinessUserId  : businessUserId,
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
                    throw new ApiError('Unable to create business user hours!', 400);
                }
            }
        }
        var userHoursList = await this.prisma.business_user_hours.findMany({
            where : {
                BusinessUserId : businessUserId,
                IsActive : true
            },
        });
        userHoursList.sort((a, b) => {
        if(a.Day != null && b.Day != null)
            return a.Day - b.Day;
            return 0;
        }) 
        return userHoursList;
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business user hours with id ' + id.toString() + ' cannot be found!');
        }
        const deleted = await this._service.delete(id);
        return {
            Deleted: deleted
        };
    };

    getCreateModel = (requestBody): BusinessUserHourCreateModel => {
        return {
            BusinessUserId     : requestBody.BusinessUserId,
            Type               : requestBody.Type,
            Day                : requestBody.Day,
            Date               : requestBody.Date ? th.getDate(requestBody.Date) : null,
            IsOpen             : requestBody.IsOpen ? requestBody.IsOpen : true,
            Message            : requestBody.Message ? requestBody.Message : null,
            StartTime          : requestBody.StartTime ? requestBody.StartTime : '10:00:00',
            EndTime            : requestBody.EndTime ? requestBody.EndTime : '21:00:00',
            IsActive           : requestBody.IsActive ? requestBody.IsActive : true
        };     
    };

    exists = async (requestBody) => {
        var dt = requestBody.Date ? th.getDate(requestBody.Date) : null;
        var businessUserId = requestBody.BusinessUserId
        var type = requestBody.Type;
        var day = requestBody.Day;
        var date = dt

        var userHours = await this.prisma.business_user_hours.findMany({
            where : {
                AND : {
                    BusinessUserId  : businessUserId,
                    Type            : type,
                    Day             : day,
                    Date            : date
                }
            }});
            if (userHours.length > 0) {
                return userHours[0]
            }
            return null;
    };

    getSearchFilters = (query) => {
        var filters = {};

            var businessUserId = query.businessUserId ? query.businessUserId : null;
            if (businessUserId != null) {
                filters['BusinessUserId'] = businessUserId;
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

    getUpdateModel = (requestBody): BusinessUserHourUpdateModel => {

        const updateModel: BusinessUserHourUpdateModel = {};
            if (Helper.hasProperty(requestBody, 'BusinessUserId')) {
                updateModel.BusinessUserId = requestBody.BusinessUserId;
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
            return updateModel;
        };
    
    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            BusinessUserId      : record.BusinessUserId,
            Type                : record.Type,
            Day                 : record.Day,
            Date                : record.Date,
            IsOpen              : record.IsOpen,
            Message             : record.Message,
            StartTime           : record.StartTime,       
            EndTime             : record.EndTime,
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
            BusinessUserId      : record.BusinessUserId,
            Type                : record.Type,
            Day                 : record.Day,
            Date                : record.Date,
            IsOpen              : record.IsOpen,
            Message             : record.Message,
            StartTime           : record.StartTime,       
            EndTime             : record.EndTime,
            IsActive            : record.IsActive,
            CreatedAt           : record.CreatedAt,
            UpdatedAt           : record.UpdatedAt,
            DeletedAt           : record.DeletedAt    
        };
    };

}
