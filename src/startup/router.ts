import express from "express";
import { Logger } from "../common/logger";
import { register as registerBusinessRoutes             }  from "../api/business/business.routes";
import { register as registerBusinessNodeRoutes         } from "../api/business.node/business.node.routes";
import { register as registerBusinessNodeCustomerRoutes } from "../api/business.node.customer/business.node.customer.routes";
import { register as registerBusinessServiceRoutes      } from "../api/business.service/business.service.routes";
import { register as registerBusinessNodeHourRoutes     } from "../api/business.node.hour/business.node.hour.routes"
import { register as registerBusinessUserHourRoutes     } from "../api/business.user.hour/business.user.hour.routes";
import { register as registerBusinessUserRoutes         } from "../api/business.user/business.user.routes";
import { register as registerBusinessSkillRoutes        } from "../api/business.skill/business.skill.routes";
import { register as registerBusinessUserSkillRoutes    } from "../api/business.user.skill/business.user.skill.routes";
import { register as registerBusinessUserServiceRoutes  } from "../api/business.user.service/business.user.service.routes";
import { register as registerUserMessageRoutes          } from "../api/user.message/user.message.routes";
import { register as registerNotificationRoutes         }  from "../api/notification/notification.routes";
import { register as registerPaymentTransationRoutes    } from "../api/payment.transaction/payment.transaction.routes";
import { register as registerCustomerRoutes             }  from "../api/customer/customer.routes";
import { register as registerAppointmentStatusRoutes    } from "../api/appointment.status/appointment.status.routes";
import { register as registerAppointmentRoutes          } from "../api/appointment/appointment.routes";
import { register as registerApiClientRoutes            }  from "../api/api.client/api.client.routes";
import { register as registerUserRoleRoutes             } from "../api/user.role/user.role.routes";
import { register as registerFileREsourceRoutes         } from "../api/file.resource/file.resource.routes";
import { register as registerTypesRoutes                } from "../api/types/types.routes";
import { register as registerUserRoutes                 } from "../api/user/user.routes"

////////////////////////////////////////////////////////////////////////////////////

export class Router {

    private _app = null;

    constructor(app: express.Application) {
        this._app = app;
    }

    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {

                //Handling the base route
                this._app.get('/api/v1/', (req, res) => {
                    res.send({
                        message : `Appointment Service API [Version ${process.env.API_VERSION}]`,
                    });
                });

                registerBusinessRoutes(this._app);
                registerBusinessNodeRoutes(this._app)
                registerBusinessNodeCustomerRoutes(this._app)
                registerBusinessServiceRoutes(this._app);
                registerBusinessNodeHourRoutes(this._app);
                registerBusinessUserHourRoutes(this._app);
                registerBusinessUserRoutes(this._app);
                registerBusinessSkillRoutes(this._app);
                registerBusinessUserSkillRoutes(this._app);
                registerBusinessUserServiceRoutes(this._app);
                registerUserMessageRoutes(this._app);
                registerNotificationRoutes(this._app);
                registerPaymentTransationRoutes(this._app);
                registerCustomerRoutes(this._app);
                registerAppointmentStatusRoutes(this._app);
                registerAppointmentRoutes(this._app);
                registerApiClientRoutes(this._app);
                registerUserRoleRoutes(this._app);
                registerFileREsourceRoutes(this._app);
                registerTypesRoutes(this._app);
                registerUserRoutes(this._app);

                resolve(true);

            } catch (error) {
                Logger.instance().log('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };

}
