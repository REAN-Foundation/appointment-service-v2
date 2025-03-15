import { PrismaClientInit } from '../../startup/prisma.client.init';
import { ErrorHandler } from '../../common/error.handler';
import { FileResourceCreateModel } from '../../domain.types/file.resource.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FileResourceService {

    prisma = PrismaClientInit.instance().prisma();

    public static instance:FileResourceService =null;

    public static getInstance():FileResourceService{
        return this.instance || (this.instance=new this());

    }

    //#endregion

    //#region Publics

    create = async (createModel) => {
        try {
            var record = await this.prisma.file_resource.create({data:createModel});
            //return await this.getById(record.id);
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create file resource!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.prisma.file_resource.findUnique({
                where : {
                    id : id
                },
                // include : [{
                //     model    : this.User,
                //     required : false,
                //     as       : 'User',
                //     //through: { attributes: [] }
               // },

                // ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve file resource!', error);
        }
    }

    // incrementDownloadCount = async (id) => {
    //     try {
    //         var record = await this.prisma.file_resource.findUnique({
    //             where : {
    //                 id : id
    //             }
    //         });
    //             record.DownloadCount = record.DownloadCount + 1;
    //         // await record.save();
    //         return record.DownloadCount;


    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to update download count for file resource!', error);
    //     }
    // }

    exists = async (id): Promise<boolean> => {
        try {
            const record = await this.prisma.file_resource.findUnique(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of file resource!', error);
        }
    }

    // search = async (filters): Promise<any> => {
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

    //         const foundResults = await this.prisma.file_resource.findAndCountAll(search);
    //         const searchResults = {
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
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to search file resource records!', error);
    //     }
    // }

    // update = async (id, updateModel) => {
    //     try {
    //         if (Object.keys(updateModel).length > 0) {
    //             var res = await this.prisma.file_resource.update({data:updateModel,
    //                 where :{
    //                         id : id
    //             }
    //             });
    //             if (res.length !== 1) {
    //                 throw new Error('Unable to update file resource!');
    //             }
    //         }
    //         return await this.getById(id);
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to update file resource!', error);
    //     }
    // }

    delete = async (id) => {
        try {
            var result = await this.prisma.file_resource.delete({
                where : {
                    id : id
                }
            });
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete file resource!', error);
        }
    }

    //#endregion

    //#region Privates

    // private getSearchModel = (filters) => {

    //     var search = {
    //         where   : {},
    //         include : []
    //     };

    //     if (filters.FileName) {
    //         search.where['FileName'] = filters.FileName 
    //         };
        
    //     if (filters.IsPublicResource) {
    //         search.where['IsPublicResource'] = filters.IsPublicResource;
    //     }
    //     if (filters.Tags) {
    //         search.where['Tags'] = filters.Tags
    //         };
        
    //     if (filters.MimeType) {
    //         search.where['MimeType'] = filters.MimeType 
    //         };
        
        // const includeUserAsUser = {
        //     model    : this.User,
        //     required : false,
        //     as       : 'User',
        //     where    : {}
        // };
        //if (filters.Xyz != undefined) {
        //    includeUser.where['Xyz'] = filters.Xyz;
        //}
        // search.include.push(includeUserAsUser);

        // return search;
    //}

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
