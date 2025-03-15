import { float } from "aws-sdk/clients/cloudfront";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface AppointmentStatusCreateModel {
    id ?	                : string;
    BusinessNodeId          : string;
    IsCancellationStatus    : boolean;
    IsCompletedStatus       : boolean;
    IsConfirmedStatus       : boolean;
    IsDashboardStatus       : boolean;
    IsWalkinEntryStatus     : boolean;
    NotificationText ?      : string;
    SendNotification        : boolean;
    SendSms                 : boolean;
    Sequence                : number;
    SmsText  ?              : string;
    Status	?	            : string;
    StatusCode ?            : string;
    StatusColor ?           : string;
    IsActive		        : boolean;
}

export interface AppointmentStatusUpdateModel {
    BusinessNodeId       ?   : string;
    IsCancellationStatus ?   : boolean;
    IsCompletedStatus    ?   : boolean;
    IsConfirmedStatus    ?   : boolean;
    IsDashboardStatus    ?   : boolean;
    IsWalkinEntryStatus  ?   : boolean;
    NotificationText     ?   : string;
    SendNotification     ?   : boolean;
    SendSms              ?   : boolean;
    Sequence             ?   : number;
    SmsText              ?   : string;
    Status		         ?   : string;
    StatusCode           ?   : string;
    StatusColor          ?   : string;
    IsActive		     ?   : boolean;
}

export interface AppointmentStatusDto {
    id ?	                : string;
    BusinessNodeId          : string;
    IsCancellationStatus    : boolean;
    IsCompletedStatus       : boolean;
    IsConfirmedStatus       : boolean;
    IsDashboardStatus       : boolean;
    IsWalkinEntryStatus     : boolean;
    NotificationText ?      : string;
    SendNotification        : boolean;
    SendSms                 : boolean;
    Sequence                : number;
    SmsText  ?              : string;
    Status	?	            : string;
    StatusCode ?            : string;
    StatusColor ?           : string;
    IsActive		        : boolean;
    CreatedAt               : Date;
    UpdatedAt               : Date;
    IsDeleted               : boolean;
    DeletedAt  ?            : Date;
}

export interface AppointmentStatusSearchFilters extends BaseSearchFilters {
    BusinessNodeId ?        : string;
}

export interface AppointmentStatusSearchResults extends BaseSearchResults {
Items : AppointmentStatusDto[];
}
