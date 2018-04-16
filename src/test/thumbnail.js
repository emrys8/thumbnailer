import { expect } from 'chai';
import request from 'supertest';
import server from '../server';
import { userInfo } from 'os';

describe('Thumbnail API', () => {
    let app = null;
    let userToken;
    let testUser = {
        username: 'dennis',
        password: 'ritchie'
    };

    beforeEach(() => {
        return server.start(3000)
          .then(serv => {
              app = serv;
          });
    });

    afterEach(() => {
        app.close();
        app = null;
    });

    describe('User Mock Login', () => {
            it('should reject an invalid login request', (done) => {
                request(app)
                  .post('/login')
                  .send({ username: '', password: '' })
                  .expect((res) => {
                      expect(res.statusCode).to.equal(400);
                      expect(res.body.success).to.equal(false);
                  })
                  .expect(400, done);
            });

        describe('handle valid login request', () => {
            it('should login a user with the right credentials', (done) => {
                request(app)
                  .post('/login')
                  .send(testUser)
                  .expect((res) => {
                      userToken = res.body.token;
                      expect(res.statusCode).to.be.equal(200);
                      expect(res.body.success).to.equals(true);
                      expect(typeof userToken).to.equals('string');
                  })
                  .expect(200, done);
            });
        });
    });

    describe('Thumbnail Creation', () => {
        it('should reject request with malformed image URL', (done) => {
            request(app)
              .post('/create-thumbnail')
              .set('x-access-token', userToken)
              .send({ imageUrl: 'file://my-image.jpg' })
              .expect((res) => {
                  expect(res.statusCode).to.be.equal(400, 'Bad Request');
                  expect(res.body.status).to.equals(false);
              })
              .expect(400, done);
        });

        it('should create an image thumbnail', (done) => {
            request(app)
             .post('/create-thumbnail')
             .set('x-access-token', userToken)
             .send({ imageUrl: 'http://my-image.jpg' })
             .expect(200, done);
        });
    });
})