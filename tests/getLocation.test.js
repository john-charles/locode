"use strict";

const chai = require('chai');
const expect = chai.expect;
const locode = require('../lib');

chai.use(require('chai-as-promised'));


describe("Location by locode", function () {

    it("US", function () {
        return expect(locode.getLocation("US CHI"))
            .to.eventually.deep.equal({
                "aux": "MDW  ",
                "countryCode": "US",
                "date": "1301",
                "funct": "1--45---",
                "locode": "US CHI",
                "name": "Chicago",
                "status": "AI",
                "sub": "IL"
            }
        );
    });

});