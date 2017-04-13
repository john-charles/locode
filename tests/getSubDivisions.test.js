"use strict";

const chai = require('chai');
const expect = chai.expect;
const locode = require('../lib');

chai.use(require('chai-as-promised'));


describe("Listing Subdivisions", function () {

    it("US", function () {
        return expect(locode.getSubdivisions("US"))
            .to.eventually.include({
                countryCode: 'US',
                sub: 'WY',
                name: 'Wyoming',
                type: 'State'
            });
    });

});