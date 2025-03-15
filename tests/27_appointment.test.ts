import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';
import { Email, Mobile } from './04_business.test';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Appointment tests', function() {

    var agent = request.agent(infra._app);

    it('If email & mobile numbers is exists & user tries to create business', function(done) {
        loadBusinessCreateModel();
        const createModel = getTestData("BusinessCreateModel");
        agent
            .post(`/api/v1/businesses/`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('failure');
            })
            .expect(422, done);
    });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessCreateModel = async (
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
    setTestData(model, "BusinessCreateModel");
}

///////////////////////////////////////////////////////////////////////////
