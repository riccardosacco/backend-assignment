const request = require("supertest");

describe("loading express", function () {
  var server;
  beforeEach(function () {
    server = require("./server");
  });
  afterEach(function () {
    server.close();
  });
  it("responds to /", function testSlash(done) {
    request(server).get("/").expect(200, done);
  });
  it("responds to /api/v1", function testSlash(done) {
    request(server).get("/api/v1").expect(200, done);
  });
  it("responds to /api/v1/instants", function testSlash(done) {
    request(server).get("/api/v1/instants").expect(200, done);
  });
  it("404 everything else", function testPath(done) {
    request(server).get("/foo/bar").expect(404, done);
  });
});
