import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Appointment tests', function() {

    var agent = request.agent(infra._app);

    it('Create business service if businessServiceDuration = 30m & If customer defines the ServiceDuration = 30', function(done) {
        loadBusinessServiceCreateModel();
        const createModel = getTestData("BusinessServiceCreateModel");
        agent
            .post(`/api/v1/business-services/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'BusinessServiceId_3');
                    expect(response.body.Data).to.have.property('id');
                    expect(response.body.Data).to.have.property('BusinessNodeId');
                    expect(response.body.Data).to.have.property('Name');
                    expect(response.body.Data).to.have.property('Description');
                    expect(response.body.Data).to.have.property('ServiceDuration');
                    expect(response.body.Data).to.have.property('Fees');
                    expect(response.body.Data).to.have.property('IsTaxable');
                    expect(response.body.Data).to.have.property('TaxRate');
                    expect(response.body.Data).to.have.property('PaymentRequired');
                    expect(response.body.Data).to.have.property('PaymentPercent');
                    expect(response.body.Data).to.have.property('PriorBookingWindow');
                    expect(response.body.Data).to.have.property('SendReminder');
                    expect(response.body.Data).to.have.property('ReminderType');
                    expect(response.body.Data).to.have.property('AllowCancellation');
                    expect(response.body.Data).to.have.property('CancellationWindow');
                    expect(response.body.Data).to.have.property('CancellationCharges');
                    expect(response.body.Data).to.have.property('EnableLoyalty');
                    expect(response.body.Data).to.have.property('DisplayServicePicture');
                    expect(response.body.Data).to.have.property('IsActive');

                    setTestData( response.body.Data.id, 'BusinessServiceId_3');

                    expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessServiceCreateModel").BusinessNodeId);
                    expect(response.body.Data.Name).to.equal(getTestData("BusinessServiceCreateModel").Name);
                    expect(response.body.Data.Description).to.equal(getTestData("BusinessServiceCreateModel").Description);
                    expect(response.body.Data.ServiceDuration).to.equal(getTestData("BusinessServiceCreateModel").ServiceDuration);
                    expect(response.body.Data.Fees).to.equal(getTestData("BusinessServiceCreateModel").Fees);
                    expect(response.body.Data.IsTaxable).to.equal(getTestData("BusinessServiceCreateModel").IsTaxable);
                    expect(response.body.Data.TaxRate).to.equal(getTestData("BusinessServiceCreateModel").TaxRate);
                    expect(response.body.Data.PaymentRequired).to.equal(getTestData("BusinessServiceCreateModel").PaymentRequired);
                    expect(response.body.Data.PaymentPercent).to.equal(getTestData("BusinessServiceCreateModel").PaymentPercent);
                    expect(response.body.Data.PriorBookingWindow).to.equal(getTestData("BusinessServiceCreateModel").PriorBookingWindow);
                    expect(response.body.Data.SendReminder).to.equal(getTestData("BusinessServiceCreateModel").SendReminder);
                    expect(response.body.Data.ReminderType).to.equal(getTestData("BusinessServiceCreateModel").ReminderType);
                    expect(response.body.Data.AllowCancellation).to.equal(getTestData("BusinessServiceCreateModel").AllowCancellation);
                    expect(response.body.Data.CancellationWindow).to.equal(getTestData("BusinessServiceCreateModel").CancellationWindow);
                    expect(response.body.Data.CancellationCharges).to.equal(getTestData("BusinessServiceCreateModel").CancellationCharges);
                    expect(response.body.Data.EnableLoyalty).to.equal(getTestData("BusinessServiceCreateModel").EnableLoyalty);
                    expect(response.body.Data.DisplayServicePicture).to.equal(getTestData("BusinessServiceCreateModel").DisplayServicePicture);
                    expect(response.body.Data.IsActive).to.equal(getTestData("BusinessServiceCreateModel").IsActive);
                })
                .expect(201, done);
    });

    // it('Book appointment if businessServiceDuration = 30m & If customer defines the ServiceDuration = 30', function(done) {
    //     loadAppointmentBookCreateModel();
    //     const createModel = getTestData("AppointmentBookCreateModel");
    //     agent
    //         .post(`/api/v1/appointments/book`)
    //         .set('Content-Type', 'application/json')
    //         .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         .send(createModel)
    //         .expect(response => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('failure');
    //         })
    //         .expect(412, done);
    // });

    it('Create business service if AllowFutureBookingFor = 60d & If customer defines the AllowFutureBookingFor = 60', function(done) {
        loadBusinessNodeCreateModel();
        const createModel = getTestData("BusinessNodeCreateModel");
        agent
            .post(`/api/v1/business-nodes/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Node.id, 'BusinessNodeId');
                expect(response.body.Data.Node).to.have.property('id');
                expect(response.body.Data.Node).to.have.property('BusinessId');
                expect(response.body.Data.Node).to.have.property('Name');
                expect(response.body.Data.Node).to.have.property('Mobile');
                expect(response.body.Data.Node).to.have.property('Email');
                expect(response.body.Data.Node).to.have.property('DisplayPicture');
                expect(response.body.Data.Node).to.have.property('Address');
                expect(response.body.Data.Node).to.have.property('Longitude');
                expect(response.body.Data.Node).to.have.property('OverallRating');
                expect(response.body.Data.Node).to.have.property('AllowWalkinAppointments');
                expect(response.body.Data.Node).to.have.property('AllowFutureBookingFor');
                expect(response.body.Data.Node).to.have.property('IsActive');

                setTestData(response.body.Data.Node.id, 'BusinessNodeId');

                expect(response.body.Data.Node.BusinessId).to.equal(getTestData("BusinessNodeCreateModel").BusinessId);
                expect(response.body.Data.Node.Name).to.equal(getTestData("BusinessNodeCreateModel").Name);
                expect(response.body.Data.Node.Mobile).to.equal(getTestData("BusinessNodeCreateModel").Mobile);
                expect(response.body.Data.Node.Email).to.equal(getTestData("BusinessNodeCreateModel").Email);
                expect(response.body.Data.Node.DisplayPicture).to.equal(getTestData("BusinessNodeCreateModel").DisplayPicture);
                expect(response.body.Data.Node.Address).to.equal(getTestData("BusinessNodeCreateModel").Address);
                expect(response.body.Data.Node.Longitude).to.equal(getTestData("BusinessNodeCreateModel").Longitude);
                expect(response.body.Data.Node.OverallRating).to.equal(getTestData("BusinessNodeCreateModel").OverallRating);
                expect(response.body.Data.Node.AllowWalkinAppointments).to.equal(getTestData("BusinessNodeCreateModel").AllowWalkinAppointments);
                expect(response.body.Data.Node.AllowFutureBookingFor).to.equal(getTestData("BusinessNodeCreateModel").AllowFutureBookingFor);
                expect(response.body.Data.Node.IsActive).to.equal(getTestData("BusinessNodeCreateModel").IsActive);

            })
            .expect(201, done);
    });

    // it('Book appointment if AllowFutureBookingFor = 60d & If customer defines the AllowFutureBookingFor = 60', function(done) {
    //     loadAppointmentCreateModel();
    //     const createModel = getTestData("AppointmentCreateModel");
    //     agent
    //         .post(`/api/v1/appointments/book`)
    //         .set('Content-Type', 'application/json')
    //         .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         .send(createModel)
    //         .expect(response => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('failure');
    //         })
    //         .expect(404, done);
    // });

    it('If customer try to find available slots of past duration', function(done) {
        loadNotificationQueryString();
        const BusinessId = getTestData("BusinessId");
        const BusinessNodeId = getTestData("BusinessNodeId");
        const BusinessServiceId = getTestData("BusinessServiceId");
        agent
            .get(`/api/v1/appointments/business/${BusinessId}/node/${BusinessNodeId}/service/${BusinessServiceId}/slots${loadNotificationQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

 })

//   ///////////////////////////////////////////////////////////////////////////

export const loadBusinessServiceCreateModel = async (
    Name = faker.person.fullName(),
    Description = faker.commerce.productDescription(),
    ServiceDuration = faker.string.numeric(),
    Fees = faker.number.float({ precision: 0.2 }),
    IsTaxable = faker.string.numeric(),
    TaxRate = faker.number.float({ precision: 0.99 }),
    PaymentRequired = faker.string.numeric(),
    PaymentPercent = faker.number.int({ min: 1, max: 255 }),
    PriorBookingWindow = faker.string.numeric(),
    SendReminder = faker.string.numeric(),
    ReminderWindow = faker.string.numeric(),
    ReminderType = faker.lorem.word(),
    AllowCancellation = faker.string.numeric(),
    CancellationWindow = faker.string.numeric(),
    CancellationCharges = faker.number.float({ precision: 20.0 }),
    EnableLoyalty = faker.string.numeric(),
    DisplayServicePicture = faker.image.url(),
    IsActive = faker.datatype.boolean(),
    ) => {
        const model = {
            BusinessNodeId: global.TestCache.BusinessNodeId,
            Name: Name,
            Description: Description,
            ServiceDuration: "30",
            Fees: Fees,
            IsTaxable: true,
            TaxRate: TaxRate,
            PaymentRequired: true,
            PaymentPercent: PaymentPercent,
            PriorBookingWindow: "2h",
            SendReminder: true,
            ReminderWindow: ReminderWindow,
            ReminderType: ReminderType,
            AllowCancellation: true,
            CancellationWindow: CancellationWindow,
            CancellationCharges: CancellationCharges,
            EnableLoyalty: true,
            DisplayServicePicture: DisplayServicePicture,
            IsActive: true
        };
        setTestData(model, "BusinessServiceCreateModel");
    }

export const loadAppointmentBookCreateModel = async () => {
    const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        CustomerId: getTestData("CustomerId"),
        BusinessUserId: getTestData("BusinessUserId"),
        BusinessServiceId: getTestData("BusinessServiceId_3"),
        StartTime:  "2023-12-01T16:30:00Z",
        EndTime: "2023-12-01T17:00:00Z",
        Type: "IN-PERSON",
        Note: "This is doctor appointment note",
        StatusCode: "1",
        Fees: 300,
        Tax:10,
        Tip: 0,
        Discount: 0,
        Total: 330,
        IsPaid: true
    };
    setTestData(model, "AppointmentBookCreateModel");
}

export const loadBusinessNodeCreateModel = async (
    Name = faker.person.fullName(),
    Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
    Email = faker.internet.email(),
    DisplayPicture = faker.image.url(),
    Address = faker.location.streetAddress(),
    Longitude = faker.string.numeric(),
    OverallRating = faker.number.float(),
    AllowWalkinAppointments = faker.datatype.boolean(),
    AllowFutureBookingFor = faker.string.numeric(),
    IsActive = faker.datatype.boolean(), 
    ) => {
        const model = {
            BusinessId: getTestData("BusinessId"),
            Name: Name,
            Mobile: Mobile,
            Email: Email,
            DisplayPicture: DisplayPicture,
            Address: Address,
            Longitude: Longitude,
            OverallRating: 3.5,
            AllowWalkinAppointments: true,
            AllowFutureBookingFor: "60",
            IsActive: true
        };
        setTestData(model, "BusinessNodeCreateModel");
}

export const loadAppointmentCreateModel = async () => {
    const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        CustomerId: getTestData("CustomerId"),
        BusinessUserId: getTestData("BusinessUserId"),
        BusinessServiceId: getTestData("BusinessServiceId_3"),
        StartTime:  "2023-12-01T10:00:00Z",
        EndTime: "2023-12-01T10:30:00Z",
        Type: "IN-PERSON",
        Note: "This is doctor appointment note",
        StatusCode: "1",
        Fees: 300,
        Tax:10,
        Tip: 0,
        Discount: 0,
        Total: 330,
        IsPaid: true
    };
    setTestData(model, "AppointmentCreateModel");
}

export const loadAppointmentGetModel = async () => {
    const model = {
        BusinessId: getTestData("BusinessId"),
        BusinessNodeId: getTestData("BusinessNodeId"),
        BusinessServiceId: getTestData("BusinessServiceId"),
    };
    setTestData(model, "AppointmentGetModel");
}

    function loadNotificationQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
   return queryString;
}