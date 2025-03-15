import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Notification tests', function() {

    var agent = request.agent(infra._app);

    it('Create notification', function(done) {
        loadNotificationCreateModel();
        const createModel = getTestData("NotificationCreateModel");
        agent
            .post(`/api/v1/notifications/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'NotificationId');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('CustomerId');
                expect(response.body.Data).to.have.property('Title');
                expect(response.body.Data).to.have.property('Body');
                expect(response.body.Data).to.have.property('Type');
                expect(response.body.Data).to.have.property('IsRead');
                expect(response.body.Data).to.have.property('TypeId');
                expect(response.body.Data).to.have.property('Message');
                expect(response.body.Data).to.have.property('IsSent');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'NotificationId');
 
                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("NotificationCreateModel").BusinessNodeId);
                expect(response.body.Data.CustomerId).to.equal(getTestData("NotificationCreateModel").CustomerId);
                expect(response.body.Data.Title).to.equal(getTestData("NotificationCreateModel").Title);
                expect(response.body.Data.Body).to.equal(getTestData("NotificationCreateModel").Body);
                expect(response.body.Data.Type).to.equal(getTestData("NotificationCreateModel").Type);
                expect(response.body.Data.IsRead).to.equal(getTestData("NotificationCreateModel").IsRead);
                expect(response.body.Data.TypeId).to.equal(getTestData("NotificationCreateModel").TypeId);
                expect(response.body.Data.Message).to.equal(getTestData("NotificationCreateModel").Message);
                expect(response.body.Data.IsSent).to.equal(getTestData("NotificationCreateModel").IsSent);
                expect(response.body.Data.IsActive).to.equal(getTestData("NotificationCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get notification by id', function(done) {
        const id = `${getTestData("NotificationId")}`
        agent
            .get(`/api/v1/notifications/${getTestData("NotificationId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('CustomerId');
                expect(response.body.Data).to.have.property('Title');
                expect(response.body.Data).to.have.property('Body');
                expect(response.body.Data).to.have.property('Type');
                expect(response.body.Data).to.have.property('IsRead');
                expect(response.body.Data).to.have.property('TypeId');
                expect(response.body.Data).to.have.property('Message');
                expect(response.body.Data).to.have.property('IsSent');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("NotificationCreateModel").BusinessNodeId);
                expect(response.body.Data.CustomerId).to.equal(getTestData("NotificationCreateModel").CustomerId);
                expect(response.body.Data.Title).to.equal(getTestData("NotificationCreateModel").Title);
                expect(response.body.Data.Body).to.equal(getTestData("NotificationCreateModel").Body);
                expect(response.body.Data.Type).to.equal(getTestData("NotificationCreateModel").Type);
                expect(response.body.Data.IsRead).to.equal(getTestData("NotificationCreateModel").IsRead);
                expect(response.body.Data.TypeId).to.equal(getTestData("NotificationCreateModel").TypeId);
                expect(response.body.Data.Message).to.equal(getTestData("NotificationCreateModel").Message);
                expect(response.body.Data.IsSent).to.equal(getTestData("NotificationCreateModel").IsSent);
                expect(response.body.Data.IsActive).to.equal(getTestData("NotificationCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search notification records', function(done) {
      loadNotificationQueryString();
        agent
            .get(`/api/v1/notifications/search${loadNotificationQueryString()}`)
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

    it('Update notification', function(done) {
        loadNotificationUpdateModel();
        const updateModel = getTestData("NotificationUpdateModel");
        const id = `${getTestData("NotificationId")}`
        agent
            .put(`/api/v1/notifications/${getTestData("NotificationId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('CustomerId');
                expect(response.body.Data).to.have.property('Title');
                expect(response.body.Data).to.have.property('Body');
                expect(response.body.Data).to.have.property('Type');
                expect(response.body.Data).to.have.property('IsRead');
                expect(response.body.Data).to.have.property('TypeId');
                expect(response.body.Data).to.have.property('Message');
                expect(response.body.Data).to.have.property('IsSent');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("NotificationUpdateModel").BusinessNodeId);
                expect(response.body.Data.CustomerId).to.equal(getTestData("NotificationUpdateModel").CustomerId);
                expect(response.body.Data.Title).to.equal(getTestData("NotificationUpdateModel").Title);
                expect(response.body.Data.Body).to.equal(getTestData("NotificationUpdateModel").Body);
                expect(response.body.Data.Type).to.equal(getTestData("NotificationUpdateModel").Type);
                expect(response.body.Data.IsRead).to.equal(getTestData("NotificationUpdateModel").IsRead);
                expect(response.body.Data.TypeId).to.equal(getTestData("NotificationUpdateModel").TypeId);
                expect(response.body.Data.Message).to.equal(getTestData("NotificationUpdateModel").Message);
                expect(response.body.Data.IsSent).to.equal(getTestData("NotificationUpdateModel").IsSent);
                expect(response.body.Data.IsActive).to.equal(getTestData("NotificationUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete notification', function(done) {
        const id = `${getTestData("NotificationId")}`

        //Delete
        agent
            .delete(`/api/v1/notifications/${getTestData("NotificationId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create notification again', function(done) {
      loadNotificationCreateModel();
      const createModel = getTestData("NotificationCreateModel");
      agent
          .post(`/api/v1/notifications/`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
              setTestData( response.body.Data.id, 'NotificationId');
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('CustomerId');
              expect(response.body.Data).to.have.property('Title');
              expect(response.body.Data).to.have.property('Body');
              expect(response.body.Data).to.have.property('Type');
              expect(response.body.Data).to.have.property('IsRead');
              expect(response.body.Data).to.have.property('TypeId');
              expect(response.body.Data).to.have.property('Message');
              expect(response.body.Data).to.have.property('IsSent');
              expect(response.body.Data).to.have.property('IsActive');

              setTestData( response.body.Data.id, 'NotificationId');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("NotificationCreateModel").BusinessNodeId);
              expect(response.body.Data.CustomerId).to.equal(getTestData("NotificationCreateModel").CustomerId);
              expect(response.body.Data.Title).to.equal(getTestData("NotificationCreateModel").Title);
              expect(response.body.Data.Body).to.equal(getTestData("NotificationCreateModel").Body);
              expect(response.body.Data.Type).to.equal(getTestData("NotificationCreateModel").Type);
              expect(response.body.Data.IsRead).to.equal(getTestData("NotificationCreateModel").IsRead);
              expect(response.body.Data.TypeId).to.equal(getTestData("NotificationCreateModel").TypeId);
              expect(response.body.Data.Message).to.equal(getTestData("NotificationCreateModel").Message);
              expect(response.body.Data.IsSent).to.equal(getTestData("NotificationCreateModel").IsSent);
              expect(response.body.Data.IsActive).to.equal(getTestData("NotificationCreateModel").IsActive);

          })
          .expect(201, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const loadNotificationCreateModel = async (
  Title = faker.lorem.word(),
  Body = faker.lorem.words(),
  Type = faker.lorem.word(),
  IsRead = faker.datatype.boolean(0.9),
  Message = faker.lorem.words(),
  IsSent = faker.datatype.boolean(0.9),
  IsActive = faker.datatype.boolean(0.9)
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      Title: Title,
      Body: Body,
      Type: Type,
      IsRead: true,
      TypeId: 1,
      Message: Message,
      IsSent: true,
      IsActive: true
    };
    setTestData(model, "NotificationCreateModel");
}

export const loadNotificationUpdateModel = async (
  Title = faker.lorem.word(),
  Body = faker.lorem.words(),
  Type = faker.lorem.word(),
  Message = faker.lorem.words(),
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      Title: Title,
      Body: Body,
      Type: Type,
      IsRead: true,
      TypeId: 1,
      Message: Message,
      IsSent: true,
      IsActive: true
  };
  setTestData(model, "NotificationUpdateModel");
}

function loadNotificationQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?isActive=true&businessNodeId=d73ebeb6-c4f6-4a4b-9cc8-9d691de09246&customerId=f593adf1-8ca6-4ede-849e-19e94b1fb926'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
