import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface CustomerCreateModel {
    id?             :string;
    Prefix?         : string;
    FirstName?      : string;
    LastName?       : string;
    Mobile          : string   
    Email?          : string;
    BirthDate?      : Date;
    Gender?         : string; 
    DisplayPicture? : string;
    Address?        : string; 
    InAppUser       : Boolean;  
    IsActive        : Boolean;       
};

export interface CustomerUpdateModel {
    Prefix?         : string;
    FirstName?      : string;
    LastName?       : string;
    Mobile?         : string   
    Email?          : string;
    BirthDate?      : Date;
    Gender?         : string; 
    DisplayPicture? : string;
    Address?        : string;
    InAppUser?      : Boolean; 
    IsActive?       : Boolean;  
}

export interface CustomerDto {
    id              : string;
    Prefix          : string;
    FirstName       : string;
    LastName        : string;
    Mobile          : string   
    Email           : string;
    BirthDate       : Date;
    Gender          : string; 
    DisplayPicture  : string;
    Address         : string; 
    InAppUser       : Boolean;  
    IsActive        : Boolean; 
    CreatedAt       : Date;
    UpdatedAt       : Date;
    IsDeleted?      : boolean; 
    DeletedAt       : Date;
}

export interface CustomerSearchFilters extends BaseSearchFilters {
    FirstName?: string;
    LastName? : string;
    Mobile?   : string;
    Email?    : string;
}

export interface CustomerSearchResults extends BaseSearchResults {
    Items: CustomerDto[];
}
