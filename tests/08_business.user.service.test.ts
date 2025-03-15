import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()


///////////////////////////////////////////////////////////////////////////

describe('Business user service tests', function() {

    var agent = request.agent(infra._app);

    it('Create business user service', function(done) {
        loadBusinessUserServiceCreateModel();
        const createModel = getTestData("BusinessUserServiceCreateModel");
        agent
            .post(`/api/v1/business-user-services/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'BusinessUserServiceId');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessUserId');
                expect(response.body.Data).to.have.property('BusinessServiceId');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'BusinessUserServiceId');
                
                expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserServiceCreateModel").BusinessUserId);
                expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessUserServiceCreateModel").BusinessServiceId);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserServiceCreateModel").IsActive);
            })
            .expect(201, done);
    });

    it('Get business user service by id', function(done) {
        const id = `${getTestData("BusinessUserServiceId")}`
        agent
            .get(`/api/v1/business-user-services/${getTestData("BusinessUserServiceId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessUserId');
              expect(response.body.Data).to.have.property('BusinessServiceId');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserServiceCreateModel").BusinessUserId);
              expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessUserServiceCreateModel").BusinessServiceId);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserServiceCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search business user service records', function(done) {
      loadBusinessUserServiceQueryString();
        agent
            .get(`/api/v1/business-user-services/search${loadBusinessUserServiceQueryString()}`)
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

    it('Update business user service', function(done) {
        loadBusinessUserServiceUpdateModel();
        const updateModel = getTestData("BusinessUserServiceUpdateModel");
        const id = `${getTestData("BusinessUserServiceId")}`
        agent
            .put(`/api/v1/business-user-services/${getTestData("BusinessUserServiceId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessUserId');
              expect(response.body.Data).to.have.property('BusinessServiceId');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserServiceUpdateModel").BusinessUserId);
              expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessUserServiceUpdateModel").BusinessServiceId);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserServiceUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete business user service', function(done) {
        const id = `${getTestData("BusinessUserServiceId")}`

        //Delete
        agent
            .delete(`/api/v1/business-user-services/${getTestData("BusinessUserServiceId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
      });

      it('Create business user service again', function(done) {
        loadBusinessUserServiceCreateModel();
        const createModel = getTestData("BusinessUserServiceCreateModel");
        agent
            .post(`/api/v1/business-user-services/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'BusinessUserServiceId');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessUserId');
                expect(response.body.Data).to.have.property('BusinessServiceId');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'BusinessUserServiceId');
                
                expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserServiceCreateModel").BusinessUserId);
                expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessUserServiceCreateModel").BusinessServiceId);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserServiceCreateModel").IsActive);
            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessUserServiceCreateModel = async (
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessUserId : getTestData("BusinessUserId"),
      BusinessServiceId: getTestData("BusinessServiceId"),
      IsActive: true
    };
    setTestData(model, "BusinessUserServiceCreateModel");
}

export const loadBusinessUserServiceUpdateModel = async ( 
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessUserId : getTestData("BusinessUserId"),
      BusinessServiceId: getTestData("BusinessServiceId"),
      IsActive: true
  };
  setTestData(model, "BusinessUserServiceUpdateModel");
}

function loadBusinessUserServiceQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
