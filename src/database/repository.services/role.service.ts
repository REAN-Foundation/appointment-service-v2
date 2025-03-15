import { PrismaClientInit } from "../../startup/prisma.client.init";
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class RoleService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:RoleService=null;

    public static getInstance():RoleService{
        return this.instance || (this.instance=new this());

    }

    create = async (createModel) => {
        try {
            return await this.prisma.roles.create({data:createModel});
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to create role!', error);
        }
    };

    getById = async (id) => {
        try {
            return await this.prisma.roles.findUnique({where: {id:id}
            });
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role!', error);
        }
    };

    getByName = async (name) => {
        try {
            return await this.prisma.roles.findMany({ where: { RoleName: name }
	 });
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role!', error);
        }
    };

    getAllRoles = async () => {
        try {
            return await this.prisma.roles.findMany();
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role!', error);
        }
    };

    delete = async (id) => {
        try {
            var result = await this.prisma.roles.delete({ where: { id: id } });
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to delete role!', error);
        }
    };
    
}
