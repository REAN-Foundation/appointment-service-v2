import { AppointmentService } from "../../database/repository.services/appointment.service";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { BusinessService } from "../../database/repository.services/business.service";
import { BusinessServiceService } from "../../database/repository.services/business.service.service";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
import { ErrorHandler } from "../../common/error.handler";
import { TimeHelper as th } from "../../common/time.helper";
import { DurationType } from "../../domain.types/miscellaneous/time.types";
import dayjs from "dayjs";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { BusinessUserService } from "../../database/repository.services/business.user.service";
import { CustomerService } from "../../database/repository.services/customer.service";
import { AppointmentValidator as validator } from "./appointment.validator";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { BusinessNodeHourDto } from "../../domain.types/business.node.hour/business.node.hour.domain.types";
import { BusinessUserHourDto } from "../../domain.types/business/business.user.hour.domain.types";
import { BusinessServiceDto } from "../../domain.types/business/business.service.domain.types";
import { BusinessNodeCustomerService } from "../../database/repository.services/business.node.customer.service";
import { ApiError } from "../../common/api.error";
import { Helper } from "../../common/helper";
import { AppointmentCreateModel, 
	AppointmentDto, 
	AppointmentSearchFilters, 
	AppointmentUpdateModel, 
	SlotsByDateDto } 
	from "../../domain.types/appointment/appointment.domain.types";
import _ from "lodash";
import { AppointmentStatusDto } from "../../domain.types/appointment.status/appointment.status.domain.types";

export class AppointmentControllerDelegate {
    //#region member variables and constructors

    _service: AppointmentService = null;

    _businessService: BusinessService = null;

    _businessNodeService: BusinessNodeService = null;

    _businessServiceService: BusinessServiceService = null;

    _businessNodeHourService: BusinessNodeHourService = null;

    _businessUserService: BusinessUserService = null;

    _customerService: CustomerService = null;

    _businessNodeCustomerService : BusinessNodeCustomerService = null;

    prisma = PrismaClientInit.instance().prisma();

    constructor() {
		this._service = new AppointmentService();
		this._businessService = new BusinessService();
		this._businessNodeService = new BusinessNodeService();
		this._businessServiceService = new BusinessServiceService();
		this._businessNodeHourService = new BusinessNodeHourService();
		this._businessUserService = new BusinessUserService();
		this._customerService = new CustomerService();
		this._businessNodeCustomerService = new BusinessNodeCustomerService();
	}

	findAvailableSlots = async (
		query: any,
    	businessId: uuid,
    	businessNodeId: uuid,
    	businessServiceId: uuid
		) => {
			await validator.validateSearchRequest(query);
			const filters: AppointmentSearchFilters = this.getSearchFilters(query);
    		const business = await this._businessService.getById(businessId);
    		if (business == null) {
				ErrorHandler.throwNotFoundError("Invalid business id!");
			}
    		const node = await this._businessNodeService.getById(businessNodeId);
    		if (node == null) {
      			ErrorHandler.throwNotFoundError("Invalid business node id!");
    		}
    		const businessService = await this._businessServiceService.getById(businessServiceId);
    		if (businessService == null) {
      			ErrorHandler.throwNotFoundError("Invalid business service id!");
    		}
    		const nodeHours = await this.prisma.business_node_hours.findMany({
      			where: { BusinessNodeId: businessNodeId },
    		});
    		if (nodeHours.length == 0) {
     			ErrorHandler.throwNotFoundError("Working hours are not specified for the business!");
    		}
    
    		const numDaysForSlots = th.parseDurationInDays(node.AllowFutureBookingFor);
    		const timeZone = node.TimeZone;

    		const currentDate = new Date();
    		let startDate = th.startOfDayUtc(currentDate);
    		if (filters.FromDate != null) {
      		let dt = new Date(filters.FromDate);
      		startDate = th.startOfDayUtc(dt);
    		}
    		const newDate = th.startOfDayUtc(currentDate);
    		let maxAllowable = th.addDuration(
			  newDate,
    		  numDaysForSlots, 
    		  DurationType.Day
    		);
    		let endDate = th.addDuration(newDate, 7, DurationType.Day);
    		if (filters.ToDate != null) {
      			const dt = new Date(filters.ToDate);
      			endDate = th.startOfDayUtc(dt);
      		if (th.isAfter(endDate, maxAllowable)) {
        		endDate = maxAllowable;
      		}
			}
    		let slots = [];
    		let businessUserId = filters.BusinessUserId;
    		if (businessUserId != null) {
				let userHours = [];
      			const user = await this._businessUserService.getById(businessUserId);
      		if (user == null) {
        		ErrorHandler.throwNotFoundError("Invalid business node id!");
      		}
      		userHours = await this.prisma.business_user_hours.findMany({
				where: { BusinessUserId: businessUserId },
			});
      		if (userHours.length == 0) {
        		ErrorHandler.throwNotFoundError("Working hours are not specified for the business!");
      		}
      		const availableSlotsByDate = await this.findSlotAvailability(
        		timeZone,
        		numDaysForSlots,
        		startDate,
        		endDate,
				nodeHours,
        		userHours,
        		businessUserId,
        		businessService,
        		businessNodeId
			);
        
      		const userSlots = this.transform(availableSlotsByDate);
      		const obj = {
        	User: user,
        	AvailableSlots: userSlots,
		};
      	slots.push(obj);
    	} else {
      	//User is not specified, check all users performing this service
      	const userServices = await this.prisma.business_user_services.findMany({
			where: { BusinessServiceId: businessServiceId },
		});
      	if (userServices.length == 0) {
        //Users for this service are not found, calculate slots based on only node hours
        let userHours = [];
        let availableSlotsByDate = await this.findSlotAvailability(
          timeZone,
          numDaysForSlots,
          startDate,
          endDate,
          nodeHours,
          userHours,
          null,
          businessService,
          businessNodeId
        );
        slots = this.transform(availableSlotsByDate);
	} else {
        for await (var s of userServices) {
          businessUserId = s.BusinessUserId;
          let userHours = [];
          const user = await this._businessUserService.getById(businessUserId);
          if (user == null) {
            ErrorHandler.throwNotFoundError("Invalid business user id!");
          }
          userHours = await this.prisma.business_user_hours.findMany({
            where: { BusinessUserId: businessUserId },
          });
          if (userHours.length == 0) {
            throw new Error("Working hours are not specified for the business!");
          }
          const availableSlotsByDate = await this.findSlotAvailability(
            timeZone,
            numDaysForSlots,
            startDate,
            endDate,
            nodeHours,
            userHours,
            businessUserId,
            businessService,
            businessNodeId
          );
          const userSlots = this.transform(availableSlotsByDate);
          const obj = {
            User: user,
            AvailableSlots: userSlots,
          };
          slots.push(obj);
		}
      }
    }
    return slots;
  	};

	findAvailableSlotsForUser = async (query : any, businessUserId : uuid) => {
    	await validator.validateSearchRequest(query);
    	const filters: AppointmentSearchFilters = this.getSearchFilters(query);
    	const businessUser = await this._businessUserService.getById(businessUserId);
    	if(businessUser == null) {
        	ErrorHandler.throwNotFoundError('Invalid business user id!');
    	}
    	const businessNodeId = businessUser.BusinessNodeId;
    	const node = await this._businessNodeService.getById(businessNodeId);
    	if (node == null) {
        	ErrorHandler.throwNotFoundError('Invalid business node id!');
    	}
    	const nodeHours = await this.prisma.business_node_hours.findMany({where : { BusinessNodeId : businessNodeId}});
    	if (nodeHours.length == 0) {
        	ErrorHandler.throwNotFoundError('Working hours are not specified for the business!');
    	}
    	const userHours = await this.prisma.business_user_hours.findMany({where : {BusinessUserId : businessUserId},});
    	if (userHours.length == 0) {
        	ErrorHandler.throwNotFoundError('Working hours are not specified for the business user!');
    	}
    	const businessUserService = await this.prisma.business_user_services.findMany({where: {BusinessUserId : businessUserId},});
    	if(businessUserService.length == 0) {
        	ErrorHandler.throwNotFoundError('No services found for the user!');
    	}
    	let userService = businessUserService[0];
    	const businessServiceId = userService.BusinessServiceId;
    	const businessService = await this._businessServiceService.getById(businessServiceId);
    	if(businessService == null) {
        	ErrorHandler.throwNotFoundError('No services found for the user.');
		}
    	const timeZone = node.TimeZone;
    	const numDaysForSlots = th.parseDurationInDays(node.AllowFutureBookingFor)
    
    	const sd = new Date();
    	let startDate = th.startOfDayUtc(sd);
    	if(filters.FromDate != null){
        	let dt = new Date(filters.FromDate);
            startDate = th.startOfDayUtc(dt);
        }
        const newDate = th.startOfDayUtc(sd);
        const maxAllowable = th.addDuration(startDate, numDaysForSlots, DurationType.Day);
        var endDate = th.addDuration(newDate, 7, DurationType.Day);
        if(filters.ToDate != null) {
            const dt = new Date(filters.ToDate);
            endDate = th.startOfDayUtc(dt);
            if(th.isAfter(endDate, maxAllowable)) {
                endDate = maxAllowable;
        }
    	}
    	const availableSlotsByDate = await this.findSlotAvailability(timeZone, numDaysForSlots, startDate, endDate, nodeHours, userHours, businessUserId, businessService, businessNodeId);
    	const slots = this.transform(availableSlotsByDate);
    	const appointment = {
        	Slots : slots
    	}
    	return appointment;
	};

	canCustomerBookThisSlot = async(requestBody : any) => {
		await validator.validateSearchRequest(requestBody);
		const customer = await this._customerService.getById(requestBody.CustomerId);
		if(customer == null){
			ErrorHandler.throwNotFoundError('Customer not found!');
		}
		const startTime = requestBody.StartTime;
		const endTime = requestBody.EndTime;
		const result = await this._service.canCustomerBookThisSlot(requestBody.CustomerId, startTime, endTime);
		return result;
	};

	bookAppointment = async(requestBody: any) => {
		await validator.validateCreateRequest(requestBody);

		const et = th.utc(requestBody.EndTime);
		const dt = th.utc(new Date());
		if(th.isBefore(et, dt)) {
			ErrorHandler.throwFailedPreconditionError('Cannot book appointment for the past duration!');
		}

		const businessNodeId = requestBody.BusinessNodeId;
		const node = await this._businessNodeService.getById(businessNodeId);
		if(node == null) {
			ErrorHandler.throwNotFoundError('Invalid node id!');
		}

		const businessServiceId = requestBody.BusinessServiceId;
		const businessService = await this._businessServiceService.getById(businessServiceId);
		if(businessService == null) {
			ErrorHandler.throwNotFoundError('Invalid business service id!');
		}
		//update the work-days
		const nodeHours = await this.prisma.business_node_hours.findMany({
			where : {
				BusinessNodeId : businessNodeId,
			},
		});
		if(nodeHours.length == 0) {
			ErrorHandler.throwNotFoundError('Working hours are not specified for the business!');
		}

		let userHours = [];
		const businessUserId = requestBody.BusinessUserId;
		if(businessUserId != null) {
			userHours = await this.prisma.business_user_hours.findMany({where : {BusinessUserId : businessUserId},});
			if(userHours.length == 0) {
				ErrorHandler.throwNotFoundError('Working hours are not specified for the business user!');
			}
		}
		const businessUser = await this._businessUserService.getById(businessUserId);
		if(businessUser == null){
			ErrorHandler.throwNotFoundError('Business user not found!');
		}
		const customer = await this._customerService.getById(requestBody.CustomerId);
		if(customer == null) {
			ErrorHandler.throwNotFoundError('Customer not found!');
		}
		const numDayForSlots = th.parseDurationInDays(node.AllowFutureBookingFor);
		const startTime = requestBody.StartTime;
		const endTime = requestBody.EndTime;
		const isConflicting = await this._service.checkConflictWithCustomerAppointments(requestBody.CustomerId, startTime, endTime);
		if(isConflicting) {
			throw new ApiError('Appointment conflicts with your other appointment!', 500);
		}
		const startDate = th.startOfDayUtc(startTime);
		const endDate = th.startOfDayUtc(endTime);
		const timeZone = node.TimeZone;
		const availableSlotsByDate = await this.findSlotAvailability(timeZone, numDayForSlots, startDate, endDate, nodeHours, userHours, businessUserId, businessService, businessNodeId);

		const appointmentDay = th.startOfDayUtc(startTime);
		const appointmentStart = th.getUtc(startTime);
		const appointmentEnd = th.getUtc(endTime);

		const availableSlotsForDay = this.getSlotsForDay(availableSlotsByDate, appointmentDay);
		if(availableSlotsForDay == null) {
			ErrorHandler.throwNotFoundError('Appointment slot is not available for the given day!');
		}
		const isAvailable = this.isSlotAvailable(availableSlotsForDay, appointmentStart, appointmentEnd);
		if(!isAvailable) {
			ErrorHandler.throwNotFoundError('Appointment slot is not available!');
		}
		const appointmentStatuses = await this.prisma.appointment_statuses.findMany({
			where : {
				AND : {
					BusinessNodeId  : requestBody.BusinessNodeId,
					Sequence        : 1,
				},
			},
		})
		if(appointmentStatuses.length == 0) {
			ErrorHandler.throwNotFoundError('Appointment status information is not updated for the business!');
		}
		var appointmentStatus = appointmentStatuses[0];

		var timeStr = new Date().getTime().toString();
		timeStr = timeStr.substring(5, timeStr.length);
		var d = new Date();
		var dateStr = th.formatDate(d);
		var displayId ='App-' + dateStr + '-' + timeStr; 

		const customerId = requestBody.CustomerId;
		const createModel: AppointmentCreateModel = await this.getAppointmentCreateModel(requestBody, appointmentStart, appointmentEnd, appointmentStatus, displayId);
		const appointment: AppointmentDto = await this._service.create(createModel);
		if (appointment === null) {
			throw new ApiError('An error occurred while booking an apoointment!', 400);
		}
		if(appointmentStatus.SendNotification == true){
			//TODO: Send here the notification
		}
		if(appointmentStatus.SendSms == true){
			//TODO: Send here the sms
		}
		var nodeCustomers = await this.prisma.business_node_customers.findMany({
			where : {
				AND : {
					BusinessNodeId      : businessNodeId,
					CustomerId          : customerId,
					IsActive            : true,
				},
			},
		});
		if(nodeCustomers.length == 0) {
			const createModel = this.getNodeCustumerCreateModel(businessNodeId, customerId);
			const nodeCustomer = await this._businessNodeCustomerService.create(createModel);
		}
		var app = await this.getAppointmentObject(appointment);

		return app;
		};

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Appointment with id ' + id.toString() + ' cannot be found!');
        }
        return this.getAppointmentObject(record);
    };

    getByDisplayId = async (displayId: string) => {
        const appointments = await this._service.getByDisplayId(displayId);
        if (appointments === null) {
          ErrorHandler.throwNotFoundError('Appointment with display id ' + displayId.toString() + ' cannot be found!');
      }
      let appointmentDto = {}
      for (const appointment of appointments){
        appointmentDto = this.getAppointmentObject(appointment);
      }
    return appointmentDto;
    };
 
    getByUser = async (businessUserId: uuid, query: any) => {
        const record = await this._businessUserService.getById(businessUserId);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Appointment with business user id ' + businessUserId.toString() + ' cannot be found!');
        }

        let appointments = await this._service.getByUser(businessUserId);
		let res = this.updateAppointmentSelector(query, appointments);

        let apps = [];
        for await(const appointment of appointments) {
            const app = await this.getAppointmentObject(appointment);
            apps.push(app);
        }
        return {
            Appointments : apps
        };
    };

    getByNode = async(businessNodeId: uuid, query: any) => {
        const record = await this._businessNodeService.getById(businessNodeId);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Appointment with business node id ' + businessNodeId.toString() + ' cannot be found!');
        }

        let appointments = await this._service.getByNode(businessNodeId);
		let res = this.updateAppointmentSelector(query, appointments);

        let apps = [];
        for await(const appointment of appointments) {
            const app = await this.getAppointmentObject(appointment);
            apps.push(app);
        }
        return {
            Appointments : apps
        };
    };

    getByCustomer = async(customerId: uuid, query: any) => {
        const record = await this._customerService.getById(customerId);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Appointment with customer id ' + customerId.toString() + ' cannot be found!');
        }
		let appointments = await this._service.getByCustomer(customerId);
		let res = this.updateAppointmentSelector(query, appointments);

        let apps = [];
        for await(const appointment of appointments) {
            const app = await this.getAppointmentObject(appointment);
            apps.push(app);
        }
        return {
            Appointments : apps
        };
    };

    update = async(id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Appointment with id ' + id.toString() + ' cannot be found!');
        }

        const updateModel: AppointmentUpdateModel = this.getUpdateModel(requestBody);
        const res = await this._service.update(id, updateModel);
        const appointment = await this._service.getById(id);
        
        if(Helper.hasProperty(requestBody, 'StatusCode')) {
			    //If status is updated, ... notify user if configure
            const appointmentStatuses = await this.prisma.appointment_statuses.findMany({
                where : {
                    AND : {
                        BusinessNodeId  : appointment.BusinessNodeId,
                        StatusCode      : requestBody.StatusCode,
                    },
                },
            });
            if(appointmentStatuses.length > 0) {
                let appointmentStatus = appointmentStatuses[0];

				let dt = th.getDate(new Date());
                if(appointmentStatus.IsCancellationStatus){
                    const updated = await this.prisma.appointments.update({
                        data : {
                            IsCancelled : true,
                            IsActive    : false,
                            Status      : appointmentStatus.Status,
                            StatusCode  : appointmentStatus.StatusCode,
                            CancelledOn : dt,
                        },
                        where : {
                            id : id,
                        },
                });
                }
                if(appointmentStatus.IsConfirmedStatus){
                    const updated = await this.prisma.appointments.update({
                        data : {
                            IsConfirmed : true,
                            IsCancelled : false,
                            IsActive    : true,
                            Status      : appointmentStatus.Status,
                            StatusCode  : appointmentStatus.StatusCode,
                            ConfirmedOn : dt,
                        },
                        where : {
                            id : id,
                        },
                    })
                }
                if(appointmentStatus.IsCompletedStatus){
                    const updated = await this.prisma.appointments.update({
                        data : {
                            IsCompleted : true,
                            IsCancelled : false,
                            IsActive    : false,
                            Status      : appointmentStatus.Status,
                            StatusCode  : appointmentStatus.StatusCode,
                            ConfirmedOn : dt,
                        },
                        where : {
                            id : id,
                        },
                    });
                }

                if (appointmentStatus.SendNotification == true) {
                    //TODO: Send here the notification
                }
                if (appointmentStatus.SendSms == true) {
                    //TODO: Send here the sms
                }
            }
        }

        const app = await this.getAppointmentObject(appointment);
        return {
            Appointment : app
        };
    };

    cancelAppointment = async(id: uuid) => {
        const appointment = await this._service.getById(id);
        if(appointment == null) {
            ErrorHandler.throwNotFoundError('Appointment not found!');
        }

        const appointmentStatuses = await this.prisma.appointment_statuses.findMany({
            where : {
                AND : {
                    BusinessNodeId          : appointment.BusinessNodeId,
                    IsCancellationStatus    : true,
                },
            },
        });
        if(appointmentStatuses.length == 0) {
            ErrorHandler.throwNotFoundError('No equivalent cancellation status found for business node!');
        }
        let appointmentStatus = appointmentStatuses[0];

        let dt = th.getDate(new Date());
        const updated = await this.prisma.appointments.update({
            data : {
                IsCancelled : true,
                IsActive    : false,
                Status      : appointmentStatus.Status,
                StatusCode  : appointmentStatus.StatusCode,
                CancelledOn : dt,
            },
            where : {
                id : id,
            },
        });

        const record = await this._service.getById(id);
        if (appointmentStatus.SendNotification == true) {
            //TODO: Send here the notification
        }
        if (appointmentStatus.SendSms == true) {
            //TODO: Send here the sms
        }
        const app = await this.getAppointmentObject(record);
        return {
            Appointment : app
        };
    };

    completeAppointment = async(id: uuid) => {
    	const appointment = await this._service.getById(id);
      	if(appointment == null) {
        	ErrorHandler.throwNotFoundError('Appointment not found!');
      	}

      	const appointmentStatuses = await this.prisma.appointment_statuses.findMany({
          	where : {
              	AND : {
                	BusinessNodeId      : appointment.BusinessNodeId,
                  	IsCompletedStatus   : true,
              	},
          	},
      	});
      	if(appointmentStatuses.length == 0) {
          	ErrorHandler.throwNotFoundError('No equivalent completed status found for business node!');
      	}
      	let appointmentStatus = appointmentStatuses[0];

      	let dt = th.getDate(new Date());
      	const updated = await this.prisma.appointments.update({
          	data : {
              	IsCompleted : true,
              	IsActive    : false,
              	Status      : appointmentStatus.Status,
				StatusCode  : appointmentStatus.StatusCode,
				CompletedOn : dt,
          	},
			where : {
				id : id,
			},
		});

		const record = await this._service.getById(id);
		if (appointmentStatus.SendNotification == true) {
			//TODO: Send here the notification
		}
		if (appointmentStatus.SendSms == true) {
			//TODO: Send here the sms
		}
		const app = await this.getAppointmentObject(record);
		return {
			Appointment : app
		};
	};

	confirmAppointment = async(id: uuid) => {
		const appointment = await this._service.getById(id);
		if(appointment == null) {
			ErrorHandler.throwNotFoundError('Appointment not found!');
		}

		const appointmentStatuses = await this.prisma.appointment_statuses.findMany({
			where : {
				AND : {
					BusinessNodeId      : appointment.BusinessNodeId,
					IsConfirmedStatus   : true,
				},
			},
		});
		if(appointmentStatuses.length == 0) {
			ErrorHandler.throwNotFoundError('No equivalent confirmed status found for business node!');
		}
		let appointmentStatus = appointmentStatuses[0];

		let dt = th.getDate(new Date());
		const updated = await this.prisma.appointments.update({
			data : {
				IsConfirmed : true,
				IsActive    : true,
				Status      : appointmentStatus.Status,
				StatusCode  : appointmentStatus.StatusCode,
				ConfirmedOn : dt,
			},
			where : {
				id : id,
			},
		});

		const record = await this._service.getById(id);
		if (appointmentStatus.SendNotification == true) {
			//TODO: Send here the notification
		}
		if (appointmentStatus.SendSms == true) {
			//TODO: Send here the sms
		}
		const app = await this.getAppointmentObject(record);
		return {
			Appointment : app
		};
	};

/////////////////////////////////////////////////////////////////////////////

	getSlotsForDay = (slotsByDate: SlotsByDateDto[], day: Date) => {
	for(var i = 0; i < slotsByDate.length; i++) {
		var d = slotsByDate[i].CurrentMoment;
		if(th.isSame(d, day)){
			return slotsByDate[i].Slots;
		} 
	}
	return null;
	};

	isSlotAvailable = (slots, appointmentStart: Date, appointmentEnd: Date) => {

	const aStart = th.utc(appointmentStart);
	const aEnd = th.utc(appointmentEnd);

	for(var i = 0; i < slots.length; i++){
		const slotStart =th.utc(slots[i].slotStart);
		const slotEnd = th.utc(slots[i].slotEnd);
		const available = slots[i].available;

		if(th.isSame(aStart, slotStart) && th.isSame(aEnd, slotEnd)  && available){
			return true;
		}
	}
	return false;
	};

	getAppointmentCreateModel = (requestBody: AppointmentCreateModel, appointmentStart: Date, appointmentEnd: Date, appointmentStatus: AppointmentStatusDto, displayId: string) => {

	return {
			DisplayId           : displayId,
			BusinessNodeId      : requestBody.BusinessNodeId,
			CustomerId          : requestBody.CustomerId,
			BusinessUserId      : requestBody.BusinessUserId,
			BusinessServiceId   : requestBody.BusinessServiceId,
			StartTime           : appointmentStart,
			EndTime             : appointmentEnd,
			Type                : requestBody.Type ? requestBody.Type : 'IN-PERSON',
			Note                : requestBody.Note ? requestBody.Note : null,
			Status              : appointmentStatus.Status ? appointmentStatus.Status : '',
			StatusCode          : appointmentStatus.StatusCode ? appointmentStatus.StatusCode : '',
			Fees                : requestBody.Fees ? requestBody.Fees : 0.0,
			Tax                 : requestBody.Tax ? requestBody.Tax : 0.0,
			Tip                 : requestBody.Tip ? requestBody.Tip : 0.0,
			Discount            : requestBody.Discount ? requestBody.Discount : 0.0,
			CouponCode          : requestBody.CouponCode ? requestBody.CouponCode : null,
			Total               : requestBody.Total ? requestBody.Total : 0.0,
			IsPaid              : requestBody.IsPaid ? requestBody.IsPaid : false,
			TransactionId       : requestBody.TransactionId ? requestBody.TransactionId : null,
			IsCancelled			: requestBody.IsCancelled ? requestBody.IsCancelled : false,
			IsCompleted			: requestBody.IsCompleted ? requestBody.IsCompleted : false,
			IsConfirmed			: requestBody.IsConfirmed ? requestBody.IsConfirmed : false,
			IsRescheduled		: requestBody.IsRescheduled ? requestBody.IsRescheduled : false,
			IsActive			: requestBody.IsActive ? requestBody.IsActive : true,
		};
	};

	getNodeCustumerCreateModel = (businessNodeId: uuid, customerId: uuid) => {
	return {
			BusinessNodeId      : businessNodeId,
			CustomerId          : customerId,
			IsActive : true
		};
	};

	getSearchFilters = (query: any) => {
		const filters: AppointmentSearchFilters = {};

		let fromDate = (typeof query.fromDate != "undefined") ? query.fromDate : null;
		if (fromDate != null) {
			filters["FromDate"] = fromDate;
		}
		let toDate = (typeof query.toDate != "undefined") ? query.toDate : null;
		if (toDate != null) {
			filters["ToDate"] = toDate;
		}
		let businessUserId = (typeof query.businessUserId != "undefined") ? query.businessUserId : null;
		if (businessUserId != null) {
			filters["BusinessUserId"] = businessUserId;
		}
		let minutes = (typeof query.minutes != "undefined") ? query.minutes : null;
		if (minutes != null) {
			filters["Minutes"] = minutes;
		}
		return filters;
	};

	findSlotAvailability = async (
		timeZone: string,
		numDaysForSlots: number,
		startDate: Date,
		endDate: Date,
		nodeHours: BusinessNodeHourDto[],
		userHours: BusinessUserHourDto[],
		businessUserId: uuid,
		businessService: BusinessServiceDto,
		businessNodeId: uuid
	) => {
		let holidays = [];
		let businessHolidays = this.getHolidays(nodeHours, numDaysForSlots);
		let userHolidays = this.getHolidays(userHours, numDaysForSlots);
		holidays.push(...businessHolidays);
		holidays.push(...userHolidays);

		let weeklyWorkDays = this.getWorkingWeekDays(nodeHours, businessUserId, userHours);
		
		dayjs.updateLocale('en_IN', {
			holidays        : holidays,
			holidayFormat   : 'DD-MM-YYYY',
			workingWeekDays : weeklyWorkDays
		})

		const slotDuration = th.parseDurationInMin(businessService.ServiceDuration);
		const priorBookingWindowMin = th.parseDurationInMin(businessService.PriorBookingWindow);

		const slotsByDate = this.getAllSlots(
		timeZone,
		startDate,
		endDate,
		slotDuration,
		priorBookingWindowMin,
		nodeHours,
		businessUserId,
		userHours
		);

		const availableSlotsByDate = await this._service.getAvailableSlots(
		timeZone,
		slotsByDate,
		businessNodeId,
		businessUserId,
		businessService.id,
		numDaysForSlots
		);
		return availableSlotsByDate;
	};

	transform = (slotsByDate: SlotsByDateDto[]) => {
		let slots = [];
		for (var i = 0; i < slotsByDate.length; i++) {
		let temp = slotsByDate[i];
		let daySlots = [];
		for (var j = 0; j < temp.Slots.length; j++) {
			daySlots.push({
			slotStart	: th.utcDateFormat(temp.Slots[j].slotStart), 
			slotEnd		: th.utcDateFormat(temp.Slots[j].slotEnd),
			available	: temp.Slots[j].available,
			});
		}
		const s = {
			Date			: th.utcFormat(temp.CurrentMoment, "YYYY-MM-DD"),
			WeekDayId		: th.day(temp.CurrentMoment),
			WeekDay			: th.utcFormat(temp.CurrentMoment, "dddd"),
			DayStartTime	: temp.DayStartTime,
			DayEndTime		: temp.DayEndTime,
			Slots			: daySlots,
		};
		slots.push(s);
		}
		return slots;
	};

	getHolidays = (
		workHours: BusinessNodeHourDto[] | BusinessUserHourDto[],
		numDayForSlots: number
	) => {
		let dt: Date = new Date();
		let uptoDate = th.addDuration(dt, numDayForSlots, DurationType.Day);
		let holidays = [];
		for (let i = 0; i < workHours.length; i++) {
			let nd = workHours[i];
			if (nd.Type != "WEEKDAY" && nd.Type != "WEEKEND") {
				//It is a special day / holiday
				if (nd.Date != null && nd.IsOpen == false) {
					//No working hours and defined by date-not by day
					let date = new Date(nd.Date);
					if (th.isSameOrBefore(date, uptoDate)) {
						let dateStr = th.format(date, "DD-MM-YYYY");
						holidays.push(dateStr);
					}
				}
			}
		}
		return holidays;
	};

	getWorkingWeekDays = (
		nodeHours: BusinessNodeHourDto[],
		businessUserId: uuid,
		userHours: BusinessUserHourDto[]
	) => {
		let weeklyWorkDays = [];
		let businessWeekDays = this.getWeekDays(nodeHours);

		if (businessUserId != null) {
			let userWeekDays = this.getWeekDays(userHours);
			for (let i = 0; i < userWeekDays.length; i++) {
				let x = userWeekDays[i];
				if (businessWeekDays.includes(x)) {
					weeklyWorkDays.push(userWeekDays[i]);
				}
			}
		} else {
			weeklyWorkDays = businessWeekDays;
		}
		return weeklyWorkDays;
	};

	getWeekDays = (workHours: BusinessNodeHourDto[] | BusinessUserHourDto[]) => {
		let weekDays = [];
		for (var j = 0; j < workHours.length; j++) {
			let wh = workHours[j];
			if (wh.IsOpen && wh.Date == null && wh.IsActive) {
				weekDays.push(workHours[j].Day);
			}
		}
		return weekDays;
	};

	getAllSlots = (
		timeZone: string,
		startDate: Date,
		endDate: Date,
		slotDuration: number,
		priorBookingWindowMin: number,
		nodeHours: BusinessNodeHourDto[],
		businessUserId: uuid,
		userHours: BusinessUserHourDto[]
	) => {
		var nodeWorkingDays = new Map();

		for (var j = 0; j < nodeHours.length; j++) {
		let nh = nodeHours[j];
		if (nh.Date === null) {
			nodeWorkingDays.set(nh.Day, {
			startTime	: nh.StartTime,
			endTime		: nh.EndTime,
			IsOpen		: nh.IsOpen,
			});
		}
		}
		let nodeSlotsByDate = [];
		let numberOfDays = 0;
		let currMoment = th.utc(startDate);
		const spanStart = th.utc(startDate);
		const spanEnd = th.utc(endDate);
		const spanStartOfDay = th.startOf(spanStart, DurationType.Day);

		if (th.isSame(spanStartOfDay, spanEnd)) {
			numberOfDays = 1;
		} else {
			const a = currMoment;
			const b = spanEnd;
			const diff = th.businessDiff(a, b);
			numberOfDays = Math.ceil(diff) + 1;
		}

		const { offsetHours, offsetMinutes } = th.getTimezoneOffsets(timeZone);

		for (var i = 0; i < numberOfDays; i++) {
		if (th.isBusinessDay(currMoment)) {
			const currentDay = th.day(currMoment);
			const wd = nodeWorkingDays.get(currentDay);
			const startTime = wd.startTime;
			const endTime = wd.endTime;
			const currDayStart = th.startOfDayUtc(currMoment);
			
			const startTokens = startTime.split(":");
			const startHours = parseInt(startTokens[0]);
			const startMinutes = parseInt(startTokens[1]);
			const endTokens = endTime.split(":");
			const endHours = parseInt(endTokens[0]);
			const endMinutes = parseInt(endTokens[1]);

			let start = th.addDurationWithOffset(currDayStart,startHours, startMinutes, offsetHours, offsetMinutes);
			let end = th.addDurationWithOffset(currDayStart, endHours, endMinutes, offsetHours, offsetMinutes);
					
				nodeSlotsByDate.push({
					CurrentMoment   : currDayStart,
					Date            : th.format(currDayStart),
					WeekDay         : th.day(currDayStart),
					DayStartTime    : start,
					DayEndTime      : end,
					Slots           : this.calculateSlots(timeZone, currDayStart, startTime, endTime, slotDuration, priorBookingWindowMin),
				});
		}
			currMoment = th.nextBusinessDay(currMoment);
		}

		let slotsByDate = nodeSlotsByDate;
			//Filter the slots based on user's hours
		if (businessUserId != null) {
		let userWorkingDays = new Map();

		for (let j = 0; j < userHours.length; j++) {
			let uh = userHours[j];
			if (uh.Date != null) {
				continue;
			}
			userWorkingDays.set(uh.Day, {
			startTime	: uh.StartTime,
			endTime		: uh.EndTime,
			IsOpen		: uh.IsOpen,
			});
		}

		let userSlotsByDate = [];
		for (let k = 0; k < nodeSlotsByDate.length; k++) {
			const nodeSlot = nodeSlotsByDate[k];
			const weekDay = nodeSlot.WeekDay;
			const cm = nodeSlot.CurrentMoment;
			const userCurrentDayStart = th.startOfDayUtc(cm);
			let userSlotsForDay = [];

			if (userWorkingDays.has(weekDay)) {
			let userWorkingDay = userWorkingDays.get(weekDay);
			if (userWorkingDay.IsOpen) {
				const startTime = userWorkingDay.startTime;
				const endTime = userWorkingDay.endTime;

				const startTokens = startTime.split(":");
				const startHours = parseInt(startTokens[0]);
				const startMinutes = parseInt(startTokens[1]);
				const endTokens = endTime.split(":");
				const endHours = parseInt(endTokens[0]);
				const endMinutes = parseInt(endTokens[1]);
				const userCurrentDS = th.utc(userCurrentDayStart);
			
				let start = th.addDurationWithOffset(
				userCurrentDS,
				startHours,
				startMinutes,
				offsetHours,
				offsetMinutes
				);
				let end = th.addDurationWithOffset(
				userCurrentDS,
				endHours,
				endMinutes,
				offsetHours,
				offsetMinutes
				);

				for (var p = 0; p < nodeSlot.Slots.length; p++) {
					let s = nodeSlot.Slots[p];
					let slotS = s.slotStart;
					let slotE = s.slotEnd;
					if (th.isSameOrAfter(slotS, start) &&
						th.isSameOrBefore(slotE, end)) {
						userSlotsForDay.push(s);
					}
				}
				const userSlot = {
					CurrentMoment     : userCurrentDayStart,
					Date              : th.format(userCurrentDayStart),
					WeekDay           : th.day(userCurrentDayStart),
					DayStartTime      : start,
					DayEndTime        : end,
					userOffDay        : false,
					Slots             : userSlotsForDay,
				};
				userSlotsByDate.push(userSlot);
			} else {
				const userSlot = {
					CurrentMoment     : userCurrentDayStart, 
					Date              : th.format(userCurrentDayStart),
					WeekDay           : th.day(userCurrentDayStart),
					DayStartTime      : null,
					DayEndTime        : null,
					userOffDay        : true,
					Slots             : [],
				};
				userSlotsByDate.push();
			}
		}
	}
		slotsByDate = userSlotsByDate;
	}
		return slotsByDate;
	};

	calculateSlots = (
		timeZone: string,
		dateMoment: Date,
		startTime: string,
		endTime: string,
		timeSlotDurationMin: number,
		priorBookingWindowMin: number
	) => {
		const { offsetHours, offsetMinutes } = th.getTimezoneOffsets(timeZone);
		const date = new Date();
		const bookingWindowMoment = th.addDuration(
		date,
		priorBookingWindowMin,
		DurationType.Minute
		);
		let slots = [];
		const startTokens = startTime.split(":");
		const startHours = parseInt(startTokens[0]);
		const startMinutes = parseInt(startTokens[1]);
		const endTokens = endTime.split(":");
		const endHours = parseInt(endTokens[0]);
		const endMinutes = parseInt(endTokens[1]);
		let st = th.utc(dateMoment);

		let start = th.addDurationWithOffset(
			st,
			startHours,
			startMinutes,
			offsetHours,
			offsetMinutes
		);
		let end = th.addDurationWithOffset(
			st,
			endHours,
			endMinutes,
			offsetHours,
			offsetMinutes
		);

		let slotStart = start;
		let slotEnd = th.addDuration(
			start,
			timeSlotDurationMin,
			DurationType.Minute
		);
		
		while (th.isSameOrBefore(slotEnd, end)) {
		let available = true;
		if (th.isBefore(slotStart, bookingWindowMoment)) {
			available = false;
		}
		slots.push({
			slotStart	: slotStart,
			slotEnd		: slotEnd,
			available	: available,
		});
		slotStart = slotEnd;
		slotEnd = th.addDuration(
			slotStart,
			timeSlotDurationMin,
			DurationType.Minute
		);
		}
		return slots;
	};

    updateAppointmentSelector = async(query: any, appointment: any) => {
        const fromDate = (typeof query.fromDate != 'undefined') ? query.fromDate : null;
        const toDate = (typeof query.toDate != 'undefined') ? query.toDate : null;
        const timeZone = (typeof query.timeZone != 'undefined') ? query.timeZone : null;
        const show = (typeof query.show != 'undefined') ? query.show : null;

        _.set(appointment, 'isCancelled', false);
        _.set(appointment, 'IsActive', true);

        if(show) {
            if(show == 'Cancelled') {
                _.set(appointment, 'isCancelled', true);
                _.set(appointment, 'IsActive', false);
            }
            else if(show == 'Completed') {
                _.set(appointment, 'isCompleted', true);
                _.set(appointment, 'IsActive', false);
            }
            else if(show == 'Confirmed') {
                _.set(appointment, 'isConfirmed', true);
                _.set(appointment, 'IsActive', true);
            }
        }

        if (fromDate != null && toDate != null && timeZone != null) {
            const { offsetHours, offsetMinutes } = th.getTimezoneOffsets(timeZone);
            let start = th.getUtcDate(fromDate, offsetHours, offsetMinutes, false);
            let end = th.getUtcDate(toDate, offsetHours, offsetMinutes, true);
    
            _.set(appointment, 'StartTime', {
                gte : start
            });
            _.set(appointment, 'EndTime', {
                lte : end
            });
        }
        else {
            let current = th.getCurrentUtcDate();
            _.set(appointment, 'StartTime', {
                gte : current
            })
            let to = th.getDayUtc(30);
            _.set(appointment, 'EndTime', {
                lte : to
            })
        }
    };

    getUpdateModel = (requestBody: any): AppointmentUpdateModel => {

        let updateModel : AppointmentUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'BusinessServiceId')) {
            updateModel.BusinessServiceId = requestBody.BusinessServiceId;
        }
        if (Helper.hasProperty(requestBody, 'BusinessUserId')) {
            updateModel.BusinessUserId = requestBody.BusinessUserId;
        }
        if (Helper.hasProperty(requestBody, 'CustomerId')) {
            updateModel.CustomerId = requestBody.CustomerId;
        }
        if (Helper.hasProperty(requestBody, 'StartTime')) {
            updateModel.StartTime = requestBody.StartTime;
        }
        if (Helper.hasProperty(requestBody, 'EndTime')) {
            updateModel.EndTime = requestBody.EndTime;
        }
        if (Helper.hasProperty(requestBody, 'Status')) {
            updateModel.Status = requestBody.Status;
        }
        if (Helper.hasProperty(requestBody, 'StatusCode')) {
            updateModel.StatusCode = requestBody.StatusCode;
        }
        if (Helper.hasProperty(requestBody, 'Note')) {
            updateModel.Note = requestBody.Note;
        }
        if (Helper.hasProperty(requestBody, 'Type')) {
            updateModel.Type = requestBody.Type;
        }
        if (Helper.hasProperty(requestBody, 'Fees')) {
            updateModel.Fees = requestBody.Fees;
        }
        if (Helper.hasProperty(requestBody, 'Tax')) {
            updateModel.Tax = requestBody.Tax;
        }
        if (Helper.hasProperty(requestBody, 'Tip')) {
            updateModel.Tip = requestBody.Tip;
        }
        if (Helper.hasProperty(requestBody, 'Discount')) {
            updateModel.Discount = requestBody.Discount;
        }
        if (Helper.hasProperty(requestBody, 'CouponCode')) {
            updateModel.CouponCode = requestBody.CouponCode;
        }
        if (Helper.hasProperty(requestBody, 'Total')) {
            updateModel.Total = requestBody.Total;
        }
        if (Helper.hasProperty(requestBody, 'IsPaid')) {
            updateModel.IsPaid = requestBody.IsPaid;
        }
        if (Helper.hasProperty(requestBody, 'TransactionId')) {
            updateModel.TransactionId = requestBody.TransactionId;
        }
        return updateModel;
    };

	getAppointmentObject = async (record: AppointmentDto) => {
		const user = await this._businessUserService.getById(record.BusinessUserId);
		const customer = await this._customerService.getById(record.CustomerId);
		const node = await this._businessNodeService.getById(record.BusinessNodeId);
		const businessService = await this._businessServiceService.getById(record.BusinessServiceId);

		return {
			id                        : record.id,
			DisplayId                 : record.DisplayId,
			BusinessNodeId            : record.BusinessNodeId,
			CustomerId                : record.CustomerId,
			BusinessUserId            : record.BusinessUserId,
			BusinessServiceId         : record.BusinessServiceId,
			BusinessNodeName          : node.Name,
			BusinessServiceName       : businessService.Name,
			BusinessUserName          : user.Prefix + " " + user.FirstName + " " + user.LastName,
			CustomerName              : customer.Prefix + " " + customer.FirstName + " " + customer.LastName,
			CustomerDob               : customer.BirthDate,
			CustomerGender            : customer.Gender,
			CustomerDisplayPicture    : customer.DisplayPicture,
			Date                      : th.localFormat(record.StartTime, "YYYY-MM-DD"),
			StartTime                 : th.localFormat(record.StartTime, "HH:mm:ss"),
			EndTime                   : th.localFormat(record.EndTime, "HH:mm:ss"),
			StartTimeUtc              : record.StartTime,
			EndTimeUtc                : record.EndTime,
			Type                      : record.Type,
			Note                      : record.Note,
			Status                    : record.Status,
			StatusCode                : record.StatusCode,
			Fees                      : record.Fees,
			Tax                       : record.Tax,
			Tip                       : record.Tip,
			Discount                  : record.Discount,
			CouponCode                : record.CouponCode,
			Total                     : record.Total,
			IsPaid                    : record.IsPaid,
			TransactionId             : record.TransactionId,
			IsCompleted				  : record.IsCompleted,
			IsConfirmed				  : record.IsConfirmed,
			IsCancelled				  : record.IsCancelled,
			CancelledOn				  : record.CancelledOn,
			CompletedOn				  : record.CompletedOn,
			ConfirmedOn				  : record.ConfirmedOn,
			IsRescheduled			  : record.IsRescheduled,
			RescheduledAppointmentId  : record.RescheduledAppointmentId,
			RescheduledOn			  : record.RescheduledOn,
			IsActive				  : record.IsActive,
			CreatedAt                 : record.CreatedAt,
            UpdatedAt				  : record.UpdatedAt,
            IsDeleted                 : record.IsDeleted,
            DeletedAt                 : record.DeletedAt
		};
	};

	// findAllUpcomingAppointmentsAtSpecificDuration = async(query: any) => {
	// 	let reminderWindowMinutes = 60;
	// 	const filters = this.getSearchFilters(query);
	// 	if (filters.Minutes != null) {
	// 		reminderWindowMinutes = parseInt(filters.Minutes);
	// 	}
	// 	let from = th.getUtcDateBefore(5);
	// 	let to = th.getUtcDateAfter(reminderWindowMinutes + 5);

	// 	let selector = {}
	// 	_.set(selector, 'StartTime', {
	// 		between : [from, to],
	// 	});
	// 	_.set(selector, 'IsActive', true)

	// 	const appointments = await this.prisma.appointments.findMany(selector);
	// 	let apps = [];	
	// 	for await(let appointment of appointments) {
	// 		let app = await this.getAppointmentObject(appointment);
	// 		apps.push(app);
	// 	}
	// };
}
