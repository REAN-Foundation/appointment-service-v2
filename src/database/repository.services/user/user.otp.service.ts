import { ErrorHandler } from '../../../common/error.handler';
import { PrismaClientInit } from '../../../startup/prisma.client.init';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserOtpService {

    prisma = PrismaClientInit.instance().prisma();

    public static instance:UserOtpService =null;

    public static getInstance():UserOtpService{
        return this.instance || (this.instance=new this());

    }

    create = async (userId, purpose) => {
        try {
            const otp = {
                UserId    : userId,
                Otp       : (Math.floor(Math.random() * 900000) + 100000).toString(),
                Purpose   : purpose,
                ValidFrom : new Date(),
                ValidTill : new Date(Date.now() + 600 * 1000),
            };
            return await this.prisma.user_otp.create({data:otp});
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to create otp!', error);
        }
    };

    getLatestActiveOtp = async (userId) => {
        try {
            const otps = await this.prisma.user_otp.findMany({
                where : {
                    UserId    : userId,
                    Validated : false,
                    ValidTill : { gte: new Date() },
                },
                orderBy : { ValidTill :'desc',}
                //[['ValidTill', 'DESC']],
            });
            if (otps.length > 0) {
                return otps[0];
            }
            return null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve latest otp!', error);
        }
    };

    // markAsUsed = async (id) => {
    //     try {
    //         var otp = await this.prisma.user_otp.findUnique({where :{id:id},});
    //         otp.Validated = true;
    //         await otp.save();
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('Unable to mark otp as used!', error);
    //     }
    // };
    
}
