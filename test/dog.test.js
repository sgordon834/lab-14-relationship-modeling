'use strict';

const request = require('superagent');
const Dog = require('../models/dog');
const mongoose = require('mongoose');
const expect = require('expect');

process.env.DB_URL = 'mongodb://localhost:27017/dogs_dev';
// url = 
process.env.PORT = 5500;


beforeAll(() => {
  require('../lib/_server').start(process.env.PORT);
  return Dog.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});

let dogId = '';

describe('POST /api/v1/dogs', () => {

  test('it should create a new dog', () => {
    return request
      .post('localhost:5500/api/v1/dogs')
      .send({name: 'happy'})
      .then((res) => {
        dogId = res.body._id;
        expect(res.body.name).toBe('happy');
        expect(res.body.breed).not.toBe(undefined);
        expect(res.body._id).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });

  test('it should create another new dog', () => {
    return request
      .post('localhost:5500/api/v1/dogs')
      .send({
        'name': 'jammy'
      })
      .then((res) => {
        expect(res.body.name).toBe('jammy');
        expect(res.body.breed).not.toBe(undefined);
        expect(res.body._id).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });

  test('it should return a 400 if bad json is given', () => {
    return request
      .post('localhost:5500/api/v1/dogs')
      .send('Hello World')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(500);//400
        expect(res.message).toEqual('Internal Server Error');//Bad Request
      });
  });

});

describe('GET /api/v1/dogs', () => {

  test('it should return all costumes if no id is given', () => {
    return request
      .get('localhost:5500/api/v1/dogs')
      .then(res => {
        expect(res.body[0].name).toBe('happy');
        expect(res.body[1].name).toBe('jammy');
        expect(res.status).toBe(200);
      });
  });

  test('it should get a single costume with id param', () => {
    return request
      .get(`localhost:5500/api/v1/dogs/${dogId}`)
      .then(res => {
        expect(res.body.name).toBe('happy');
        expect(res.status).toBe(200);
      });
  });

  test('it should return a 404 for invalid id', () => {
    let badID = 12345;
    return request
      .get(`localhost:5500/api/1.0/costume/${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('Not Found');
      });
  });

});

describe('PUT /api/v1/dogs/:id', () => {

  test('it should update with a put when valid ID is given', () => {
    return request
      .put(`localhost:5500/api/v1/dogs/${dogId}`)
      .send({name: 'Emma'})
      .then(res => {
        expect(res.text).toBe('success!');
        expect(res.status).toEqual(200);
      });
  });

//   test('it should return a 400 when no body is provided', () => {
//     return request
//       .put(`localhost:5500/api/v1/dogs/${dogId}`)
//       .send({})
//       .then(Promise.reject)
//       .catch(res => {
//         expect(res.status).toEqual(400);
//         expect(res.message).toEqual('Bad Request');
//       });
//   });

  test('it should return a 404 when no body is provided', () => {

    let badID = 12345;

    return request
      .put(`localhost:5500/api/v1/dogs/${badID}`)
      .send({name: 'Doggy Style'})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(500);
        expect(res.message).toEqual('Internal Server Error');
      });
  });

});


describe('DELETE /api/v1/dogs/:id', () => {

  test('it should be able to delete a dog', () => {
    return request
      .delete(`localhost:5500/api/v1/dogs/${dogId}`)
      .then(res => {
        expect(res.text).toEqual('dog successfully murdered');
      });
  });
});