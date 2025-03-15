import { float } from "aws-sdk/clients/cloudfront";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface AppointmentCreateModel {
    id?	                        : string;
    BusinessNodeId              : string;
    BusinessServiceId           : string;
    BusinessUserId              : string;
    CustomerId                  : string;
    CancelledOn?                : Date;
    CompletedOn?                : Date;
    ConfirmedOn?                : Date;
    CouponCode?                 : string;
    DisplayId                   : string;
    Discount                    : float;
    EndTime?                    : Date;
    Fees                        : float;
    IsCancelled                 : boolean;
    IsCompleted                 : boolean;
    IsConfirmed                 : boolean;
    IsPaid                      : boolean;
    IsRescheduled               : boolean;
    Note?                       : string;
    RescheduledAppointmentId?   : number;
    RescheduledOn?              : Date;
    StartTime?                  : Date;
    Status                      : string;
    StatusCode                  : string;
    Tax                         : float;
    Tip                         : float;
    Total                       : float;
    TransactionId?              : string;
    Type                        : string;
    IsActive                    : boolean;
}

export interface AppointmentUpdateModel {
    BusinessNodeId?             : string;
    BusinessServiceId?          : string;
    BusinessUserId?             : string;
    CustomerId?                 : string;
    StartTime?                  : Date;
    EndTime?                    : Date;
    Type?                       : string;
    Note?                       : string;
    Status?                     : string;
    StatusCode?                 : string;
    Fees?                       : float;
    Tax?                        : float;
    Tip?                        : float;
    Discount?                   : float;
    CouponCode?                 : string;
    Total?                      : float;
    IsPaid?                     : boolean;
    TransactionId?              : string;   
}

export interface AppointmentDto {
    id?	                        : string;
    BusinessNodeId              : string;
    BusinessServiceId           : string;
    BusinessUserId              : string;
    CustomerId                  : string;
    CancelledOn?                : Date;
    CompletedOn?                : Date;
    ConfirmedOn?                : Date;
    CouponCode?                 : string;
    DisplayId                   : string;
    Discount                    : float;
    EndTime?                    : Date;
    Fees                        : float;
    IsCancelled                 : boolean;
    IsCompleted                 : boolean;
    IsConfirmed                 : boolean;
    IsPaid                      : boolean;
    IsRescheduled               : boolean;
    Note?                       : string;
    RescheduledAppointmentId?   : number;
    RescheduledOn?              : Date;
    StartTime?                  : Date;
    Status                      : string;
    StatusCode                  : string;
    Tax                         : float;
    Tip                         : float;
    Total                       : float;
    TransactionId?              : string;
    Type                        : string;
    IsActive                    : boolean;
    Date?                       : Date;
    CreatedAt                   : Date;
    UpdatedAt                   : Date;
    IsDeleted                   : boolean;
    DeletedAt                   : Date;
}

export interface SlotsByDateDto {
    CurrentMoment       : Date;
    Date                : Date;
    DayStartTime        : Date;
    DayEndTime          : Date;
    WeekDay             : number;
    userOffDay          : boolean; 
    Slots               : SlotsDto[];
}

export interface SlotsDto {
    slotStart       : Date;
    slotEnd         : Date;
    available       : boolean;
}


export interface AppointmentSearchFilters extends BaseSearchFilters {
    FromDate?       : Date;
    ToDate?         : Date;
    BusinessUserId? : uuid;
    Minutes?        : string;  
}

export interface AppointmentSearchResults extends BaseSearchResults {
Items : AppointmentDto[];
}