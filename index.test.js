const assert = require('assert');
// const { ConsoleWriter } = require('istanbul-lib-report');
const request = require('supertest');
const api = require('./index');

const { app } = api;

describe('Testing the Tester', () => {
    it('validate self-evident truth', () => {
        assert(true, true);
    });
  });

  // describe('Testing the Routing to MongoDB', () => {
  //   it('should be able to fetch one data entry', done => {
  //     request(app)
  //       .get('/62209b5a7b8e51314d246e57')
  //       .expect(response => {
  //         assert.strictEqual(response.body.length, api.db().length);
  //       })
  //       .expect(res.body.name, 'bannaana');
  //       .expect(response => {
  //         assert.strictEqual(response.body.id, '44');
  //         assert.strictEqual(response.body.name, 'bannaana');
  //         assert.strictEqual(response.body.from, '2009');
  //         assert.strictEqual(response.body.to, '2017');
  //       })
  //       .expect(200, done);

describe.skip('POSITIVE Testing the Routing to MongoDB', () => {

    let globalId;
    it('should be able to ADD one data entry', done => {
      request(app)
        .post('/')
        .send({ name: 'Apple' })
        .expect(response => {
          console.log('TEST', response.headers.location)
          globalId = response.headers.location
          assert.strictEqual(typeof response.headers.location, 'string');
        })
        .expect(201, done);
    });
    it('should be able to GET one data entry', done => {
      request(app)
        .get(globalId)
        .expect(response => {
          assert.strictEqual(response.body.name, 'Apple');
        })
        .expect(200, done);
    });
    it('should be able to DELEETE one data entry', done => {
      request(app)
        .delete(globalId)
        .expect(204, done);
    });
  });

  describe('NEGATIVE Testing the Routing to MongoDB', () => {

    it('should reject empty req.body on POST call with 500', done => {
      request(app)
        .post('/')
        .expect(400, done);
    });
    it('should reject false id on GET call with 400', done => {
      request(app)
        .get('/6220d656f389042a1b37016y')
        .expect(400, done);
    });
    // it('should reject correct but non-existnt id on GET call with 404', done => {
    //   request(app)
    //     .get('/62209bdd8d7f2e564e2bf240')
    //     .expect(response => {
    //       console.log('TEST', response.headers.location)
    //       // globalId = response.headers.location
    //       assert.strictEqual(true, true);
    //     })
    //     .expect(40, done);
    // });
  });