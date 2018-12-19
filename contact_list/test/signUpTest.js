const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("Sign Up test", function() {
  it("should post sign up details", function(done) {
    let user = {
      email: "olaysg@gmail.com",
      username: "Olasiji"
      password: "ola95"
      passwordConf: "ola95"
    };
    request(app)
      .post("/auth/signUp")
      .send(user)
      .set("Accept", "application/json")
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        assert.equal(res.body.ops[0]._id.length, 24);
        done();
      });
  });
  it("should post login details", function(done) {
    let user = {
      username: "Olasiji"
      password: "ola95"
    };
    request(app)
      .post("/auth/login")
      .send(user)
      .set("Accept", "application/json")
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        assert.equal(res.body.ops[0]._id.length, 24);
        done();
      });
  });
});