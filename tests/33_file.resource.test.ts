import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('File resource tests', function() {

    var agent = request.agent(infra._app);

    it('Create file resource', function(done) {
        // loadFileResourceCreateModel();
        // const createModel = getTestData("FileResourceCreateModel");
        agent
            .post(`/api/v1/file-resources/upload`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .field('FileName', 'image')
            // .field('UserId', `${getTestData("UserManagementId")}`)
            .field('version', '1.0')
            .field('IsPublicResource', 'true')
            .field('Tags', 'dshsd')
            .attach('image', 'tests/upload/demo.jpg')
            .expect(response => {
                setTestData(response.body.Data.FileResources[0].id, 'FileId');
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(201, done);
    });

    // it('Get file resource by id', function(done) {
    //     const id = `${getTestData("FileResourceId")}`
    //     agent
    //         .get(`/api/v1/file-resources/${getTestData("FileResourceId")}`)
    //         .set('Content-Type', 'application/json')
    //         .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
    //         .expect(response => {
    //           expect(response.body.Data).to.have.property('id');
    //           expect(response.body.Data).to.have.property('UserId');
    //           expect(response.body.Data).to.have.property('FileName');
    //           expect(response.body.Data).to.have.property('version');
    //           expect(response.body.Data).to.have.property('IsPublicResource');
    //           expect(response.body.Data).to.have.property('Tags');

    //           expect(response.body.Data.UserId).to.equal(getTestData("FileResourceCreateModel").UserId);
    //           expect(response.body.Data.FileName).to.equal(getTestData("FileResourceCreateModel").FileName);
    //           expect(response.body.Data.version).to.equal(getTestData("FileResourceCreateModel").version);
    //           expect(response.body.Data.IsPublicResource).to.equal(getTestData("FileResourceCreateModel").IsPublicResource);
    //           expect(response.body.Data.Tags).to.equal(getTestData("FileResourceCreateModel").Tags);
    //         })
    //         .expect(200, done);
    // });

  //   it('Search file resource records', function(done) {
  //     loadPaymentTransactionQueryString();
  //       agent
  //           .get(`/api/v1/file-resources/search${loadPaymentTransactionQueryString()}`)
  //           .set('Content-Type', 'application/json')
  //           .set('x-api-key', `${process.env.TEST_API_KEY}`)
  //           .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
  //           .expect(response => {
  //               expect(response.body.Data).to.have.property('TotalCount');
  //               expect(response.body.Data).to.have.property('RetrievedCount');
  //               expect(response.body.Data).to.have.property('PageIndex');
  //               expect(response.body.Data).to.have.property('ItemsPerPage');
  //               expect(response.body.Data).to.have.property('Order');
  //               expect(response.body.Data.TotalCount).to.greaterThan(0);
  //               expect(response.body.Data.RetrievedCount).to.greaterThan(0);
  //               expect(response.body.Data.Items.length).to.greaterThan(0);
  //           })
  //           .expect(200, done);
  //   });

  //   it('Update file resource', function(done) {
  //       loadPaymentTransactionUpdateModel();
  //       const updateModel = getTestData("PaymentTransactionUpdateModel");
  //       const id = `${getTestData("FileResourceId")}`
  //       agent
  //           .put(`/api/v1/file-resources/${getTestData("FileResourceId")}`)
  //           .set('Content-Type', 'application/json')
  //           .set('x-api-key', `${process.env.TEST_API_KEY}`)
  //           .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
  //           .send(updateModel)
  //           .expect(response => {
  //             expect(response.body.Data).to.have.property('id');
  //             expect(response.body.Data).to.have.property('BusinessNodeId');
  //             expect(response.body.Data).to.have.property('CustomerId');
  //             expect(response.body.Data).to.have.property('TotalAmount');
  //             expect(response.body.Data).to.have.property('ExternalId');
  //             expect(response.body.Data).to.have.property('Currency');
  //             expect(response.body.Data).to.have.property('Status');
  //             expect(response.body.Data).to.have.property('IsComplete');
  //             expect(response.body.Data).to.have.property('InitiatedOn');
  //             expect(response.body.Data).to.have.property('CompletedOn');
  //             expect(response.body.Data).to.have.property('IsActive');

  //             expect(response.body.Data.BusinessNodeId).to.equal(getTestData("PaymentTransactionUpdateModel").BusinessNodeId);
  //             expect(response.body.Data.CustomerId).to.equal(getTestData("PaymentTransactionUpdateModel").CustomerId);
  //             expect(response.body.Data.TotalAmount).to.equal(getTestData("PaymentTransactionUpdateModel").TotalAmount);
  //             expect(response.body.Data.ExternalId).to.equal(getTestData("PaymentTransactionUpdateModel").ExternalId);
  //             expect(response.body.Data.Currency).to.equal(getTestData("PaymentTransactionUpdateModel").Currency);
  //             expect(response.body.Data.Status).to.equal(getTestData("PaymentTransactionUpdateModel").Status);
  //             expect(response.body.Data.IsComplete).to.equal(getTestData("PaymentTransactionUpdateModel").IsComplete);
  //             expect(response.body.Data.InitiatedOn).to.equal(getTestData("PaymentTransactionUpdateModel").InitiatedOn);
  //             expect(response.body.Data.CompletedOn).to.equal(getTestData("PaymentTransactionUpdateModel").CompletedOn);
  //             expect(response.body.Data.IsActive).to.equal(getTestData("PaymentTransactionUpdateModel").IsActive);

  //           })
  //           .expect(200, done);
  //   });

  //   it('Delete file resource', function(done) {
  //       const id = `${getTestData("FileResourceId")}`

  //       //Delete
  //       agent
  //           .delete(`/api/v1/file-resources/${getTestData("FileResourceId")}`)
  //           .set('Content-Type', 'application/json')
  //           .set('x-api-key', `${process.env.TEST_API_KEY}`)
  //           .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
  //           .expect(response => {
  //               expect(response.body).to.have.property('Status');
  //               expect(response.body.Status).to.equal('success');
  //           })
  //           .expect(200, done);
  //   });

  //   it('Create file resource again', function(done) {
  //     loadPaymentTransactionCreateModel();
  //     const createModel = getTestData("PaymentTransactionCreateModel");
  //     agent
  //         .post(`/api/v1/file-resources/`)
  //         .set('Content-Type', 'application/json')
  //         .send(createModel)
  //         .expect(response => {
  //             setTestData( response.body.Data.id, 'FileResourceId');
  //             expect(response.body.Data).to.have.property('id');
  //             expect(response.body.Data).to.have.property('BusinessNodeId');
  //             expect(response.body.Data).to.have.property('CustomerId');
  //             expect(response.body.Data).to.have.property('TotalAmount');
  //             expect(response.body.Data).to.have.property('ExternalId');
  //             expect(response.body.Data).to.have.property('Currency');
  //             expect(response.body.Data).to.have.property('Status');
  //             expect(response.body.Data).to.have.property('IsComplete');
  //             expect(response.body.Data).to.have.property('InitiatedOn');
  //             expect(response.body.Data).to.have.property('CompletedOn');
  //             expect(response.body.Data).to.have.property('IsActive');

  //             setTestData( response.body.Data.id, 'FileResourceId');

  //             expect(response.body.Data.BusinessNodeId).to.equal(getTestData("PaymentTransactionCreateModel").BusinessNodeId);
  //             expect(response.body.Data.CustomerId).to.equal(getTestData("PaymentTransactionCreateModel").CustomerId);
  //             expect(response.body.Data.TotalAmount).to.equal(getTestData("PaymentTransactionCreateModel").TotalAmount);
  //             expect(response.body.Data.ExternalId).to.equal(getTestData("PaymentTransactionCreateModel").ExternalId);
  //             expect(response.body.Data.Currency).to.equal(getTestData("PaymentTransactionCreateModel").Currency);
  //             expect(response.body.Data.Status).to.equal(getTestData("PaymentTransactionCreateModel").Status);
  //             expect(response.body.Data.IsComplete).to.equal(getTestData("PaymentTransactionCreateModel").IsComplete);
  //             expect(response.body.Data.InitiatedOn).to.equal(getTestData("PaymentTransactionCreateModel").InitiatedOn);
  //             expect(response.body.Data.CompletedOn).to.equal(getTestData("PaymentTransactionCreateModel").CompletedOn);
  //             expect(response.body.Data.IsActive).to.equal(getTestData("PaymentTransactionCreateModel").IsActive);

  //         })
  //         .expect(201, done);
  // });

});

///////////////////////////////////////////////////////////////////////////

export const loadFileResourceCreateModel = async (
  FileName = faker.system.fileName(),
  IsPublicResource = faker.datatype.boolean(0.9),
  Tags = faker.word.words()
) => {
    const model = {
      UserId: getTestData("UserManagementId"),
      FileName: FileName,
      version: 1.0,
      IsPublicResource: IsPublicResource,
      Tags: Tags,
    };
    setTestData(model, "FileResourceCreateModel");
}

export const loadFileResourceUpdateModel = async (
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
  setTestData(model, "FileResourceUpdateModel");
}

function loadFileResourceQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?businessNodeId=d73ebeb6-c4f6-4a4b-9cc8-9d691de09246&customerId=b802b622-92ae-47d7-a10f-06adba2c6eac'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
