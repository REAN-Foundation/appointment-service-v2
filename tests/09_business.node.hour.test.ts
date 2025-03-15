import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()


///////////////////////////////////////////////////////////////////////////

describe('Business node hour tests', function() {

    var agent = request.agent(infra._app);

    it('Create business node hour', function(done) {
        loadBusinessNodeHourCreateModel();
        const createModel = getTestData("BusinessNodeHourCreateModel");
        agent
            .post(`/api/v1/business-node-hours/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.id, 'BusinessNodeHourId')
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('Type');
                expect(response.body.Data).to.have.property('Day');
                expect(response.body.Data).to.have.property('Date');
                expect(response.body.Data).to.have.property('IsOpen');
                expect(response.body.Data).to.have.property('Message');
                expect(response.body.Data).to.have.property('StartTime');
                expect(response.body.Data).to.have.property('EndTime');
                expect(response.body.Data).to.have.property('IsActive');
                expect(response.body.Data).to.have.property('IsDeleted');

                setTestData( response.body.Data.id, 'BusinessNodeHourId')

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeHourCreateModel").BusinessNodeId);
                expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeHourCreateModel").Type);
                expect(response.body.Data.Day).to.equal(getTestData("BusinessNodeHourCreateModel").Day);
                expect(response.body.Data.Date).to.equal(getTestData("BusinessNodeHourCreateModel").Date);
                expect(response.body.Data.IsOpen).to.equal(getTestData("BusinessNodeHourCreateModel").IsOpen);
                expect(response.body.Data.Message).to.equal(getTestData("BusinessNodeHourCreateModel").Message);
                expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeHourCreateModel").StartTime);
                expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeHourCreateModel").EndTime);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeHourCreateModel").IsActive);
                expect(response.body.Data.IsDeleted).to.equal(getTestData("BusinessNodeHourCreateModel").IsDeleted);
            })
            .expect(201, done);
    });

    it('Get business node hour by id', function(done) {
        const id = `${getTestData("BusinessNodeHourId")}`
        agent
            .get(`/api/v1/business-node-hours/${getTestData("BusinessNodeHourId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('Type');
              expect(response.body.Data).to.have.property('Day');
              expect(response.body.Data).to.have.property('Date');
              expect(response.body.Data).to.have.property('IsOpen');
              expect(response.body.Data).to.have.property('Message');
              expect(response.body.Data).to.have.property('StartTime');
              expect(response.body.Data).to.have.property('EndTime');
              expect(response.body.Data).to.have.property('IsActive');
              expect(response.body.Data).to.have.property('IsDeleted');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeHourCreateModel").BusinessNodeId);
              expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeHourCreateModel").Type);
              expect(response.body.Data.Day).to.equal(getTestData("BusinessNodeHourCreateModel").Day);
              expect(response.body.Data.Date).to.equal(getTestData("BusinessNodeHourCreateModel").Date);
              expect(response.body.Data.IsOpen).to.equal(getTestData("BusinessNodeHourCreateModel").IsOpen);
              expect(response.body.Data.Message).to.equal(getTestData("BusinessNodeHourCreateModel").Message);
              expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeHourCreateModel").StartTime);
              expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeHourCreateModel").EndTime);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeHourCreateModel").IsActive);
              expect(response.body.Data.IsDeleted).to.equal(getTestData("BusinessNodeHourCreateModel").IsDeleted);
            })
            .expect(200, done);
    });

    it('Search business node hour records', function(done) {
      loadBusinessNodeHourQueryString();
        agent
            .get(`/api/v1/business-node-hours/search${loadBusinessNodeHourQueryString()}`)
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

    it('Update business node hour', function(done) {
        loadBusinessNodeHourUpdateModel();
        const updateModel = getTestData("BusinessNodeHourUpdateModel");
        const id = `${getTestData("BusinessNodeHourId")}`
        agent
            .put(`/api/v1/business-node-hours/${getTestData("BusinessNodeHourId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('Type');
              expect(response.body.Data).to.have.property('Day');
              expect(response.body.Data).to.have.property('Date');
              expect(response.body.Data).to.have.property('IsOpen');
              expect(response.body.Data).to.have.property('Message');
              expect(response.body.Data).to.have.property('StartTime');
              expect(response.body.Data).to.have.property('EndTime');
              expect(response.body.Data).to.have.property('IsActive');
              expect(response.body.Data).to.have.property('IsDeleted');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeHourUpdateModel").BusinessNodeId);
              expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeHourUpdateModel").Type);
              expect(response.body.Data.Day).to.equal(getTestData("BusinessNodeHourUpdateModel").Day);
              expect(response.body.Data.Date).to.equal(getTestData("BusinessNodeHourUpdateModel").Date);
              expect(response.body.Data.IsOpen).to.equal(getTestData("BusinessNodeHourUpdateModel").IsOpen);
              expect(response.body.Data.Message).to.equal(getTestData("BusinessNodeHourUpdateModel").Message);
              expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeHourUpdateModel").StartTime);
              expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeHourUpdateModel").EndTime);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeHourUpdateModel").IsActive);
              expect(response.body.Data.IsDeleted).to.equal(getTestData("BusinessNodeHourUpdateModel").IsDeleted);

            })
            .expect(200, done);
    });

    it('Delete business node hour', function(done) {
        const id = `${getTestData("BusinessNodeHourId")}`

        //Delete
        agent
            .delete(`/api/v1/business-node-hours/${getTestData("BusinessNodeHourId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create multiple business node hour', function(done) {
      loadBusinessNodeHourCreateMultipleModel();
      const createModel = getTestData("BusinessNodeHourCreateMultipleModel");
      agent
          .post(`/api/v1/business-node-hours/add-multiple`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
            for(const res of response.body.Data){
              setTestData(res.id, 'BusinessNodeHourIds')
                expect(res).to.have.property('id');
                expect(res).to.have.property('BusinessNodeId');
                expect(res).to.have.property('Type');
                expect(res).to.have.property('Day');
                expect(res).to.have.property('Date');
                expect(res).to.have.property('IsOpen');
                expect(res).to.have.property('Message');
                expect(res).to.have.property('StartTime');
                expect(res).to.have.property('EndTime');
                expect(res).to.have.property('IsActive');
                expect(res).to.have.property('IsDeleted');
            }
            })
        .expect(201, done);
    })
    
    it('Create business node hour again', function(done) {
      loadBusinessNodeHourCreateModel();
      const createModel = getTestData("BusinessNodeHourCreateModel");
      agent
          .post(`/api/v1/business-node-hours/`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
              setTestData( response.body.Data.id, 'BusinessNodeHourId')
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('Type');
              expect(response.body.Data).to.have.property('Day');
              expect(response.body.Data).to.have.property('Date');
              expect(response.body.Data).to.have.property('IsOpen');
              expect(response.body.Data).to.have.property('Message');
              expect(response.body.Data).to.have.property('StartTime');
              expect(response.body.Data).to.have.property('EndTime');
              expect(response.body.Data).to.have.property('IsActive');
              expect(response.body.Data).to.have.property('IsDeleted');

              setTestData( response.body.Data.id, 'BusinessNodeHourId')

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeHourCreateModel").BusinessNodeId);
              expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeHourCreateModel").Type);
              expect(response.body.Data.Day).to.equal(getTestData("BusinessNodeHourCreateModel").Day);
              expect(response.body.Data.Date).to.equal(getTestData("BusinessNodeHourCreateModel").Date);
              expect(response.body.Data.IsOpen).to.equal(getTestData("BusinessNodeHourCreateModel").IsOpen);
              expect(response.body.Data.Message).to.equal(getTestData("BusinessNodeHourCreateModel").Message);
              expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeHourCreateModel").StartTime);
              expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeHourCreateModel").EndTime);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeHourCreateModel").IsActive);
              expect(response.body.Data.IsDeleted).to.equal(getTestData("BusinessNodeHourCreateModel").IsDeleted);

          })
          .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessNodeHourCreateModel = async (
  Type = faker.lorem.word(),
  Day = faker.number.int({ min: 10 }),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      Type: 'WORK-DAY',
      Day: 6,
      Date: '2020-07-15T16:43:41.000Z',
      IsOpen: true,
      Message: Message,
      StartTime: '09:00:00',
      EndTime: '22:00:00',
      IsActive: true,
      IsDeleted: false
    };
    setTestData(model, "BusinessNodeHourCreateModel");
}

export const loadBusinessNodeHourCreateMultipleModel = async (
  Type = faker.lorem.word(),
  Day = faker.number.int({ min: 10 }),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      DayWiseWorkingHours: [
        {
          Day: 1,
          StartTime: "09:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 2,
          StartTime: "09:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 3,
          StartTime: "09:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 4,
          StartTime: "14:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 5,
          StartTime: "16:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 6,
          StartTime: "16:00:00",
          EndTime: "22:00:00"
        }
      ]
    };
    setTestData(model, "BusinessNodeHourCreateMultipleModel");
}

export const loadBusinessNodeHourUpdateModel = (
  Type = faker.lorem.word(),
  Day = faker.number.int(),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      Type: Type,
      Day: 6,
      Date: '2020-07-15T16:43:41.000Z',
      IsOpen: true,
      Message: Message,
      StartTime: '09:00:00',
      EndTime: '22:00:00',
      IsActive: true,
      IsDeleted: false
  };
  setTestData(model, "BusinessNodeHourUpdateModel");    
}

function loadBusinessNodeHourQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
