import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface NotificationCreateModel {
    id?	            : string;
    Body?		    : string;
    BusinessNodeId  : string;
    CustomerId	    : string;
    IsRead		    : boolean;
    IsSent		    : boolean;
    Message?	    : string;
    ReadOn?	        : Date;
    SentOn?	        : Date;
    Title?	        : string;
    Type?	        : string;
    TypeId		    : number;
    IsActive		: boolean;
    DeletedAt?      : Date;
    IsDeleted?      : boolean;
}

export interface NotificationUpdateModel {
    Body?           : string;
    BusinessNodeId? : string;
    CustomerId?     : string;
    IsRead?         : boolean;
    IsSent?         : boolean;
    Message?	    : string;
    ReadOn?         : Date;
    SentOn?	        : Date;
    Title?          : string;
    Type?           : string;
    TypeId?         : number;
    IsActive?       : boolean;
    DeletedAt?      : Date;
    IsDeleted?      : boolean;
}

export interface NotificationDto {
    id              : string;
    Body?		    : string;
    BusinessNodeId  : string;
    CustomerId	    : string;
    IsRead		    : boolean;
    IsSent		    : boolean;
    Message?	    : string;
    ReadOn?	        : Date;
    SentOn?	        : Date;
    Title?	        : string;
    Type?	        : string;
    TypeId		    : number;
    IsActive		: boolean;
    CreatedAt       : Date;
    UpdatedAt       : Date;
    IsDeleted?      : boolean; 
    DeletedAt       : Date;
}

export interface NotificationSearchFilters extends BaseSearchFilters {
    Body?           : string;
    BusinessNodeId? : string;
    CustomerId?     : string;
    IsRead?         : boolean;
    IsSent?         : boolean;
    Message?	    : string;
    ReadOn?         : Date;
    SentOn?	        : Date;
    Title?          : string;
    Type?           : string;
    TypeId?         : number;
    IsActive?	    : boolean;
    DeletedAt?      : Date;
    IsDeleted?      : boolean;
};

export interface NotificationSearchResults extends BaseSearchResults {
    Items: NotificationDto[];
}
