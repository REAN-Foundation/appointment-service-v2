import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business skill tests', function() {

    var agent = request.agent(infra._app);

    it('Create business skill', function(done) {
        loadBusinessSkillCreateModel();
        const createModel = getTestData("BusinessSkillCreateModel");
        agent
            .post(`/api/v1/business-skills/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.id, 'BusinessSkillId')
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');             
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData(response.body.Data.id, 'BusinessSkillId')
                
                expect(response.body.Data.Name).to.equal(getTestData("BusinessSkillCreateModel").Name);
                expect(response.body.Data.Description).to.equal(getTestData("BusinessSkillCreateModel").Description);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessSkillCreateModel").DisplayPicture);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessSkillCreateModel").IsActive);

            })
            .expect(201, done);
    });

    it('Get business skill by id', function(done) {
        const id = `${getTestData("BusinessSkillId")}`
        agent
            .get(`/api/v1/business-skills/${getTestData("BusinessSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');             
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.Name).to.equal(getTestData("BusinessSkillCreateModel").Name);
                expect(response.body.Data.Description).to.equal(getTestData("BusinessSkillCreateModel").Description);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessSkillCreateModel").DisplayPicture);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessSkillCreateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Search business skill records', function(done) {
      loadBusinessSkillQueryString();
        agent
            .get(`/api/v1/business-skills/search${loadBusinessSkillQueryString()}`)
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

    it('Update business skill', function(done) {
        loadBusinessSkillUpdateModel();
        const updateModel = getTestData("BusinessSkillUpdateModel");
        const id = `${getTestData("BusinessSkillId")}`
        agent
            .put(`/api/v1/business-skills/${getTestData("BusinessSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');             
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.Name).to.equal(getTestData("BusinessSkillUpdateModel").Name);
                expect(response.body.Data.Description).to.equal(getTestData("BusinessSkillUpdateModel").Description);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessSkillUpdateModel").DisplayPicture);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessSkillUpdateModel").IsActive);
            })
            .expect(200, done);
    });

    it('Delete business skill', function(done) {
        const id = `${getTestData("BusinessSkillId")}`

        //Delete
        agent
            .delete(`/api/v1/business-skills/${getTestData("BusinessSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create business skill again', function(done) {
      loadBusinessSkillCreateModel();
      const createModel = getTestData("BusinessSkillCreateModel");
      agent
            .post(`/api/v1/business-skills/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.id, 'BusinessSkillId_1')
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');             
                expect(response.body.Data).to.have.property('DisplayPicture');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData(response.body.Data.id, 'BusinessSkillId_1')
                
                expect(response.body.Data.Name).to.equal(getTestData("BusinessSkillCreateModel").Name);
                expect(response.body.Data.Description).to.equal(getTestData("BusinessSkillCreateModel").Description);
                expect(response.body.Data.DisplayPicture).to.equal(getTestData("BusinessSkillCreateModel").DisplayPicture);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessSkillCreateModel").IsActive);
            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessSkillCreateModel = async (
    Name = faker.person.fullName(),
    Description = faker.lorem.words(),
    DisplayPicture = faker.image.url(),
    ) => {
    const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        Name: "some jgjhgj skill",
        Description: "the special skill nobody else has!",
        DisplayPicture: "hcbjb",
        IsActive: true
    };
    setTestData(model, "BusinessSkillCreateModel");
    }

export const loadBusinessSkillUpdateModel = async (
    Name = faker.person.fullName(),
    Description = faker.lorem.words(),
    DisplayPicture = faker.image.url(),
    ) => {
    const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        Name: Name,
        Description: Description,
        DisplayPicture: DisplayPicture,
        IsActive: true
    };
    setTestData(model, "BusinessSkillUpdateModel");
    }

    function loadBusinessSkillQueryString() {
        //This is raw query. Please modify to suit the test
        const queryString = '?isActive=true'
        return queryString;
    }

///////////////////////////////////////////////////////////////////////////
