import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface BusinessSkillCreateModel {
    id?		            : string;
    BusinessNodeId 	    : string;
    Name             	: string;
    Description?        : string;
    DisplayPicture?     : string;
    IsActive            : Boolean;
};

export interface BusinessSkillUpdateModel {
    BusinessNodeId? 	: string;
    Name?             	: string;
    Description?        : string;
    DisplayPicture?     : string;
    IsActive?         	: Boolean;
};

export interface BusinessSkillDto {
    BusinessNodeId? 	: string;
    Name?             	: string;
    Description?        : string;
    DisplayPicture?     : string;
    IsActive ?        	: Boolean;
};
export interface BusinessSkillSearchFilters extends BaseSearchFilters {
    id?                 : string;
    BusinessNodeId? 	: string;
    Name?             	: string;
    Description?        : string;
    DisplayPicture? 	: string;
    IsActive?           : Boolean;
};
 export interface BusinessSkillSearchResults extends BaseSearchResults {
    Items: BusinessSkillDto[];
}