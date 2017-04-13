"use strict";

const chai = require('chai');
const expect = chai.expect;
const locode = require('../lib');

chai.use(require('chai-as-promised'));


describe("Sampling some countries", function () {

    it("US", function () {
        return expect(locode.getSubdivisionTypes("US"))
            .to.eventually.deep.equal(["State", "Outlying area", "District"]);
    });

    it("FR", function () {
        return expect(locode.getSubdivisionTypes("FR"))
            .to.eventually.deep.equal(["Metropolitan department"]);
    });

    it("CA", function () {
        return expect(locode.getSubdivisionTypes("CA"))
            .to.eventually.deep.equal(['Province', 'Territory']);
    });

});