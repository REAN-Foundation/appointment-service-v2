import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Appointment tests', function() {

    var agent = request.agent(infra._app);

  //   it('Customer try to Schedule appointment on some different time which is not available', function(done) {
  //     loadAppointmentBookTimeModel();
  //     const createModel = getTestData("AppointmentBookTimeModel");
  //     agent
  //         .post(`/api/v1/appointments/book`)
  //         .set('Content-Type', 'application/json')
  //         .set('x-api-key', `${process.env.TEST_API_KEY}`)
  //         .send(createModel)
  //         .expect(response => {
  //           expect(response.body).to.have.property('Status');
  //           expect(response.body.Status).to.equal('failure');
  //         })
  //         .expect(412, done);
  // });

    it('Slot duration is 30 min & customer try to extend duration', function(done) {
        loadAppointmentBookCreateModel();
        const createModel = getTestData("AppointmentBookCreateModel");
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

///////////////////////////////////////////////////////////////////////////

export const loadAppointmentBookTimeModel = async () => {
    const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        CustomerId: getTestData("CustomerId"),
        BusinessUserId: getTestData("BusinessUserId"),
        BusinessServiceId: getTestData("BusinessServiceId"),
        StartTime:  "2023-12-01T23:00:00Z",
        EndTime: "2023-12-01T23:30:00Z",
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
    setTestData(model, "AppointmentBookTimeModel");
}

export const loadAppointmentBookCreateModel = async () => {
    const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        CustomerId: getTestData("CustomerId"),
        BusinessUserId: getTestData("BusinessUserId"),
        BusinessServiceId: getTestData("BusinessServiceId"),
        StartTime:  "2023-12-01T16:30:00Z",
        EndTime: "2023-12-01T17:30:00Z",
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