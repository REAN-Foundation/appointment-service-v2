import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business tests', function() {

    var agent = request.agent(infra._app);

    it('Create business', function(done) {
        loadBusinessCreateModel();
        const createModel = getTestData("BusinessCreateModel");
        agent
            .post(`/api/v1/businesses/`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.BusinessRecords.id, 'BusinessId_1')
                expect(response.body.Data.BusinessRecords).to.have.property('id');
                expect(response.body.Data.BusinessRecords).to.have.property('ExternalId');
                expect(response.body.Data.BusinessRecords).to.have.property('Name');
                expect(response.body.Data.BusinessRecords).to.have.property('Mobile');
                expect(response.body.Data.BusinessRecords).to.have.property('Email');
                expect(response.body.Data.BusinessRecords).to.have.property('AboutUs');
                expect(response.body.Data.BusinessRecords).to.have.property('ApiKey');
                expect(response.body.Data.BusinessRecords).to.have.property('Logo');
                expect(response.body.Data.BusinessRecords).to.have.property('DisplayPicture');
                expect(response.body.Data.BusinessRecords).to.have.property('Address');
                expect(response.body.Data.BusinessRecords).to.have.property('OverallRating');
                expect(response.body.Data.BusinessRecords).to.have.property('Facebook');
                expect(response.body.Data.BusinessRecords).to.have.property('Twitter');
                expect(response.body.Data.BusinessRecords).to.have.property('Linkedin');
                expect(response.body.Data.BusinessRecords).to.have.property('Instagram');
                expect(response.body.Data.BusinessRecords).to.have.property('Yelp');
                expect(response.body.Data.BusinessRecords).to.have.property('IsActive');

                setTestData(response.body.Data.BusinessRecords.id, 'BusinessId_1')

                expect(response.body.Data.BusinessRecords.ExternalId).to.equal(getTestData("BusinessCreateModel").ExternalId);
                expect(response.body.Data.BusinessRecords.Name).to.equal(getTestData("BusinessCreateModel").Name);
                expect(response.body.Data.BusinessRecords.Mobile).to.equal(getTestData("BusinessCreateModel").Mobile);
                expect(response.body.Data.BusinessRecords.Email).to.equal(getTestData("BusinessCreateModel").Email);
                expect(response.body.Data.BusinessRecords.AboutUs).to.equal(getTestData("BusinessCreateModel").AboutUs);
                expect(response.body.Data.BusinessRecords.ApiKey).to.equal(getTestData("BusinessCreateModel").ApiKey);
                expect(response.body.Data.BusinessRecords.Logo).to.equal(getTestData("BusinessCreateModel").Logo);
                expect(response.body.Data.BusinessRecords.DisplayPicture).to.equal(getTestData("BusinessCreateModel").DisplayPicture);
                expect(response.body.Data.BusinessRecords.Address).to.equal(getTestData("BusinessCreateModel").Address);
                expect(response.body.Data.BusinessRecords.OverallRating).to.equal(getTestData("BusinessCreateModel").OverallRating);
                expect(response.body.Data.BusinessRecords.Facebook).to.equal(getTestData("BusinessCreateModel").Facebook);
                expect(response.body.Data.BusinessRecords.Twitter).to.equal(getTestData("BusinessCreateModel").Twitter);
                expect(response.body.Data.BusinessRecords.Linkedin).to.equal(getTestData("BusinessCreateModel").Linkedin);
                expect(response.body.Data.BusinessRecords.Instagram).to.equal(getTestData("BusinessCreateModel").Instagram);
                expect(response.body.Data.BusinessRecords.Yelp).to.equal(getTestData("BusinessCreateModel").Yelp);
                expect(response.body.Data.BusinessRecords.IsActive).to.equal(getTestData("BusinessCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get business by id', function(done) {
        const id = `${getTestData("BusinessId_1")}`
        agent
            .get(`/api/v1/businesses/${getTestData("BusinessId_1")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ExternalId');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('AboutUs');
                expect(response.body.Data).to.have.property('ApiKey');
                expect(response.body.Data).to.have.property('Logo');
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('Address');
                expect(response.body.Data).to.have.property('OverallRating');
                expect(response.body.Data).to.have.property('Facebook');
                expect(response.body.Data).to.have.property('Twitter');
                expect(response.body.Data).to.have.property('Linkedin');
                expect(response.body.Data).to.have.property('Instagram');
                expect(response.body.Data).to.have.property('Yelp');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.ExternalId).to.equal(getTestData("BusinessCreateModel").ExternalId);
                expect(response.body.Data.Name).to.equal(getTestData("BusinessCreateModel").Name);
                expect(response.body.Data.Email).to.equal(getTestData("BusinessCreateModel").Email);
                expect(response.body.Data.AboutUs).to.equal(getTestData("BusinessCreateModel").AboutUs);
                expect(response.body.Data.ApiKey).to.equal(getTestData("BusinessCreateModel").ApiKey);
                expect(response.body.Data.Logo).to.equal(getTestData("BusinessCreateModel").Logo);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessCreateModel").DisplayPicture);
                expect(response.body.Data.Address).to.equal(getTestData("BusinessCreateModel").Address);
                expect(response.body.Data.OverallRating).to.equal(getTestData("BusinessCreateModel").OverallRating);
                expect(response.body.Data.Facebook).to.equal(getTestData("BusinessCreateModel").Facebook);
                expect(response.body.Data.Twitter).to.equal(getTestData("BusinessCreateModel").Twitter);
                expect(response.body.Data.Linkedin).to.equal(getTestData("BusinessCreateModel").Linkedin);
                expect(response.body.Data.Instagram).to.equal(getTestData("BusinessCreateModel").Instagram);
                expect(response.body.Data.Yelp).to.equal(getTestData("BusinessCreateModel").Yelp);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search business records', function(done) {
      loadBusinessQueryString();
        agent
            .get(`/api/v1/businesses/search${loadBusinessQueryString()}`)
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

    it('Update business', function(done) {
        loadBusinessUpdateModel();
        const updateModel = getTestData("BusinessUpdateModel");
        const id = `${getTestData("BusinessId_1")}`
        agent
            .put(`/api/v1/businesses/${getTestData("BusinessId_1")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('ExternalId');
              expect(response.body.Data).to.have.property('Name');
              expect(response.body.Data).to.have.property('Email');
              expect(response.body.Data).to.have.property('AboutUs');
              expect(response.body.Data).to.have.property('Logo');
              expect(response.body.Data).to.have.property('DisplayPicture');
              expect(response.body.Data).to.have.property('Address');
              expect(response.body.Data).to.have.property('Facebook');
              expect(response.body.Data).to.have.property('Twitter');
              expect(response.body.Data).to.have.property('Linkedin');
              expect(response.body.Data).to.have.property('Instagram');
              expect(response.body.Data).to.have.property('Yelp');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.ExternalId).to.equal(getTestData("BusinessUpdateModel").ExternalId);
              expect(response.body.Data.Name).to.equal(getTestData("BusinessUpdateModel").Name);
              expect(response.body.Data.Email).to.equal(getTestData("BusinessUpdateModel").Email);
              expect(response.body.Data.AboutUs).to.equal(getTestData("BusinessUpdateModel").AboutUs);
              expect(response.body.Data.Logo).to.equal(getTestData("BusinessUpdateModel").Logo);
              expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessUpdateModel").DisplayPicture);
              expect(response.body.Data.Address).to.equal(getTestData("BusinessUpdateModel").Address);
              expect(response.body.Data.Facebook).to.equal(getTestData("BusinessUpdateModel").Facebook);
              expect(response.body.Data.Twitter).to.equal(getTestData("BusinessUpdateModel").Twitter);
              expect(response.body.Data.Linkedin).to.equal(getTestData("BusinessUpdateModel").Linkedin);
              expect(response.body.Data.Instagram).to.equal(getTestData("BusinessUpdateModel").Instagram);
              expect(response.body.Data.Yelp).to.equal(getTestData("BusinessUpdateModel").Yelp);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete business', function(done) {
        const id = `${getTestData("BusinessId_1")}`

        //Delete
        agent
            .delete(`/api/v1/businesses/${getTestData("BusinessId_1")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create business again', function(done) {
      loadBusinessCreateModelAgain();
      const createModel = getTestData("BusinessCreateModelAgain");
      agent
          .post(`/api/v1/businesses/`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', `${process.env.TEST_API_KEY}`)
          .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
          .send(createModel)
          .expect(response => {
              setTestData(response.body.Data.BusinessRecords.id, 'BusinessId')
              expect(response.body.Data.BusinessRecords).to.have.property('id');
              expect(response.body.Data.BusinessRecords).to.have.property('ExternalId');
              expect(response.body.Data.BusinessRecords).to.have.property('Name');
              expect(response.body.Data.BusinessRecords).to.have.property('Mobile');
              expect(response.body.Data.BusinessRecords).to.have.property('Email');
              expect(response.body.Data.BusinessRecords).to.have.property('AboutUs');
              expect(response.body.Data.BusinessRecords).to.have.property('ApiKey');
              expect(response.body.Data.BusinessRecords).to.have.property('Logo');
              expect(response.body.Data.BusinessRecords).to.have.property('DisplayPicture');
              expect(response.body.Data.BusinessRecords).to.have.property('Address');
              expect(response.body.Data.BusinessRecords).to.have.property('OverallRating');
              expect(response.body.Data.BusinessRecords).to.have.property('Facebook');
              expect(response.body.Data.BusinessRecords).to.have.property('Twitter');
              expect(response.body.Data.BusinessRecords).to.have.property('Linkedin');
              expect(response.body.Data.BusinessRecords).to.have.property('Instagram');
              expect(response.body.Data.BusinessRecords).to.have.property('Yelp');
              expect(response.body.Data.BusinessRecords).to.have.property('IsActive');

              setTestData(response.body.Data.BusinessRecords.id, 'BusinessId')

              expect(response.body.Data.BusinessRecords.ExternalId).to.equal(getTestData("BusinessCreateModelAgain").ExternalId);
              expect(response.body.Data.BusinessRecords.Name).to.equal(getTestData("BusinessCreateModelAgain").Name);
              expect(response.body.Data.BusinessRecords.Mobile).to.equal(getTestData("BusinessCreateModelAgain").Mobile);
              expect(response.body.Data.BusinessRecords.Email).to.equal(getTestData("BusinessCreateModelAgain").Email);
              expect(response.body.Data.BusinessRecords.AboutUs).to.equal(getTestData("BusinessCreateModelAgain").AboutUs);
              expect(response.body.Data.BusinessRecords.ApiKey).to.equal(getTestData("BusinessCreateModelAgain").ApiKey);
              expect(response.body.Data.BusinessRecords.Logo).to.equal(getTestData("BusinessCreateModelAgain").Logo);
              expect(response.body.Data.BusinessRecords.DisplayPicture).to.equal(getTestData("BusinessCreateModelAgain").DisplayPicture);
              expect(response.body.Data.BusinessRecords.Address).to.equal(getTestData("BusinessCreateModelAgain").Address);
              expect(response.body.Data.BusinessRecords.OverallRating).to.equal(getTestData("BusinessCreateModelAgain").OverallRating);
              expect(response.body.Data.BusinessRecords.Facebook).to.equal(getTestData("BusinessCreateModelAgain").Facebook);
              expect(response.body.Data.BusinessRecords.Twitter).to.equal(getTestData("BusinessCreateModelAgain").Twitter);
              expect(response.body.Data.BusinessRecords.Linkedin).to.equal(getTestData("BusinessCreateModelAgain").Linkedin);
              expect(response.body.Data.BusinessRecords.Instagram).to.equal(getTestData("BusinessCreateModelAgain").Instagram);
              expect(response.body.Data.BusinessRecords.Yelp).to.equal(getTestData("BusinessCreateModelAgain").Yelp);
              expect(response.body.Data.BusinessRecords.IsActive).to.equal(getTestData("BusinessCreateModelAgain").IsActive);

          })
          .expect(201, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const Mobile: string = faker.phone.number('+91-##########');

export const Email: string = faker.internet.email();

export const loadBusinessCreateModel = async (
  ExternalId = faker.string.numeric({ length: { min: 1, max: 10 } }),
  Name = faker.person.fullName(),
  Mobile = faker.phone.number('+91-##########'),
  Email = faker.internet.email(), 
  AboutUs = faker.lorem.words(),
  Logo = faker.commerce.productName(),
  DisplayPicture = faker.image.url(),
  Address = faker.location.streetAddress(),
  OverallRating = faker.number.float(),
  Facebook = faker.image.url(),
  Twitter = faker.lorem.word(),
  Linkedin = faker.lorem.word(),
  Instagram = faker.lorem.word(),
  Yelp = faker.lorem.word(),
  IsActive = faker.datatype.boolean(),
  ApiKey = process.env.TEST_API_KEY

  ) => {
    const model = {
      ExternalId: "1",
      Name: Name,
      Mobile: Mobile,
      Email: Email,
      AboutUs: AboutUs,
      ApiKey: ApiKey,
      Logo: Logo,
      DisplayPicture: DisplayPicture,
      Address: Address,
      OverallRating: 0.3,
      Facebook: Facebook,
      Twitter: Twitter,
      Linkedin: Linkedin,
      Instagram: Instagram,
      Yelp: Yelp,
      IsActive: true
    };
    setTestData(model, "BusinessCreateModel");
}

export const loadBusinessUpdateModel = async (
  ExternalId = faker.string.numeric({ length: { min: 1, max: 10 } }),
  Name = faker.person.fullName(),
  Mobile = faker.phone.number('+91-##########'),
  Email = faker.internet.email(), 
  AboutUs = faker.lorem.words(),
  Logo = faker.commerce.productName(),
  DisplayPicture = faker.image.url(),
  Address = faker.location.streetAddress(),
  OverallRating = faker.number.float(),
  Facebook = faker.image.url(),
  Twitter = faker.lorem.word(),
  Linkedin = faker.lorem.word(),
  Instagram = faker.lorem.word(),
  Yelp = faker.lorem.word(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      ExternalId: "1",
      Name: Name,
      Mobile: Mobile,
      Email: Email,
      AboutUs: AboutUs,
      Logo: Logo,
      DisplayPicture: DisplayPicture,
      Address: Address,
      Facebook: Facebook,
      Twitter: Twitter,
      Linkedin: Linkedin,
      Instagram: Instagram,
      Yelp: Yelp,
      IsActive: true
      };
      setTestData(model, "BusinessUpdateModel"); 
}

function loadBusinessQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?isActive=true'
    return queryString;
}

export const loadBusinessCreateModelAgain = async (
  ExternalId = faker.string.numeric({ length: { min: 1, max: 10 } }),
  Name = faker.person.fullName(),
  AboutUs = faker.lorem.words(),
  Logo = faker.commerce.productName(),
  DisplayPicture = faker.image.url(),
  Address = faker.location.streetAddress(),
  OverallRating = faker.number.float(),
  Facebook = faker.image.url(),
  Twitter = faker.lorem.word(),
  Linkedin = faker.lorem.word(),
  Instagram = faker.lorem.word(),
  Yelp = faker.lorem.word(),
  IsActive = faker.datatype.boolean(),
  ApiKey = process.env.TEST_API_KEY

  ) => {
    const model = {
      ExternalId: "1",
      Name: Name,
      Mobile: Mobile,
      Email: Email,
      AboutUs: AboutUs,
      ApiKey: ApiKey,
      Logo: Logo,
      DisplayPicture: DisplayPicture,
      Address: Address,
      OverallRating: 0.3,
      Facebook: Facebook,
      Twitter: Twitter,
      Linkedin: Linkedin,
      Instagram: Instagram,
      Yelp: Yelp,
      IsActive: true
    };
    setTestData(model, "BusinessCreateModelAgain");
}

///////////////////////////////////////////////////////////////////////////
