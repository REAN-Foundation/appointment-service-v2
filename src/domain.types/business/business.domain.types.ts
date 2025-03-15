
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, uuid } from "../miscellaneous/system.types";

export interface BusinessCreateModel {
    id?              : string;
    ExternalId?      : string;
    Name             : string;
    Mobile           : string;  
    Email            : string;
    AboutUs?         : string;
    Logo?            : string; 
    DisplayPicture?  : string;
    OverallRating?   : number;
    Address?         : string; 
    ApiKey?          : string;
    Facebook?        : string;
    Linkedin?        : string;
    Twitter?         : string;
    Instagram?       : string;
    Yelp?            : string;
    IsActive         : Boolean;
          
};

export interface BusinessUpdateModel {
    ExternalId?      : string
    Name?            : string;
    Mobile?          : string;   
    Email?           : string;
    AboutUs?         : string;
    Logo?            : string; 
    DisplayPicture?  : string;
    OverallRating?   : number;
    Address?         : string; 
    ApiKey?          : string;
    Facebook?        : string;
    Linkedin?        : string;
    Twitter?         : string;
    Instagram?       : string;
    Yelp?            : string;
    IsActive?        : Boolean;
           
}

export interface BusinessDto {
   
    ExternalId      : string;
    Name            : string;
    Mobile          : string;  
    Email           : string;
    AboutUs         : string;
    Logo            : string; 
    DisplayPicture  : string;
    OverallRating   : number;
    Address         : string; 
    ApiKey          : string;
    Facebook        : string;
    Linkedin        : string;
    Twitter         : string;
    Instagram       : string;
    Yelp            : string;
    IsActive        : Boolean;
    // createdAt       : Date;
    // updatedAt       : Date;
      
}

export interface BusinessSearchFilters extends BaseSearchFilters {
    
    ExternalId ?     : string;
    Name ?           : string;
    Mobile?          : string;  
    Email?           : string;
    AboutUs?         : string;
    Logo?            : string; 
    DisplayPicture?  : string;
    OverallRating ?  : number;
    Address?         : string; 
    Facebook?        : string;
    Linkedin?        : string;
    Twitter?         : string;
    Instagram?       : string;
    Yelp?            : string;
    IsActive?        : Boolean;

    
}

export interface BusinessSearchResults extends BaseSearchResults {
    Items: BusinessDto[];
}
