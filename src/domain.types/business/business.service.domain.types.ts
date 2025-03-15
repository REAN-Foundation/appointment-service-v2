import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface BusinessServiceCreateModel {
    id?                     : string;
    AllowCancellation       : boolean;
    BusinessNodeId          : string;
    CancellationCharges     : number; 
    CancellationWindow      : string;
    Description?            : string;
    DisplayServicePicture?  : string;
    EnableLoyalty           : boolean;
    Fees                    : number;
    IsActive                : boolean;
    IsTaxable               : boolean; 
    Name                    : string;
    PaymentPercent          : number;
    PaymentRequired         : boolean;
    PriorBookingWindow      : string;   
    ReminderType?           : string;  
    ReminderWindow?         : string;   
    SendReminder            : boolean;   
    ServiceDuration         : string;  
    TaxRate                 : number;     
};

export interface BusinessServiceUpdateModel {
    id?                         : string;
    AllowCancellation?          : boolean;
    BusinessNodeId?             : string;
    CancellationCharges?        : number; 
    CancellationWindow?         : string;
    Description?                : string;
    DisplayServicePicture?      : string;
    EnableLoyalty?              : boolean;
    Fees?                       : number;
    IsActive?                   : boolean;
    IsTaxable?                  : boolean; 
    Name?                       : string;
    PaymentPercent?             : number;
    PaymentRequired?            : boolean;
    PriorBookingWindow?         : string;   
    ReminderType?               : string;  
    ReminderWindow?             : string;   
    SendReminder?               : boolean;   
    ServiceDuration?            : string;  
    TaxRate?                    : number;     
};

export interface BusinessServiceDto {
    id?                         : string;
    AllowCancellation?          : boolean;
    BusinessNodeId?             : string;
    CancellationCharges?        : number; 
    CancellationWindow?         : string;
    Description?                : string;
    DisplayServicePicture?      : string;
    EnableLoyalty?              : boolean;
    Fees?                       : number;
    IsActive?                   : boolean;
    IsTaxable?                  : boolean; 
    Name?                       : string;
    PaymentPercent?             : number;
    PaymentRequired?            : boolean;
    PriorBookingWindow?         : string;   
    ReminderType?               : string;  
    ReminderWindow?             : string;   
    SendReminder?               : boolean;   
    ServiceDuration?            : string;  
    TaxRate?                    : number;     
    CreatedAt?                  : Date;
    UpdatedAt?                  : Date;
    IsDeleted?                  : boolean;
    DeletedAt?                  : Date
};

export interface BusinessServiceSearchFilters extends BaseSearchFilters {
    id?                         : string;
    AllowCancellation?          : boolean;
    BusinessNodeId?             : string;
    CancellationCharges?        : number; 
    CancellationWindow?         : string;
    Description?                : string;
    DisplayServicePicture?      : string;
    EnableLoyalty?              : boolean;
    Fees?                       : number;
    IsActive?                   : boolean;
    IsTaxable?                  : boolean; 
    Name?                       : string;
    PaymentPercent?             : number;
    PaymentRequired?            : boolean;
    PriorBookingWindow?         : string ;   
    ReminderType?               : string;  
    ReminderWindow?             : string;   
    SendReminder?               : boolean;   
    ServiceDuration?            : string;  
    TaxRate?                    : number;
};

export interface BusinessServiceSearchResults extends BaseSearchResults {
    Items: BusinessServiceDto[];
}
