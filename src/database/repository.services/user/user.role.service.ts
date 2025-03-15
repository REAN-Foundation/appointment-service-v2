import {  ErrorHandler } from '../../../common/error.handler';
import {
    UserRoleCreateModel,
    UserRoleSearchFilters,
    UserRoleSearchResults
} from '../../../domain.types/user/user.role.domain.types';
import { PrismaClientInit } from '../../../startup/prisma.client.init';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserRoleService {

    prisma = PrismaClientInit.instance().prisma();

    public static instance:UserRoleService =null;

    public static getInstance():UserRoleService{
        return this.instance || (this.instance=new this());

    }    //#endregion

    //#region Publics

    create = async (createModel) => {
        try {
            var record = await this.prisma.user_roles.create({data:createModel});
        //    return await this.getById(record.id);
          return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user role!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.prisma.user_roles.findUnique({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user role!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.prisma.user_roles.findUnique({
                where : {
                    id : id
                }
            });
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of user role!', error);
        }
    }

    // search = async (filters: UserRoleSearchFilters): Promise < UserRoleSearchResults > => {
    //     try {

    //         var search = this.getSearchModel(filters);
    //         var {
    //             order,
    //             orderByColumn
    //         } = this.addSortingToSearch(search, filters);
    //         var {
    //             pageIndex,
    //             limit
    //         } = this.addPaginationToSearch(search, filters);

    //         const foundResults = await this.prisma.user_roles.findMany(search);
    //         const searchResults: UserRoleSearchResults = {
    //             TotalCount     : foundResults.count,
    //             RetrievedCount : foundResults.rows.length,
    //             PageIndex      : pageIndex,
    //             ItemsPerPage   : limit,
    //             Order          : order === 'DESC' ? 'descending' : 'ascending',
    //             OrderedBy      : orderByColumn,
    //             Items          : foundResults.rows,
    //         };

    //         return searchResults;

    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to search user role records!', error);
    //     }
    // }

    // update = async (id, updateModel) => {
    //     try {
    //         if (Object.keys(updateModel).length > 0) {
    //             var res = await this.prisma.user_roles.update({data:updateModel,
    //                     where :{
    //                     id : id
    //                 }
    //              });
                
    //         }
    //         return await this.getById(id);
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to update Business!', error);
    //     }
    // }

    // delete = async (id) => {
    //     try {
    //         var result = await this.prisma.user_roles.delete({
    //             where : {
    //                 id : id
    //             }
    //         });
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to delete user role!', error);
    //     }
    // }

    //#endregion

    //#region Privates

    // private getSearchModel = (filters) => {

    //     var search = {
    //         where   : {},
    //         include : []
    //     };
    //     if (filters.UserId) {
    //         search.where['UserId'] = filters.UserId;
    //     }
    //     if (filters.RoleId) {
    //         search.where['RoleId'] = filters.RoleId;
    //     }
    //     const includeUserAsUser = {
    //         model    : this.User,
    //         required : false,
    //         as       : 'User',
    //         where    : {}
    //     };
    //     //if (filters.Xyz != undefined) {
    //     //    includeUser.where['Xyz'] = filters.Xyz;
    //     //}
    //     search.include.push(includeUserAsUser);
    //     const includeRoleAsRole = {
    //         model    : this.Role,
    //         required : false,
    //         as       : 'Role',
    //         where    : {}
    //     };
    //     //if (filters.Xyz != undefined) {
    //     //    includeRole.where['Xyz'] = filters.Xyz;
    //     //}
    //     search.include.push(includeRoleAsRole);

    //     return search;
    // }

    // private addSortingToSearch = (search, filters) => {

    //     let orderByColumn = 'CreatedAt';
    //     if (filters.OrderBy) {
    //         orderByColumn = filters.OrderBy;
    //     }
    //     let order = 'ASC';
    //     if (filters.Order === 'descending') {
    //         order = 'DESC';
    //     }
    //     search['order'] = [
    //         [orderByColumn, order]
    //     ];

    //     if (filters.OrderBy) {
    //         //In case the 'order-by attribute' is on associated model
    //         //search['order'] = [[ '<AssociatedModel>', filters.OrderBy, order]];
    //     }
    //     return {
    //         order,
    //         orderByColumn
    //     };
    // }

    // private addPaginationToSearch = (search, filters) => {

    //     let limit = 25;
    //     if (filters.ItemsPerPage) {
    //         limit = filters.ItemsPerPage;
    //     }
    //     let offset = 0;
    //     let pageIndex = 0;
    //     if (filters.PageIndex) {
    //         pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
    //         offset = pageIndex * limit;
    //     }
    //     search['limit'] = limit;
    //     search['offset'] = offset;

    //     return {
    //         pageIndex,
    //         limit
    //     };
    // }

    // //#endregion

}
