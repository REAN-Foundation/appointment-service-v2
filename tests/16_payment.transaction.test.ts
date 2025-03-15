import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Payment transaction tests', function() {

    var agent = request.agent(infra._app);

    it('Create payment transaction', function(done) {
        loadPaymentTransactionCreateModel();
        const createModel = getTestData("PaymentTransactionCreateModel");
        agent
            .post(`/api/v1/payment-transactions/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'PaymentTransactionId');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('CustomerId');
                expect(response.body.Data).to.have.property('TotalAmount');
                expect(response.body.Data).to.have.property('ExternalId');
                expect(response.body.Data).to.have.property('Currency');
                expect(response.body.Data).to.have.property('Status');
                expect(response.body.Data).to.have.property('IsComplete');
                expect(response.body.Data).to.have.property('InitiatedOn');
                expect(response.body.Data).to.have.property('CompletedOn');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'PaymentTransactionId');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("PaymentTransactionCreateModel").BusinessNodeId);
                expect(response.body.Data.CustomerId).to.equal(getTestData("PaymentTransactionCreateModel").CustomerId);
                expect(response.body.Data.TotalAmount).to.equal(getTestData("PaymentTransactionCreateModel").TotalAmount);
                expect(response.body.Data.ExternalId).to.equal(getTestData("PaymentTransactionCreateModel").ExternalId);
                expect(response.body.Data.Currency).to.equal(getTestData("PaymentTransactionCreateModel").Currency);
                expect(response.body.Data.Status).to.equal(getTestData("PaymentTransactionCreateModel").Status);
                expect(response.body.Data.IsComplete).to.equal(getTestData("PaymentTransactionCreateModel").IsComplete);
                expect(response.body.Data.InitiatedOn).to.equal(getTestData("PaymentTransactionCreateModel").InitiatedOn);
                expect(response.body.Data.CompletedOn).to.equal(getTestData("PaymentTransactionCreateModel").CompletedOn);
                expect(response.body.Data.IsActive).to.equal(getTestData("PaymentTransactionCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get payment transaction by id', function(done) {
        const id = `${getTestData("PaymentTransactionId")}`
        agent
            .get(`/api/v1/payment-transactions/${getTestData("PaymentTransactionId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('CustomerId');
                expect(response.body.Data).to.have.property('TotalAmount');
                expect(response.body.Data).to.have.property('ExternalId');
                expect(response.body.Data).to.have.property('Currency');
                expect(response.body.Data).to.have.property('Status');
                expect(response.body.Data).to.have.property('IsComplete');
                expect(response.body.Data).to.have.property('InitiatedOn');
                expect(response.body.Data).to.have.property('CompletedOn');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("PaymentTransactionCreateModel").BusinessNodeId);
                expect(response.body.Data.CustomerId).to.equal(getTestData("PaymentTransactionCreateModel").CustomerId);
                expect(response.body.Data.TotalAmount).to.equal(getTestData("PaymentTransactionCreateModel").TotalAmount);
                expect(response.body.Data.ExternalId).to.equal(getTestData("PaymentTransactionCreateModel").ExternalId);
                expect(response.body.Data.Currency).to.equal(getTestData("PaymentTransactionCreateModel").Currency);
                expect(response.body.Data.Status).to.equal(getTestData("PaymentTransactionCreateModel").Status);
                expect(response.body.Data.IsComplete).to.equal(getTestData("PaymentTransactionCreateModel").IsComplete);
                expect(response.body.Data.InitiatedOn).to.equal(getTestData("PaymentTransactionCreateModel").InitiatedOn);
                expect(response.body.Data.CompletedOn).to.equal(getTestData("PaymentTransactionCreateModel").CompletedOn);
                expect(response.body.Data.IsActive).to.equal(getTestData("PaymentTransactionCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search payment transaction records', function(done) {
      loadPaymentTransactionQueryString();
        agent
            .get(`/api/v1/payment-transactions/search${loadPaymentTransactionQueryString()}`)
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

    it('Update payment transaction', function(done) {
        loadPaymentTransactionUpdateModel();
        const updateModel = getTestData("PaymentTransactionUpdateModel");
        const id = `${getTestData("PaymentTransactionId")}`
        agent
            .put(`/api/v1/payment-transactions/${getTestData("PaymentTransactionId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('CustomerId');
              expect(response.body.Data).to.have.property('TotalAmount');
              expect(response.body.Data).to.have.property('ExternalId');
              expect(response.body.Data).to.have.property('Currency');
              expect(response.body.Data).to.have.property('Status');
              expect(response.body.Data).to.have.property('IsComplete');
              expect(response.body.Data).to.have.property('InitiatedOn');
              expect(response.body.Data).to.have.property('CompletedOn');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("PaymentTransactionUpdateModel").BusinessNodeId);
              expect(response.body.Data.CustomerId).to.equal(getTestData("PaymentTransactionUpdateModel").CustomerId);
              expect(response.body.Data.TotalAmount).to.equal(getTestData("PaymentTransactionUpdateModel").TotalAmount);
              expect(response.body.Data.ExternalId).to.equal(getTestData("PaymentTransactionUpdateModel").ExternalId);
              expect(response.body.Data.Currency).to.equal(getTestData("PaymentTransactionUpdateModel").Currency);
              expect(response.body.Data.Status).to.equal(getTestData("PaymentTransactionUpdateModel").Status);
              expect(response.body.Data.IsComplete).to.equal(getTestData("PaymentTransactionUpdateModel").IsComplete);
              expect(response.body.Data.InitiatedOn).to.equal(getTestData("PaymentTransactionUpdateModel").InitiatedOn);
              expect(response.body.Data.CompletedOn).to.equal(getTestData("PaymentTransactionUpdateModel").CompletedOn);
              expect(response.body.Data.IsActive).to.equal(getTestData("PaymentTransactionUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete payment transaction', function(done) {
        const id = `${getTestData("PaymentTransactionId")}`

        //Delete
        agent
            .delete(`/api/v1/payment-transactions/${getTestData("PaymentTransactionId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create payment transaction again', function(done) {
      loadPaymentTransactionCreateModel();
      const createModel = getTestData("PaymentTransactionCreateModel");
      agent
          .post(`/api/v1/payment-transactions/`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
              setTestData( response.body.Data.id, 'PaymentTransactionId');
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('CustomerId');
              expect(response.body.Data).to.have.property('TotalAmount');
              expect(response.body.Data).to.have.property('ExternalId');
              expect(response.body.Data).to.have.property('Currency');
              expect(response.body.Data).to.have.property('Status');
              expect(response.body.Data).to.have.property('IsComplete');
              expect(response.body.Data).to.have.property('InitiatedOn');
              expect(response.body.Data).to.have.property('CompletedOn');
              expect(response.body.Data).to.have.property('IsActive');

              setTestData( response.body.Data.id, 'PaymentTransactionId');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("PaymentTransactionCreateModel").BusinessNodeId);
              expect(response.body.Data.CustomerId).to.equal(getTestData("PaymentTransactionCreateModel").CustomerId);
              expect(response.body.Data.TotalAmount).to.equal(getTestData("PaymentTransactionCreateModel").TotalAmount);
              expect(response.body.Data.ExternalId).to.equal(getTestData("PaymentTransactionCreateModel").ExternalId);
              expect(response.body.Data.Currency).to.equal(getTestData("PaymentTransactionCreateModel").Currency);
              expect(response.body.Data.Status).to.equal(getTestData("PaymentTransactionCreateModel").Status);
              expect(response.body.Data.IsComplete).to.equal(getTestData("PaymentTransactionCreateModel").IsComplete);
              expect(response.body.Data.InitiatedOn).to.equal(getTestData("PaymentTransactionCreateModel").InitiatedOn);
              expect(response.body.Data.CompletedOn).to.equal(getTestData("PaymentTransactionCreateModel").CompletedOn);
              expect(response.body.Data.IsActive).to.equal(getTestData("PaymentTransactionCreateModel").IsActive);

          })
          .expect(201, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const loadPaymentTransactionCreateModel = async (
  TotalAmount = faker.finance.amount(),
  ExternalId = faker.string.numeric(),
  Currency = faker.finance.currencyCode(),
  Status = faker.lorem.word(),
  IsComplete = faker.datatype.boolean(0.9),
  IsActive = faker.datatype.boolean(0.9)
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      TotalAmount: 300.0,
      ExternalId: ExternalId,
      Currency: Currency,
      Status: Status,
      IsComplete: true,
      InitiatedOn: '2020-07-12T03:19:34.000Z',
      CompletedOn: '2020-09-12T03:19:34.000Z',
      IsActive: true
    };
    setTestData(model, "PaymentTransactionCreateModel");
}

export const loadPaymentTransactionUpdateModel = async (
  TotalAmount = faker.finance.amount(),
  ExternalId = faker.string.numeric(),
  Currency = faker.finance.currencyCode(),
  Status = faker.lorem.word(),
  IsComplete = faker.datatype.boolean(0.9),
  IsActive = faker.datatype.boolean(0.9)
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      TotalAmount: 300.0,
      ExternalId: ExternalId,
      Currency: Currency,
      Status: Status,
      IsComplete: true,
      InitiatedOn: '2020-07-12T03:19:34.000Z',
      CompletedOn: '2020-09-12T03:19:34.000Z',
      IsActive: true
  };
  setTestData(model, "PaymentTransactionUpdateModel");
}

function loadPaymentTransactionQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?businessNodeId=d73ebeb6-c4f6-4a4b-9cc8-9d691de09246&customerId=b802b622-92ae-47d7-a10f-06adba2c6eac'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
