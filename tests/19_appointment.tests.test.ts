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

    it('Find available slots', function(done) {
      loadAppointmentGetModel();
      const BusinessId = getTestData("BusinessId");
      const BusinessNodeId = getTestData("BusinessNodeId");
      const BusinessServiceId = getTestData("BusinessServiceId");
        agent
            .get(`/api/v1/appointments/business/${BusinessId}/node/${BusinessNodeId}/service/${BusinessServiceId}/slots`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Find available slots for user', function(done) {
      loadAppointmentGetUserModel();
      const BusinessUserId = getTestData("BusinessUserId");
        agent
            .get(`/api/v1/appointments/businessUser/${BusinessUserId}/slots`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create appointment', function(done) {
      loadAppointmentBookCreateModel();
      const createModel = getTestData("AppointmentBookCreateModel");
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
  });

  it('Get appointment by id', function(done) {
    const id = `${getTestData("AppointmentId")}`
    agent
        .get(`/api/v1/appointments/${getTestData("AppointmentId")}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
        .expect(response => {
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
        .expect(200, done);
});

  it('Get appointment by business user id', function(done) {
      const id = `${getTestData("BusinessUserId")}`
      agent
          .get(`/api/v1/appointments/business-user/${getTestData("BusinessUserId")}`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', `${process.env.TEST_API_KEY}`)
          .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
          .expect(response => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
          })
          .expect(200, done);
  });

  it('Get appointment by business node id', function(done) {
    const id = `${getTestData("BusinessNodeId")}`
    agent
        .get(`/api/v1/appointments/business-node/${getTestData("BusinessNodeId")}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
        .expect(response => {
          expect(response.body).to.have.property('Status');
          expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
});

it('Get appointment by customer id', function(done) {
  const id = `${getTestData("CustomerId")}`
  agent
      .get(`/api/v1/appointments/customer/${getTestData("CustomerId")}`)
      .set('Content-Type', 'application/json')
      .set('x-api-key', `${process.env.TEST_API_KEY}`)
      .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
      .expect(response => {
        expect(response.body).to.have.property('Status');
        expect(response.body.Status).to.equal('success');
      })
      .expect(200, done);
});

it('Get appointment by display id', function(done) {
  const id = `${getTestData("DisplayId")}`
  agent
      .get(`/api/v1/appointments/by-display-id/${getTestData("DisplayId")}`)
      .set('Content-Type', 'application/json')
      .set('x-api-key', `${process.env.TEST_API_KEY}`)
      .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
      .expect(response => {
        expect(response.body).to.have.property('Status');
        expect(response.body.Status).to.equal('success');
      })
      .expect(200, done);
});

it('Update appointment', function(done) {
    loadAppointmentBookUpdateModel();
    const updateModel = getTestData("AppointmentBookUpdateModel");
    const id = `${getTestData("AppointmentId")}`
      agent
          .put(`/api/v1/appointments/${getTestData("AppointmentId")}`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', `${process.env.TEST_API_KEY}`)
          .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
          .send(updateModel)
          .expect(response => {
            expect(response.body.Data.Appointment).to.have.property('id');
            expect(response.body.Data.Appointment).to.have.property('BusinessNodeId');
            expect(response.body.Data.Appointment).to.have.property('CustomerId');
            expect(response.body.Data.Appointment).to.have.property('BusinessUserId');
            expect(response.body.Data.Appointment).to.have.property('BusinessServiceId');
            expect(response.body.Data.Appointment).to.have.property('StartTime');         
            expect(response.body.Data.Appointment).to.have.property('EndTime');
            expect(response.body.Data.Appointment).to.have.property('Type');
            expect(response.body.Data.Appointment).to.have.property('Note');
            expect(response.body.Data.Appointment).to.have.property('StatusCode');
            expect(response.body.Data.Appointment).to.have.property('Fees');
            expect(response.body.Data.Appointment).to.have.property('Tax');
            expect(response.body.Data.Appointment).to.have.property('Tip');         
            expect(response.body.Data.Appointment).to.have.property('Discount');
            expect(response.body.Data.Appointment).to.have.property('Total');         
            expect(response.body.Data.Appointment).to.have.property('IsPaid');
  
            expect(response.body.Data.BusinessNodeId).to.equal(getTestData("AppointmentBookUpdateModel").BusinessNodeId);
            expect(response.body.Data.CustomerId).to.equal(getTestData("AppointmentBookUpdateModel").CustomerId);
            expect(response.body.Data.BusinessUserId).to.equal(getTestData("AppointmentBookUpdateModel").BusinessUserId);
            expect(response.body.Data.BusinessServiceId).to.equal(getTestData("AppointmentBookUpdateModel").BusinessServiceId);
            expect(response.body.Data.Type).to.equal(getTestData("AppointmentBookUpdateModel").Type);
            expect(response.body.Data.Note).to.equal(getTestData("AppointmentBookUpdateModel").Note);
            expect(response.body.Data.Appointment.StatusCode).to.equal(getTestData("AppointmentBookUpdateModel").StatusCode);
            expect(response.body.Data.Fees).to.equal(getTestData("AppointmentBookUpdateModel").Fees);
            expect(response.body.Data.Tax).to.equal(getTestData("AppointmentBookUpdateModel").Tax);
            expect(response.body.Data.Tip).to.equal(getTestData("AppointmentBookUpdateModel").Tip);
            expect(response.body.Data.Discount).to.equal(getTestData("AppointmentBookUpdateModel").Discount);
            expect(response.body.Data.Total).to.equal(getTestData("AppointmentBookUpdateModel").Total);
            expect(response.body.Data.IsPaid).to.equal(getTestData("AppointmentBookUpdateModel").IsPaid);
          })
          .expect(200, done);
  });

it('Cancel appointment', function(done) {
  const id = getTestData("AppointmentId");
    agent
        .put(`/api/v1/appointments/cancel/${getTestData("AppointmentId")}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .expect(response => {
          expect(response.body).to.have.property('Status');
          expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
  });

it('Complete appointment', function(done) {
  const id = getTestData("AppointmentId");
    agent
        .put(`/api/v1/appointments/complete/${getTestData("AppointmentId")}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .expect(response => {
          expect(response.body).to.have.property('Status');
          expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
});

it('Confirm appointment', function(done) {
  const id = getTestData("AppointmentId");
    agent
        .put(`/api/v1/appointments/confirm/${getTestData("AppointmentId")}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .expect(response => {
          expect(response.body).to.have.property('Status');
          expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
});

});

///////////////////////////////////////////////////////////////////////////

export const loadAppointmentGetModel = async (
) => {
    const model = {
      BusinessId: getTestData("BusinessId"),
      BusinessNodeId: getTestData("BusinessNodeId"),
      BusinessServiceId: getTestData("BusinessServiceId"),
    };
    setTestData(model, "AppointmentGetModel");
}

export const loadAppointmentGetUserModel = async (
) => {
    const model = {
      BusinessUserId: getTestData("BusinessUserId"),
    };
    setTestData(model, "AppointmentGetUserModel");
}

export const loadAppointmentBookCreateModel = async (
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      BusinessUserId: getTestData("BusinessUserId"),
      BusinessServiceId: getTestData("BusinessServiceId"),
      StartTime: "2025-01-27T14:00:00Z",
      EndTime: "2025-01-27T14:30:00Z",
      
      Type: "IN-PERSON",
      Note: "This is doctor appointment note",
      StatusCode: "1",
      Fees: 300,
      Tax:10,
      Tip: 0,
      Discount: 0,
      Total: 330,
      IsPaid: true

      // Type: faker.lorem.word(),
      // Note: faker.lorem.words(),
      // StatusCode: faker.lorem.word(),
      // Fees: faker.number.int({ min: 500, max: 100 }),
      // Tax: faker.number.int({ min: 1, max: 20 }),
      // Tip: faker.number.int({ min: 0, max: 1 }),
      // Discount: faker.number.int({ min: 0, max: 1 }),
      // Total: faker.number.int({ min: 500, max: 100 }),
      // IsPaid: true
    };
    setTestData(model, "AppointmentBookCreateModel");
}

export const loadAppointmentBookUpdateModel = async (
  ) => {
      const model = {
        Status: "Confirmed",
        StatusCode: "2",
      };
      setTestData(model, "AppointmentBookUpdateModel");
  }

///////////////////////////////////////////////////////////////////////////
