import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface BusinessUserServiceCreateModel {
    id?                : string;
    BusinessUserId     : string;
    BusinessServiceId  : string;
    IsActive           : boolean;
}
export interface BusinessUserServiceCreateManyModel {
    Items: BusinessUserServiceDto[];
}
export interface BusinessUserServiceUpdateModel {
    id?                  : string;
    BusinessUserId?      : string;
    BusinessServiceId?   : string;
    IsActive?            : boolean;
}

export interface BusinessUserServiceDto {
    id?                  : string;
    BusinessUserId?      : string;
    BusinessServiceId?   : string;
    IsActive?            : boolean;
    CreatedAt?           : Date;
    UpdatedAt?           : Date;
    DeletedAt?           : Date; 
}

export interface BusinessUserServiceSearchFilters extends BaseSearchFilters {
    id?                 : string;
    BusinessUserId?     : string;
    BusinessServiceId?  : string;
    IsActive?           : boolean;
}

export interface BusinessUserServiceSearchResults extends BaseSearchResults {
    Items: BusinessUserServiceDto[];
}