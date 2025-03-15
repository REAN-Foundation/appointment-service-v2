import { ApiClientCreateModel, ApiClientDto, ApiClientSearchFilters, ApiClientSearchResults, ApiClientUpdateModel, ApiClientVerificationDomainModel, ClientApiKeyDto } from '../../domain.types/api.client.domain.types';
import { Logger } from '../../common/logger';
import { ApiError } from '../../common/api.error';
import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { PrismaClientInit } from "../../startup/prisma.client.init";
import * as apikeyGenerator from 'uuid-apikey';
import { Prisma } from '@prisma/client';

export class ApiClientService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:ApiClientService=null;

    public static getInstance():ApiClientService{
        return this.instance || (this.instance=new this());

    }

    create = async (clientDomainModel: ApiClientCreateModel): Promise<ApiClientDto> => {
        try {
            const entity = {
                ClientName   : clientDomainModel.ClientName,
                FirstName    : clientDomainModel.FirstName,
                LastName     : clientDomainModel.LastName,
                ClientCode   : clientDomainModel.ClientCode,
                IsPrivileged : clientDomainModel.IsPrivileged,
                Phone        : clientDomainModel.Phone,
                Email        : clientDomainModel.Email,
                Password     : clientDomainModel.Password ?? null,
                ApiKey       : clientDomainModel.ApiKey ?? apikeyGenerator.default.create().apiKey,
                ValidFrom    : clientDomainModel.ValidFrom ?? null,
                ValidTill    : clientDomainModel.ValidTill ?? null,
            };
            entity.Password = Helper.hash(clientDomainModel.Password);
            const client = await this.prisma.api_clients.create({data:entity});
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<ApiClientDto> => {
        try {
            const client = await this.prisma.api_clients.findUnique({where : {id : id}
            });
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    search = async (filters) => {
        try {
            const search : Prisma.api_clientsFindManyArgs = {};
            if (filters.ClientName != null) {
                search.where = {
                    ClientName: {
                        contains: filters.ClientName,
                    },
                }
            }
            if (filters.ClientCode != null) {
                search.where = {
                    ClientCode: {
                        contains: filters.ClientCode,
                    }, 
                }
            }
            if (filters.IsPrivileged != null) {
                search.where = {
                    IsPrivileged : filters.IsPrivileged
                }
            }
            if (filters.CountryCode != null) {
                search.where = {
                    CountryCode : filters.CountryCode
                }
            }
            if (filters.Phone != null) {
                search.where = {
                    Phone : filters.Phone
                }
            }
            if (filters.Email != null) {
                search.where = {
                    Email: {
                        contains: filters.Email,
                    },
                }
            }
            if (filters.ValidFrom != null) {
                search.where = {
                    ValidFrom : filters.ValidFrom
                }
            }
            if (filters.ValidTill != null) {
                search.where = {
                    ValidTill : filters.ValidTill
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

            const foundResults = await this.prisma.api_clients.findMany(search)
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
    };

    getByClientCode = async (clientCode: string): Promise<ApiClientDto> =>{
        try {
            const client = await this.prisma.api_clients.findUnique({where : {ClientCode : clientCode }
            });
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    getApiKeyByClientCode = async (clientCode: string): Promise<ClientApiKeyDto> =>{
        try {
            const client = await this.prisma.api_clients.findUnique({
                where : {
                    ClientCode : clientCode
                }
            });
            const dto = await this.toClientSecretsDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    getClientHashedPassword = async(id: string): Promise<string> => {
        try {
            const client = await this.prisma.api_clients.findUnique({where:{id:id}
            });
            return client.Password;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    getApiKey = async(verificationModel: ApiClientVerificationDomainModel): Promise<ClientApiKeyDto> => {
        try {
            const client = await this.getApiKeyByClientCode(verificationModel.ClientCode);
            if (client == null) {
                const message = 'Client does not exist with code (' + verificationModel.ClientCode + ')';
                throw new ApiError(message, 404);
            }

            const hashedPassword = await this.getClientHashedPassword(client.id);
            const isPasswordValid = Helper.compareHashedPassword(verificationModel.Password, hashedPassword);
            if (!isPasswordValid) {
                throw new ApiError('Invalid password!', 401);
            }
            const dto = await this.toClientSecretsDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    }

    renewApiKey = async (verificationModel: ApiClientVerificationDomainModel): Promise<ClientApiKeyDto> => {

        const client = await this.getByClientCode(verificationModel.ClientCode);
        if (client == null) {
            const message = 'Client does not exist for client code (' + verificationModel.ClientCode + ')';
            throw new ApiError(message, 404);
        }

        const hashedPassword = await this.getClientHashedPassword(client.id);
        const isPasswordValid = Helper.compareHashedPassword(verificationModel.Password, hashedPassword);
        if (!isPasswordValid) {
            throw new ApiError('Invalid password!', 401);
        }

        const key = apikeyGenerator.default.create();
        const clientApiKeyDto = await this.setApiKey(
            client.id,
            key.apiKey,
            verificationModel.ValidFrom,
            verificationModel.ValidTill
        );
        
        return clientApiKeyDto;
    };
    
    setApiKey = async(id: string, apiKey: string, validFrom: Date, validTill: Date): Promise<ClientApiKeyDto> => {
        try {
            const client = await this.prisma.api_clients.findUnique({where: { id: id }
            });
            if(!client) {
                throw new ApiError('Client not found!', 401);
            }
            const res = await this.prisma.api_clients.update({
                where: {
                    id : id,
                },
                data: {
                    ApiKey      : apiKey,
                    ValidFrom   : validFrom,
                    ValidTill   : validTill,
                },
            });
            const dto = await this.toClientSecretsDto(res);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    }
    
    isApiKeyValid = async (apiKey: string): Promise<CurrentClient> => {
        try {
            const client = await this.prisma.api_clients.findUnique({where : {ApiKey :apiKey }
                    // ValidFrom :  new Date() ,
                    // ValidTill :  new Date()
                
            });
            if (client == null){
                return null;
            }
            const currentClient: CurrentClient = {
                ClientName   : client.ClientName,
                ClientCode   : client.ClientCode,
                IsPrivileged : client.IsPrivileged,
                //ClientApiKey : client.ApiKey

            };
            return currentClient;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };
    
    update = async (id: string, clientDomainModel: ApiClientUpdateModel): Promise<ApiClientDto> => {
        try {
            const client = await this.prisma.api_clients.findUnique({ where: { id: id,}, });

            if (clientDomainModel.ClientName != null) {
                client.ClientName = clientDomainModel.ClientName;
            }
            if (clientDomainModel.FirstName != null) {
                client.FirstName = clientDomainModel.FirstName;
            }
            if (clientDomainModel.LastName != null) {
                client.LastName = clientDomainModel.LastName;
            }
            if (clientDomainModel.Password != null) {
                client.Password = Helper.hash(clientDomainModel.Password);
            }
            if (clientDomainModel.Phone != null) {
                client.Phone = clientDomainModel.Phone;
            }
            if (clientDomainModel.IsPrivileged != null) {
                client.IsPrivileged = clientDomainModel.IsPrivileged;
            }
            if (clientDomainModel.Email != null) {
                client.Email = clientDomainModel.Email;
            }
            if (clientDomainModel.ValidFrom != null) {
                client.ValidFrom = clientDomainModel.ValidFrom;
            }
            if (clientDomainModel.ValidTill != null) {
                client.ValidTill = clientDomainModel.ValidTill;
            }
            const res = await this.prisma.api_clients.update({
                data: client,
                where: { id },
            });

            const dto = this.toDto(res);
            return dto;
            //Client code is not modifiable
            //Use renew key to update ApiKey, ValidFrom and ValidTill
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    delete = async (id) => {
        try {
            const result = await this.prisma.api_clients.delete({ where: { id: id } });

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    toDto = (client): ApiClientDto => {
        if (client == null){
            return null;
        }
        let active = false;
        if (client.ValidFrom < new Date() && client.ValidTill > new Date()) {
            active = true;
        }
        const dto: ApiClientDto = {
            id           : client.id,
            ClientName   : client.ClientName,
            FirstName    : client.FirstName,
            LastName     : client.LastName,
            ClientCode   : client.ClientCode,
            Phone        : client.Phone,
            Email        : client.Email,
            ApiKey       : client.ApiKey,
            CountryCode  : client.CountryCode,
            IsPrivileged : client.IsPrivileged,
            ValidTill    : client.ValidTill,
        };
        return dto;
    }

    toClientSecretsDto = (client): ClientApiKeyDto => {
        if (client == null){
            return null;
        }
        const dto: ClientApiKeyDto = {
            id         : client.id,
            ClientName : client.ClientName,
            ClientCode : client.ClientCode,
            ApiKey     : client.ApiKey,
            ValidFrom  : client.ValidFrom,
            ValidTill  : client.ValidTill,
        };
        return dto;
    }
        
     //#endregion

}
