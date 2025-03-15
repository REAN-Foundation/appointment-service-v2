import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class CustomerService {
    prisma = PrismaClientInit.instance().prisma();

    public static instance:CustomerService = null;

    public static getInstance():CustomerService{
        return this.instance || (this.instance = new this());
    }

    create = async (createModel) => {
        try {
            var record = await this.prisma.customers.create({data:createModel});
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create customer!', error);
        }
    };

    getById = async (id) => {
        try {
            var record = await this.prisma.customers.findUnique({
                where : {
                    id : id,
                },
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve customers!', error);
        }
    };

    search = async (filters) => {
        try {
            const search : Prisma.customersFindManyArgs = {};
            if (filters.FirstName != null) {
                search.where = {
                    FirstName : filters.FirstName
                }
            }
            if (filters.LastName != null) {
                search.where = {
                    LastName : filters.LastName 
                }
            }
            if (filters.Mobile != null) {
                search.where = {
                    Mobile : {
                        contains: filters.Mobile,
                    },
                }
            }
            if (filters.Email != null) {
                search.where = {
                    Email : {
                        contains: filters.Email,
                    },
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
            let customers = await this.prisma.customers.findMany(search)

            if (filters.Name != null) {
                var customersWithMatchingNames = [];
                for (var i = 0; i < customers.length; i++) {
                    var customer = customers[i];
                    var nameTemp = filters.Name.toLowerCase();
                    var firstNameLower = customer.FirstName.toLowerCase();
                    var lastNameLower = customer.LastName.toLowerCase();
                    if (firstNameLower.includes(nameTemp) || 
                        lastNameLower.includes(nameTemp) ||
                        nameTemp.includes(firstNameLower) ||
                        nameTemp.includes(lastNameLower) ||
                        nameTemp == firstNameLower + ' ' + lastNameLower) {
                        customersWithMatchingNames.push(customer);
                    }
                }
                customers = customersWithMatchingNames;
            }
            
            const searchResults = {
                TotalCount     : customers.length,
                RetrievedCount : customers.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : search.take,
                Items          : customers,
            };
            return searchResults;
        
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search customer records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.customers.updateMany({
                    data:updateModel,
                    where : {
                        id : id
                    }
                });
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update customers!', error);
        }
    };

    delete = async (id) => {
        try {
            // const result = await this.prisma.customers.delete({
            //   where : {
            //        id: id,
            //    } 
            // });
            const deleted = await this.prisma.customers.updateMany({
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete customers!', error);
        }
    };

    getCustomerWithEmail = async (email) => {
        try {
            const record = await this.prisma.customers.findUnique({
                where : {
                    Email : email,
                },
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if customer exists with email!', error);
        }
    };

    getCustomerWithMobile = async (mobile) => {
        try {
            const record = await this.prisma.customers.findUnique({
                where : {
                    Mobile: mobile,
                },
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if customer exists with mobile!', error);
        }
    };
}
