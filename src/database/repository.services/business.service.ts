import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';

export class BusinessService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessService=null;

    public static getInstance():BusinessService{
        return this.instance || (this.instance=new this());

    }

    create = async (createModel) => {
        try{
            var record=await this.prisma.businesses.create({data:createModel});
            //console.log(record);
            return record;
        }catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business!',error)
        } 

    };

    getById = async (id) => {
            try {
                var record = await this.prisma.businesses.findUnique({where : {id : id}
                });

                return record;
            } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business!', error);
        }

    };

    getBusinessWithEmail = async (email) => {
        try {
            const record = await this.prisma.businesses.findUnique({ 
                where : 
                {
                    Email : email,
                 }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if business exists with email!', error);
        }
    };

    getBusinessWithMobile = async (mobile) => {
        try {
            const record = await this.prisma.businesses.findUnique({ 
                where : 
                { 
                    Mobile: mobile,
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if business exists with mobile!', error);
        }
    };

    exists = async (id) => {
        try {
            const record = await this.prisma.businesses.findUnique({where:{id:id}});
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of business!', error);
        }
    };

    search = async (filters) => {
        try {
            const search : Prisma.businessesFindManyArgs = {};

            search.where = {
                IsActive : true,
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
            
            const foundResults = await this.prisma.businesses.findMany(search)
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search business records!', error);
        }
    };
    
    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.businesses.updateMany({data:updateModel,
                        where : { 
                            id : id,
                        },
                    });  
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update business!', error);
        }
    };

    delete = async (id) => {
        try {
            // const result = await this.prisma.businesses.delete({ where: 
            //     { id: id } 
            // });
            const deleted = await this.prisma.businesses.updateMany({
                where : { id : id, IsActive : true },
                data : { IsActive : false },
            })
            return deleted;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete business!', error);
        }
    };
}