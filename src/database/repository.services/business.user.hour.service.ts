import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';

export class BusinessUserHourService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessUserHourService=null;
   
    public static getInstance():BusinessUserHourService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try {
            var record = await this.prisma.business_user_hours.create({
                data : createModel
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business user hours!', error)
        } 
    };

    getById = async (id) => {
        try {
            var record = await this.prisma.business_user_hours.findUnique({
                where : {
                    id : id,
                },
            });
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business user hours!', error);
        }
    };

    search = async (filters) => {
        try {
            const search : Prisma.business_user_hoursFindManyArgs = {};
            search.where = {
                IsActive : true,
            }
            if (filters.BusinessUserId != null) {
                search.where = {
                    BusinessUserId : filters.BusinessUserId,
                }
            }
            search.orderBy = {
                CreatedAt : 'asc'
            }
            if (filters.Order === 'descending') {
                search.orderBy = {
                    CreatedAt : 'desc'
                }
            }
            search.take = 25;
            if (filters.ItemsPerPage) {
               search.take = Number(filters.ItemsPerPage);
            }
            search.skip = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                search.skip = pageIndex * search.take;
            }
            const foundResults = await this.prisma.business_user_hours.findMany(search)
            const searchResults = {
                TotalCount     : foundResults.length,
                RetrievedCount : foundResults.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : search.take,
                Order          : search.orderBy["CreatedAt"] === 'desc' ? 'descending' : 'ascending',
                Items          : foundResults,
            };
            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search business user hours records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.business_user_hours.updateMany({
                    data:updateModel,
                    where : {
                        id : id,
                    },
                });
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update business user hours!', error);
        }
    };
    
    delete = async (id) => {
        try {
            // const result = await this.prisma.business_node_hours.delete({ where: 
            //     { id: id } 
            // });
            const deleted = await this.prisma.business_user_hours.updateMany({
                where : {
                    id : id,
                    IsActive : true,
                },
                data : {
                    IsActive : false,
                },
            })
            return deleted;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete business user hours!', error);
        }
    };

    createDefaultHoursForUser = async(record) => {
        var userHours = null;
        // for week days
        const weekday = [1, 2, 3, 4, 5];
        for (const d of weekday) {
            var newBusinessUserHours = {
                BusinessUserId : record.id,
                Type           : "WEEKDAY",
                IsOpen         : true,
                Day            : d
            }
            userHours = await this.prisma.business_user_hours.create({data:newBusinessUserHours});
        }
        //for Weekend
        const weekend = [6, 7];
        for (const d of weekend) {
            var newBusinessUserHours = {
                BusinessUserId : record.id,
                Type           : "WEEKEND",
                IsOpen         : false,
                Day            : d
            }
            userHours = await this.prisma.business_user_hours.create({
                data : newBusinessUserHours
            });
        }  
        var allUserHours = await this.prisma.business_user_hours.findMany({
            where : {
                BusinessUserId : record.id,
            },
        });
        return allUserHours;
    };
}