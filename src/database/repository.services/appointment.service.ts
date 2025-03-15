import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import updateLocale from 'dayjs/plugin/updateLocale';
import { TimeHelper as th} from '../../common/time.helper';
import { Prisma } from '@prisma/client';
import { AppointmentCreateModel, SlotsByDateDto } from "../../domain.types/appointment/appointment.domain.types";
 ///////////////////////////////////////////////////////////////////////////
​
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(updateLocale);
​
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
​
export class AppointmentService{
    prisma = PrismaClientInit.instance().prisma();
​
    public static instance:AppointmentService=null;
    public static getInstance():AppointmentService{
        return this.instance || (this.instance=new this());
    }
​
    create = async (createModel: AppointmentCreateModel) => {
        try {
            var record = await this.prisma.appointments.create({data:createModel});
            return record;
        }catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to book appointment!',error);
        } 
    };

    getById = async (id: uuid) => {
        try {
            var record = await this.prisma.appointments.findUnique({where : {id : id,},});
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve appointment!', error);
        }
    };

    update = async (id:uuid, updateModel: any) => {
        try {
            if (Object.keys(updateModel).length > 0) {
            var res = await this.prisma.appointments.update({data:updateModel,
                    where : {
                    id : id,
                },
            }); 
        }
        return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update appointment!', error);
        }
    };
​
    canCustomerBookThisSlot = async(customerId: uuid, startTime: Date, endTime: Date) => {
        try {
            let start = th.utc(startTime);
            let end = th.utc(endTime);
            const record = await this.prisma.appointments.findMany({
                where : {
                    CustomerId      : customerId,
                    IsCancelled     : false,
                    IsActive        : true,
                    OR :
                    [
                        {
                        StartTime   : start
                    },
                    {
                        EndTime : end
                    },
                ],
            },
        });
        if(record.length > 0){
            return {
                    CanBook                 : false,
                    ConflictingAppointment  : record[0]
                }
            }
            const appointments = await this.prisma.appointments.findMany({
                where : {
                    CustomerId      : customerId,
                    IsCancelled     : false,
                    IsActive        : true,
                    OR : [
                        {
                            StartTime : {
                                lte : start,
                            },
                            EndTime : {
                                gte : end,
                            },
                        },
                        {
                            StartTime : {
                                gte : start,
                            },
                            EndTime : {
                                lte : end,
                            },
                        },
                    ],
                },
            });
            if(appointments.length > 0) {
                return {
                    CanBook                 : false,
                    ConflictingAppointment  : appointments[0]
                };
            }
            return {
                CanBook                 : true,
                ConflictingAppointment  : null
            };
        }
        catch (error) {
           ErrorHandler.throwDbAccessError("Unable to check slot conflict!", error);
        }
    };
​
    checkConflictWithCustomerAppointments = async(customerId: uuid, startTime: Date, endTime: Date) => {
        let start = th.utcDate(startTime);
        let end = th.utcDate(endTime);

        const record = await this.prisma.appointments.findMany({
            where : {
                CustomerId     : customerId,
                IsCancelled    : false,
                IsActive       : true,
                OR : [
                    {
                        StartTime : start,
                    },
                    {
                        EndTime : end,
                    },
                ],
            },
        });
        if(record.length > 0) {
            return true;
        }
        const appointments = await this.prisma.appointments.findMany({
            where : {
                CustomerId     : customerId,
                IsCancelled    : false,
                IsActive       : true,
                OR : [
                    {
                        StartTime : {
                            lte : start,
                        },
                        EndTime : {
                            gte : end,
                        },
                    },
                    {
                        StartTime : {
                            gte : start,
                        },
                        EndTime  : {
                            lte : end,
                        },
                    },
                ],
            },
        });
        if(appointments.length > 0) {
            return true;
        }
        return false;
    };
​
    getByDisplayId = async(displayId: string) => {
        try {
            const record = await this.prisma.appointments.findMany({where : {DisplayId : displayId}
            });
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve appointment!', error);
        }
    };   
​
    getAvailableSlots = async (timeZone: string, slotsByDate: SlotsByDateDto[], businessNodeId: uuid, businessUserId: uuid, businessServiceId: uuid, numDaysForSlots: number) => {
        let endDate = th.businessDaysAdd(numDaysForSlots);
        const st = th.utc(new Date());
		const et = th.utc(endDate);

        let appointments = await this.prisma.appointments.findMany({
            where : {
                BusinessNodeId      : businessNodeId,
                BusinessUserId      : businessUserId,
                BusinessServiceId   : businessServiceId,
                StartTime           : {
                    gte : st
                },
                EndTime             : {
                    lte : et
                },
                IsCancelled         : false,
                IsActive            : true
            },
        });
​
        for (var j = 0; j < slotsByDate.length; j++) {
            let sd = slotsByDate[j];
            const slotDay = sd.CurrentMoment;
​
            for(var i = 0; i < appointments.length; i++) {
                let appointment = appointments[i];
                const appointmentDay = th.startOfDayUtc(appointment.StartTime);
                if(!th.isSame(appointmentDay, slotDay)) {
                    continue;
                }
                
                const start  = th.utc(appointment.StartTime);
                const end = th.utc(appointment.EndTime);
​
                for(var k = 0; k < sd.Slots.length; k++) 
                {
                    let slotStart = sd.Slots[k].slotStart;
                    let slotEnd = sd.Slots[k].slotEnd;
​
                    if(th.isSame(start, slotStart) && th.isSame(end, slotEnd)) {
                        slotsByDate[j].Slots[k].available = false;
                    }
                }
            }
        }
        return slotsByDate;
    };

    getByUser = async(businessUserId: string) => {
        try {
            const search : Prisma.appointmentsFindManyArgs = {};
            search.where = {
                BusinessUserId : businessUserId,
            }
            let foundResults = await this.prisma.appointments.findMany(search);
            return foundResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve appointment!', error);
        }   
    };
​
    getByNode = async(businessNodeId: string) => {
        try {
            const search : Prisma.appointmentsFindManyArgs = {};
            search.where = {
                BusinessNodeId : businessNodeId,
                }
            let foundResults = await this.prisma.appointments.findMany(search);
            return foundResults;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve appointment!', error);
        }   
    };
​
    getByCustomer = async(customerId: string) => {
        try {
            const search : Prisma.appointmentsFindManyArgs = {};
            search.where = {
                    CustomerId : customerId,
                }
            let foundResults = await this.prisma.appointments.findMany(search);
            return foundResults;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve appointment!', error);
        }
    };   
}