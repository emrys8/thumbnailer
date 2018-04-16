import jwt from 'jsonwebtoken';
import status from 'http-status';
import authToken from './index';

const { decodeToken } = authToken(jwt);

export default (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        decodeToken(token)
         .then(decoded => {
             req.decoded = decoded;
             next();
         })
         .catch(err => {
               res.status(403)
               .json({
                   message: err.message,
                   success: false
               });
               next(err);
         })
    } else {
        return res.status(status.BAD_REQUEST)
          .json({
              message: 'No token is present in request',
              success: false
          })
    }
}