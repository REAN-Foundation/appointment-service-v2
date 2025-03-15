import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business user tests', function() {

    var agent = request.agent(infra._app);

    it('Create business user', function(done) {
        loadBusinessUserCreateModel();
        const createModel = getTestData("BusinessUserCreateModel");
        agent
            .post(`/api/v1/business-users/`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(response => {
              setTestData(response.body.Data.UserRecords.id, 'BusinessUserId')
                expect(response.body.Data.UserRecords).to.have.property('id');
                expect(response.body.Data.UserRecords).to.have.property('BusinessNodeId');
                expect(response.body.Data.UserRecords).to.have.property('FirstName');
                expect(response.body.Data.UserRecords).to.have.property('LastName');
                expect(response.body.Data.UserRecords).to.have.property('Prefix');
                expect(response.body.Data.UserRecords).to.have.property('Mobile');
                expect(response.body.Data.UserRecords).to.have.property('Email');
                expect(response.body.Data.UserRecords).to.have.property('Dob');
                expect(response.body.Data.UserRecords).to.have.property('Gender');
                expect(response.body.Data.UserRecords).to.have.property('DisplayPicture');
                expect(response.body.Data.UserRecords).to.have.property('AboutMe');
                expect(response.body.Data.UserRecords).to.have.property('Qualification');
                expect(response.body.Data.UserRecords).to.have.property('Experience');               
                expect(response.body.Data.UserRecords).to.have.property('IsAvailableForEmergency');
                expect(response.body.Data.UserRecords).to.have.property('Facebook');
                expect(response.body.Data.UserRecords).to.have.property('Linkedin');
                expect(response.body.Data.UserRecords).to.have.property('Twitter');              
                expect(response.body.Data.UserRecords).to.have.property('Instagram');
                expect(response.body.Data.UserRecords).to.have.property('Yelp');
                expect(response.body.Data.UserRecords).to.have.property('IsActive');

                setTestData(response.body.Data.UserRecords.id, 'BusinessUserId')

                expect(response.body.Data.UserRecords.BusinessNodeId).to.equal(getTestData("BusinessUserCreateModel").BusinessNodeId);
                expect(response.body.Data.UserRecords.FirstName).to.equal(getTestData("BusinessUserCreateModel").FirstName);
                expect(response.body.Data.UserRecords.LastName).to.equal(getTestData("BusinessUserCreateModel").LastName);
                expect(response.body.Data.UserRecords.Prefix).to.equal(getTestData("BusinessUserCreateModel").Prefix);
                expect(response.body.Data.UserRecords.Mobile).to.equal(getTestData("BusinessUserCreateModel").Mobile);
                expect(response.body.Data.UserRecords.Email).to.equal(getTestData("BusinessUserCreateModel").Email);
                expect(response.body.Data.UserRecords.Dob).to.equal(getTestData("BusinessUserCreateModel").Dob);
                expect(response.body.Data.UserRecords.Gender).to.equal(getTestData("BusinessUserCreateModel").Gender);
                expect(response.body.Data.UserRecords.DisplayPicture).to.equal(getTestData("BusinessUserCreateModel").DisplayPicture);
                expect(response.body.Data.UserRecords.AboutMe).to.equal(getTestData("BusinessUserCreateModel").AboutMe);
                expect(response.body.Data.UserRecords.Qualification).to.equal(getTestData("BusinessUserCreateModel").Qualification);
                expect(response.body.Data.UserRecords.Experience).to.equal(getTestData("BusinessUserCreateModel").Experience);            
                expect(response.body.Data.UserRecords.IsAvailableForEmergency).to.equal(getTestData("BusinessUserCreateModel").IsAvailableForEmergency);
                expect(response.body.Data.UserRecords.Facebook).to.equal(getTestData("BusinessUserCreateModel").Facebook);
                expect(response.body.Data.UserRecords.Linkedin).to.equal(getTestData("BusinessUserCreateModel").Linkedin);
                expect(response.body.Data.UserRecords.Twitter).to.equal(getTestData("BusinessUserCreateModel").Twitter);               
                expect(response.body.Data.UserRecords.Instagram).to.equal(getTestData("BusinessUserCreateModel").Instagram);
                expect(response.body.Data.UserRecords.Yelp).to.equal(getTestData("BusinessUserCreateModel").Yelp);
                expect(response.body.Data.UserRecords.IsActive).to.equal(getTestData("BusinessUserCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get business user by id', function(done) {
        const id = `${getTestData("BusinessUserId")}`
        agent
            .get(`/api/v1/business-users/${getTestData("BusinessUserId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('FirstName');
                expect(response.body.Data).to.have.property('LastName');
                expect(response.body.Data).to.have.property('Prefix');
                expect(response.body.Data).to.have.property('Mobile');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Dob');
                expect(response.body.Data).to.have.property('Gender');
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('AboutMe');
                expect(response.body.Data).to.have.property('Qualification');
                expect(response.body.Data).to.have.property('Experience');               
                expect(response.body.Data).to.have.property('IsAvailableForEmergency');
                expect(response.body.Data).to.have.property('Facebook');
                expect(response.body.Data).to.have.property('Linkedin');
                expect(response.body.Data).to.have.property('Twitter');              
                expect(response.body.Data).to.have.property('Instagram');
                expect(response.body.Data).to.have.property('Yelp');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessUserCreateModel").BusinessNodeId);
                expect(response.body.Data.FirstName).to.equal(getTestData("BusinessUserCreateModel").FirstName);
                expect(response.body.Data.LastName).to.equal(getTestData("BusinessUserCreateModel").LastName);
                expect(response.body.Data.Prefix).to.equal(getTestData("BusinessUserCreateModel").Prefix);
                expect(response.body.Data.Mobile).to.equal(getTestData("BusinessUserCreateModel").Mobile);
                expect(response.body.Data.Email).to.equal(getTestData("BusinessUserCreateModel").Email);
                expect(response.body.Data.Dob).to.equal(getTestData("BusinessUserCreateModel").Dob);
                expect(response.body.Data.Gender).to.equal(getTestData("BusinessUserCreateModel").Gender);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessUserCreateModel").DisplayPicture);
                expect(response.body.Data.AboutMe).to.equal(getTestData("BusinessUserCreateModel").AboutMe);
                expect(response.body.Data.Qualification).to.equal(getTestData("BusinessUserCreateModel").Qualification);
                expect(response.body.Data.Experience).to.equal(getTestData("BusinessUserCreateModel").Experience);            
                expect(response.body.Data.IsAvailableForEmergency).to.equal(getTestData("BusinessUserCreateModel").IsAvailableForEmergency);
                expect(response.body.Data.Facebook).to.equal(getTestData("BusinessUserCreateModel").Facebook);
                expect(response.body.Data.Linkedin).to.equal(getTestData("BusinessUserCreateModel").Linkedin);
                expect(response.body.Data.Twitter).to.equal(getTestData("BusinessUserCreateModel").Twitter);               
                expect(response.body.Data.Instagram).to.equal(getTestData("BusinessUserCreateModel").Instagram);
                expect(response.body.Data.Yelp).to.equal(getTestData("BusinessUserCreateModel").Yelp);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search business user records', function(done) {
      loadBusinessUserQueryString();
        agent
            .get(`/api/v1/business-users/search${loadBusinessUserQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('TotalCount');
                expect(response.body.Data).to.have.property('RetrievedCount');
                expect(response.body.Data.TotalCount).to.greaterThan(0);
                expect(response.body.Data.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('Update business user', function(done) {
        loadBusinessUserUpdateModel();
        const updateModel = getTestData("BusinessUserUpdateModel");
        const id = `${getTestData("BusinessUserId")}`
        agent
            .put(`/api/v1/business-users/${getTestData("BusinessUserId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('FirstName');
              expect(response.body.Data).to.have.property('LastName');
              expect(response.body.Data).to.have.property('Prefix');
              expect(response.body.Data).to.have.property('Mobile');
              expect(response.body.Data).to.have.property('Email');
              expect(response.body.Data).to.have.property('Dob');
              expect(response.body.Data).to.have.property('Gender');
              expect(response.body.Data).to.have.property('DisplayPicture');
              expect(response.body.Data).to.have.property('AboutMe');
              expect(response.body.Data).to.have.property('Qualification');
              expect(response.body.Data).to.have.property('Experience');               
              expect(response.body.Data).to.have.property('IsAvailableForEmergency');
              expect(response.body.Data).to.have.property('Facebook');
              expect(response.body.Data).to.have.property('Linkedin');
              expect(response.body.Data).to.have.property('Twitter');              
              expect(response.body.Data).to.have.property('Instagram');
              expect(response.body.Data).to.have.property('Yelp');
              expect(response.body.Data).to.have.property('IsActive');

              // expect(response.body.Data.id).to.equal(global.TestCache.BusinessUserCreateModel.id);
              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessUserUpdateModel").BusinessNodeId);
              expect(response.body.Data.FirstName).to.equal(getTestData("BusinessUserUpdateModel").FirstName);
              expect(response.body.Data.LastName).to.equal(getTestData("BusinessUserUpdateModel").LastName);
              expect(response.body.Data.Prefix).to.equal(getTestData("BusinessUserUpdateModel").Prefix);
              expect(response.body.Data.Mobile).to.equal(getTestData("BusinessUserUpdateModel").Mobile);
              expect(response.body.Data.Email).to.equal(getTestData("BusinessUserUpdateModel").Email);
              expect(response.body.Data.Dob).to.equal(getTestData("BusinessUserUpdateModel").Dob);
              expect(response.body.Data.Gender).to.equal(getTestData("BusinessUserUpdateModel").Gender);
              expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessUserUpdateModel").DisplayPicture);
              expect(response.body.Data.AboutMe).to.equal(getTestData("BusinessUserUpdateModel").AboutMe);
              expect(response.body.Data.Qualification).to.equal(getTestData("BusinessUserUpdateModel").Qualification);
              expect(response.body.Data.Experience).to.equal(getTestData("BusinessUserUpdateModel").Experience);            
              expect(response.body.Data.IsAvailableForEmergency).to.equal(getTestData("BusinessUserUpdateModel").IsAvailableForEmergency);
              expect(response.body.Data.Facebook).to.equal(getTestData("BusinessUserUpdateModel").Facebook);
              expect(response.body.Data.Linkedin).to.equal(getTestData("BusinessUserUpdateModel").Linkedin);
              expect(response.body.Data.Twitter).to.equal(getTestData("BusinessUserUpdateModel").Twitter);               
              expect(response.body.Data.Instagram).to.equal(getTestData("BusinessUserUpdateModel").Instagram);
              expect(response.body.Data.Yelp).to.equal(getTestData("BusinessUserUpdateModel").Yelp);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete business user', function(done) {
        const id = `${getTestData("BusinessUserId")}`

        //Delete
        agent
            .delete(`/api/v1/business-users/${getTestData("BusinessUserId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create business user again', function(done) {
      loadBusinessUserCreateModel();
      const createModel = getTestData("BusinessUserCreateModel");
      agent
          .post(`/api/v1/business-users/`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
              setTestData( response.body.Data.UserRecords.id, 'BusinessUserId_1')
              expect(response.body.Data.UserRecords).to.have.property('id');
              expect(response.body.Data.UserRecords).to.have.property('BusinessNodeId');
              expect(response.body.Data.UserRecords).to.have.property('FirstName');
              expect(response.body.Data.UserRecords).to.have.property('LastName');
              expect(response.body.Data.UserRecords).to.have.property('Prefix');
              expect(response.body.Data.UserRecords).to.have.property('Mobile');
              expect(response.body.Data.UserRecords).to.have.property('Email');
              expect(response.body.Data.UserRecords).to.have.property('Dob');
              expect(response.body.Data.UserRecords).to.have.property('Gender');
              expect(response.body.Data.UserRecords).to.have.property('DisplayPicture');
              expect(response.body.Data.UserRecords).to.have.property('AboutMe');
              expect(response.body.Data.UserRecords).to.have.property('Qualification');
              expect(response.body.Data.UserRecords).to.have.property('Experience');               
              expect(response.body.Data.UserRecords).to.have.property('IsAvailableForEmergency');
              expect(response.body.Data.UserRecords).to.have.property('Facebook');
              expect(response.body.Data.UserRecords).to.have.property('Linkedin');
              expect(response.body.Data.UserRecords).to.have.property('Twitter');              
              expect(response.body.Data.UserRecords).to.have.property('Instagram');
              expect(response.body.Data.UserRecords).to.have.property('Yelp');
              expect(response.body.Data.UserRecords).to.have.property('IsActive');

              setTestData( response.body.Data.UserRecords.id, 'BusinessUserId_1')

              expect(response.body.Data.UserRecords.BusinessNodeId).to.equal(global.TestCache.BusinessUserCreateModel.BusinessNodeId);
              expect(response.body.Data.UserRecords.FirstName).to.equal(getTestData("BusinessUserCreateModel").FirstName);
              expect(response.body.Data.UserRecords.LastName).to.equal(getTestData("BusinessUserCreateModel").LastName);
              expect(response.body.Data.UserRecords.Prefix).to.equal(getTestData("BusinessUserCreateModel").Prefix);
              expect(response.body.Data.UserRecords.Mobile).to.equal(getTestData("BusinessUserCreateModel").Mobile);
              expect(response.body.Data.UserRecords.Email).to.equal(getTestData("BusinessUserCreateModel").Email);
              expect(response.body.Data.UserRecords.Dob).to.equal(getTestData("BusinessUserCreateModel").Dob);
              expect(response.body.Data.UserRecords.Gender).to.equal(getTestData("BusinessUserCreateModel").Gender);
              expect(response.body.Data.UserRecords.DisplayPicture).to.equal(getTestData("BusinessUserCreateModel").DisplayPicture);
              expect(response.body.Data.UserRecords.AboutMe).to.equal(getTestData("BusinessUserCreateModel").AboutMe);
              expect(response.body.Data.UserRecords.Qualification).to.equal(getTestData("BusinessUserCreateModel").Qualification);
              expect(response.body.Data.UserRecords.Experience).to.equal(getTestData("BusinessUserCreateModel").Experience);            
              expect(response.body.Data.UserRecords.IsAvailableForEmergency).to.equal(getTestData("BusinessUserCreateModel").IsAvailableForEmergency);
              expect(response.body.Data.UserRecords.Facebook).to.equal(getTestData("BusinessUserCreateModel").Facebook);
              expect(response.body.Data.UserRecords.Linkedin).to.equal(getTestData("BusinessUserCreateModel").Linkedin);
              expect(response.body.Data.UserRecords.Twitter).to.equal(getTestData("BusinessUserCreateModel").Twitter);               
              expect(response.body.Data.UserRecords.Instagram).to.equal(getTestData("BusinessUserCreateModel").Instagram);
              expect(response.body.Data.UserRecords.Yelp).to.equal(getTestData("BusinessUserCreateModel").Yelp);
              expect(response.body.Data.UserRecords.IsActive).to.equal(getTestData("BusinessUserCreateModel").IsActive);

          })
          .expect(201, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessUserCreateModel = async (
 
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  Prefix = faker.person.prefix(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Dob = faker.lorem.words(),
  Gender = faker.commerce.productName(),
  DisplayPicture = faker.image.url(),
  AboutMe = faker.lorem.words(),
  Qualification = faker.lorem.words(),
  Experience = faker.location.streetAddress(),
  IsAvailableForEmergency = faker.datatype.boolean(),
  Facebook = faker.image.url(),
  Linkedin = faker.lorem.word(),
  Twitter = faker.lorem.word(),
  Instagram = faker.lorem.word(),
  Yelp = faker.lorem.word(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      FirstName: FirstName,
      LastName: LastName,
      Prefix: Prefix,
      Mobile: Mobile,
      Email: Email,
      Dob: '1970-01-01T00:00:00.000Z',
      Gender: 'Male',
      DisplayPicture: DisplayPicture,
      AboutMe: AboutMe,
      Qualification: Qualification,
      Experience: '24 years',
      IsAvailableForEmergency: true,
      Facebook: Facebook,
      Linkedin: Linkedin,
      Twitter: Twitter,
      Instagram: Instagram,
      Yelp: Yelp,
      IsActive: true
    };

    setTestData(model, "BusinessUserCreateModel");
}

export const loadBusinessUserUpdateModel = async (
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  Prefix = faker.person.prefix(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Dob = faker.lorem.words(),
  Gender = faker.commerce.productName(),
  DisplayPicture = faker.image.url(),
  AboutMe = faker.lorem.words(),
  Qualification = faker.lorem.words(),
  Experience = faker.location.streetAddress(),
  IsAvailableForEmergency = faker.datatype.boolean(),
  Facebook = faker.image.url(),
  Linkedin = faker.lorem.word(),
  Twitter = faker.lorem.word(),
  Instagram = faker.lorem.word(),
  Yelp = faker.lorem.word(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      FirstName: FirstName,
      LastName: LastName,
      Prefix: Prefix,
      Mobile: Mobile,
      Email: Email,
      Dob: '1970-01-01T00:00:00.000Z',
      Gender: 'Male',
      DisplayPicture: DisplayPicture,
      AboutMe: AboutMe,
      Qualification: Qualification,
      Experience: '24 years',
      IsAvailableForEmergency: true,
      Facebook: Facebook,
      Linkedin: Linkedin,
      Twitter: Twitter,
      Instagram: Instagram,
      Yelp: Yelp,
      IsActive: true
      };
      setTestData(model, "BusinessUserUpdateModel"); 
}

function loadBusinessUserQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
