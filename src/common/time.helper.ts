
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { DateStringFormat, DurationType } from "../domain.types/miscellaneous/time.types";
import dayjsBusinessDays from 'dayjs-business-days2';

//////////////////////////////////////////////////////////////////////////////////////////////////////

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.extend(weekday);
dayjs.extend(duration);
dayjs.extend(calendar);
dayjs.extend(dayjsBusinessDays);

//////////////////////////////////////////////////////////////////////////////////////////////////////

export class TimeHelper {

    static timestamp = (date: Date): string => {
        return date.getTime().toString();
    };

    static getDateString = (date: Date, format: DateStringFormat): string => {

        if (format === DateStringFormat.YYYY_MM_DD) {
            return date.toISOString().split('T')[0];
        }
        return date.toISOString().split('T')[0];
    };

    static addDuration = (date: Date, durationValue: number, durationType: DurationType, utc = false): Date => {

        var date_ = utc === true ? dayjs(date).utc() : dayjs(date);
        var newDate_ = date_;
        
        if (durationType === DurationType.Milisecond) {
            newDate_ = date_.add(durationValue, 'milliseconds');
        }
        if (durationType === DurationType.Second) {
            newDate_ = date_.add(durationValue, 'seconds');
        }
        if (durationType === DurationType.Minute) {
            newDate_ = date_.add(durationValue, 'minutes');
        }
        if (durationType === DurationType.Hour) {
            newDate_ = date_.add(durationValue, 'hours');
        }
        if (durationType === DurationType.Day) {
            newDate_ = date_.add(durationValue, 'days');
        }
        if (durationType === DurationType.Week) {
            newDate_ = date_.add(durationValue, 'weeks');
        }
        if (durationType === DurationType.Month) {
            newDate_ = date_.add(durationValue, 'months');
        }
        if (durationType === DurationType.Year) {
            newDate_ = date_.add(durationValue, 'years');
        }

        var str = newDate_.format();
        return new Date(str);
    };

    static subtractDuration = (date: Date, durationValue: number, durationType: DurationType, utc = false): Date => {

        var date_ = utc === true ? dayjs(date).utc() : dayjs(date);
        var newDate_ = dayjs().utc();
        
        if (durationType === DurationType.Milisecond) {
            newDate_ = date_.subtract(durationValue, 'milliseconds');
        }
        if (durationType === DurationType.Second) {
            newDate_ = date_.subtract(durationValue, 'seconds');
        }
        if (durationType === DurationType.Minute) {
            newDate_ = date_.subtract(durationValue, 'minutes');
        }
        if (durationType === DurationType.Hour) {
            newDate_ = date_.subtract(durationValue, 'hours');
        }
        if (durationType === DurationType.Day) {
            newDate_ = date_.subtract(durationValue, 'days');
        }
        if (durationType === DurationType.Week) {
            newDate_ = date_.subtract(durationValue, 'weeks');
        }
        if (durationType === DurationType.Month) {
            newDate_ = date_.subtract(durationValue, 'months');
        }
        if (durationType === DurationType.Year) {
            newDate_ = date_.subtract(durationValue, 'years');
        }

        var str = newDate_.format();
        return new Date(str);
    };

    static isBefore = (first, second): boolean => {
        return dayjs(first).isBefore(dayjs(second));
    };

    static isAfter = (first, second): boolean => {
        return dayjs(first).isAfter(dayjs(second));
    };

    static durationFromString = (str: string, durationType: DurationType): number => {

        var durationInHours = 0;
        var tokens = str.toLowerCase().split(":");
    
        for (var i = 0; i < tokens.length; i++) {
    
            var x = tokens[i];
    
            if (x.includes("h")) {
                x = x.replace("h", "");
                var hours = parseInt(x);
                durationInHours += hours;
            }
            if (x.includes("d")) {
                x = x.replace("d", "");
                var days = parseInt(x);
                durationInHours += (days * 24);
            }
            if (x.includes("w")) {
                x = x.replace("w", "");
                var weeks = parseInt(x);
                durationInHours += (weeks * 24 * 7);
            }
            if (x.includes("m")) {
                x = x.replace("m", "");
                var months = parseInt(x);
                durationInHours += (months * 24 * 30);
            }
        }

        if (durationType === DurationType.Milisecond) {
            return durationInHours * 60 * 60 * 1000;
        }
        if (durationType === DurationType.Second) {
            return durationInHours * 60 * 60;
        }
        if (durationType === DurationType.Minute) {
            return durationInHours * 60;
        }
        if (durationType === DurationType.Hour) {
            return durationInHours;
        }
        if (durationType === DurationType.Day) {
            return durationInHours / 24.0;
        }
        if (durationType === DurationType.Week) {
            return durationInHours / (24.0 * 7);
        }
        if (durationType === DurationType.Month) {
            return durationInHours / (24.0 * 30);
        }
        if (durationType === DurationType.Year) {
            return durationInHours / (24.0 * 365);
        }
        return durationInHours;
    };

    // static getTimezoneOffsets = (timezoneOffsetStr: string, durationType: DurationType): number => {

    //     var offsetTmp = timezoneOffsetStr;
    //     var offsetMinutes = 0;

    //     if (timezoneOffsetStr.includes('+')) {
    //         offsetTmp = offsetTmp.replace('+', '-');
    //     }
    //     else if (!timezoneOffsetStr.includes('-')) {
    //         offsetTmp = offsetTmp.replace(' ', '');
    //         offsetTmp = '-' + offsetTmp;
    //     }
    //     else if (timezoneOffsetStr.includes('-')) {
    //         offsetTmp = offsetTmp.replace('-', '+');
    //     }
    
    //     if (timezoneOffsetStr.includes(':')) {
    //         var tokens = offsetTmp.split(":");
    //         var offset_hours = parseInt(tokens[0]);
    //         var offset_minutes = parseInt(tokens[1]);
    //         if (offset_hours < 0) {
    //             offset_minutes = -1 * offset_minutes;
    //         }
    //         offsetMinutes = (offset_hours * 60) + offset_minutes;
    //     }
    //     else {
    //         var len = offsetTmp.length;
    //         var min = offsetTmp.substring(len - 2, len);
    //         var hr = offsetTmp.substring(0, len - 2);
    //         var offset_hours = parseInt(hr);
    //         var offset_minutes = parseInt(min);
    //         if (offset_hours < 0) {
    //             offset_minutes = -1 * offset_minutes;
    //         }
    //         offsetMinutes = (offset_hours * 60) + offset_minutes;
    //     }

    //     if (durationType === DurationType.Milisecond) {
    //         return offsetMinutes * 60 * 1000;
    //     }
    //     if (durationType === DurationType.Second) {
    //         return offsetMinutes * 60 ;
    //     }
    //     if (durationType === DurationType.Minute) {
    //         return offsetMinutes;
    //     }
    //     if (durationType === DurationType.Hour) {
    //         return offsetMinutes / 60.0;
    //     }
    //     if (durationType === DurationType.Day) {
    //         return offsetMinutes / (24.0 * 60);
    //     }
    //     if (durationType === DurationType.Week) {
    //         return offsetMinutes / (24.0 * 60 * 7);
    //     }
    //     if (durationType === DurationType.Month) {
    //         return offsetMinutes / (24.0 * 60 * 30);
    //     }
    //     if (durationType === DurationType.Year) {
    //         return offsetMinutes / (24.0 * 60 * 365);
    //     }
    //     return offsetMinutes;
    // };

    static strToUtc = (dateStr: string, timeZoneOffsetMinutes?: number): Date => {

        if (timeZoneOffsetMinutes !== undefined) {
            var d = new Date(dateStr + 'T00:00:00.000Z').getTime();
            var correction = d + (timeZoneOffsetMinutes * 60000);
            var corrected = (new Date()).setTime(correction);
            return new Date(corrected);
        }
        else {
            var d = new Date(dateStr + 'T00:00:00.000Z').getTime();
            var corrected = (new Date()).setTime(d);
            return new Date(corrected);
        }
    };

    static format = (date: Date, formatTemplate?: string): string => {
        return dayjs(date).format(formatTemplate);
    };

    static startOf = (date: Date, durationType: DurationType): Date => {

        if (durationType === DurationType.Second) {
            return dayjs(date)
                .startOf('second')
                .toDate();
        }
        if (durationType === DurationType.Minute) {
            return dayjs(date)
                .startOf('minute')
                .toDate();
        }
        if (durationType === DurationType.Hour) {
            return dayjs(date)
                .startOf('hour')
                .toDate();
        }
        if (durationType === DurationType.Day) {
            return dayjs(date)
                .startOf('day')
                .toDate();
        }
        if (durationType === DurationType.Week) {
            return dayjs(date)
                .startOf('week')
                .toDate();
        }
        if (durationType === DurationType.Month) {
            return dayjs(date)
                .startOf('month')
                .toDate();
        }
        if (durationType === DurationType.Year) {
            return dayjs(date)
                .startOf('year')
                .toDate();
        }
        return date;
    };

    static endOf = (date: Date, durationType: DurationType): Date => {

        if (durationType === DurationType.Second) {
            return dayjs(date)
                .endOf('second')
                .toDate();
        }
        if (durationType === DurationType.Minute) {
            return dayjs(date)
                .endOf('minute')
                .toDate();
        }
        if (durationType === DurationType.Hour) {
            return dayjs(date)
                .endOf('hour')
                .toDate();
        }
        if (durationType === DurationType.Day) {
            return dayjs(date)
                .endOf('day')
                .toDate();
        }
        if (durationType === DurationType.Week) {
            return dayjs(date)
                .endOf('week')
                .toDate();
        }
        if (durationType === DurationType.Month) {
            return dayjs(date)
                .endOf('month')
                .toDate();
        }
        if (durationType === DurationType.Year) {
            return dayjs(date)
                .endOf('year')
                .toDate();
        }
        return date;
    };

    static daysInMonthContainingDate = (date: Date): number => {
        return dayjs(date).daysInMonth();
    };

    // static getDateWithTimezone = (dateStr: string, timezoneOffset: string) => {
    //     var todayStr = new Date().toISOString();
    //     var str = dateStr ? dateStr.split('T')[0] : todayStr.split('T')[0];
    //     var offsetMinutes = TimeHelper.getTimezoneOffsets(timezoneOffset, DurationType.Minute);
    //     return TimeHelper.strToUtc(str, offsetMinutes);
    // };

    static parseDurationInDays = (str: String): number => {
        var durationDays = 0;
        var tokens = str.toLowerCase().split(":");
        for (var i = 0; i < tokens.length; i++) {
    
            var x = tokens[i];
            if (x.includes("d")) {
                x = x.replace("d", "");
                var days = parseInt(x);
                durationDays += days;
            }
            if (x.includes("w")) {
                x = x.replace("w", "");
                var weeks = parseInt(x);
                durationDays += (weeks * 7);
            }
        }
        return durationDays;
    };

    static parseDurationInMin = (str: String): number => {
        var durationMin = 0;
        var tokens = str.toLowerCase().split(":");
        for (var i = 0; i < tokens.length; i++) {
    
            var x = tokens[i];
            if (x.includes("m")) {
                x = x.replace("m", "");
                var minutes = parseInt(x);
                durationMin += minutes;
            }
            if (x.includes("h")) {
                x = x.replace("h", "");
                var hours = parseInt(x);
                durationMin += (hours * 60);

            }
            if (x.includes("d")) {
                x = x.replace("d", "");
                var days = parseInt(x);
                durationMin += (days * 60 * 24);
            }
            if (x.includes("w")) {
                x = x.replace("w", "");
                var weeks = parseInt(x);
                durationMin += (weeks * 60 * 24 * 7);
            }
        }
        return durationMin;
    };

    static getTimezoneOffsets = (timeZone) => {
        var offset = timeZone;
        if (timeZone.includes('+')) {
            offset = offset.replace('+', '-');
        }
        else if(!timeZone.includes('-')) {
            offset = offset.replace(' ', '')
            offset = '-' + offset;
        }
        else if (timeZone.includes('-')) {
            offset = offset.replace('-', '+');
        }
        if(timeZone.includes(':')){
            var tokens = offset.split(":");
            var offsetHours = parseInt(tokens[0]);
            var offsetMinutes = parseInt(tokens[1]);
            if(offsetHours < 0) {
                offsetMinutes = -1 * offsetMinutes;
            }
            return { offsetHours, offsetMinutes }
        }
        else {
            var len = offset.length;
            var min = offset.substring(len-2, len);
            var hr = offset.substring(0, len-2);
            var offsetHours = parseInt(hr);
            var offsetMinutes = parseInt(min);
            if(offsetHours < 0) {
                offsetMinutes = -1 * offsetMinutes;
            }
            return { offsetHours , offsetMinutes }
        }
    };

    static startOfDayUtc = (date: Date): Date => {
        return dayjs(date).utc().startOf('day').toDate();
    };

    static isSameOrBefore = (first: Date, second: Date): boolean => {
        return dayjs(first).isSameOrBefore(dayjs(second));
    };

    static isSameOrAfter = (first: Date, second: Date): boolean => {
        return dayjs(first).isSameOrAfter(dayjs(second));
    };

    static isSame = (first: Date, second: Date): boolean => {
        return dayjs(first).isSame(dayjs(second));
    };

    static businessDiff = (first: Date, second: Date): number => {
        const date1 = dayjs(first);
        const date2 = dayjs(second);
        return date2.businessDiff(date1); 
    };

    static isBusinessDay = (date: Date): boolean => {
        return dayjs(date).isBusinessDay();
    };

    static nextBusinessDay = (date: Date): Date => {
        return dayjs(date).nextBusinessDay().toDate();
    };

    static businessDaysAdd = (number: number): Date => {
        const date = dayjs.utc();
        return date.businessDaysAdd(number).toDate();
    };

    static day = (date : Date) : number => {
        const dt = dayjs(date);
        const dayNumber = dt.day()
        return dayNumber;
    };

    static utc = (date: Date) : Date => {
        const utcDate = dayjs(date).utc();
        return utcDate.toDate();
     };

    static utcDate = (date) : Date => {
        const utcDate = dayjs.utc(date);
        return utcDate.toDate();
     };

    static addDurationHoursMinutes = (date: Date, hours: number, minutes: number): Date => {
        const newDate = dayjs(date).add(hours, 'hour').add(minutes, 'minute');
        return newDate.toDate();
    };

    static addDurationWithOffset = (date: Date, hours: number, minutes: number, offsetHours: number, offsetMinutes : number): Date => {
        const dt = dayjs(date); 
        const newDate = dt.add(hours, 'hour').add(minutes, 'minute').add(offsetHours, 'hour').add(offsetMinutes, 'minute');
        return newDate.toDate();
    };

    static utcFormat = (date : Date , formatTemplate? : string) => {
        return dayjs(date).utc(true).format(formatTemplate);
    };

    static utcDateFormat = (date: Date) => {
        return dayjs.utc(date).format();
    }

    static StartOfUtcDay = (date: Date): Date => {
        return dayjs.utc(date).startOf('day').toDate();
    };

    static localFormat = (date, formatTemplate? : string) => {
        return dayjs(date).local().format(formatTemplate);
    };

    static getUtcDate = (date, offsetHours: number, offsetMinutes: number, endOfDay: boolean) => {
        var tokens = date.split('-');
        var x = new Date(Date.UTC(tokens[0], tokens[1] - 1, tokens[2]));
        var d = dayjs(x.toUTCString())
        if(endOfDay) {
            d = d.add(1, 'day');
        }

        var minutes = offsetMinutes + (60 * offsetHours);
        if(minutes < 0) {
            var a = d.clone().subtract(-1 * minutes, 'minutes');
            return a.toDate();
        }
        var b = d.clone().add(minutes, 'minutes')
        return b.toDate();
    };

    static getCurrentUtcDate = () => {
        var x = new Date(Date.now());
        var d = dayjs.utc(x.toUTCString());
        return d.toDate();
    };

    static getDayUtc = (date: number) => {
        return dayjs.utc().add(date, 'day').toDate();
    };

    static getUtc = (date: Date): Date => {
        return dayjs.utc(date).toDate();
    };

    static formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    };

    static getDate = (date: Date): Date => {
        return dayjs(date).toDate();
    };

    static getUtcDateBefore = (minutes: number) => {
        let x = new Date(Date.now());
        let m = dayjs.utc(x.toUTCString());
        let d = m.clone().subtract(minutes, 'minute');
        return d.toDate();
    };

    static getUtcDateAfter = (minutes: number) => {
        let x = new Date(Date.now());
        let m = dayjs.utc(x.toUTCString());
        let d = m.clone().add(minutes, 'minute');
        return d.toDate();
    };

    static startOfUtc = (date: Date): Date => {
        return dayjs(date).clone().startOf('day').utc().toDate();
    };

}