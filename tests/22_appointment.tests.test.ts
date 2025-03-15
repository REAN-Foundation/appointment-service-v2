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

    it('Create business service', function(done) {
        loadBusinessServiceCreateModel();
        const createModel = getTestData("BusinessServiceCreateModel");
        agent
            .post(`/api/v1/business-services/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'BusinessServiceId_1');
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

                setTestData( response.body.Data.id, 'BusinessServiceId_1');

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

    // it('If priorBookingWindow = "2h" and customer tries to book particular slot before 2 hours of available slots', function(done) {
    //     loadAppointmentBookCreateModel();
    //     const createModel = getTestData("AppointmentBookCreateModel");
    //     agent
    //         .post(`/api/v1/appointments/book`)
    //         .set('Content-Type', 'application/json')
    //         .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         .send(createModel)
    //         .expect(response => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('success');
    //         })
    //         .expect(201, done);
    // });

    it('If priorBookingWindow = "2h" and customer tries to book particular slot less than 2 hour of available slot', function(done) {
        loadAppointmentBookBeforeModel();
        const createModel = getTestData("AppointmentBookBeforeModel");
        agent
            .post(`/api/v1/appointments/book`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .send(createModel)
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('failure');
            })
            .expect(404, done);
    });
});

/////////////////////////////////////////////////////////////////////////////

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
            ServiceDuration: "30m",
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
        BusinessServiceId: getTestData("BusinessServiceId_1"),
        StartTime: "2023-12-01T16:30:00Z",
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

export const loadAppointmentBookBeforeModel = async () => {
    const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        CustomerId: getTestData("CustomerId"),
        BusinessUserId: getTestData("BusinessUserId"),
        BusinessServiceId: getTestData("BusinessServiceId"),
        StartTime: "2023-12-01T16:30:00Z",
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
    setTestData(model, "AppointmentBookBeforeModel");
}