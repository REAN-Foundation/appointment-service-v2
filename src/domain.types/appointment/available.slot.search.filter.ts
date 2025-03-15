import { uuid } from "../miscellaneous/system.types";

export interface FindAvailableSlotsSearchFilters {
  FromDate?       : Date;
  ToDate ?        : Date;
  BusinessUserId? : uuid;
}
