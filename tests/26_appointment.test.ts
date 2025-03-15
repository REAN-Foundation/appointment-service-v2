import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';
const infra = Application.instance();

////////////////////////////////////////////////////////////////

describe('Appointment tests', function() {

	var agent = request.agent(infra._app);

	it('If fromDate, toDate and business user id is not given.', function(done) {
		loadAppointmentFindQueryString();
		const BusinessId = getTestData("BusinessId");
		const BusinessNodeId = getTestData("BusinessNodeId");
		const BusinessServiceId = getTestData("BusinessServiceId");
		agent
			.get(`/api/v1/appointments/business/${BusinessId}/node/${BusinessNodeId}/service/${BusinessServiceId}/slots`)
			.set('Content-Type', 'application/json')
      .set('x-api-key', `${process.env.TEST_API_KEY}`)
			.expect(response => {
				expect(response.body).to.have.property('Status');
				expect(response.body.Status).to.equal('success');
			})
		.expect(200, done);
	});
});

//////////////////////////////////////////////////////////////////////////

function loadAppointmentFindQueryString() {
  //This is raw query. Please modify to suit the test
  const queryString = ''
  return queryString;
}
    