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

    const jsonTestDoc = {
        "_id": 1,
        "name": "Beats Headphone",
        "stock": 4,
        "price": 109.99
    };

    const jsontestPatch = [
        { "op": "remove", "path": "/stock" }
    ];

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
                  .post('/api/login')
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
                  .post('/api/login')
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
              .post('/api/create-thumbnail')
              .set('x-access-token', userToken)
              .send({ imageUrl: 'file://my-image.jpg' })
              .expect((res) => {
                  expect(res.statusCode).to.be.equal(400);
                  expect(res.body.success).to.equals(false);
              })
              .expect(400, done);
        });

        it('should reject request with malformed image URL: NO .jpeg, .png, or .jpg', (done) => {
            request(app)
             .post('/api/create-thumbnail')
             .set('x-access-token', userToken)
             .send({ imageUrl: 'https://some_malformed_url'})
             .expect((res) => {
                 expect(res.statusCode).to.equal(400);
                 expect(res.body.success).to.equals(false);
             })
             .expect(400, done);
        });

        it('should reject request with malformed image URL: NO .jpeg, .png, or .jpg', (done) => {
            request(app)
             .post('/api/create-thumbnail')
             .set('x-access-token', userToken)
             .send({ imageUrl: 'https://some_malformed_url.gif'})
             .expect((res) => {
                 expect(res.statusCode).to.equal(400);
                 expect(res.body.success).to.equals(false);
             })
             .expect(400, done);
        })

        it('should return an image thumbnail', (done) => {
            request(app)
             .post('/api/create-thumbnail')
             .set('x-access-token', userToken)
             .send({ imageUrl: 'https://cointelegraph.com/storage/uploads/view/1ce2f935afa26ebcb64bbe86a6599be0.png'
             })
             .expect((res) => {
                 const {width, height } = res.body.payload.bitmap;
                 expect(res.statusCode).to.be.equal(200);
                 expect(typeof res.body.payload).to.equal('object');
                 expect(res.statusCode).to.equals(200);
                 expect(width).to.equal(50);
                 expect(height).to.equal(50)
             })
             .expect(200, done);
        })

        it('should create an image thumbnail', (done) => {
            request(app)
             .post('/api/create-thumbnail')
             .set('x-access-token', userToken)
             .send({ imageUrl: 'https://vignette.wikia.nocookie.net/gameofthrones/images/a/a5/Profile-JonSnow-707.png/revision/latest?cb=20170828030553' })
             .expect((res) => {
                 expect(typeof res.body.payload).to.be.equal('object');
                 expect(res.statusCode).to.equals(200);
             })
             .expect(200, done);
        });

        it('should reject a request without a valid token', (done) => {
            request(app)
             .post('/api/create-thumbnail')
             .send({ imageUrl: 'http://some-image.png'})
             .expect((res) => {
                 expect(res.statusCode).to.be.equal(400);
                 expect(res.body.success).to.equals(false);
             })
             .expect(400, done);
        });
    });

    describe('JSON Patch', () => {
        it('should return a patched object', (done) => {
            request(app)
             .patch('/api/apply-json-patch')
             .set('x-access-token', userToken)
             .send({
                 document: jsonTestDoc,
                 patch: jsontestPatch
             })
             .expect((res) => {
                 expect(res.body.patchedDoc).to.deep.equal({
                     "_id": 1,
                     "name": "Beats Headphone",
                     "price": 109.99
                 });
             })
             .expect(200, done);
        })
    })
})