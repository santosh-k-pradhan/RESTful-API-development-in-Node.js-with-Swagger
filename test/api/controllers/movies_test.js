//Testing the app using supertest library and should assertion library
var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('MOVIES APP API TEST', function() { 
    
  describe('GET /movies', function() {
      it('should return all movie list', function(done) {
        request(server)
          .get('/movies')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            //res.body.should.eql('Hello, stranger!');
            res.body.should.be.array;
            done();
          });
      });
  });

  describe('POST /movies', function() {
    it('should create a movie', function(done) {
      request(server)
        .post('/movies')
        .set('Accept', 'application/json')
        .send({
          "movieDetail": {
            "movieTitle": "Lagaan",
            "releasedYear": "2001"
          }
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.be.object;
          done();
        });
    });
  });

});
