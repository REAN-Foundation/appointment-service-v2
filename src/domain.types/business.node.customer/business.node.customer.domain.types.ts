import { float } from "aws-sdk/clients/cloudfront";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface BusinessNodeCustomerCreateModel {
    id?                 : string;
    BusinessNodeId      : string;
    CustomerId	        : string;
    SmsConsent          : string;
    IsActive		    : boolean;
}

export interface BusinessNodeCustomerUpdateModel {
    BusinessNodeId?     : string;
    CustomerId?         : string;
    SmsConsent?         : string;
    IsActive?           : boolean;
}

export interface BusinessNodeCustomerDto {
    id                  : string;
    BusinessNodeId      : string;
    CustomerId	        : string;
    SmsConsent          : string;
    IsActive		    : boolean;
    CreatedAt           : Date;
    UpdatedAt           : Date;
    IsDeleted           : boolean;
    DeletedAt           : Date;
}

export interface BusinessNodeCustomerSearchFilters extends BaseSearchFilters {
    BusinessNodeId? : string;
    CustomerId?     : string;
    SmsConsent?     : string;
    IsActive?       : boolean;
}

export interface BusinessNodeCustomerSearchResults extends BaseSearchResults {
    Items: BusinessNodeCustomerDto[];
}