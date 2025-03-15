import request from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

// ///////////////////////////////////////////////////////////////////////////

describe('User tests', function() {

    var agent = request.agent(infra._app);

    it('Create user ', function(done) {
        loadUserManagementCreateModel();
        const createModel = getTestData("UserManagementCreateModel");
        agent
            .post(`/api/v1/users/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.id, 'UserManagementId')
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('UserName');
                expect(response.body.Data).to.have.property('Prefix');
                expect(response.body.Data).to.have.property('FirstName');
                expect(response.body.Data).to.have.property('LastName');
                expect(response.body.Data).to.have.property('CountryCode');               
                expect(response.body.Data).to.have.property('Phone');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Gender');
                expect(response.body.Data).to.have.property('BirthDate');

                setTestData(response.body.Data.id, 'UserManagementId')

                expect(response.body.Data.UserName).to.equal(getTestData("UserManagementCreateModel").UserName);
                expect(response.body.Data.Prefix).to.equal(getTestData("UserManagementCreateModel").Prefix);
                expect(response.body.Data.FirstName).to.equal(getTestData("UserManagementCreateModel").FirstName);
                expect(response.body.Data.LastName).to.equal(getTestData("UserManagementCreateModel").LastName);
                expect(response.body.Data.CountryCode).to.equal(getTestData("UserManagementCreateModel").CountryCode);
                expect(response.body.Data.Phone).to.equal(getTestData("UserManagementCreateModel").Phone);
                expect(response.body.Data.Email).to.equal(getTestData("UserManagementCreateModel").Email);
                expect(response.body.Data.Gender).to.equal(getTestData("UserManagementCreateModel").Gender);
                expect(response.body.Data.BirthDate).to.equal(getTestData("UserManagementCreateModel").BirthDate);

            })
            .expect(201, done);
    });

    it('Get user by id', function(done) {
        const id = `${getTestData("UserManagementId")}`
        agent
            .get(`/api/v1/users/${getTestData('UserManagementId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('UserName');
                expect(response.body.Data).to.have.property('Prefix');
                expect(response.body.Data).to.have.property('FirstName');
                expect(response.body.Data).to.have.property('LastName');
                expect(response.body.Data).to.have.property('CountryCode');               
                expect(response.body.Data).to.have.property('Phone');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Gender');
                expect(response.body.Data).to.have.property('BirthDate');

                expect(response.body.Data.UserName).to.equal(getTestData("UserManagementCreateModel").UserName);
                expect(response.body.Data.Prefix).to.equal(getTestData("UserManagementCreateModel").Prefix);
                expect(response.body.Data.FirstName).to.equal(getTestData("UserManagementCreateModel").FirstName);
                expect(response.body.Data.LastName).to.equal(getTestData("UserManagementCreateModel").LastName);
                expect(response.body.Data.CountryCode).to.equal(getTestData("UserManagementCreateModel").CountryCode);
                expect(response.body.Data.Phone).to.equal(getTestData("UserManagementCreateModel").Phone);
                expect(response.body.Data.Email).to.equal(getTestData("UserManagementCreateModel").Email);
                expect(response.body.Data.Gender).to.equal(getTestData("UserManagementCreateModel").Gender);
                expect(response.body.Data.BirthDate).to.equal(getTestData("UserManagementCreateModel").BirthDate);

            })
            .expect(200, done);
    });

    it('Search user  records', function(done) {
      loadUserManagementQueryString();
        agent
            .get(`/api/v1/users/search${loadUserManagementQueryString()}`)
            .set('Content-Type', 'application/json')
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

    it('Update user ', function(done) {
        loadUserManagementUpdateModel();
        const updateModel = getTestData("UserManagementUpdateModel");
        const id = `${getTestData('UserManagementId')}`
        agent
            .put(`/api/v1/users/${getTestData('UserManagementId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('UserName');
                expect(response.body.Data).to.have.property('Prefix');
                expect(response.body.Data).to.have.property('FirstName');
                expect(response.body.Data).to.have.property('LastName');
                expect(response.body.Data).to.have.property('CountryCode');               
                expect(response.body.Data).to.have.property('Gender');
                expect(response.body.Data).to.have.property('BirthDate');

               expect(response.body.Data.UserName).to.equal(getTestData("UserManagementUpdateModel").UserName);
               expect(response.body.Data.Prefix).to.equal(getTestData("UserManagementUpdateModel").Prefix);
               expect(response.body.Data.FirstName).to.equal(getTestData("UserManagementUpdateModel").FirstName);
               expect(response.body.Data.LastName).to.equal(getTestData("UserManagementUpdateModel").LastName);
               expect(response.body.Data.CountryCode).to.equal(getTestData("UserManagementUpdateModel").CountryCode);
              
               expect(response.body.Data.Gender).to.equal(getTestData("UserManagementUpdateModel").Gender);
               expect(response.body.Data.BirthDate).to.equal(getTestData("UserManagementUpdateModel").BirthDate);

            })
            .expect(200, done);
    });

    it('Delete user ', function(done) {
        const id = `${getTestData("UserManagementId")}`

        //Delete
        agent
            .delete(`/api/v1/users/${getTestData('UserManagementId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create user  again', function(done) {
      loadUserManagementCreateModel();
      const createModel = getTestData("UserManagementCreateModel");
      agent
          .post(`/api/v1/users/`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
          .send(createModel)
          .expect(response => {
              setTestData(response.body.Data.id, 'UserManagementId')
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('UserName');
              expect(response.body.Data).to.have.property('Prefix');
              expect(response.body.Data).to.have.property('FirstName');
              expect(response.body.Data).to.have.property('LastName');
              expect(response.body.Data).to.have.property('CountryCode');               
              expect(response.body.Data).to.have.property('Phone');
              expect(response.body.Data).to.have.property('Email');
              expect(response.body.Data).to.have.property('Gender');
              expect(response.body.Data).to.have.property('BirthDate');

              setTestData(response.body.Data.id, 'UserManagementId')

              expect(response.body.Data.UserName).to.equal(getTestData("UserManagementCreateModel").UserName);
              expect(response.body.Data.Prefix).to.equal(getTestData("UserManagementCreateModel").Prefix);
              expect(response.body.Data.FirstName).to.equal(getTestData("UserManagementCreateModel").FirstName);
              expect(response.body.Data.LastName).to.equal(getTestData("UserManagementCreateModel").LastName);
              expect(response.body.Data.CountryCode).to.equal(getTestData("UserManagementCreateModel").CountryCode);
              expect(response.body.Data.Phone).to.equal(getTestData("UserManagementCreateModel").Phone);
              expect(response.body.Data.Email).to.equal(getTestData("UserManagementCreateModel").Email);
              expect(response.body.Data.Gender).to.equal(getTestData("UserManagementCreateModel").Gender);
              expect(response.body.Data.BirthDate).to.equal(getTestData("UserManagementCreateModel").BirthDate);

          })
          .expect(201, done);
  });

});

// ///////////////////////////////////////////////////////////////////////////

export const loadUserManagementCreateModel = async (
    UserName = faker.lorem.word(),
    Prefix = faker.person.prefix(),
    FirstName = faker.person.firstName(),
    LastName = faker.person.lastName(),
    CountryCode = faker.phone.number('+91'),
    Phone = faker.string.numeric({ length: { min: 10, max: 10 } }),
    Email = faker.internet.email(),
    Gender = faker.person.gender(),
    BirthDate = faker.date.birthdate(),
    Password = faker.internet.password(),
) => {
    const model = {
      UserName: UserName,
      Prefix: Prefix,
      FirstName: FirstName,
      LastName: LastName,
      CountryCode: CountryCode,
      Phone: Phone,
      Email: Email,
      Gender: "Male",
      BirthDate: "1970-01-01T00:00:00.000Z",
      Password: Password     
    };
    setTestData(model, "UserManagementCreateModel");
}

export const loadUserManagementUpdateModel = async (
  UserName = faker.lorem.word(),
  Prefix = faker.person.prefix(),
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  CountryCode = faker.phone.number('+91'),
  Phone = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Gender = faker.person.gender(),
  BirthDate = faker.date.birthdate(),
  Password = faker.internet.password(),
) => {
  const model = {
    UserName: UserName,
    Prefix: Prefix,
    FirstName: FirstName,
    LastName: LastName,
    CountryCode: CountryCode,
    Email: Email,
    Gender: "Male",
    BirthDate: "1970-01-01T00:00:00.000Z",
    Password: Password           
  };
  setTestData(model, "UserManagementUpdateModel");
}

function loadUserManagementQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

// ///////////////////////////////////////////////////////////////////////////
