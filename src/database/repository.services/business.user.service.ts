import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessUserService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessUserService=null;

    public static getInstance():BusinessUserService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try {
            var record = await this.prisma.business_users.create({
                data: createModel
            })
            return record;
        }catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business user!',error)
        } 
    };

    getById = async (id) => {
        try {
            var record = await this.prisma.business_users.findUnique({
                where : {
                    id : id,
                },
            })
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business user!', error);
        }
    };

    search = async (filters) => {
        try {
            let users = [];
            if (filters.BusinessNodeId == null && filters.BusinessId != null) {
                var nodes = await this.prisma.business_nodes.findMany({
                    where : {
                        IsActive : true,
                        BusinessId : filters.BusinessId,
                    },
                })
                for await (const node of nodes) {
                    var nodeUsers = await this.prisma.business_users.findMany({
                    where : {
                            IsActive : true,
                            BusinessNodeId : node.id,
                        },
                    });
                    if (nodeUsers.length > 0) {
                        users.push(...nodeUsers)
                    }
                }
            }
            else if (filters.BusinessNodeId != null) {
                var node = await this.prisma.business_nodes.findUnique({
                    where : {
                        id : filters.BusinessNodeId,
                    },
                })
                var nodeUsers = await this.prisma.business_users.findMany({
                    where : {
                        IsActive : true,
                        BusinessNodeId : node.id,
                    }
                })
                if (nodeUsers.length > 0) {
                    users.push(...nodeUsers)
                }
            }
            else if (filters.BusinessNodeId == null && filters.BusinessId == null) {
                users = await this.prisma.business_users.findMany({
                 where : { IsActive : true },
                });
            }
            if (filters.Name != null) {
                var usersWithMatchingNames = [];
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    var nameTemp = filters.Name.toLowerCase();
                    var firstNameLower = user.FirstName.toLowerCase();
                    var lastNameLower = user.LastName.toLowerCase();
                    if (firstNameLower.includes(nameTemp) || 
                        lastNameLower.includes(nameTemp) ||
                        nameTemp.includes(firstNameLower) ||
                        nameTemp.includes(lastNameLower) ||
                        nameTemp == firstNameLower + ' ' + lastNameLower) {
                        usersWithMatchingNames.push(user);
                    }
                }
                users = usersWithMatchingNames;
            }
            if (filters.BusinessServiceId != null) {
                var usersWithServices = [];
                var userServices = await this.prisma.business_user_services.findMany({
                    where : { BusinessServiceId : filters.BusinessServiceId },
                });
                if (userServices.length > 0) {
                    var userIds = userServices.map((el) => {
                        return el.BusinessUserId;
                    });
                    for (var user of users) {
                        if (userIds.includes(user.id)) {
                            usersWithServices.push(user);
                        }
                    }
                }
                users = usersWithServices;
            }
            const searchResults = {
                    TotalCount     : users.length,
                    RetrievedCount : users.length,
                    Items          : users,
                };
                return searchResults;
            } catch (error) {
                ErrorHandler.throwDbAccessError('DB Error: Unable to search business user records!', error);
            }
    };
        
    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.business_users.updateMany({data:updateModel,
                    where : {
                        id : id,
                    },
                })
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update business user!', error);
        }
    };

    delete = async (id) => {
        try {
        // const result = await this.prisma.business_users.delete({ where: 
        //     { id: id } 
        // });
        const deleted = await this.prisma.business_users.updateMany({
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete business user!', error);
        }
    };

    getBusinessUserWithEmail = async (email) => {
        try {
            const record = await this.prisma.business_users.findUnique({
                where : {
                    Email : email,
                },
            })
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if business user exists with email!', error);
        }
    };

    getBusinessUserWithMobile = async (mobile) => {
        try {
            const record = await this.prisma.business_users.findUnique({
                where : {
                    Mobile: mobile,
                },
            })
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if business user exists with mobile!', error);
        }
    };
}