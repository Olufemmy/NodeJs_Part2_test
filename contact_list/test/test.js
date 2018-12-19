const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("Contact list test", function() {
  it("should post a contact details", function(done) {
    let contact = {
      name: "Babalola Oluwadare",
      phone_number: "09076385298"
    };
    request(app)
      .post("/contact")
      .send(contact)
      .set("Accept", "application/json")
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        assert.equal(res.body.ops[0]._id.length, 24);
        done();
      });
  });
  it("should update a contact detail by id", function(done) {
    let contact = {
      name: "Adigun Janet",
      phone_number: "07032146667"
    };
    request(app)
      .put("/contact")
      .send(contact)
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