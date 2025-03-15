import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { float } from "aws-sdk/clients/cloudfront";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface BusinessNodeCreateModel {
    id?                     : String;
    BusinessId              : String; 
    Name                    : String; 
    Mobile                  : String;  
    Email                   : String;
    DisplayPicture?         : String;
    Address                 : String;
    Longitude?              : String;
    Lattitude?              : String;
    OverallRating?          : float;
    TimeZone                : String; 
    AllowWalkinAppointments : Boolean;  
    AllowFutureBookingFor   : String;
    IsActive                : Boolean; 
  }

export interface BusinessNodeUpdateModel {
    id?                       : String;
    BusinessId?               : String;  
    Name?                     : String;
    Mobile?                   : String;  
    Email?                    : String; 
    DisplayPicture?           : String;
    Address?                  : String;
    Longitude?                : String;
    Lattitude?                : String;
    OverallRating?            : float;
    TimeZone?                 : String; 
    AllowWalkinAppointments?  : Boolean;  
    AllowFutureBookingFor?    : String;
    IsActive?                 : Boolean; 
}

export interface BusinessNodeDto {
    id                       : String;
    BusinessId               : String;  
    Name                     : String;
    Mobile                   : String;
    Email                    : String;
    DisplayPicture           : String;
    Address                  : String;
    Longitude                : String;
    Lattitude                : String;
    OverallRating            : float;
    TimeZone                 : String; 
    AllowWalkinAppointments  : Boolean;  
    AllowFutureBookingFor    : String;
    IsActive                 : Boolean;
    CreatedAt                : Date;
    UpdatedAt                : Date;
    IsDeleted                : boolean;
    DeletedAt                : Date;
}

export interface BusinessNodeSearchFilters extends BaseSearchFilters {
    
    id?                       : String;
    BusinessId?               : String;  
    Name?                     : String;
    Mobile?                   : String;
    Email?                    : String;
    DisplayPicture?           : String;
    Address?                  : String;
    Longitude?                : String;
    Lattitude?                : String;
    OverallRating?            : float;
    TimeZone?                 : String; 
    AllowWalkinAppointments?  : Boolean; 
    AllowFutureBookingFor?    : String;
    IsActive?                 : Boolean;    
}

export interface BusinessNodeSearchResults extends BaseSearchResults {
    Items: BusinessNodeDto[];
}

