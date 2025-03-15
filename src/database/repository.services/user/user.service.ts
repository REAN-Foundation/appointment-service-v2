import { ErrorHandler } from '../../../common/error.handler';
import { passwordStrength } from 'check-password-strength';
import { Helper } from '../../../common/helper';
import { TimeHelper } from '../../../common/time.helper';
import { DurationType } from "../../../domain.types/miscellaneous/time.types";
import { PrismaClientInit } from '../../../startup/prisma.client.init';
import { Prisma } from '@prisma/client';
///////////////////////////////////////////////////////////////////////////////////////////////

export class UserService {

    prisma = PrismaClientInit.instance().prisma();

    public static instance:UserService =null;

    public static getInstance():UserService{
        return this.instance || (this.instance=new this());

    }
    create = async (createModel) => {
        try {
            var record = await this.prisma.users.create({data:createModel});
           // return await this.getById(record.id);
           return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.prisma.users.findUnique({
                where : {
                    id : id
                }
            });
            
            if (record) {
                const userRole = await this.prisma.user_roles.findUnique({
                    where : { 
                         UserId : record.id
                        }
                });
            //     if (userRole) {
            //         const role = await this.prisma.roles.findUnique({userRole.RoleId});
            //         record['roles'] = role;
            //     }
             }
             return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.prisma.users.findUnique({where:{id:id}}
                );
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of user!', error);
        }
    }

    
    search = async (filters) => {
    try {
        const search : Prisma.usersFindManyArgs = {};

        if (filters.Prefix != null) {
            search.where = {
                Prefix : filters.Prefix
            }
        }

        if (filters.FirstName != null) {
            search.where = {
                FirstName : filters.FirstName
            }
        }

        if (filters.LastName != null) {
            search.where =   {
                LastName : filters.LastName 
                }
        }

        if (filters.Gender != null) {
            search.where =   {
                Gender : filters.Gender
                }
        }
        if (filters.Phone != null) {
            search.where =   {
                Phone : filters.Phone
                }
        }

        if (filters.Email != null) {
            search.where =   {
                Email : filters.Email
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
        const foundResults = await this.prisma.users.findMany(search)
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
        ErrorHandler.throwDbAccessError('DB Error: Unable to search user records!', error);
    }
}


    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.users.update({data:updateModel,
                        where :{
                        id : id
                    }
                 });
                
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update Business!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.prisma.users.delete({
                where : {
                    id : id
                }
            });
            
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete user!', error);
        }
    }

    getUserWithPhone = async (countryCode, phone) => {
        try {
            const record = await this.prisma.users.findMany({
                where : {
                    CountryCode : countryCode,
                    Phone       : phone,
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if user exists with phone!', error);
        }
    };

    getUserWithEmail = async (email) => {
        try {
            const record = await this.prisma.users.findMany({
                where : {
                    Email : email
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if user exists with email!', error);
        }
    }

    getUserWithUserName = async (username) => {
        try {
            const record = await this.prisma.users.findUnique({
                where : {
                    UserName : username
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check username!', error);
        }
    }

    generateUserNameIfDoesNotExist = async (userName) => {
        var tmpUsername = userName ?? Helper.generateUserName();
        while (await this.getUserWithUserName(tmpUsername) != null) {
            tmpUsername = Helper.generateUserName();
        }
        return tmpUsername;
    }

    getUser = async (
        countryCode,
        phone,
        email,
        userName
    ) => {

        var filters = [];

        if (phone !== null && countryCode !== null) {
            filters.push({
                Phone       : phone,
                CountryCode : countryCode
            });
        }
        else if (email !== null) {
            filters.push({
                Email :  email 
            });
        }
        else if (userName !== null) {
            filters.push({
                UserName : userName
            });
        }
         const user = await this.prisma.users.findUnique({
            where : 
                {UserName : userName},  
         });

        if (!user) {
            return null;
        }
        return user;
     }

 getUserUpdateModel = (inputModel) => {

        var updateModel: any = {};

        if (Helper.hasProperty(inputModel, 'UserName')) {
            updateModel.UserName = inputModel.UserName;
        }
        if (Helper.hasProperty(inputModel, 'Prefix')) {
            updateModel.Prefix = inputModel.Prefix;
        }
        if (Helper.hasProperty(inputModel, 'FirstName')) {
            updateModel.FirstName = inputModel.FirstName;
        }
        if (Helper.hasProperty(inputModel, 'LastName')) {
            updateModel.LastName = inputModel.LastName;
        }
        if (Helper.hasProperty(inputModel, 'Phone')) {
            updateModel.Phone = inputModel.Phone;
        }
        if (Helper.hasProperty(inputModel, 'Email')) {
            updateModel.Email = inputModel.Email;
        }
        if (Helper.hasProperty(inputModel, 'Password')) {
            updateModel.Password = Helper.hash(inputModel.Password);
        }
        if (Helper.hasProperty(inputModel, 'ImageUrl')) {
            updateModel.ImageUrl = inputModel.ImageUrl;
        }
        if (Helper.hasProperty(inputModel, 'Gender')) {
            updateModel.Gender = inputModel.Gender;
        }
        if (Helper.hasProperty(inputModel, 'BirthDate')) {
            updateModel.BirthDate = inputModel.BirthDate;
        }

        return updateModel;
    }

    createUserLoginSession = async (userId) => {
        try {
            var now = new Date();
            var till = TimeHelper.addDuration(now, 3, DurationType.Day);
            var record = await this.prisma.user_login_session.create({data:{
                UserId    : userId,
                IsActive  : true,
                StartedAt : now,
                ValidTill : till
            }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to create user login session!', error);
        }
    }

    // invalidateUserLoginSession = async (sessionId) => {
    //     try {
    //         var record = await this.prisma.user_login_session.findUnique(sessionId);
    //         record.IsActive = false;
    //         await record.save();
    //         return record;
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('Unable to invalidate user login session!', error);
    //     }
    // }

    // isValidUserLoginSession = async (sessionId) => {
    //     try {
    //         var record = await this.prisma.user_login_session.findUnique(sessionId);
    //         if (record == null) {
    //             return false;
    //         }
    //         if (record.ValidTill < new Date()) {
    //             return false;
    //         }
    //         if (record.IsActive === false) {
    //             return false;
    //         }
    //         return true;
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('Unable to determine validity of user login session!', error);
    //     }
    // }

    // getBySessionId = async (sessionId) => {
    //     try {
    //         var session = await this.prisma.user_login_session.findUnique(sessionId);
    //         if (session == null) {
    //             return null;
    //         }
    //         if (session.ValidTill < new Date()) {
    //             return null;
    //         }
    //         if (session.IsActive === false) {
    //             return null;
    //         }

    //         var user = await this.prisma.users.findUnique({
    //             where : {
    //                 id : session.UserId
    //             }
    //         });

    //         if (user) {
    //             const userRole = await this.prisma.user_roles.findMany({
    //                 where : {
    //                     UserId : session.id
    //                 }
    //             });
                // if (userRole) {
                //     const role = await this.prisma.roles.findUnique(userRole.RoleId);
                //     user['roles'] = role;
                // }
    //         }
    //         return user;

    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user for the session!', error);
    //     }
    // }

    // resetPassword = async (userId, hashedPassword) => {
    //     try {
    //         var res = await this.prisma.users.updateMany(
    //             { Password: hashedPassword },
    //             { where: { id: userId } }
    //         );
    //         if (res.length !== 1) {
    //             throw new Error('Unable to reset password!');
    //         }

    //         return true;
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('Unable to reset password!', error);
    //     }
    // }

    // validatePasswordCriteria = (password) => {
    //     var strength = passwordStrength(password);
    //     if (strength.length < 8 || strength.contains.length < 4) {
    //         //Criteria is min 8 characters and contains minimum diversities such as
    //         //'lowercase', 'uppercase', 'symbol', 'number'
    //         ErrorHandler.throwInputValidationError(['Password does not match security criteria!']);
    //     }
    // }

}
