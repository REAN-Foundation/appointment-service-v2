
///////////////////////////////////////////////////////////////////////////////////////

import { ApiError } from "../../common/api.error";
import { CustomerCreateModel, CustomerDto, CustomerUpdateModel, CustomerSearchFilters, CustomerSearchResults } from "../../domain.types/customer/customer.domain.types";
import { CustomerValidator as validator } from './customer.validator';
import { CustomerService } from '../../database/repository.services/customer.service';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../../common/error.handler";
import { Helper } from "../../common/helper";

export class CustomerControllerDelegate {

    //#region member variables and constructors

    _service: CustomerService = null;

    constructor() {
        this._service = new CustomerService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        const { CreateModel } =
            await this.getValidCustomerCreateModel(requestBody);

        // eslint-DisplayPictureable-next-line @typescript-eslint/no-unused-vars
        var createModel: CustomerCreateModel = this.getCreateModel(requestBody);
        const record: CustomerDto = await this._service.create(CreateModel);
        if (record === null) {
            throw new ApiError('Unable to create Customer!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Customer with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: CustomerSearchFilters = this.getSearchFilters(query);
        var searchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) =>{
        await validator.validateUpdateRequest(requestBody);
        const record: CustomerDto = await this._service.getById(id);
        if (record === null) {
          ErrorHandler.throwNotFoundError(" Customer with id " + id.toString() + "cannot be found!");
        }

        if (Helper.hasProperty(requestBody, 'Mobile')) {
            var mobile = requestBody.Mobile;
            var otherEntity = await this._service.getCustomerWithMobile(mobile);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business customer with mobile ${requestBody.Mobile} already exists!`);
            }
        }

        if (Helper.hasProperty(requestBody, 'Email')) {
            var email = requestBody.Email;
            var otherEntity = await this._service.getCustomerWithEmail(email);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business customer with email ${requestBody.Email} already exists!`);
            }
        }

        const updateModel: CustomerUpdateModel = this.getUpdateModel(requestBody);
        const updated: CustomerDto = await this._service.update(id , updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update customer!', 400);
        }

        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record: CustomerDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Customer with id ' + id.toString() + ' cannot be found!');
        }
        const customerDeleted = await this._service.delete(id);
        return {
            Deleted : customerDeleted
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): CustomerCreateModel => {
        const birthDate = requestBody.BirthDate ? Date.parse(requestBody.BirthDate) : null;
        return {
            Prefix          : requestBody.Prefix,
            FirstName       : requestBody.FirstName,
            LastName        : requestBody.LastName,
            Mobile          : requestBody.Mobile,
            Email           : requestBody.Email,
            BirthDate       : new Date(birthDate),
            Gender          : requestBody.Gender,
            DisplayPicture  : requestBody.DisplayPicture ? requestBody.DisplayPicture: null,
            Address         : requestBody.Address ? requestBody.Address : null,
            InAppUser       : requestBody.InAppUser ? requestBody.InAppUser : true,
            IsActive        : true,
        };
    };

    getValidCustomerCreateModel = async (requestBody) => {

        const validCustomerService = new CustomerService();
        var customerWithMobile = await validCustomerService.getCustomerWithMobile(requestBody.Mobile);
        if (customerWithMobile) {
            ErrorHandler.throwDuplicateUserError(`User with phone ${requestBody.Mobile} already exists!`);
        }

        var customerWithEmail = await validCustomerService.getCustomerWithEmail(requestBody.Email);
        if (customerWithEmail) {
            ErrorHandler.throwDuplicateUserError(`User with email ${requestBody.Email} already exists!`);
        }

        var CreateModel: CustomerCreateModel = await this.getCreateModel(requestBody);
        return { CreateModel};
    };

    getSearchFilters = (query) => {
        var filters = {};
        var firstName = query.firstName ? query.firstName : null;
        if (firstName != null) {
            filters['FirstName'] = firstName;
        }
        var lastName = query.lastName ? query.lastName : null;
        if (lastName != null) {
            filters['LastName'] = lastName;
        }
        var mobile = query.mobile ? query.mobile : null;
        if (mobile != null) {
            filters['Mobile'] = mobile;
        }
        var email = query.email ? query.email : null;
        if (email != null) {
            filters['Email'] = email;
        }
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
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

    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            Prefix              : record.Prefix,
            FirstName           : record.FirstName,
            LastName            : record.LastName,
            Mobile              : record.Mobile,
            Email               : record.Email,
            Gender              : record.Gender,
            DisplayPicture      : record.DisplayPicture,
            BirthDate           : record.BirthDate,
            Address             : record.Address,
            IsActive            : record.IsActive,
            InAppUser           : record.InAppUser,
            CreatedAt           : record.createdAt,
            UpdatedAt           : record.updatedAt,
            DeletedAt           : record.DeletedAt,
            IsDeleted           : record.IsDeleted
        };
    };

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            Prefix              : record.Prefix,
            FirstName           : record.FirstName,
            LastName            : record.LastName,
            Mobile              : record.Mobile,
            Email               : record.Email,
            Gender              : record.Gender,
            DisplayPicture      : record.DisplayPicture,
            BirthDate           : record.BirthDate,
            Address             : record.Address,
            IsActive            : record.IsActive,
            InAppUser           : record.InAppUser,
            CreatedAt           : record.createdAt,
            UpdatedAt           : record.updatedAt,
            DeletedAt           : record.DeletedAt,
            IsDeleted           : record.IsDeleted
        };
    };

    getUpdateModel = (requestBody): CustomerUpdateModel => {

        let updateModel: CustomerUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'Prefix')) {
            updateModel.Prefix = requestBody.Prefix;
        }
        if (Helper.hasProperty(requestBody, 'FirstName')) {
            updateModel. FirstName = requestBody.FirstName;
        }
        if (Helper.hasProperty(requestBody, 'LastName')) {
            updateModel.LastName = requestBody.LastName;
        }
        if (Helper.hasProperty(requestBody, 'Mobile')) {
            updateModel.Mobile = requestBody.Mobile;
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            updateModel.Email = requestBody.Email
        }
        if (Helper.hasProperty(requestBody, 'Gender')) {
            updateModel.Gender = requestBody.Gender;
        }
        if (Helper.hasProperty(requestBody, 'DisplayPicture')) {
            updateModel.DisplayPicture = requestBody.DisplayPicture;
        }
        if (Helper.hasProperty(requestBody, 'BirthDate')) {
            updateModel.BirthDate = requestBody.BirthDate;
        }
        if (Helper.hasProperty(requestBody, 'Address')) {
            updateModel.Address = requestBody.Address
        }
        if (Helper.hasProperty(requestBody, 'IsActive')) {
            updateModel.IsActive = requestBody.IsActive;
        }
        if (Helper.hasProperty(requestBody, 'InAppUser')) {
            updateModel.InAppUser = requestBody.InAppUser;
        }
    
        return updateModel;
    };
}
