import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";

export interface ApiClientCreateModel {
    id?          : string;
    ClientName   : string;
    FirstName?   : string;
    LastName?    : string;
    CountryCode? : string;
    ClientCode?  : string;
    Password?    : string;
    Phone?       : string;
    Email?       : string;
    ApiKey?      : string;
    IsPrivileged?: boolean;
    ValidFrom?   : Date;
    ValidTill?   : Date;    
}

export interface ApiClientUpdateModel {
    ClientName?     : string;
    FirstName?      : string;
    LastName?       : string;
    ClientCode?     : string;
    IsPrivileged?   : boolean;
    CountryCode?    : string;
    Phone?          : string;
    Email?          : string;
    Password?       : string;
    ApiKey?         : string;
    ValidFrom?      : Date;
    ValidTill?      : Date;
}

export interface ApiClientVerificationDomainModel {
    ClientCode: string;
    Password  : string;
    ValidFrom : Date;
    ValidTill : Date;
}

export interface ApiClientDto {
    id           : string;
    FirstName?   : string;
    LastName?    : string;
    CountryCode? : string;
    ClientName   : string;
    ClientCode   : string;
    Phone        : string;
    Email        : string;
    ApiKey?      : string;
    IsPrivileged : boolean;
    ValidFrom?   : Date;
    ValidTill?   : Date;
    CreatedAt?   : Date;
    UpdatedAt?   : Date;
    IsDeleted?   : boolean; 
    DeletedAt?   : Date;
}

export interface ClientApiKeyDto {
    id        : string;
    ClientName: string;
    ClientCode: string;
    ApiKey    : string;
    ValidFrom : Date;
    ValidTill : Date;
}

export interface ApiClientSearchFilters extends BaseSearchFilters {
    ClientName?     : string;
    ClientCode?     : string;
    CountryCode?    : string;
    IsPrivileged?   : boolean;
    Phone?          : string;
    Email?          : string;
    CreatedAt?      : string;
    ValidFrom?      : Date;
    ValidTill?      : Date;
}

export interface ApiClientSearchResults extends BaseSearchResults {
    Items: ApiClientDto[];
}
