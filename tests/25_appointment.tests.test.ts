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

    it('If appointment-status IsConfirmedStatus is false', function(done) {
      loadAppointmentStatusCreateModel();
      const createModel = getTestData("AppointmentStatusCreateModel");
      agent
          .post(`/api/v1/appointment-statuses/add-multiple`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('failure');
          })
          .expect(400, done);
    });

});

// // ///////////////////////////////////////////////////////////////////////////

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
      Status: "PAID",
      StatusCode:  StatusCode,
      StatusColor:  StatusColor,
      Sequence:  Sequence,
      IsCancellationStatus: true,
      IsConfirmedStatus: false,
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