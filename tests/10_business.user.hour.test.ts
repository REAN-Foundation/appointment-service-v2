import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()


///////////////////////////////////////////////////////////////////////////

describe('Business user hour tests', function() {

    var agent = request.agent(infra._app);

    it('Create business user hour', function(done) {
        loadBusinessUserHourCreateModel();
        const createModel = getTestData("BusinessUserHourCreateModel");
        agent
            .post(`/api/v1/business-user-hours/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'BusinessUserHourId')
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessUserId');
                expect(response.body.Data).to.have.property('Type');
                expect(response.body.Data).to.have.property('Day');
                expect(response.body.Data).to.have.property('Date');
                expect(response.body.Data).to.have.property('IsOpen');
                expect(response.body.Data).to.have.property('Message');
                expect(response.body.Data).to.have.property('StartTime');
                expect(response.body.Data).to.have.property('EndTime');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'BusinessUserHourId')

                expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserHourCreateModel").BusinessUserId);
                expect(response.body.Data.Type).to.equal(getTestData("BusinessUserHourCreateModel").Type);
                expect(response.body.Data.Day).to.equal(getTestData("BusinessUserHourCreateModel").Day);
               // expect(response.body.Data.Date).to.equal(getTestData("BusinessUserHourCreateModel").Date);
                expect(response.body.Data.IsOpen).to.equal(getTestData("BusinessUserHourCreateModel").IsOpen);
                expect(response.body.Data.Message).to.equal(getTestData("BusinessUserHourCreateModel").Message);
                expect(response.body.Data.StartTime).to.equal(getTestData("BusinessUserHourCreateModel").StartTime);
                expect(response.body.Data.EndTime).to.equal(getTestData("BusinessUserHourCreateModel").EndTime);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserHourCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get business user hour by id', function(done) {
        const id = `${getTestData("BusinessUserHourId")}`
        agent
            .get(`/api/v1/business-user-hours/${getTestData("BusinessUserHourId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessUserId');
              expect(response.body.Data).to.have.property('Type');
              expect(response.body.Data).to.have.property('Day');
              expect(response.body.Data).to.have.property('Date');
              expect(response.body.Data).to.have.property('IsOpen');
              expect(response.body.Data).to.have.property('Message');
              expect(response.body.Data).to.have.property('StartTime');
              expect(response.body.Data).to.have.property('EndTime');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserHourCreateModel").BusinessUserId);
              expect(response.body.Data.Type).to.equal(getTestData("BusinessUserHourCreateModel").Type);
              expect(response.body.Data.Day).to.equal(getTestData("BusinessUserHourCreateModel").Day);
              //(response.body.Data.Date).to.equal(getTestData("BusinessUserHourCreateModel").Date);
              expect(response.body.Data.IsOpen).to.equal(getTestData("BusinessUserHourCreateModel").IsOpen);
              expect(response.body.Data.Message).to.equal(getTestData("BusinessUserHourCreateModel").Message);
              expect(response.body.Data.StartTime).to.equal(getTestData("BusinessUserHourCreateModel").StartTime);
              expect(response.body.Data.EndTime).to.equal(getTestData("BusinessUserHourCreateModel").EndTime);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserHourCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search business user hour records', function(done) {
      loadBusinessUserHourQueryString();
        agent
            .get(`/api/v1/business-user-hours/search${loadBusinessUserHourQueryString()}`)
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

    it('Update business user hour', function(done) {
        loadBusinessUserHourUpdateModel();
        const updateModel = getTestData("BusinessUserHourUpdateModel");
        const id = `${getTestData("BusinessUserHourId")}`
        agent
            .put(`/api/v1/business-user-hours/${getTestData("BusinessUserHourId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessUserId');
              expect(response.body.Data).to.have.property('Type');
              expect(response.body.Data).to.have.property('Day');
              expect(response.body.Data).to.have.property('Date');
              expect(response.body.Data).to.have.property('IsOpen');
              expect(response.body.Data).to.have.property('Message');
              expect(response.body.Data).to.have.property('StartTime');
              expect(response.body.Data).to.have.property('EndTime');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserHourUpdateModel").BusinessUserId);
              expect(response.body.Data.Type).to.equal(getTestData("BusinessUserHourUpdateModel").Type);
              expect(response.body.Data.Day).to.equal(getTestData("BusinessUserHourUpdateModel").Day);
              expect(response.body.Data.Date).to.equal(getTestData("BusinessUserHourUpdateModel").Date);
              expect(response.body.Data.IsOpen).to.equal(getTestData("BusinessUserHourUpdateModel").IsOpen);
              expect(response.body.Data.Message).to.equal(getTestData("BusinessUserHourUpdateModel").Message);
              expect(response.body.Data.StartTime).to.equal(getTestData("BusinessUserHourUpdateModel").StartTime);
              expect(response.body.Data.EndTime).to.equal(getTestData("BusinessUserHourUpdateModel").EndTime);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserHourUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete business user hour', function(done) {
        const id = `${getTestData("BusinessUserHourId")}`

        //Delete
        agent
            .delete(`/api/v1/business-user-hours/${getTestData("BusinessUserHourId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create multiple business user hour', function(done) {
      loadBusinessUserHourCreateMultipleModel();
      const createModel = getTestData("BusinessUserHourCreateMultipleModel");
      agent
          .post(`/api/v1/business-user-hours/add-multiple`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
            for(const res of response.body.Data){
              setTestData(res.id, 'BusinessUserHourIds')
                expect(res).to.have.property('id');
                expect(res).to.have.property('BusinessUserId');
                expect(res).to.have.property('Type');
                expect(res).to.have.property('Day');
                expect(res).to.have.property('Date');
                expect(res).to.have.property('IsOpen');
                expect(res).to.have.property('Message');
                expect(res).to.have.property('StartTime');
                expect(res).to.have.property('EndTime');
                expect(res).to.have.property('IsActive');
            }
            })
        .expect(201, done);
    })
    
    it('Create business user hour again', function(done) {
      loadBusinessUserHourCreateModel();
      const createModel = getTestData("BusinessUserHourCreateModel");
      agent
          .post(`/api/v1/business-user-hours/`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
              setTestData( response.body.Data.id, 'BusinessUserHourId')
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessUserId');
              expect(response.body.Data).to.have.property('Type');
              expect(response.body.Data).to.have.property('Day');
              expect(response.body.Data).to.have.property('Date');
              expect(response.body.Data).to.have.property('IsOpen');
              expect(response.body.Data).to.have.property('Message');
              expect(response.body.Data).to.have.property('StartTime');
              expect(response.body.Data).to.have.property('EndTime');
              expect(response.body.Data).to.have.property('IsActive');

              setTestData( response.body.Data.id, 'BusinessUserHourId')

              expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserHourCreateModel").BusinessUserId);
              expect(response.body.Data.Type).to.equal(getTestData("BusinessUserHourCreateModel").Type);
              expect(response.body.Data.Day).to.equal(getTestData("BusinessUserHourCreateModel").Day);
             // expect(response.body.Data.Date).to.equal(getTestData("BusinessUserHourCreateModel").Date);
              expect(response.body.Data.IsOpen).to.equal(getTestData("BusinessUserHourCreateModel").IsOpen);
              expect(response.body.Data.Message).to.equal(getTestData("BusinessUserHourCreateModel").Message);
              expect(response.body.Data.StartTime).to.equal(getTestData("BusinessUserHourCreateModel").StartTime);
              expect(response.body.Data.EndTime).to.equal(getTestData("BusinessUserHourCreateModel").EndTime);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserHourCreateModel").IsActive);

          })
          .expect(201, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessUserHourCreateModel = async (
  Type = faker.lorem.word(),
  Message = faker.lorem.word(),
  Date = faker.date.past(),
  Day = faker.number.int({ min: 1, max: 7}),
) => {
    const model = {
      BusinessUserId: getTestData("BusinessUserId"),
      Type: Type,
      Day: Day,
      Date: Date,
      IsOpen: true,
      Message: Message,
      StartTime: '09:00:00',
      EndTime: '22:00:00',
    
      IsActive: true,
    };
    setTestData(model, "BusinessUserHourCreateModel");
}

export const loadBusinessUserHourCreateMultipleModel = async (
  Type = faker.lorem.word(),
  Day = faker.number.int({ min: 1, max: 7}),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessUserId: getTestData("BusinessUserId"),
	    DayWiseWorkingHours: [
		  {
			  Day: 1,
			  StartTime: "08:00:00",
			  EndTime: "22:00:00"
		  },
		  {
			  Day: 2,
			  IsOpen: false
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
  setTestData(model, "BusinessUserHourCreateMultipleModel");
}

export const loadBusinessUserHourUpdateModel = (
  Type = faker.lorem.word(),
  Day = faker.number.int({min: 1, max: 7}),
  Message = faker.lorem.word(),
  Date = faker.date.past(),
) => {
    const model = {
      BusinessUserId: getTestData("BusinessUserId"),
      Type: Type,
      Day: Day,
      Date: '2020-07-15T16:43:41.000Z',
      IsOpen: true,
      Message: Message,
      StartTime: '09:00:00',
      EndTime: '22:00:00',
      IsActive: true,
  };
  setTestData(model, "BusinessUserHourUpdateModel");    
}

function loadBusinessUserHourQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
