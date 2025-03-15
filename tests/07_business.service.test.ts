import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business service tests', function() {

    var agent = request.agent(infra._app);

    it('Create business service', function(done) {
        loadBusinessServiceCreateModel();
        const createModel = getTestData("BusinessServiceCreateModel");
        agent
            .post(`/api/v1/business-services/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData( response.body.Data.id, 'BusinessServiceId');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('BusinessNodeId');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('ServiceDuration');
                expect(response.body.Data).to.have.property('Fees');
                expect(response.body.Data).to.have.property('IsTaxable');
                expect(response.body.Data).to.have.property('TaxRate');
                expect(response.body.Data).to.have.property('PaymentRequired');
                expect(response.body.Data).to.have.property('PaymentPercent');
                expect(response.body.Data).to.have.property('PriorBookingWindow');
                expect(response.body.Data).to.have.property('SendReminder');
                expect(response.body.Data).to.have.property('ReminderType');
                expect(response.body.Data).to.have.property('AllowCancellation');
                expect(response.body.Data).to.have.property('CancellationWindow');
                expect(response.body.Data).to.have.property('CancellationCharges');
                expect(response.body.Data).to.have.property('EnableLoyalty');
                expect(response.body.Data).to.have.property('DisplayServicePicture');
                expect(response.body.Data).to.have.property('IsActive');

                setTestData( response.body.Data.id, 'BusinessServiceId');

                expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessServiceCreateModel").BusinessNodeId);
                expect(response.body.Data.Name).to.equal(getTestData("BusinessServiceCreateModel").Name);
                expect(response.body.Data.Description).to.equal(getTestData("BusinessServiceCreateModel").Description);
                expect(response.body.Data.ServiceDuration).to.equal(getTestData("BusinessServiceCreateModel").ServiceDuration);
                expect(response.body.Data.Fees).to.equal(getTestData("BusinessServiceCreateModel").Fees);
                expect(response.body.Data.IsTaxable).to.equal(getTestData("BusinessServiceCreateModel").IsTaxable);
                expect(response.body.Data.TaxRate).to.equal(getTestData("BusinessServiceCreateModel").TaxRate);
                expect(response.body.Data.PaymentRequired).to.equal(getTestData("BusinessServiceCreateModel").PaymentRequired);
                expect(response.body.Data.PaymentPercent).to.equal(getTestData("BusinessServiceCreateModel").PaymentPercent);
                expect(response.body.Data.PriorBookingWindow).to.equal(getTestData("BusinessServiceCreateModel").PriorBookingWindow);
                expect(response.body.Data.SendReminder).to.equal(getTestData("BusinessServiceCreateModel").SendReminder);
                expect(response.body.Data.ReminderType).to.equal(getTestData("BusinessServiceCreateModel").ReminderType);
                expect(response.body.Data.AllowCancellation).to.equal(getTestData("BusinessServiceCreateModel").AllowCancellation);
                expect(response.body.Data.CancellationWindow).to.equal(getTestData("BusinessServiceCreateModel").CancellationWindow);
                expect(response.body.Data.CancellationCharges).to.equal(getTestData("BusinessServiceCreateModel").CancellationCharges);
                expect(response.body.Data.EnableLoyalty).to.equal(getTestData("BusinessServiceCreateModel").EnableLoyalty);
                expect(response.body.Data.DisplayServicePicture).to.equal(getTestData("BusinessServiceCreateModel").DisplayServicePicture);
                expect(response.body.Data.IsActive).to.equal(getTestData("BusinessServiceCreateModel").IsActive);
            })
            .expect(201, done);
    });

    it('Get business service by id', function(done) {
        const id = `${getTestData("BusinessServiceId")}`
        agent
            .get(`/api/v1/business-services/${getTestData("BusinessServiceId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('Name');
              expect(response.body.Data).to.have.property('Description');
              expect(response.body.Data).to.have.property('ServiceDuration');
              expect(response.body.Data).to.have.property('Fees');
              expect(response.body.Data).to.have.property('IsTaxable');
              expect(response.body.Data).to.have.property('TaxRate');
              expect(response.body.Data).to.have.property('PaymentRequired');
              expect(response.body.Data).to.have.property('PaymentPercent');
              expect(response.body.Data).to.have.property('PriorBookingWindow');
              expect(response.body.Data).to.have.property('SendReminder');
              expect(response.body.Data).to.have.property('ReminderType');
              expect(response.body.Data).to.have.property('AllowCancellation');
              expect(response.body.Data).to.have.property('CancellationWindow');
              expect(response.body.Data).to.have.property('CancellationCharges');
              expect(response.body.Data).to.have.property('EnableLoyalty');
              expect(response.body.Data).to.have.property('DisplayServicePicture');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessServiceCreateModel").BusinessNodeId);
              expect(response.body.Data.Name).to.equal(getTestData("BusinessServiceCreateModel").Name);
              expect(response.body.Data.Description).to.equal(getTestData("BusinessServiceCreateModel").Description);
              expect(response.body.Data.ServiceDuration).to.equal(getTestData("BusinessServiceCreateModel").ServiceDuration);
              expect(response.body.Data.Fees).to.equal(getTestData("BusinessServiceCreateModel").Fees);
              expect(response.body.Data.IsTaxable).to.equal(getTestData("BusinessServiceCreateModel").IsTaxable);
              expect(response.body.Data.TaxRate).to.equal(getTestData("BusinessServiceCreateModel").TaxRate);
              expect(response.body.Data.PaymentRequired).to.equal(getTestData("BusinessServiceCreateModel").PaymentRequired);
              expect(response.body.Data.PaymentPercent).to.equal(getTestData("BusinessServiceCreateModel").PaymentPercent);
              expect(response.body.Data.PriorBookingWindow).to.equal(getTestData("BusinessServiceCreateModel").PriorBookingWindow);
              expect(response.body.Data.SendReminder).to.equal(getTestData("BusinessServiceCreateModel").SendReminder);
              expect(response.body.Data.ReminderType).to.equal(getTestData("BusinessServiceCreateModel").ReminderType);
              expect(response.body.Data.AllowCancellation).to.equal(getTestData("BusinessServiceCreateModel").AllowCancellation);
              expect(response.body.Data.CancellationWindow).to.equal(getTestData("BusinessServiceCreateModel").CancellationWindow);
              expect(response.body.Data.CancellationCharges).to.equal(getTestData("BusinessServiceCreateModel").CancellationCharges);
              expect(response.body.Data.EnableLoyalty).to.equal(getTestData("BusinessServiceCreateModel").EnableLoyalty);
              expect(response.body.Data.DisplayServicePicture).to.equal(getTestData("BusinessServiceCreateModel").DisplayServicePicture);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessServiceCreateModel").IsActive);

            })
            .expect(200, done);
    });

    it('Search business service records', function(done) {
      loadBusinessServiceQueryString();
        agent
            .get(`/api/v1/business-services/search${loadBusinessServiceQueryString()}`)
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

    it('Update business service', function(done) {
        loadBusinessServiceUpdateModel();
        const updateModel = getTestData("BusinessServiceUpdateModel");
        const id = `${getTestData("BusinessServiceId")}`
        agent
            .put(`/api/v1/business-services/${getTestData("BusinessServiceId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(response => {
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('Name');
              expect(response.body.Data).to.have.property('Description');
              expect(response.body.Data).to.have.property('ServiceDuration');
              expect(response.body.Data).to.have.property('Fees');
              expect(response.body.Data).to.have.property('IsTaxable');
              expect(response.body.Data).to.have.property('TaxRate');
              expect(response.body.Data).to.have.property('PaymentRequired');
              expect(response.body.Data).to.have.property('PaymentPercent');
              expect(response.body.Data).to.have.property('PriorBookingWindow');
              expect(response.body.Data).to.have.property('SendReminder');
              expect(response.body.Data).to.have.property('ReminderType');
              expect(response.body.Data).to.have.property('AllowCancellation');
              expect(response.body.Data).to.have.property('CancellationWindow');
              expect(response.body.Data).to.have.property('CancellationCharges');
              expect(response.body.Data).to.have.property('EnableLoyalty');
              expect(response.body.Data).to.have.property('DisplayServicePicture');
              expect(response.body.Data).to.have.property('IsActive');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessServiceUpdateModel").BusinessNodeId);
              expect(response.body.Data.Name).to.equal(getTestData("BusinessServiceUpdateModel").Name);
              expect(response.body.Data.Description).to.equal(getTestData("BusinessServiceUpdateModel").Description);
              expect(response.body.Data.ServiceDuration).to.equal(getTestData("BusinessServiceUpdateModel").ServiceDuration);
              expect(response.body.Data.Fees).to.equal(getTestData("BusinessServiceUpdateModel").Fees);
              expect(response.body.Data.IsTaxable).to.equal(getTestData("BusinessServiceUpdateModel").IsTaxable);
              expect(response.body.Data.TaxRate).to.equal(getTestData("BusinessServiceUpdateModel").TaxRate);
              expect(response.body.Data.PaymentRequired).to.equal(getTestData("BusinessServiceUpdateModel").PaymentRequired);
              expect(response.body.Data.PaymentPercent).to.equal(getTestData("BusinessServiceUpdateModel").PaymentPercent);
              expect(response.body.Data.PriorBookingWindow).to.equal(getTestData("BusinessServiceUpdateModel").PriorBookingWindow);
              expect(response.body.Data.SendReminder).to.equal(getTestData("BusinessServiceUpdateModel").SendReminder);
              expect(response.body.Data.ReminderType).to.equal(getTestData("BusinessServiceUpdateModel").ReminderType);
              expect(response.body.Data.AllowCancellation).to.equal(getTestData("BusinessServiceUpdateModel").AllowCancellation);
              expect(response.body.Data.CancellationWindow).to.equal(getTestData("BusinessServiceUpdateModel").CancellationWindow);
              expect(response.body.Data.CancellationCharges).to.equal(getTestData("BusinessServiceUpdateModel").CancellationCharges);
              expect(response.body.Data.EnableLoyalty).to.equal(getTestData("BusinessServiceUpdateModel").EnableLoyalty);
              expect(response.body.Data.DisplayServicePicture).to.equal(getTestData("BusinessServiceUpdateModel").DisplayServicePicture);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessServiceUpdateModel").IsActive);


            })
            .expect(200, done);
    });

    it('Delete business service', function(done) {
        const id = `${getTestData("BusinessServiceId")}`

        //Delete
        agent
            .delete(`/api/v1/business-services/${getTestData("BusinessServiceId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', `${process.env.TEST_API_KEY}`)
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Create business service again', function(done) {
      loadBusinessServiceCreateModel();
      const createModel = getTestData("BusinessServiceCreateModel");
      agent
          .post(`/api/v1/business-services/`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
              setTestData( response.body.Data.id, 'BusinessServiceId');
              expect(response.body.Data).to.have.property('id');
              expect(response.body.Data).to.have.property('BusinessNodeId');
              expect(response.body.Data).to.have.property('Name');
              expect(response.body.Data).to.have.property('Description');
              expect(response.body.Data).to.have.property('ServiceDuration');
              expect(response.body.Data).to.have.property('Fees');
              expect(response.body.Data).to.have.property('IsTaxable');
              expect(response.body.Data).to.have.property('TaxRate');
              expect(response.body.Data).to.have.property('PaymentRequired');
              expect(response.body.Data).to.have.property('PaymentPercent');
              expect(response.body.Data).to.have.property('PriorBookingWindow');
              expect(response.body.Data).to.have.property('SendReminder');
              expect(response.body.Data).to.have.property('ReminderType');
              expect(response.body.Data).to.have.property('AllowCancellation');
              expect(response.body.Data).to.have.property('CancellationWindow');
              expect(response.body.Data).to.have.property('CancellationCharges');
              expect(response.body.Data).to.have.property('EnableLoyalty');
              expect(response.body.Data).to.have.property('DisplayServicePicture');
              expect(response.body.Data).to.have.property('IsActive');

              setTestData( response.body.Data.id, 'BusinessServiceId');

              expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessServiceCreateModel").BusinessNodeId);
              expect(response.body.Data.Name).to.equal(getTestData("BusinessServiceCreateModel").Name);
              expect(response.body.Data.Description).to.equal(getTestData("BusinessServiceCreateModel").Description);
              expect(response.body.Data.ServiceDuration).to.equal(getTestData("BusinessServiceCreateModel").ServiceDuration);
              expect(response.body.Data.Fees).to.equal(getTestData("BusinessServiceCreateModel").Fees);
              expect(response.body.Data.IsTaxable).to.equal(getTestData("BusinessServiceCreateModel").IsTaxable);
              expect(response.body.Data.TaxRate).to.equal(getTestData("BusinessServiceCreateModel").TaxRate);
              expect(response.body.Data.PaymentRequired).to.equal(getTestData("BusinessServiceCreateModel").PaymentRequired);
              expect(response.body.Data.PaymentPercent).to.equal(getTestData("BusinessServiceCreateModel").PaymentPercent);
              expect(response.body.Data.PriorBookingWindow).to.equal(getTestData("BusinessServiceCreateModel").PriorBookingWindow);
              expect(response.body.Data.SendReminder).to.equal(getTestData("BusinessServiceCreateModel").SendReminder);
              expect(response.body.Data.ReminderType).to.equal(getTestData("BusinessServiceCreateModel").ReminderType);
              expect(response.body.Data.AllowCancellation).to.equal(getTestData("BusinessServiceCreateModel").AllowCancellation);
              expect(response.body.Data.CancellationWindow).to.equal(getTestData("BusinessServiceCreateModel").CancellationWindow);
              expect(response.body.Data.CancellationCharges).to.equal(getTestData("BusinessServiceCreateModel").CancellationCharges);
              expect(response.body.Data.EnableLoyalty).to.equal(getTestData("BusinessServiceCreateModel").EnableLoyalty);
              expect(response.body.Data.DisplayServicePicture).to.equal(getTestData("BusinessServiceCreateModel").DisplayServicePicture);
              expect(response.body.Data.IsActive).to.equal(getTestData("BusinessServiceCreateModel").IsActive);
          })
          .expect(201, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessServiceCreateModel = async (
  Name = faker.person.fullName(),
  Description = faker.commerce.productDescription(),
  ServiceDuration = faker.string.numeric(),
  Fees = faker.number.float({ precision: 0.2 }),
  IsTaxable = faker.string.numeric(),
  TaxRate = faker.number.float({ precision: 0.99 }),
  PaymentRequired = faker.string.numeric(),
  PaymentPercent = faker.number.int({ min: 1, max: 255 }),
  PriorBookingWindow = faker.string.numeric(),
  SendReminder = faker.string.numeric(),
  ReminderWindow = faker.string.numeric(),
  ReminderType = faker.lorem.word(),
  AllowCancellation = faker.string.numeric(),
  CancellationWindow = faker.string.numeric(),
  CancellationCharges = faker.number.float({ precision: 20.0 }),
  EnableLoyalty = faker.string.numeric(),
  DisplayServicePicture = faker.image.url(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessNodeId: global.TestCache.BusinessNodeId,
      Name: Name,
      Description: Description,
      ServiceDuration: "30m",
      Fees: Fees,
      IsTaxable: true,
      TaxRate: TaxRate,
      PaymentRequired: true,
      PaymentPercent: PaymentPercent,
      PriorBookingWindow: "2h",
      SendReminder: true,
      ReminderWindow: ReminderWindow,
      ReminderType: ReminderType,
      AllowCancellation: true,
      CancellationWindow: CancellationWindow,
      CancellationCharges: CancellationCharges,
      EnableLoyalty: true,
      DisplayServicePicture: DisplayServicePicture,
      IsActive: true
    };
    setTestData(model, "BusinessServiceCreateModel");
}

export const loadBusinessServiceUpdateModel = async (
  Name = faker.person.fullName(),
  Description = faker.commerce.productDescription(),
  ServiceDuration = faker.string.numeric(),
  Fees = faker.number.float({ precision: 0.2 }),
  IsTaxable = faker.string.numeric(),
  TaxRate = faker.number.float({ precision: 0.99 }),
  PaymentRequired = faker.string.numeric(),
  PaymentPercent = faker.number.int({ min: 1, max: 255 }),
  PriorBookingWindow = faker.string.numeric(),
  SendReminder = faker.string.numeric(),
  ReminderWindow = faker.string.numeric(),
  ReminderType = faker.lorem.word(),
  AllowCancellation = faker.string.numeric(),
  CancellationWindow = faker.string.numeric(),
  CancellationCharges = faker.number.float({ precision: 20.0 }),
  EnableLoyalty = faker.string.numeric(),
  DisplayServicePicture = faker.image.url(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessNodeId: global.TestCache.BusinessNodeId,
      Name: Name,
      Description: Description,
      ServiceDuration: "30m",
      Fees: Fees,
      IsTaxable: true,
      TaxRate: TaxRate,
      PaymentRequired: true,
      PaymentPercent: PaymentPercent,
      PriorBookingWindow: "2h",
      SendReminder: true,
      ReminderWindow: ReminderWindow,
      ReminderType: ReminderType,
      AllowCancellation: true,
      CancellationWindow: CancellationWindow,
      CancellationCharges: CancellationCharges,
      EnableLoyalty: true,
      DisplayServicePicture: DisplayServicePicture,
      IsActive: true
};
    global.TestCache.BusinessServiceUpdateModel = model;
}

function loadBusinessServiceQueryString() {
    //This is raw query. Please modify to suit the test
    //const queryString = '?isActive=true'
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
