import { float } from "aws-sdk/clients/cloudfront";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender } from "../miscellaneous/system.types";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface BusinessUserCreateModel {
  id?                           :   String;
  BusinessNodeId                :   String;
  FirstName                     :   String;
  LastName                      :   String;
  Prefix                        :   String; 
  Mobile                        :   String;
  Email?                        :   String;
  DisplayPicture?               :   String;
  AboutMe?                      :   String;
  Qualification?                :   String;
  Experience?                   :   String;
  OverallRating?                :   float;
  Dob?                          :   Date;
  Gender?                       :   Gender; 
  IsAvailableForEmergency?      :   Boolean; 
  Facebook?                     :   String;
  Linkedin?                     :   String;
  Twitter?                      :   String;
  Instagram?                    :   String;
  Yelp?                         :   String;
  IsActive                      :   Boolean; 
}
  
export interface BusinessUserUpdateModel {
  id?                            :   String;  
  BusinessNodeId?                :   String;
  FirstName?                     :   String;
  LastName?                      :   String;
  Prefix?                        :   String; 
  Mobile?                        :   String;
  Email?                         :   String;
  DisplayPicture?                :   String;
  AboutMe?                       :   String;
  Qualification?                 :   String;
  Experience?                    :   String;
  OverallRating?                 :   float;
  Dob?                           :   Date;
  Gender?                        :   Gender;
  IsAvailableForEmergency?       :   Boolean;
  Facebook?                      :   String;
  Linkedin?                      :   String;
  Twitter?                       :   String;
  Instagram?                     :   String;
  Yelp?                          :   String;
  IsActive?                      :   Boolean; 
}

export interface BusinessUserDto {
    id                            :   String;
    BusinessNodeId                :   String;
    FirstName                     :   String;
    LastName                      :   String;
    Prefix                        :   String; 
    Mobile                        :   String;
    Email                         :   String;
    DisplayPicture                :   String;
    AboutMe                       :   String;
    Qualification                 :   String;
    Experience                    :   String;
    OverallRating                 :   float;
    Dob                           :   Date;
    Gender                        :   String;
    IsAvailableForEmergency       :   Boolean; 
    Facebook                      :   String;
    Linkedin                      :   String;
    Twitter                       :   String;
    Instagram                     :   String;
    Yelp                          :   String;
    IsActive                      :   Boolean; 
      
}

export interface BusinessUserSearchFilters extends BaseSearchFilters {
  BusinessNodeId?                 :   String;
  Name?                           :   String;  
  businessId?                     :   String;
  businessServiceId?              :   String;
}

export interface BusinessUserSearchResults extends BaseSearchResults {
    Items: BusinessUserDto[];
}

