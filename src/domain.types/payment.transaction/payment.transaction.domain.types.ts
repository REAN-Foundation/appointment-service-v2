import { float } from "aws-sdk/clients/cloudfront";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface PaymentTransactionCreateModel {
    AppointmentId?	    : string;
    BusinessNodeId      : string;
    CompletedOn?        : Date;
    Currency?           : string;
    CustomerId	        : string;
    ExternalId?         : string;
    InitiatedOn?	    : Date;
    IsComplete		    : boolean;
    Status?	            : string;
    TotalAmount         : float;
    IsActive		    : boolean;
}

export interface PaymentTransactionUpdateModel {
    AppointmentId?  : string;
    BusinessNodeId? : string;
    CompletedOn?    : Date;
    Currency?       : string;
    CustomerId?     : string;
    ExternalId?     : string;
    InitiatedOn?    : Date;
    IsComplete?	    : boolean;
    Status?	        : string;
    TotalAmount?    : float;
    IsActive?       : boolean;
}

export interface PaymentTransactionDto {
    id?             : string;
    AppointmentId?  : string;
    BusinessNodeId  : string;
    CompletedOn?    : Date;
    Currency?       : string;
    CustomerId      : string;
    ExternalId?     : string;
    InitiatedOn?    : Date;
    IsComplete      : boolean;
    Status?	        : string;
    TotalAmount     : float;
    IsActive        : boolean;
}	    

export interface PaymentTransactionSearchFilters extends BaseSearchFilters {
    AppointmentId?	    : string;
    BusinessNodeId?     : string;
    CustomerId ?        : string;
    IsActive ?		    : boolean;
};

export interface PaymentTransactionSearchResults extends BaseSearchResults {
    Items: PaymentTransactionDto[];
}