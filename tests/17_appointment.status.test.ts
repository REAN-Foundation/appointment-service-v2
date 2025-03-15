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
                setTestData( response.body.Data.id, 'AppointmentStatusId_1');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('Status');
                expect(response.body.Data).to.have.property('StatusColor');
                expect(response.body.Data).to.have.property('Sequence');
                expect(response.body.Data).to.have.property('IsCancellationStatus');
                expect(response.body.Data).to.have.property('IsConfirmedStatus');
                expect(response.body.Data).to.have.property('SendNotification');
                expect(response.body.Data).to.have.property('NotificationText');
                expect(response.body.Data).to.have.property('SendSms');
                expect(response.body.Data).to.have.property('SmsText');
                expect(response.body.Data).to.have.property('IsDashboardStatus');
                expect(response.body.Data).to.have.property('IsCompletedStatus');
                expect(response.body.Data).to.have.property('IsWalkinEntryStatus');         
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'AppointmentStatusId_1');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("AppointmentStatusCreateModel").BusinessNodeId);
                expect(response.body.Data.Status).to.equal(getTestData("AppointmentStatusCreateModel").Status);
                expect(response.body.Data.StatusColor).to.equal(getTestData("AppointmentStatusCreateModel").StatusColor);
                expect(response.body.Data.Sequence).to.equal(getTestData("AppointmentStatusCreateModel").Sequence);
                expect(response.body.Data.IsCancellationStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsCancellationStatus);
                expect(response.body.Data.IsConfirmedStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsConfirmedStatus);
                expect(response.body.Data.SendNotification).to.equal(getTestData("AppointmentStatusCreateModel").SendNotification);
                expect(response.body.Data.NotificationText).to.equal(getTestData("AppointmentStatusCreateModel").NotificationText);
                expect(response.body.Data.SendSms).to.equal(getTestData("AppointmentStatusCreateModel").SendSms);
                expect(response.body.Data.SmsText).to.equal(getTestData("AppointmentStatusCreateModel").SmsText);
                expect(response.body.Data.IsDashboardStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsDashboardStatus);
                expect(response.body.Data.IsCompletedStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsCompletedStatus);
                expect(response.body.Data.IsWalkinEntryStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsWalkinEntryStatus);
                expect(response.body.Data.IsActive).to.equal(getTestData("AppointmentStatusCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get appointment status by id', function(done) {
        const id = `${getTestData("AppointmentStatusId_1")}`
        agent
            .get(`/api/v1/appointment-statuses/${getTestData("AppointmentStatusId_1")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('Status');
                expect(response.body.Data).to.have.property('StatusColor');
                expect(response.body.Data).to.have.property('Sequence');
                expect(response.body.Data).to.have.property('IsCancellationStatus');
                expect(response.body.Data).to.have.property('IsConfirmedStatus');
                expect(response.body.Data).to.have.property('SendNotification');
                expect(response.body.Data).to.have.property('NotificationText');
                expect(response.body.Data).to.have.property('SendSms');
                expect(response.body.Data).to.have.property('SmsText');
                expect(response.body.Data).to.have.property('IsDashboardStatus');
                expect(response.body.Data).to.have.property('IsCompletedStatus');
                expect(response.body.Data).to.have.property('IsWalkinEntryStatus');         
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("AppointmentStatusCreateModel").BusinessNodeId);
                expect(response.body.Data.Status).to.equal(getTestData("AppointmentStatusCreateModel").Status);
                expect(response.body.Data.StatusColor).to.equal(getTestData("AppointmentStatusCreateModel").StatusColor);
                expect(response.body.Data.Sequence).to.equal(getTestData("AppointmentStatusCreateModel").Sequence);
                expect(response.body.Data.IsCancellationStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsCancellationStatus);
                expect(response.body.Data.IsConfirmedStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsConfirmedStatus);
                expect(response.body.Data.SendNotification).to.equal(getTestData("AppointmentStatusCreateModel").SendNotification);
                expect(response.body.Data.NotificationText).to.equal(getTestData("AppointmentStatusCreateModel").NotificationText);
                expect(response.body.Data.SendSms).to.equal(getTestData("AppointmentStatusCreateModel").SendSms);
                expect(response.body.Data.SmsText).to.equal(getTestData("AppointmentStatusCreateModel").SmsText);
                expect(response.body.Data.IsDashboardStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsDashboardStatus);
                expect(response.body.Data.IsCompletedStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsCompletedStatus);
                expect(response.body.Data.IsWalkinEntryStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsWalkinEntryStatus);
                expect(response.body.Data.IsActive).to.equal(getTestData("AppointmentStatusCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search appointment status records', function(done) {
      loadAppointmentStatusQueryString();
        agent
            .get(`/api/v1/appointment-statuses/search${loadAppointmentStatusQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('TotalCount');
                expect(response.body.Data).to.have.property('RetrievedCount');
                expect(response.body.Data).to.have.property('PageIndex');
                expect(response.body.Data).to.have.property('ItemsPerPage');
                expect(response.body.Data).to.have.property('Order');
                expect(response.body.Data.TotalCount).to.greaterThan(0);
                expect(response.body.Data.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('Update appointment status', function(done) {
        loadAppointmentStatusUpdateModel();
        const updateModel = getTestData("AppointmentStatusUpdateModel");
        const id = `${getTestData("AppointmentStatusId")}`
        agent
            .put(`/api/v1/appointment-statuses/${getTestData("AppointmentStatusId_1")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('Status');
              expect(response.body.Data).to.have.property('StatusColor');
              expect(response.body.Data).to.have.property('Sequence');
              expect(response.body.Data).to.have.property('IsCancellationStatus');
              expect(response.body.Data).to.have.property('IsConfirmedStatus');
              expect(response.body.Data).to.have.property('SendNotification');
              expect(response.body.Data).to.have.property('NotificationText');
              expect(response.body.Data).to.have.property('SendSms');
              expect(response.body.Data).to.have.property('SmsText');
              expect(response.body.Data).to.have.property('IsDashboardStatus');
              expect(response.body.Data).to.have.property('IsCompletedStatus');
              expect(response.body.Data).to.have.property('IsWalkinEntryStatus');         
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("AppointmentStatusUpdateModel").BusinessNodeId);
              expect(response.body.Data.Status).to.equal(getTestData("AppointmentStatusUpdateModel").Status);
              expect(response.body.Data.StatusColor).to.equal(getTestData("AppointmentStatusUpdateModel").StatusColor);
              expect(response.body.Data.Sequence).to.equal(getTestData("AppointmentStatusUpdateModel").Sequence);
              expect(response.body.Data.IsCancellationStatus).to.equal(getTestData("AppointmentStatusUpdateModel").IsCancellationStatus);
              expect(response.body.Data.IsConfirmedStatus).to.equal(getTestData("AppointmentStatusUpdateModel").IsConfirmedStatus);
              expect(response.body.Data.SendNotification).to.equal(getTestData("AppointmentStatusUpdateModel").SendNotification);
              expect(response.body.Data.NotificationText).to.equal(getTestData("AppointmentStatusUpdateModel").NotificationText);
              expect(response.body.Data.SendSms).to.equal(getTestData("AppointmentStatusUpdateModel").SendSms);
              expect(response.body.Data.SmsText).to.equal(getTestData("AppointmentStatusUpdateModel").SmsText);
              expect(response.body.Data.IsDashboardStatus).to.equal(getTestData("AppointmentStatusUpdateModel").IsDashboardStatus);
              expect(response.body.Data.IsCompletedStatus).to.equal(getTestData("AppointmentStatusUpdateModel").IsCompletedStatus);
              expect(response.body.Data.IsWalkinEntryStatus).to.equal(getTestData("AppointmentStatusUpdateModel").IsWalkinEntryStatus);
              expect(response.body.Data.IsActive).to.equal(getTestData("AppointmentStatusUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete appointment status', function(done) {
        const id = `${getTestData("AppointmentStatusId_1")}`

        //Delete
        agent
            .delete(`/api/v1/appointment-statuses/${getTestData("AppointmentStatusId_1")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create multiple appointment status', function(done) {
      loadAppointmentStatusMultipleModel();
      const createModel = getTestData("AppointmentStatusCreateMultipleModel");
      agent
          .post(`/api/v1/appointment-statuses/add-multiple`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
          })
          .expect(201, done);
  });

  it('Create appointment status again', function(done) {
    loadAppointmentStatusCreateModel();
    const createModel = getTestData("AppointmentStatusCreateModel");
    agent
        .post(`/api/v1/appointment-statuses/`)
        .set('Content-Type', 'application/json')
        .send(createModel)
        .expect(response => {
            setTestData( response.body.Data.id, 'AppointmentStatusId_1');
            expect(response.body.Data).to.have.property('id');
            expect(response.body.Data).to.have.property('BusinessNodeId');
            expect(response.body.Data).to.have.property('Status');
            expect(response.body.Data).to.have.property('StatusColor');
            expect(response.body.Data).to.have.property('Sequence');
            expect(response.body.Data).to.have.property('IsCancellationStatus');
            expect(response.body.Data).to.have.property('IsConfirmedStatus');
            expect(response.body.Data).to.have.property('SendNotification');
            expect(response.body.Data).to.have.property('NotificationText');
            expect(response.body.Data).to.have.property('SendSms');
            expect(response.body.Data).to.have.property('SmsText');
            expect(response.body.Data).to.have.property('IsDashboardStatus');
            expect(response.body.Data).to.have.property('IsCompletedStatus');
            expect(response.body.Data).to.have.property('IsWalkinEntryStatus');         
            expect(response.body.Data).to.have.property('IsActive');

            setTestData( response.body.Data.id, 'AppointmentStatusId_1');

            expect(response.body.Data.BusinessNodeId).to.equal(getTestData("AppointmentStatusCreateModel").BusinessNodeId);
            expect(response.body.Data.Status).to.equal(getTestData("AppointmentStatusCreateModel").Status);
            expect(response.body.Data.StatusColor).to.equal(getTestData("AppointmentStatusCreateModel").StatusColor);
            expect(response.body.Data.Sequence).to.equal(getTestData("AppointmentStatusCreateModel").Sequence);
            expect(response.body.Data.IsCancellationStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsCancellationStatus);
            expect(response.body.Data.IsConfirmedStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsConfirmedStatus);
            expect(response.body.Data.SendNotification).to.equal(getTestData("AppointmentStatusCreateModel").SendNotification);
            expect(response.body.Data.NotificationText).to.equal(getTestData("AppointmentStatusCreateModel").NotificationText);
            expect(response.body.Data.SendSms).to.equal(getTestData("AppointmentStatusCreateModel").SendSms);
            expect(response.body.Data.SmsText).to.equal(getTestData("AppointmentStatusCreateModel").SmsText);
            expect(response.body.Data.IsDashboardStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsDashboardStatus);
            expect(response.body.Data.IsCompletedStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsCompletedStatus);
            expect(response.body.Data.IsWalkinEntryStatus).to.equal(getTestData("AppointmentStatusCreateModel").IsWalkinEntryStatus);
            expect(response.body.Data.IsActive).to.equal(getTestData("AppointmentStatusCreateModel").IsActive);

        })
        .expect(201, done);
});    

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
      IsCancellationStatus: true,
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

export const loadAppointmentStatusMultipleModel = async (
) => {
  const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      Statuses: [
          {
              Status: "PAID/CONFIRMATION PENDING",
              StatusCode: "1",
              Sequence: 1,
              StatusColor: "#f9d232",
              SendNotification: true,
              NotificationText: "Confirmation is pending. (Payment for appointment is received)",
              SendSms: true,
              SmsText: "Appointment confirmation is pending.",
              IsDashboardStatus: true,
              IsCompletedStatus: false,
              IsCancellationStatus: false,
              IsWalkinEntryStatus: false,
              IsActive: true
          },
          {
              Status: "CONFIRMED",
              StatusCode: "2",
              Sequence: 2,
              StatusColor: "#f9d232",
              SendNotification: true,
              NotificationText: "Confirmed",
              SendSms: true,
              SmsText: "Appointment confirmed.",
              IsDashboardStatus: true,
              IsCompletedStatus: false,
              IsCancellationStatus: false,
              IsWalkinEntryStatus: false,
              IsConfirmedStatus: true
          },
          {
              Status: "IN-PROGRESS",
              StatusCode: "3",
              Sequence: 3,
              StatusColor: "#f9d242",
              SendNotification: false,
              NotificationText: "In progress",
              SendSms: false,
              SmsText: "Appointment in progress.",
              IsDashboardStatus: true,
              IsCompletedStatus: false,
              IsCancellationStatus: false,
              IsWalkinEntryStatus: false
          },
          {
              Status: "COMPLETED",
              StatusCode: "4",
              Sequence: 4,
              StatusColor: "#f9d242",
              SendNotification: false,
              NotificationText: "Completed",
              SendSms: false,
              SmsText: "Appointment is complete.",
              IsDashboardStatus: true,
              IsCompletedStatus: true,
              IsCancellationStatus: false,
              IsWalkinEntryStatus: false
          },
          {
              Status: "CANCELLED",
              StatusCode: "5",
              Sequence: 5,
              StatusColor: "#f9d242",
              SendNotification: false,
              NotificationText: "Cancelled",
              SendSms: false,
              SmsText: "Appointment is Cancelled.",
              IsDashboardStatus: true,
              IsCompletedStatus: false,
              IsCancellationStatus: true,
              IsWalkinEntryStatus: false
          },
          {
              Status: "POSTPONED",
              StatusCode: "6",
              Sequence: 6,
              StatusColor: "#f9d242",
              SendNotification: true,
              NotificationText: "Appointment postponed",
              SendSms: false,
              SmsText: "Appointment is postponed.",
              IsDashboardStatus: true,
              IsCompletedStatus: false,
              IsCancellationStatus: true,
              IsWalkinEntryStatus: false
          },
          {
              Status: "WALK-IN",
              StatusCode: "7",
              Sequence: 7,
              StatusColor: "#f9d242",
              SendNotification: true,
              NotificationText: "Walk-in apppointment started",
              SendSms: false,
              SmsText: "Walk-in apppointment started.",
              IsDashboardStatus: true,
              IsCompletedStatus: false,
              IsCancellationStatus: false
          }
      ]
  }
  setTestData(model, "AppointmentStatusCreateMultipleModel");
  }

export const loadAppointmentStatusUpdateModel = async (
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
      IsCancellationStatus: true,
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
  setTestData(model, "AppointmentStatusUpdateModel");
}

function loadAppointmentStatusQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
