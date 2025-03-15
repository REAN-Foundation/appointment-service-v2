import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Appointment status tests', function() {

    var agent = request.agent(infra._app);

    it('Create appointment status', function(done) {
        loadAppointmentStatusCreateModel();
        const createModel = getTestData("AppointmentStatusCreateModel");
        agent
            .post(`/api/v1/appointment-statuses/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(201, done);
    });

    it('If appointment is booked & give IsCancelled = false. If customer tries to cancel the appointment.', function(done) {
      loadAppointmentBookAndCancelModel();
      const createModel = getTestData("AppointmentBookAndCancelModel");
      agent
          .post(`/api/v1/appointments/book`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', `${process.env.TEST_API_KEY}`)
          .send(createModel)
          .expect(response => {
              setTestData(response.body.Data.id, 'AppointmentId');
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('CustomerId');
              expect(response.body.Data).to.have.property('BusinessUserId');
              expect(response.body.Data).to.have.property('BusinessServiceId');
              expect(response.body.Data).to.have.property('StartTime');         
              expect(response.body.Data).to.have.property('EndTime');
              expect(response.body.Data).to.have.property('Type');
              expect(response.body.Data).to.have.property('Note');
              expect(response.body.Data).to.have.property('StatusCode');
              expect(response.body.Data).to.have.property('Fees');
              expect(response.body.Data).to.have.property('Tax');
              expect(response.body.Data).to.have.property('Tip');         
              expect(response.body.Data).to.have.property('Discount');
              expect(response.body.Data).to.have.property('Total');         
              expect(response.body.Data).to.have.property('IsPaid');
    
              setTestData(response.body.Data.id, 'AppointmentId');
    
              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("AppointmentBookCreateModel").BusinessNodeId);
              expect(response.body.Data.CustomerId).to.equal(getTestData("AppointmentBookCreateModel").CustomerId);
              expect(response.body.Data.BusinessUserId).to.equal(getTestData("AppointmentBookCreateModel").BusinessUserId);
              expect(response.body.Data.BusinessServiceId).to.equal(getTestData("AppointmentBookCreateModel").BusinessServiceId);
              expect(response.body.Data.Type).to.equal(getTestData("AppointmentBookCreateModel").Type);
              expect(response.body.Data.Note).to.equal(getTestData("AppointmentBookCreateModel").Note);
              expect(response.body.Data.StatusCode).to.equal(getTestData("AppointmentBookCreateModel").StatusCode);
              expect(response.body.Data.Fees).to.equal(getTestData("AppointmentBookCreateModel").Fees);
              expect(response.body.Data.Tax).to.equal(getTestData("AppointmentBookCreateModel").Tax);
              expect(response.body.Data.Tip).to.equal(getTestData("AppointmentBookCreateModel").Tip);
              expect(response.body.Data.Discount).to.equal(getTestData("AppointmentBookCreateModel").Discount);
              expect(response.body.Data.Total).to.equal(getTestData("AppointmentBookCreateModel").Total);
              expect(response.body.Data.IsPaid).to.equal(getTestData("AppointmentBookCreateModel").IsPaid);
          })
          .expect(201, done);
    
          // cancel appointment
          agent
          .get(`/api/v1/appointments/cancel/${getTestData("AppointmentId")}`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', `${process.env.TEST_API_KEY}`)
          .expect(response => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('failure');
          })
      })
});

///////////////////////////////////////////////////////////////////////////

export const loadAppointmentStatusCreateModel = async (
  Status = faker.lorem.word(),
  StatusCode = faker.string.numeric(),
  StatusColor = faker.color.rgb({ format: 'hex', casing: 'lower' }),
  Sequence = faker.number.int(100),
  IsCancellationStatus = faker.datatype.boolean(0.9),
  IsConfirmedStatus = faker.datatype.boolean(0.9),
  SendNotification = faker.datatype.boolean(0.9),
  NotificationText = faker.lorem.text(),
  SendSms = faker.datatype.boolean(0.9),
  SmsText = faker.lorem.words(),
  IsDashboardStatus = faker.datatype.boolean(0.9),
  IsCompletedStatus= faker.datatype.boolean(0.9),
  IsWalkinEntryStatus = faker.datatype.boolean(0.9),
  IsActive = faker.datatype.boolean(0.9)
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      Status: Status,
      StatusCode:  StatusCode,
      StatusColor:  StatusColor,
      Sequence:  Sequence,
      IsCancellationStatus: false,
      IsConfirmedStatus: true,
      SendNotification:  true,
      NotificationText: NotificationText,
      SendSms:  true,
      SmsText: SmsText,
      IsDashboardStatus: true,
      IsCompletedStatus: true,
      IsWalkinEntryStatus: true,
      IsActive: true
    };
    setTestData(model, "AppointmentStatusCreateModel");
}

export const loadAppointmentBookAndCancelModel = async (
  ) => {
      const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        CustomerId: getTestData("CustomerId"),
        BusinessUserId: getTestData("BusinessUserId"),
        BusinessServiceId: getTestData("BusinessServiceId"),
        StartTime:  "2023-12-01T11:30:00Z",
        EndTime: "2023-12-01T12:00:00Z",
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
      setTestData(model, "AppointmentBookAndCancelModel");
}

///////////////////////////////////////////////////////////////////////////
