import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('User message tests', function() {

    var agent = request.agent(infra._app);

    it('Create user message', function(done) {
        loadUserMessageCreateModel();
        const createModel = getTestData("UserMessageCreateModel");
        agent
            .post(`/api/v1/user-messages/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'UserMessageId');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('CustomerId');            
                expect(response.body.Data).to.have.property('Body');
                expect(response.body.Data).to.have.property('Type');             
                expect(response.body.Data).to.have.property('TypeId');
                expect(response.body.Data).to.have.property('MessageId');
                expect(response.body.Data).to.have.property('IsSent');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'UserMessageId');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("UserMessageCreateModel").BusinessNodeId);
                expect(response.body.Data.CustomerId).to.equal(getTestData("UserMessageCreateModel").CustomerId);
                expect(response.body.Data.Body).to.equal(getTestData("UserMessageCreateModel").Body);
                expect(response.body.Data.Type).to.equal(getTestData("UserMessageCreateModel").Type);
                expect(response.body.Data.TypeId).to.equal(getTestData("UserMessageCreateModel").TypeId);
                expect(response.body.Data.MessageId).to.equal(getTestData("UserMessageCreateModel").MessageId);
                expect(response.body.Data.IsSent).to.equal(getTestData("UserMessageCreateModel").IsSent);
                expect(response.body.Data.IsActive).to.equal(getTestData("UserMessageCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get user message by id', function(done) {
        const id = `${getTestData("UserMessageId")}`
        agent
            .get(`/api/v1/user-messages/${getTestData("UserMessageId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('CustomerId');            
              expect(response.body.Data).to.have.property('Body');
              expect(response.body.Data).to.have.property('Type');             
              expect(response.body.Data).to.have.property('TypeId');
              expect(response.body.Data).to.have.property('MessageId');
              expect(response.body.Data).to.have.property('IsSent');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessNodeId).to.equal(global.TestCache.UserMessageCreateModel.BusinessNodeId);
              expect(response.body.Data.CustomerId).to.equal(global.TestCache.UserMessageCreateModel.CustomerId);
              expect(response.body.Data.Body).to.equal(global.TestCache.UserMessageCreateModel.Body);
              expect(response.body.Data.Type).to.equal(global.TestCache.UserMessageCreateModel.Type);
              expect(response.body.Data.TypeId).to.equal(global.TestCache.UserMessageCreateModel.TypeId);
              expect(response.body.Data.MessageId).to.equal(global.TestCache.UserMessageCreateModel.MessageId);
              expect(response.body.Data.IsSent).to.equal(global.TestCache.UserMessageCreateModel.IsSent);
              expect(response.body.Data.IsActive).to.equal(global.TestCache.UserMessageCreateModel.IsActive);
            })
            .expect(200, done);
    });

    it('Search user message records', function(done) {
      loadUserMessageQueryString();
        agent
            .get(`/api/v1/user-messages/search${loadUserMessageQueryString()}`)
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

    it('Update user message', function(done) {
        loadUserMessageUpdateModel();
        const updateModel = getTestData("UserMessageUpdateModel");
        const id = `${getTestData("UserMessageId")}`
        agent
            .put(`/api/v1/user-messages/${getTestData("UserMessageId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('CustomerId');            
              expect(response.body.Data).to.have.property('Body');
              expect(response.body.Data).to.have.property('Type');             
              expect(response.body.Data).to.have.property('TypeId');
              expect(response.body.Data).to.have.property('MessageId');
              expect(response.body.Data).to.have.property('IsSent');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("UserMessageUpdateModel").BusinessNodeId);
              expect(response.body.Data.CustomerId).to.equal(getTestData("UserMessageUpdateModel").CustomerId);
              expect(response.body.Data.Body).to.equal(getTestData("UserMessageUpdateModel").Body);
              expect(response.body.Data.Type).to.equal(getTestData("UserMessageUpdateModel").Type);
              expect(response.body.Data.TypeId).to.equal(getTestData("UserMessageUpdateModel").TypeId);
              expect(response.body.Data.MessageId).to.equal(getTestData("UserMessageUpdateModel").MessageId);
              expect(response.body.Data.IsSent).to.equal(getTestData("UserMessageUpdateModel").IsSent);
              expect(response.body.Data.IsActive).to.equal(getTestData("UserMessageUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete user message', function(done) {
        const id = `${getTestData("UserMessageId")}`

        //Delete
        agent
            .delete(`/api/v1/user-messages/${getTestData("UserMessageId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create user message again', function(done) {
      loadUserMessageCreateModel();
      const createModel = getTestData("UserMessageCreateModel");
      agent
          .post(`/api/v1/user-messages/`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
              setTestData( response.body.Data.id, 'UserMessageId');
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('CustomerId');            
              expect(response.body.Data).to.have.property('Body');
              expect(response.body.Data).to.have.property('Type');             
              expect(response.body.Data).to.have.property('TypeId');
              expect(response.body.Data).to.have.property('MessageId');
              expect(response.body.Data).to.have.property('IsSent');
              expect(response.body.Data).to.have.property('IsActive');

              setTestData( response.body.Data.id, 'UserMessageId');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("UserMessageCreateModel").BusinessNodeId);
              expect(response.body.Data.CustomerId).to.equal(getTestData("UserMessageCreateModel").CustomerId);
              expect(response.body.Data.Body).to.equal(getTestData("UserMessageCreateModel").Body);
              expect(response.body.Data.Type).to.equal(getTestData("UserMessageCreateModel").Type);
              expect(response.body.Data.TypeId).to.equal(getTestData("UserMessageCreateModel").TypeId);
              expect(response.body.Data.MessageId).to.equal(getTestData("UserMessageCreateModel").MessageId);
              expect(response.body.Data.IsSent).to.equal(getTestData("UserMessageCreateModel").IsSent);
              expect(response.body.Data.IsActive).to.equal(getTestData("UserMessageCreateModel").IsActive);

          })
          .expect(201, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const loadUserMessageCreateModel = async (
  Body = faker.lorem.words(),
  Type = faker.lorem.word(),
  TypeId = faker.number.int(),
  MessageId = faker.string.numeric(),
  ) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      Body: Body,
      Type: Type,
      TypeId: 1,
      MessageId: MessageId,
      IsSent: true,
      IsActive:true
    };
    setTestData(model, "UserMessageCreateModel");
}

export const loadUserMessageUpdateModel = async (
  Body = faker.lorem.words(),
  Type = faker.lorem.word(),
  TypeId = faker.number.int(),
  MessageId = faker.string.numeric(),
  ) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      Body: Body,
      Type: Type,
      TypeId: 1,
      MessageId: MessageId,
      IsSent: true,
      IsActive:true
  };
  setTestData(model, "UserMessageUpdateModel");
}

function loadUserMessageQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?businessNodeId=d73ebeb6-c4f6-4a4b-9cc8-9d691de09246&customerId=b802b622-92ae-47d7-a10f-06adba2c6eac&isActive=true'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
