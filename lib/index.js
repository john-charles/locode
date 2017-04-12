"use strict";

const fs = require('fs');
const csv = require('csv');
const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');
const parseAsync = Promise.promisify(csv.parse);
const readFileAsync = Promise.promisify(fs.readFile);

const getData = _.once(function (){

    return readFileAsync(path.dirname(__filename) + "/CodeList.csv").then(function(data){
        return parseAsync(data);
    }).then(function(parsed){
        return _.map(parsed, function(columns){
            return {
                locode: columns[1] + " " + columns[2],
                countryCode: columns[1],
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

module.exports = function(criteria, callback){

    return getData().then(function(results){
        return _.filter(results, criteria);
    }).asCallback(callback);

}
