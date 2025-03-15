import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';

export class BusinessUserServiceService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessUserServiceService=null;

    public static getInstance():BusinessUserServiceService{
        return this.instance || (this.instance=new this());

    }

    create = async (createModel) => {
        try{
            var record = await this.prisma.business_user_services.create({
                data: createModel
            })
            return record;
        }catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business user service!', error);
        } 
    };
    
    createMany = async (createModels) => {
        try {
            var records = await this.prisma.business_user_services.createMany({
                data: createModels
            });
            return records;
            } catch (error) {
                ErrorHandler.throwDbAccessError('DB Error: Unable to create business user service!', error);
        } 
    };

    getById = async (id) => {
            try {
                var record = await this.prisma.business_user_services.findUnique({
                    where: {
                        id : id,
                    },
                });
                return record;
            } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business user service!', error);
        }
    };

    exists = async (businessServiceId, businessUserId) => {
        try {
            const search : Prisma.business_user_servicesFindManyArgs = {};
            search.where = {
                BusinessServiceId : businessServiceId,
                BusinessUserId : businessUserId
            }
            const result = await this.prisma.business_user_services.findMany(search);
            return result.length > 0;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business user services!', error);
        }
    };

    search = async (filters) => {
        try {
            const search : Prisma.business_user_servicesFindManyArgs = {};

            if (filters.IsActive != null) {
                search.where =   {
                    IsActive : filters.IsActive,
                    }
            }
            if (filters.BusinessUserId != null) {
                search.where =   {
                    BusinessUserId : filters.BusinessUserId,
                    }
            }
            if (filters.BusinessServiceId != null) {
                search.where =   {
                    BusinessServiceId : filters.BusinessServiceId,
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
            
            const foundResults = await this.prisma.business_user_services.findMany(search)
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search business user service records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.business_user_services.updateMany({
                    data: updateModel,
                    where: {
                        id : id,
                    },
                })
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update business user service!', error);
        }
    };
    
    delete = async (id) => {
        try {
            const result = await this.prisma.business_user_services.delete({
                where: {
                    id : id,
                }, 
            });
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete business user service!', error);
        }
    };
    
}