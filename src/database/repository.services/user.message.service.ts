import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class UserMessageService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:UserMessageService =null;
    public static getInstance():UserMessageService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try {
            var record = await this.prisma.user_messages.create({data:createModel});
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user messages!',error)
        }
    };

    getById = async (id) => {
        try {
            var record = await this.prisma.user_messages.findUnique({where : {id : id}
            });
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user messages!', error);
        }
    };

    search = async (filters) => {
        try {
            const search : Prisma.user_messagesFindManyArgs = {};

                search.where = {
                    IsActive : true,
                }
                if (filters.businessNodeId != null) {
                    search.where =   {
                        BusinessNodeId : filters.BusinessNodeId,
                        }
                }
                if (filters.customerId != null) {
                    search.where =   {
                            CustomerId : filters.CustomerId,
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
                const foundResults = await this.prisma.user_messages.findMany(search)
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search user messages records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
            var res = await this.prisma.user_messages.updateMany({
                data : updateModel,
                where : {
                    id : id
                }
            }); 
        }
        return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update user messages!', error);
        }
    };

    delete = async (id) => {
        try {
        // const result = await this.prisma.user_messages.delete({
            //   where : {
            //        id: id,
            //    } 
            // });
            const deleted = await this.prisma.user_messages.updateMany({
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete user messages!', error);
        }
    };
}
