import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Business node customer tests', function() {

    var agent = request.agent(infra._app);

    it('Create business node customer', function(done) {
        loadBusinessNodeCustomerCreateModel();
        const createModel = getTestData("BusinessNodeCustomerCreateModel");
        agent
            .post(`/api/v1/business-node-customers/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'BusinessNodeCustomerId');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('CustomerId');
                expect(response.body.Data).to.have.property('SmsConsent');         
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'BusinessNodeCustomerId');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
                expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
                expect(response.body.Data.SmsConsent).to.equal(getTestData("BusinessNodeCustomerCreateModel").SmsConsent);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get business node customer by id', function(done) {
        const id = `${getTestData("BusinessNodeCustomerId")}`
        agent
            .get(`/api/v1/business-node-customers/${getTestData("BusinessNodeCustomerId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('CustomerId');
                expect(response.body.Data).to.have.property('SmsConsent');         
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
                expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
                expect(response.body.Data.SmsConsent).to.equal(getTestData("BusinessNodeCustomerCreateModel").SmsConsent);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search business node customer records', function(done) {
      loadBusinessNodeCustomerQueryString();
        agent
            .get(`/api/v1/business-node-customers/search${loadBusinessNodeCustomerQueryString()}`)
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

    it('Update business node customer', function(done) {
        loadBusinessNodeCustomerUpdateModel();
        const updateModel = getTestData("BusinessNodeCustomerUpdateModel");
        const id = `${getTestData("BusinessNodeCustomerId")}`
        agent
            .put(`/api/v1/business-node-customers/${getTestData("BusinessNodeCustomerId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('CustomerId');
              expect(response.body.Data).to.have.property('SmsConsent');         
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerUpdateModel").BusinessNodeId);
              expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerUpdateModel").CustomerId);
              expect(response.body.Data.SmsConsent).to.equal(getTestData("BusinessNodeCustomerUpdateModel").SmsConsent);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeCustomerUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete business node customer', function(done) {
        const id = `${getTestData("BusinessNodeCustomerId")}`

        //Delete
        agent
            .delete(`/api/v1/business-node-customers/${getTestData("BusinessNodeCustomerId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create business node customer again', function(done) {
      loadBusinessNodeCustomerCreateModel();
      const createModel = getTestData("BusinessNodeCustomerCreateModel");
      agent
          .post(`/api/v1/business-node-customers/`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
              setTestData( response.body.Data.id, 'BusinessNodeCustomerId');
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('CustomerId');
              expect(response.body.Data).to.have.property('SmsConsent');         
              expect(response.body.Data).to.have.property('IsActive');

              setTestData( response.body.Data.id, 'BusinessNodeCustomerId');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
              expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
              expect(response.body.Data.SmsConsent).to.equal(getTestData("BusinessNodeCustomerCreateModel").SmsConsent);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsActive);

          })
          .expect(201, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessNodeCustomerCreateModel = async (
  SmsConsent = faker.lorem.word()
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId : getTestData("CustomerId"),
      SmsConsent: SmsConsent,
      IsActive: true
    };
    setTestData(model, "BusinessNodeCustomerCreateModel");
}

export const loadBusinessNodeCustomerUpdateModel = async (
 SmsConsent = faker.lorem.word()
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId : getTestData("CustomerId"),
      SmsConsent: SmsConsent,
      IsActive: true
  };
  setTestData(model, "BusinessNodeCustomerUpdateModel");
}

function loadBusinessNodeCustomerQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
