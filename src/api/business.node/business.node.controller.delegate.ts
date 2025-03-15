import { ApiError } from "../../common/api.error";
import { BusinessNodeUpdateModel, BusinessNodeDto,BusinessNodeSearchFilters, BusinessNodeSearchResults, BusinessNodeCreateModel  } from "../../domain.types/business.node/business.node.domain.types";
import { BusinessNodeValidator as validator } from './business.node.validator';
import { BusinessNodeService } from '../../database/repository.services/business.node.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";

export class BusinessNodeControllerDelegate {

    //#region member variables and constructors

    _service: BusinessNodeService = null;

    _businessNodeHourService : BusinessNodeHourService = null;

    constructor() {
        this._service = new BusinessNodeService();
        this._businessNodeHourService = new BusinessNodeHourService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        const { nodeCreateModel } =
            await this.getValidNodeCreateModel(requestBody);
        const record: BusinessNodeDto = await this._service.create(nodeCreateModel);
        if (record === null) {
            throw new ApiError('Unable to create Business node!', 400);
        }
        const defaultServiceHours = await this._businessNodeHourService.createDefaultHoursForNode(record);
        const businessNode = {
            Node                : record,
            DefaultServiceHours : defaultServiceHours
        }
        return businessNode;
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessNodeSearchFilters = this.getSearchFilters(query);
        var searchResults : BusinessNodeSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business node with id ' + id.toString() + ' cannot be found!');
        }
        if (Helper.hasProperty(requestBody, 'Mobile')) {
            var mobile = requestBody.Mobile;
            var otherEntity = await this._service.getBusinessNodeWithMobile(mobile);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business node with mobile ${requestBody.Mobile} already exists!`);
            }
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            var email = requestBody.Email;
            var otherEntity = await this._service.getBusinessNodeWithEmail(email);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business node with email ${requestBody.Email} already exists!`);
            }
        }
        const updateModel: BusinessNodeUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update Business node!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business node with id ' + id.toString() + ' cannot be found!');
        }
        const businessDeleted = await this._service.delete(id);
        return {
            Deleted: businessDeleted
        };
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getValidNodeCreateModel = async (requestBody) => {

        const nodeService = new BusinessNodeService();

        var nodeWithPhone = await nodeService.getBusinessNodeWithMobile( requestBody.Mobile);
        if (nodeWithPhone) {
            ErrorHandler.throwDuplicateUserError(`User with phone ${requestBody.Mobile} already exists!`);
        }

        var nodeWithEmail = await nodeService.getBusinessNodeWithEmail(requestBody.Email);
        if (nodeWithEmail) {
            ErrorHandler.throwDuplicateUserError(`User with email ${requestBody.Email} already exists!`);
        }

        var nodeCreateModel: BusinessNodeCreateModel = await this.getNodeCreateModel(requestBody);
        return { nodeCreateModel};
    };

    getNodeCreateModel = (requestBody): BusinessNodeCreateModel => {
        return {
            BusinessId                : requestBody.BusinessId,
            Name                      : requestBody.Name,
            Mobile                    : requestBody.Mobile,
            Email                     : requestBody.Email,
            Address                   : requestBody.Address,
            DisplayPicture            : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            Longitude                 : requestBody.Longitude ? requestBody.Longitude : null,
            Lattitude                 : requestBody.Lattitude ? requestBody.Lattitude : null,
            OverallRating             : requestBody.OverallRating? requestBody.OverallRating : null,
            TimeZone                  : requestBody.TimeZone ? requestBody.TimeZone : "+05:30",
            AllowWalkinAppointments   : requestBody.AllowWalkinAppointments ? requestBody.AllowWalkinAppointments : true,
            AllowFutureBookingFor     : requestBody.AllowFutureBookingFor ? requestBody.AllowFutureBookingFor : '30d',
            IsActive                  : true,
        };
    };

    getSearchFilters = (query) => {

        var filters = {};

        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var businessId = query.businessId ? query.businessId : null;
        if (businessId != null) {
            filters['BusinessId'] = businessId;
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

    getUpdateModel = (requestBody): BusinessNodeUpdateModel => {

        let updateModel: BusinessNodeUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessId')) {
            updateModel.BusinessId = requestBody.BusinessId;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Mobile')) {
            updateModel.Mobile = requestBody.Mobile;
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            updateModel.Email = requestBody.Email;
        }
        if (Helper.hasProperty(requestBody, 'DisplayPicture')) {
            updateModel.DisplayPicture = requestBody.DisplayPicture;
        }
        if (Helper.hasProperty(requestBody, 'Address')) {
            updateModel.Address = requestBody.Address;
        }
        if (Helper.hasProperty(requestBody, 'Longitude')) {
            updateModel.Longitude = requestBody.Longitude;
        }
        if (Helper.hasProperty(requestBody, 'Lattitude')) {
            updateModel.Lattitude = requestBody.Lattitude;
        }
        if (Helper.hasProperty(requestBody, 'TimeZone')) {
            updateModel.TimeZone = requestBody.TimeZone;
        }
        if (Helper.hasProperty(requestBody, 'AllowWalkinAppointments')) {
            updateModel.AllowWalkinAppointments = requestBody.AllowWalkinAppointments;
        }
        if (Helper.hasProperty(requestBody, 'AllowFutureBookingFor')) {
            updateModel.AllowFutureBookingFor = requestBody.AllowFutureBookingFor;
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
            id                        : record.id,
            BusinessId                : record.BusinessId,
            Name                      : record.Name,
            Mobile                    : record.Mobile,
            Email                     : record.Email,
            DisplayPicture            : record.DisplayPicture,
            Address                   : record.Address,
            Longitude                 : record.Longitude,
            Lattitude                 : record.Lattitude,
            OverallRating             : record.OverallRating,
            TimeZone                  : record.TimeZone,
            AllowWalkinAppointments   : record.AllowWalkinAppointments,
            AllowFutureBookingFor     : record.AllowFutureBookingFor,
            IsActive                  : record.IsActive,
            CreatedAt                 : record.CreatedAt,
            UpdatedAt                 : record.UpdatedAt,
            IsDeleted                 : record.IsDeleted,
            DeletedAt                 : record.DeletedAt
        };
    };

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                        : record.id,
            BusinessId                : record.BusinessId,
            Name                      : record.Name,
            Mobile                    : record.Mobile,
            Email                     : record.Email,
            DisplayPicture            : record.DisplayPicture,
            Address                   : record.Address,
            Longitude                 : record.Longitude,
            Lattitude                 : record.Lattitude,
            OverallRating             : record.OverallRating,
            TimeZone                  : record.TimeZone,
            AllowWalkinAppointments   : record.AllowWalkinAppointments,
            AllowFutureBookingFor     : record.AllowFutureBookingFor,
            IsActive                  : record.IsActive,
            CreatedAt                 : record.CreatedAt,
            UpdatedAt                 : record.UpdatedAt,
            IsDeleted                 : record.IsDeleted,
            DeletedAt                 : record.DeletedAt
        };
    };
}
