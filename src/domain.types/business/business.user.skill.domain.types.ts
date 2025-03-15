import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface BusinessUserSkillCreateModel {
    id  ?		            : string   
    BusinessSkillId         : string    
    BusinessUserId          : string    
    IsActive          	    : boolean   
}

export interface BusinessUserSkillUpdateModel {
    BusinessSkillId         ? : string    
    BusinessUserId          ? : string    
    IsActive                ? : boolean   
}

export interface BusinessUserSkillDto {   
  id   		                : string   
  BusinessSkillId           : string    
  BusinessUserId            : string    
  IsActive          	    : boolean   
}

export interface BusinessUserSkillSearchFilters extends BaseSearchFilters {
    BusinessSkillId       ? : string    
    BusinessUserId   	  ? : string;
    IsActive         	  ? : boolean;
}

export interface BusinessUserSkillSearchResults extends BaseSearchResults {
    Items: BusinessUserSkillDto[];
}
