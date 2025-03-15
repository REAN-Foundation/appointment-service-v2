import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Customer tests', function() {

    var agent = request.agent(infra._app);

    it('Create customer', function(done) {
        loadCustomerCreateModel();
        const createModel = getTestData("CustomerCreateModel");
        agent
            .post(`/api/v1/customers/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.id, 'CustomerId')
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Prefix');
                expect(response.body.Data).to.have.property('FirstName');
                expect(response.body.Data).to.have.property('LastName');
                expect(response.body.Data).to.have.property('Mobile');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Gender');
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('BirthDate');
                expect(response.body.Data).to.have.property('Address');
                expect(response.body.Data).to.have.property('IsActive');
                expect(response.body.Data).to.have.property('InAppUser');        

                setTestData(response.body.Data.id, 'CustomerId')

                expect(response.body.Data.Prefix).to.equal(getTestData("CustomerCreateModel").Prefix);
                expect(response.body.Data.FirstName).to.equal(getTestData("CustomerCreateModel").FirstName);
                expect(response.body.Data.LastName).to.equal(getTestData("CustomerCreateModel").LastName);
                expect(response.body.Data.Mobile).to.equal(getTestData("CustomerCreateModel").Mobile);
                expect(response.body.Data.Email).to.equal(getTestData("CustomerCreateModel").Email);
                expect(response.body.Data.Gender).to.equal(getTestData("CustomerCreateModel").Gender);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("CustomerCreateModel").DisplayPicture);
                expect(response.body.Data.BirthDate).to.equal(getTestData("CustomerCreateModel").BirthDate);
                expect(response.body.Data.Address).to.equal(getTestData("CustomerCreateModel").Address);
                expect(response.body.Data.IsActive).to.equal(getTestData("CustomerCreateModel").IsActive);
                expect(response.body.Data.InAppUser).to.equal(getTestData("CustomerCreateModel").InAppUser);
 
            })
            .expect(201, done);
    });

    it('Get customer by id', function(done) {
        const id = `${getTestData("CustomerId")}`
        agent
            .get(`/api/v1/customers/${getTestData("CustomerId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Prefix');
                expect(response.body.Data).to.have.property('FirstName');
                expect(response.body.Data).to.have.property('LastName');
                expect(response.body.Data).to.have.property('Mobile');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Gender');
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('BirthDate');
                expect(response.body.Data).to.have.property('Address');
                expect(response.body.Data).to.have.property('IsActive');
                expect(response.body.Data).to.have.property('InAppUser');

                expect(response.body.Data.Prefix).to.equal(getTestData("CustomerCreateModel").Prefix);
                expect(response.body.Data.FirstName).to.equal(getTestData("CustomerCreateModel").FirstName);
                expect(response.body.Data.LastName).to.equal(getTestData("CustomerCreateModel").LastName);
                expect(response.body.Data.Mobile).to.equal(getTestData("CustomerCreateModel").Mobile);
                expect(response.body.Data.Email).to.equal(getTestData("CustomerCreateModel").Email);
                expect(response.body.Data.Gender).to.equal(getTestData("CustomerCreateModel").Gender);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("CustomerCreateModel").DisplayPicture);
                expect(response.body.Data.BirthDate).to.equal(getTestData("CustomerCreateModel").BirthDate);
                expect(response.body.Data.Address).to.equal(getTestData("CustomerCreateModel").Address);
                expect(response.body.Data.IsActive).to.equal(getTestData("CustomerCreateModel").IsActive);
                expect(response.body.Data.InAppUser).to.equal(getTestData("CustomerCreateModel").InAppUser);
            })
            .expect(200, done);
    });

    it('Search customer records', function(done) {
      loadCustomerQueryString();
        agent
            .get(`/api/v1/customers/search${loadCustomerQueryString()}`)
            .set('Content-Type', 'application/json')
              .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('TotalCount');
                expect(response.body.Data).to.have.property('RetrievedCount');
                expect(response.body.Data).to.have.property('PageIndex');
                expect(response.body.Data).to.have.property('ItemsPerPage');
                expect(response.body.Data.TotalCount).to.greaterThan(0);
                expect(response.body.Data.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('Update customer', function(done) {
        loadCustomerUpdateModel();
        const updateModel = global.TestCache.CustomerUpdateModel;
        const id = `${getTestData("CustomerId")}`
        agent
            .put(`/api/v1/customers/${getTestData("CustomerId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Prefix');
                expect(response.body.Data).to.have.property('LastName');
                expect(response.body.Data).to.have.property('Mobile');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Gender');
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('BirthDate');
                expect(response.body.Data).to.have.property('Address');
                expect(response.body.Data).to.have.property('IsActive');
                expect(response.body.Data).to.have.property('InAppUser');

                expect(response.body.Data.Prefix).to.equal(getTestData("CustomerUpdateModel").Prefix);
                expect(response.body.Data.LastName).to.equal(getTestData("CustomerUpdateModel").LastName);
                expect(response.body.Data.Mobile).to.equal(getTestData("CustomerUpdateModel").Mobile);
                expect(response.body.Data.Email).to.equal(getTestData("CustomerUpdateModel").Email);
                expect(response.body.Data.Gender).to.equal(getTestData("CustomerUpdateModel").Gender);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("CustomerUpdateModel").DisplayPicture);
                expect(response.body.Data.BirthDate).to.equal(getTestData("CustomerUpdateModel").BirthDate);
                expect(response.body.Data.Address).to.equal(getTestData("CustomerUpdateModel").Address);
                expect(response.body.Data.IsActive).to.equal(getTestData("CustomerUpdateModel").IsActive);
                expect(response.body.Data.InAppUser).to.equal(getTestData("CustomerUpdateModel").InAppUser);
            })
            .expect(200, done);
    });

    it('Delete customer', function(done) {
        const id = `${getTestData("CustomerCreateModel")}`

        //Delete
        agent
            .delete(`/api/v1/customers/${getTestData("CustomerId")}`)
            .set('Content-Type', 'application/json')
              .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
              .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    
    it('Create customer again', function(done) {
        loadCustomerCreateModel();
        const createModel = getTestData("CustomerCreateModel");
        agent
            .post(`/api/v1/customers/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.id, 'CustomerId')
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Prefix');
                expect(response.body.Data).to.have.property('FirstName');
                expect(response.body.Data).to.have.property('LastName');
                expect(response.body.Data).to.have.property('Mobile');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Gender');
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('BirthDate');
                expect(response.body.Data).to.have.property('Address');
                expect(response.body.Data).to.have.property('IsActive');
                expect(response.body.Data).to.have.property('InAppUser');        

                setTestData(response.body.Data.id, 'CustomerId')

                expect(response.body.Data.Prefix).to.equal(getTestData("CustomerCreateModel").Prefix);
                expect(response.body.Data.FirstName).to.equal(getTestData("CustomerCreateModel").FirstName);
                expect(response.body.Data.LastName).to.equal(getTestData("CustomerCreateModel").LastName);
                expect(response.body.Data.Mobile).to.equal(getTestData("CustomerCreateModel").Mobile);
                expect(response.body.Data.Email).to.equal(getTestData("CustomerCreateModel").Email);
                expect(response.body.Data.Gender).to.equal(getTestData("CustomerCreateModel").Gender);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("CustomerCreateModel").DisplayPicture);
                expect(response.body.Data.BirthDate).to.equal(getTestData("CustomerCreateModel").BirthDate);
                expect(response.body.Data.Address).to.equal(getTestData("CustomerCreateModel").Address);
                expect(response.body.Data.IsActive).to.equal(getTestData("CustomerCreateModel").IsActive);
                expect(response.body.Data.InAppUser).to.equal(getTestData("CustomerCreateModel").InAppUser);
 
            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

export const loadCustomerCreateModel = async (
  Prefix = faker.person.prefix(),
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Gender = faker.person.gender(),
  DisplayPicture = faker.image.url(),
  BirthDate = faker.date.birthdate(),
  Address = faker.location.streetAddress(),
  IsActive = faker.datatype.boolean(),
  InAppUser = faker.datatype.boolean() , 
) => {
    const model = {
      Prefix: Prefix,
      FirstName: FirstName,
      LastName: LastName,
      Mobile: Mobile,
      Email: Email,
      Gender: "Male",
      DisplayPicture: DisplayPicture,
      BirthDate: "2023-06-11T11:59:35.000Z",
      Address: Address,
      IsActive: true,
      InAppUser: true,
    };
    setTestData(model, "CustomerCreateModel");
}

export const loadCustomerUpdateModel = async(
  Prefix = faker.person.prefix(),
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Gender = faker.person.gender(),
  DisplayPicture = faker.image.url(),
  BirthDate = faker.date.birthdate(),
  Address = faker.location.streetAddress(),
  IsActive = faker.datatype.boolean(),
  InAppUser = faker.datatype.boolean() , 
) => {
    const model = {
      Prefix: Prefix,
      FirstName: FirstName,
      LastName: LastName,
      Mobile: Mobile,
      Email: Email,
      Gender: "Male",
      DisplayPicture: DisplayPicture,
      BirthDate: "2023-06-11T11:59:35.000Z",
      Address: Address,
      IsActive: true,
      InAppUser: true,
  };
  setTestData(model, "CustomerUpdateModel");
}

function loadCustomerQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
