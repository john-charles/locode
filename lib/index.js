"use strict";

const fs = require('fs');
const csv = require('csv');
const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');
const parseAsync = Promise.promisify(csv.parse);
const readFileAsync = Promise.promisify(fs.readFile);

const getLocationData = _.once(function () {

    return readFileAsync(path.dirname(__filename) + "/CodeList.csv").then(function (data) {
        return parseAsync(data);
    }).then(function (parsed) {
        return _.map(parsed, function (columns) {
            return {
                locode: (columns[1] + " " + columns[2]).trim(),
                countryCode: columns[1],
                cityCode: columns[2],
                name: columns[3],
                sub: columns[5],
                funct: columns[6],
                status: columns[7],
                date: columns[8],
                aux: columns[9] + ' ' + columns[10] + ' ' + columns[11]
            };
        });
    });
});

const getSubdivisionData = _.once(function () {

    return readFileAsync(path.dirname(__filename) + "/SubdivisionCodes.csv").then(function (subdivisions) {

        return parseAsync(subdivisions);

    }).then(function (subdivisions) {

        return _.map(subdivisions, function (sub) {
            return {
                countryCode: sub[0],
                sub: sub[1],
                name: sub[2],
                type: sub[3]
            };
        });
    });
});

module.exports.getCountries = function () {
    return getLocationData().then(function (locations) {
        return _.filter(locations, function (location) {

            const isPossibleCountry = location.locode === location.countryCode;
            return isPossibleCountry && location.name[0] === '.';

        })

    }).then(function (countries) {

        return _.map(countries, function (country) {

            const name = _.capitalize(country.name.slice(1, country.name.length));

            return {
                name,
                countryCode: country.countryCode
            };
        });

    });
};

module.exports.getSubdivisionTypes = function (countryCode) {

    return getSubdivisionData().then(function (subdivisions) {
        return _.filter(subdivisions, {countryCode: countryCode});
    }).then(function (subdivisions) {
        return _.map(subdivisions, function (sub) {
            return sub.type;
        });
    }).then(function (types) {
        return _.uniq(types);
    });

};

module.exports.getSubdivisions = function (countryCode) {

    return getSubdivisionData().then(function (subdivisions) {
        return _.filter(subdivisions, {countryCode});
    });

};

module.exports.getSubdivision = function (subdivisionCode) {
    return getSubdivisionData().then(function (subdivisions) {
        return _.find(subdivisions, {sub: subdivisionCode});
    });
};

module.exports.getCities = function (countryCode, sub) {

    return getLocationData().then(function (locations) {
        if(sub){
            return _.filter(locations, {countryCode, sub});
        } else {
            return _.filter(locations, {countryCode});
        }
    }).then(function(matched){
        return _.filter(matched, function (city) {
            return city.name[0] !== '.';
        });
    });
};

module.exports.getLocation = function (locode) {
    return getLocationData().then(function (locations) {
        return _.find(locations, {locode});
    });
};

module.exports.findByTriplet = function (countryCode, subdivisionCode, cityCode) {

    cityCode = cityCode || '';
    subdivisionCode = subdivisionCode || '';

    return getLocationData().then(function (locations) {
        return _.find(locations, {countryCode, cityCode, sub: subdivisionCode});
    })
};

//setTimeout(getLocationData, 0);
//setTimeout(getSubdivisionData, 0);
