var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl_iecho = "http://localhost:3001/";
var baseUrl = "http://localhost:3001/api/v1/";
var util = require("util");

describe('returns luke', function () {
    it('returns luke', function(done) {
        request.get({ url: baseUrl_iecho + "/iecho?text=oso" }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });
});