import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business user skill tests', function() {

    var agent = request.agent(infra._app);

    it('Create business user skill', function(done) {
        loadBusinessUserSkillCreateModel();
        const createModel = getTestData("BusinessUserSkillCreateModel");
        agent
            .post(`/api/v1/business-user-skills/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.id, 'BusinessUserSkillId');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessSkillId');
                expect(response.body.Data).to.have.property('BusinessUserId');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'BusinessUserSkillId');

                expect(response.body.Data.BusinessSkillId).to.equal(getTestData("BusinessUserSkillCreateModel").BusinessSkillId);
                expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserSkillCreateModel").BusinessUserId);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserSkillCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get business user skill by id', function(done) {
        const id = `${getTestData("BusinessUserSkillId")}`
        agent
            .get(`/api/v1/business-user-skills/${getTestData("BusinessUserSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessSkillId');
                expect(response.body.Data).to.have.property('BusinessUserId');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.BusinessSkillId).to.equal(getTestData("BusinessUserSkillCreateModel").BusinessSkillId);
                expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserSkillCreateModel").BusinessUserId);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserSkillCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search business user skill records', function(done) {
      loadBusinessUserSkillQueryString();
        agent
            .get(`/api/v1/business-user-skills/search${loadBusinessUserSkillQueryString()}`)
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

    it('Update business user skill', function(done) {
        loadBusinessUserSkillUpdateModel();
        const updateModel = getTestData("BusinessUserSkillUpdateModel");
        const id = `${getTestData("BusinessUserSkillId")}`
        agent
            .put(`/api/v1/business-user-skills/${getTestData("BusinessUserSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessSkillId');
              expect(response.body.Data).to.have.property('BusinessUserId');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessSkillId).to.equal(getTestData("BusinessUserSkillUpdateModel").BusinessSkillId);
              expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserSkillUpdateModel").BusinessUserId);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserSkillUpdateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Delete business user skill', function(done) {
        const id = `${getTestData("BusinessUserSkillId")}`

        //Delete
        agent
            .delete(`/api/v1/business-user-skills/${getTestData("BusinessUserSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create business user skill again', function(done) {
        loadBusinessUserSkillCreateAgainModel();
        const createModel = getTestData("BusinessUserSkillCreateAgainModel");
        agent
            .post(`/api/v1/business-user-skills/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.id, 'BusinessUserSkillId');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessSkillId');
                expect(response.body.Data).to.have.property('BusinessUserId');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData(response.body.Data.id, 'BusinessUserSkillId');

                expect(response.body.Data.BusinessSkillId).to.equal(getTestData("BusinessUserSkillCreateAgainModel").BusinessSkillId);
                expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessUserSkillCreateAgainModel").BusinessUserId);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessUserSkillCreateAgainModel").IsActive);

            })
            .expect(201, done);
    });

    });

///////////////////////////////////////////////////////////////////////////

export const loadBusinessUserSkillCreateModel = async (
  IsActive = faker.datatype.boolean(),
) => {
    const model = {
      BusinessSkillId: getTestData("BusinessSkillId"),
      BusinessUserId: getTestData("BusinessUserId"),
      IsActive: true
    };
    setTestData(model, "BusinessUserSkillCreateModel");
}

export const loadBusinessUserSkillCreateAgainModel = async (
    IsActive = faker.datatype.boolean(),
  ) => {
      const model = {
        BusinessSkillId: getTestData("BusinessSkillId_1"),
        BusinessUserId: getTestData("BusinessUserId_1"),
        IsActive: true
      };
      setTestData(model, "BusinessUserSkillCreateAgainModel");
  }

export const loadBusinessUserSkillUpdateModel = async (
  IsActive = faker.datatype.boolean(),
  ) => {
      const model = {
        BusinessSkillId: getTestData("BusinessSkillId"),
        BusinessUserId: getTestData("BusinessUserId"),
        IsActive: true
  };
  setTestData(model, "BusinessUserSkillUpdateModel");
}

function loadBusinessUserSkillQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?isActive=true&businessUserId=d02a10fd-d715-4dfd-b019-8daf76f95fce&businessSkillId=b97ead1b-4f5c-4a76-b9a5-29bd3efa6562'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
