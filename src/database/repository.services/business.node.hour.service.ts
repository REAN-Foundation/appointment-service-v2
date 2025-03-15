import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';
import { TimeHelper as th } from "../../common/time.helper";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessNodeHourService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessNodeHourService=null;

    public static getInstance():BusinessNodeHourService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try {
            var record=await this.prisma.business_node_hours.create({
                data : createModel
            })
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business node hour!',error);
        } 
    };

    getById = async (id) => {
        try {
            var record = await this.prisma.business_node_hours.findUnique({
                where : {
                    id : id,
                },
            })
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business node hour!', error);
        }
    };

    exists = async (requestBody) => {
        try {
            const search : Prisma.business_node_hoursFindManyArgs = {};
            var dt = requestBody.Date ? th.getDate(requestBody.Date) : null;
            var businessNodeId = requestBody.BusinessNodeId;
            var type = requestBody.Type;
            var day = requestBody.Day;
            var date = dt;

            search.where = {
                AND : {
                BusinessNodeId  : businessNodeId,
                Type            : {contains: type},
                Day             : day,
                Date            : date,
                IsActive        : true,
                }
            }
            const result = await this.prisma.business_node_hours.findMany(search);
            if(result.length > 0) {
                return result[0];
            }
            return null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business node hours!', error);
        }
    };

    search = async (filters) => {
        try {
            const search : Prisma.business_node_hoursFindManyArgs = {};

            search.where = {
                IsActive : true,
            }
            if (filters.BusinessNodeId != null) {
                search.where = {
                    BusinessNodeId : filters.BusinessNodeId
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
            const foundResults = await this.prisma.business_node_hours.findMany(search)
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search business node hour records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.business_node_hours.updateMany({
                    data : updateModel,
                    where : {
                        id : id,
                    }
                })
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update business node hour!', error);
        }
    };

    delete = async (id) => {
        try {
            // const result = await this.prisma.business_node_hours.delete({ where: 
            //     { id: id } 
            // });
            const deleted = await this.prisma.business_node_hours.updateMany({
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete business node hour!', error);
        }
    };

    createDefaultHoursForNode = async (record) => {
        var nodeHours = null;
        // for week days
        const weekday = [1, 2, 3, 4, 5];
        for (const d of weekday) {
            var newBusinessNodeHours = {
                BusinessNodeId : record.id,
                Type           : "WEEKDAY",
                IsOpen         : true,
                Day            : d
            }
            nodeHours = await this.prisma.business_node_hours.create({data:newBusinessNodeHours});
        }
        //for Weekend
        const weekend = [6, 7];
        for(const d of weekend){
            var newBusinessNodeHours = {
                BusinessNodeId : record.id,
                Type           : "WEEKEND",
                IsOpen         : false,
                Day            : d
            }
            nodeHours = await this.prisma.business_node_hours.create({data:newBusinessNodeHours});
        }  
        var allNodeHours = await this.prisma.business_node_hours.findMany({
            where : {
                BusinessNodeId : record.id,
            },
        });
        return allNodeHours;
    };
}