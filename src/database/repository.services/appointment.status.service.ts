import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class AppointmentStatusService {
    prisma = PrismaClientInit.instance().prisma();

    public static instance:AppointmentStatusService=null;
    public static getInstance():AppointmentStatusService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try {
            var record=await this.prisma.appointment_statuses.create({data:createModel});
            // //console.log(record);
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create appointment status!',error)
        }
    };

    getById = async (id) => {
        try {
            var record = await this.prisma.appointment_statuses.findUnique({where : {id : id,},});
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve appointment status!', error);
        }
    };

    search = async (filters) => {
        try {
            const search : Prisma.appointment_statusesFindManyArgs = {};

                if (filters.BusinessNodeId != null) {
                    search.where =   {
                        BusinessNodeId : filters.BusinessNodeId,
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
                const foundResults = await this.prisma.appointment_statuses.findMany(search)
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search appointment status records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
            var res = await this.prisma.appointment_statuses.update({data:updateModel,
                    where :{
                    id : id
                }
            }); 
        }
        return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update appointment statuses!', error);
        }
    };

    delete = async (id) => {
        try {
        const result = await this.prisma.appointment_statuses.delete({ where: 
            { id: id } 
        });
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete appointment status!', error);
        }
    };
}