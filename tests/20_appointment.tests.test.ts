import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { getTestData, setTestData } from './init';
import { endDate, startDate } from './utils';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Appointment tests', function() {

    var agent = request.agent(infra._app);

    it('Schedule appointment if date is before than current date', function(done) {
      loadAppointmentBookBeforeDateModel();
      const createModel = getTestData("AppointmentBookBeforeDateModel");
      agent
          .post(`/api/v1/appointments/book`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', `${process.env.TEST_API_KEY}`)
          .send(createModel)
          .expect(response => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('failure');
          })
          .expect(412, done);
  });

  it('Slot is available on given date & time and available is true', function(done) {
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

it('If slot is booked for given time & date', function(done) {
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
      .expect(500, done);
});

it('Appointment is book on available slot', function(done) {
  loadAppointmentAvailableModel();
  const createModel = getTestData("AppointmentAvailableModel");
  agent
      .post(`/api/v1/appointments/book`)
      .set('Content-Type', 'application/json')
      .set('x-api-key', `${process.env.TEST_API_KEY}`)
      .send(createModel)
      .expect(response => {
        expect(response.body).to.have.property('Status');
        expect(response.body.Status).to.equal('success');
      })
      .expect(201, done);
});

it('Book appointment then cancel & book again for same time & day', function(done) {
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

      //cancel appointment
      
      agent
      .get(`/api/v1/appointments/cancel/${getTestData("AppointmentId")}`)
      .set('Content-Type', 'application/json')
      .set('x-api-key', `${process.env.TEST_API_KEY}`)
      .expect(response => {
        expect(response.body).to.have.property('Status');
        expect(response.body.Status).to.equal('success');
      })

      //Again book appointment for same time
      const createAgainModel = getTestData("AppointmentBookAndCancelModel");
      agent
          .post(`/api/v1/appointments/book`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', `${process.env.TEST_API_KEY}`)
          .send(createAgainModel)
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
          // .expect(201, done);    
  });

  it('If business node hour is weekend or non-working day or IsOpen is false', function(done) {
    loadAppointmentNonWorkingDayModel();
    const createModel = getTestData("AppointmentNonWorkingDayModel");
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

  it('Update the booked appointment time slot but that time slot is already booked', function(done) {
    loadAppointmentBookUpdateTimeModel();
    const updateModel = getTestData("AppointmentBookUpdateTimeModel");
    const id = `${getTestData("AppointmentId")}`
      agent
          .put(`/api/v1/appointments/${getTestData("AppointmentId")}`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', `${process.env.TEST_API_KEY}`)
          .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
          .send(updateModel)
          .expect(response => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
          })
          .expect(200, done);
  });

  it('Slot available time is different & booking time is different', function(done) {
    loadAppointmentDiffTimeModel();
    const createModel = getTestData("AppointmentDiffTimeModel");
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

//   it('Future appointment booking allowed upto 60 days & customer try to book after 60 days', function(done) {
//     loadAppointmentBookFutureModel();
//     const createModel = getTestData("AppointmentBookFutureModel");
//     agent
//         .post(`/api/v1/appointments/book`)
//         .set('Content-Type', 'application/json')
//         .set('x-api-key', `${process.env.TEST_API_KEY}`)
//         .send(createModel)
//         .expect(response => {
//           expect(response.body).to.have.property('Status');
//           expect(response.body.Status).to.equal('success');
//         })
//         .expect(200, done);
//   });

});

///////////////////////////////////////////////////////////////////////////

export const loadAppointmentBookBeforeDateModel = async (
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      BusinessUserId: getTestData("BusinessUserId"),
      BusinessServiceId: getTestData("BusinessServiceId"),
      StartTime:  "2023-09-01T14:00:00Z",
      EndTime: "2023-09-01T14:30:00Z",
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
    setTestData(model, "AppointmentBookBeforeDateModel");
}

export const loadAppointmentBookCreateModel = async (
  ) => {
      const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        CustomerId: getTestData("CustomerId"),
        BusinessUserId: getTestData("BusinessUserId"),
        BusinessServiceId: getTestData("BusinessServiceId"),
        StartTime:  "2023-12-01T15:00:00Z",
        EndTime: "2023-12-01T15:30:00Z",
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

    export const loadAppointmentAvailableModel = async (
      ) => {
          const model = {
            BusinessNodeId: getTestData("BusinessNodeId"),
            CustomerId: getTestData("CustomerId"),
            BusinessUserId: getTestData("BusinessUserId"),
            BusinessServiceId: getTestData("BusinessServiceId"),
            StartTime:  "2023-12-01T12:30:00Z",
            EndTime: "2023-12-01T13:00:00Z",
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
          setTestData(model, "AppointmentAvailableModel");
      }

    export const loadAppointmentNonWorkingDayModel = async (
      ) => {
          const model = {
            BusinessNodeId: getTestData("BusinessNodeId"),
            CustomerId: getTestData("CustomerId"),
            BusinessUserId: getTestData("BusinessUserId"),
            BusinessServiceId: getTestData("BusinessServiceId"),
            StartTime:  startDate,
            EndTime: endDate,
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
          setTestData(model, "AppointmentNonWorkingDayModel");
      }

      export const loadAppointmentBookUpdateTimeModel = async (
        ) => {
            const model = {
              StartTime:  "2023-12-01T12:00:00Z",
              EndTime: "2023-12-01T12:30:00Z",
            };
            setTestData(model, "AppointmentBookUpdateTimeModel");
        }

      export const loadAppointmentBookTimeModel = async (
        ) => {
            const model = {
              BusinessNodeId: getTestData("BusinessNodeId"),
              CustomerId: getTestData("CustomerId"),
              BusinessUserId: getTestData("BusinessUserId"),
              BusinessServiceId: getTestData("BusinessServiceId"),
              StartTime:  "2023-12-01T14:30:00Z",
              EndTime: "2023-12-01T18:00:00Z",
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

        export const loadAppointmentDiffTimeModel = async (
          ) => {
              const model = {
                BusinessNodeId: getTestData("BusinessNodeId"),
                CustomerId: getTestData("CustomerId"),
                BusinessUserId: getTestData("BusinessUserId"),
                BusinessServiceId: getTestData("BusinessServiceId"),
                StartTime: "2023-12-01T23:30:00Z",
                EndTime: "2023-12-01T24:00:00Z",
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
              setTestData(model, "AppointmentDiffTimeModel");
          }

        // export const loadAppointmentBookFutureModel = async (
        //   ) => {
        //       const model = {
        //         BusinessNodeId: getTestData("BusinessNodeId"),
        //         CustomerId: getTestData("CustomerId"),
        //         BusinessUserId: getTestData("BusinessUserId"),
        //         BusinessServiceId: getTestData("BusinessServiceId"),
        //         StartTime:  "2024-11-02T14:30:00Z",
        //         EndTime: "2024-11-02T15:00:00Z",
        //         Type: "IN-PERSON",
        //         Note: "This is doctor appointment note",
        //         StatusCode: "1",
        //         Fees: 300,
        //         Tax:10,
        //         Tip: 0,
        //         Discount: 0,
        //         Total: 330,
        //         IsPaid: true
        //       };
        //       setTestData(model, "AppointmentBookFutureModel");
        //   }

///////////////////////////////////////////////////////////////////////////
