import request from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business node tests', function() {

    var agent = request.agent(infra._app);

    it('Create business node', function(done) {
        loadBusinessNodeCreateModel();
        const createModel = getTestData("BusinessNodeCreateModel");
        agent
            .post(`/api/v1/business-nodes/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(response => {
              setTestData(response.body.Data.Node.id, 'BusinessNodeId');
                expect(response.body.Data.Node).to.have.property('id');
                expect(response.body.Data.Node).to.have.property('BusinessId');
                expect(response.body.Data.Node).to.have.property('Name');
                expect(response.body.Data.Node).to.have.property('Mobile');
                expect(response.body.Data.Node).to.have.property('Email');
                expect(response.body.Data.Node).to.have.property('DisplayPicture');
                expect(response.body.Data.Node).to.have.property('Address');
                expect(response.body.Data.Node).to.have.property('Longitude');
                expect(response.body.Data.Node).to.have.property('OverallRating');
                expect(response.body.Data.Node).to.have.property('AllowWalkinAppointments');
                expect(response.body.Data.Node).to.have.property('AllowFutureBookingFor');
                expect(response.body.Data.Node).to.have.property('IsActive');

                setTestData(response.body.Data.Node.id, 'BusinessNodeId');

                expect(response.body.Data.Node.BusinessId).to.equal(getTestData("BusinessNodeCreateModel").BusinessId);
                expect(response.body.Data.Node.Name).to.equal(getTestData("BusinessNodeCreateModel").Name);
                expect(response.body.Data.Node.Mobile).to.equal(getTestData("BusinessNodeCreateModel").Mobile);
                expect(response.body.Data.Node.Email).to.equal(getTestData("BusinessNodeCreateModel").Email);
                expect(response.body.Data.Node.DisplayPicture).to.equal(getTestData("BusinessNodeCreateModel").DisplayPicture);
                expect(response.body.Data.Node.Address).to.equal(getTestData("BusinessNodeCreateModel").Address);
                expect(response.body.Data.Node.Longitude).to.equal(getTestData("BusinessNodeCreateModel").Longitude);
                expect(response.body.Data.Node.OverallRating).to.equal(getTestData("BusinessNodeCreateModel").OverallRating);
                expect(response.body.Data.Node.AllowWalkinAppointments).to.equal(getTestData("BusinessNodeCreateModel").AllowWalkinAppointments);
                expect(response.body.Data.Node.AllowFutureBookingFor).to.equal(getTestData("BusinessNodeCreateModel").AllowFutureBookingFor);
                expect(response.body.Data.Node.IsActive).to.equal(getTestData("BusinessNodeCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get business node by id', function(done) {
        const id = `${getTestData("BusinessNodeId")}`
        agent
            .get(`/api/v1/business-nodes/${getTestData("BusinessNodeId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessId');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Mobile');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('Address');
                expect(response.body.Data).to.have.property('Longitude');
                expect(response.body.Data).to.have.property('OverallRating');
                expect(response.body.Data).to.have.property('AllowWalkinAppointments');
                expect(response.body.Data).to.have.property('AllowFutureBookingFor');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.BusinessId).to.equal(getTestData("BusinessNodeCreateModel").BusinessId);
                expect(response.body.Data.Name).to.equal(getTestData("BusinessNodeCreateModel").Name);
                expect(response.body.Data.Mobile).to.equal(getTestData("BusinessNodeCreateModel").Mobile);
                expect(response.body.Data.Email).to.equal(getTestData("BusinessNodeCreateModel").Email);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessNodeCreateModel").DisplayPicture);
                expect(response.body.Data.Address).to.equal(getTestData("BusinessNodeCreateModel").Address);
                expect(response.body.Data.Longitude).to.equal(getTestData("BusinessNodeCreateModel").Longitude);
                expect(response.body.Data.OverallRating).to.equal(getTestData("BusinessNodeCreateModel").OverallRating);
                expect(response.body.Data.AllowWalkinAppointments).to.equal(getTestData("BusinessNodeCreateModel").AllowWalkinAppointments);
                expect(response.body.Data.AllowFutureBookingFor).to.equal(getTestData("BusinessNodeCreateModel").AllowFutureBookingFor);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search business node records', function(done) {
      loadBusinessNodeQueryString();
        agent
            .get(`/api/v1/business-nodes/search${loadBusinessNodeQueryString()}`)
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

    it('Update business node', function(done) {
        loadBusinessNodeUpdateModel();
        const updateModel = getTestData("BusinessNodeUpdateModel");
        const id = `${getTestData("BusinessNodeId")}`
        agent
            .put(`/api/v1/business-nodes/${getTestData("BusinessNodeId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessId');
              expect(response.body.Data).to.have.property('Name');
              expect(response.body.Data).to.have.property('Mobile');
              expect(response.body.Data).to.have.property('Email');
              expect(response.body.Data).to.have.property('DisplayPicture');
              expect(response.body.Data).to.have.property('Address');
              expect(response.body.Data).to.have.property('Longitude');
              expect(response.body.Data).to.have.property('OverallRating');
              expect(response.body.Data).to.have.property('AllowWalkinAppointments');
              expect(response.body.Data).to.have.property('AllowFutureBookingFor');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessId).to.equal(getTestData("BusinessNodeUpdateModel").BusinessId);
              expect(response.body.Data.Name).to.equal(getTestData("BusinessNodeUpdateModel").Name);
              expect(response.body.Data.Mobile).to.equal(getTestData("BusinessNodeUpdateModel").Mobile);
              expect(response.body.Data.Email).to.equal(getTestData("BusinessNodeUpdateModel").Email);
              expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessNodeUpdateModel").DisplayPicture);
              expect(response.body.Data.Address).to.equal(getTestData("BusinessNodeUpdateModel").Address);
              expect(response.body.Data.Longitude).to.equal(getTestData("BusinessNodeUpdateModel").Longitude);
              expect(response.body.Data.OverallRating).to.equal(getTestData("BusinessNodeUpdateModel").OverallRating);
              expect(response.body.Data.AllowWalkinAppointments).to.equal(getTestData("BusinessNodeUpdateModel").AllowWalkinAppointments);
              expect(response.body.Data.AllowFutureBookingFor).to.equal(getTestData("BusinessNodeUpdateModel").AllowFutureBookingFor);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessNodeUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete business node', function(done) {
        const id = `${getTestData("BusinessNodeId")}`

        //Delete
        agent
            .delete(`/api/v1/business-nodes/${getTestData("BusinessNodeId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create business node again', function(done) {
      loadBusinessNodeCreateModel();
      const createModel = getTestData("BusinessNodeCreateModel");
      agent
          .post(`/api/v1/business-nodes/`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
          .send(createModel)
          .expect(response => {
            setTestData(response.body.Data.Node.id, 'BusinessNodeId_1');
              expect(response.body.Data.Node).to.have.property('id');
              expect(response.body.Data.Node).to.have.property('BusinessId');
              expect(response.body.Data.Node).to.have.property('Name');
              expect(response.body.Data.Node).to.have.property('Mobile');
              expect(response.body.Data.Node).to.have.property('Email');
              expect(response.body.Data.Node).to.have.property('DisplayPicture');
              expect(response.body.Data.Node).to.have.property('Address');
              expect(response.body.Data.Node).to.have.property('Longitude');
              expect(response.body.Data.Node).to.have.property('OverallRating');
              expect(response.body.Data.Node).to.have.property('AllowWalkinAppointments');
              expect(response.body.Data.Node).to.have.property('AllowFutureBookingFor');
              expect(response.body.Data.Node).to.have.property('IsActive');

              setTestData(response.body.Data.Node.id, 'BusinessNodeId_1');

              expect(response.body.Data.Node.BusinessId).to.equal(getTestData("BusinessNodeCreateModel").BusinessId);
              expect(response.body.Data.Node.Name).to.equal(getTestData("BusinessNodeCreateModel").Name);
              expect(response.body.Data.Node.Mobile).to.equal(getTestData("BusinessNodeCreateModel").Mobile);
              expect(response.body.Data.Node.Email).to.equal(getTestData("BusinessNodeCreateModel").Email);
              expect(response.body.Data.Node.DisplayPicture).to.equal(getTestData("BusinessNodeCreateModel").DisplayPicture);
              expect(response.body.Data.Node.Address).to.equal(getTestData("BusinessNodeCreateModel").Address);
              expect(response.body.Data.Node.Longitude).to.equal(getTestData("BusinessNodeCreateModel").Longitude);
              expect(response.body.Data.Node.OverallRating).to.equal(getTestData("BusinessNodeCreateModel").OverallRating);
              expect(response.body.Data.Node.AllowWalkinAppointments).to.equal(getTestData("BusinessNodeCreateModel").AllowWalkinAppointments);
              expect(response.body.Data.Node.AllowFutureBookingFor).to.equal(getTestData("BusinessNodeCreateModel").AllowFutureBookingFor);
              expect(response.body.Data.Node.IsActive).to.equal(getTestData("BusinessNodeCreateModel").IsActive);

          })
          .expect(201, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessNodeCreateModel = async (
  Name = faker.person.fullName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  DisplayPicture = faker.image.url(),
  Address = faker.location.streetAddress(),
  Longitude = faker.string.numeric(),
  OverallRating = faker.number.float(),
  AllowWalkinAppointments = faker.datatype.boolean(),
  AllowFutureBookingFor = faker.string.numeric(),
  IsActive = faker.datatype.boolean(), 
) => {
    const model = {
      BusinessId: getTestData("BusinessId"),
      Name: Name,
      Mobile: Mobile,
      Email: Email,
      DisplayPicture: DisplayPicture,
      Address: Address,
      Longitude: Longitude,
      OverallRating: 3.5,
      AllowWalkinAppointments: true,
      AllowFutureBookingFor: "30d",
      IsActive: true
    };
    setTestData(model, "BusinessNodeCreateModel");
}

export const loadBusinessNodeUpdateModel = async (
  Name = faker.person.fullName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  DisplayPicture = faker.image.url(),
  Address = faker.location.streetAddress(),
  Longitude = faker.string.numeric(),
  OverallRating = faker.number.float(),
  AllowWalkinAppointments = faker.datatype.boolean(),
  AllowFutureBookingFor = faker.string.numeric(),
  IsActive = faker.datatype.boolean(), 
) => {
    const model = {
      BusinessId: getTestData("BusinessId"),
      Name: Name,
      Mobile: Mobile,
      Email: Email,
      DisplayPicture: DisplayPicture,
      Address: Address,
      Longitude: Longitude,
      OverallRating: 3.5,
      AllowWalkinAppointments: true,
      AllowFutureBookingFor: "30d",
      IsActive: true
};
    global.TestCache.BusinessNodeUpdateModel = model;
}

function loadBusinessNodeQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
