import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Api client tests', function() {

    var agent = request.agent(infra._app);

    it('Create api client', function(done) {
        loadApiClientCreateModel();
        const createModel = getTestData("ApiClientCreateModel");
        agent
            .post(`/api/v1/api-clients/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)          
            .expect(response => {
                setTestData(response.body.Data.id, 'ApiClientId')
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ClientName');
                expect(response.body.Data).to.have.property('CountryCode');                
                expect(response.body.Data).to.have.property('Phone');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('IsPrivileged');
        
                setTestData(response.body.Data.id, 'ApiClientId')

                expect(response.body.Data.ClientName).to.equal(getTestData("ApiClientCreateModel").ClientName);
                expect(response.body.Data.CountryCode).to.equal(getTestData("ApiClientCreateModel").CountryCode);
                expect(response.body.Data.Phone).to.equal(getTestData("ApiClientCreateModel").Phone);
                expect(response.body.Data.Email).to.equal(getTestData("ApiClientCreateModel").Email);        
                expect(response.body.Data.IsPrivileged).to.equal(getTestData("ApiClientCreateModel").IsPrivileged);

            })
            .expect(201, done);
    });

    it('Get api client by id', function(done) {
        const id = `${getTestData('ApiClientId')}`
        agent
            .get(`/api/v1/api-clients/${getTestData('ApiClientId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ClientName');
                expect(response.body.Data).to.have.property('Phone');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('IsPrivileged');
              
                expect(response.body.Data.ClientName).to.equal(getTestData("ApiClientCreateModel").ClientName);
                expect(response.body.Data.Phone).to.equal(getTestData("ApiClientCreateModel").Phone);
                expect(response.body.Data.Email).to.equal(getTestData("ApiClientCreateModel").Email);        
                expect(response.body.Data.IsPrivileged).to.equal(getTestData("ApiClientCreateModel").IsPrivileged);
            })
            .expect(200, done);
    });

    it('Search api client records', function(done) {
      loadApiClientQueryString();
        agent
            .get(`/api/v1/api-clients/search${loadApiClientQueryString()}`)
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

    it('Update api client', function(done) {
        loadApiClientUpdateModel();
        const updateModel = getTestData("ApiClientUpdateModel");
        const id = `${getTestData('ApiClientId')}`
        agent
            .put(`/api/v1/api-clients/${getTestData('ApiClientId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('ClientName');
              expect(response.body.Data).to.have.property('Phone');
              expect(response.body.Data).to.have.property('Email');
              expect(response.body.Data).to.have.property('IsPrivileged');
              
              expect(response.body.Data.ClientName).to.equal(getTestData("ApiClientUpdateModel").ClientName);
                expect(response.body.Data.Phone).to.equal(getTestData("ApiClientUpdateModel").Phone);
                expect(response.body.Data.Email).to.equal(getTestData("ApiClientUpdateModel").Email);        
                expect(response.body.Data.IsPrivileged).to.equal(getTestData("ApiClientUpdateModel").IsPrivileged);

            })
            .expect(200, done);
    });

    it('Delete api client', function(done) {
        const id = `${getTestData('ApiClientId')}`
        
        //Delete
        agent
            .delete(`/api/v1/api-clients/${getTestData('ApiClientId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create api client again', function(done) {
        loadApiClientCreateModel();
        const createModel = getTestData("ApiClientCreateModel");
        agent
            .post(`/api/v1/api-clients/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)          
            .expect(response => {
                setTestData(response.body.Data.id, 'ApiClientId')
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ClientName');
                expect(response.body.Data).to.have.property('Phone');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('IsPrivileged');
        
                setTestData(response.body.Data.id, 'ApiClientId')

                expect(response.body.Data.ClientName).to.equal(getTestData("ApiClientCreateModel").ClientName);
                expect(response.body.Data.Phone).to.equal(getTestData("ApiClientCreateModel").Phone);
                expect(response.body.Data.Email).to.equal(getTestData("ApiClientCreateModel").Email);        
                expect(response.body.Data.IsPrivileged).to.equal(getTestData("ApiClientCreateModel").IsPrivileged);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

export const loadApiClientCreateModel = async (
        ClientName = faker.person.fullName(), 
        clientInterfaceType = faker.system.fileType(),
        CountryCode = faker.phone.number('+91'),
        Phone = faker.string.numeric({ length: { min: 10, max: 10 } }),
        Email = faker.internet.email(),
        IsPrivileged = faker.datatype.boolean(),
        Password = faker.internet.password(),
       ) => {
        const model = {       
            ClientName: ClientName,
            ClientInterfaceType: "Web App",
            CountryCode: CountryCode,
            Phone: Phone,
            Email: Email,
            IsPrivileged: IsPrivileged,
            Password : Password
    };
    setTestData(model, "ApiClientCreateModel");
}

export const loadApiClientUpdateModel = async (
    ClientName = faker.person.fullName(), 
    clientInterfaceType = faker.system.fileType(),
    CountryCode = faker.phone.number('+91'),
    Phone = faker.string.numeric({ length: { min: 10, max: 10 } }),
    Email = faker.internet.email(),
    IsPrivileged = faker.datatype.boolean(),
    Password = faker.internet.password(),
   ) => {
    const model = {       
        ClientName: ClientName,
        ClientInterfaceType: "Web App",
        CountryCode: CountryCode,
        Phone: Phone,
        Email: Email,
        IsPrivileged: IsPrivileged,
        Password : Password
    };
    setTestData(model, "ApiClientUpdateModel");
}

function loadApiClientQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
