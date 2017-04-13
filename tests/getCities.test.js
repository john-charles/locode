"use strict";

const chai = require('chai');
const expect = chai.expect;
const locode = require('../lib');

chai.use(require('chai-as-promised'));


describe("Cities", function () {

    it("US", function () {
        expect(locode.getCities("US", "IL"))
            .to.eventually.include({
                locode: 'US BGO',
                countryCode: 'US',
                name: 'Buffalo Grove',
                sub: 'IL',
                funct: '--3-----',
                status: 'RQ',
                date: '9307',
                aux: '  '
            });
    });

});