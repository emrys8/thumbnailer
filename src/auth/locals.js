import jwt from 'jsonwebtoken';
import status from 'http-status';
import authToken from './index';

const { decodeToken } = authToken(jwt);

/**
 * The implementation of the auth middleware
 * @function Middleware
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware
 */
export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    decodeToken(token)
      .then((decoded) => {
        req.decoded = decoded;
        next();
      })
      .catch((err) => {
        res.status(403)
          .json({
            message: err.message,
            success: false
          });
        next(err);
      });
  } else {
    return res.status(status.BAD_REQUEST)
      .json({
        message: 'No token is present in request',
        success: false
      });
  }
};
