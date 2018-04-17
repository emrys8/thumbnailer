
/**
 * Provides auth helpers and middleware
 * @module
 * @param {Object} tokenSigner
 * @return {Function} - generateToken
 * @return {Function} - decodeToken
 */
export default (tokenSigner) => {
  /**
     * Generates token for auth purposes
     * @function generateToken
     * @param {Object} payload - Object that will be signed
     * @return {Promise} - A promise that resolves to a signed token
     */
  const generateToken = payload =>
    new Promise((resolve, reject) => {
      if (payload) {
        const token = tokenSigner.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '24h'
        });

        resolve(token);
      } else {
        reject(new Error('Payload is not provided'));
      }
    });

    /**
     * A middleware for verifying auth token
     * @function decodeToken
     * @param {String} token - the token to be verified
     * @return {Promise} - resolves to a decoded token
     */
  const decodeToken = token => new Promise((resolve, reject) => {
    tokenSigner.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(new Error('Invalid or Expired token'));
      } else {
        resolve(decoded);
      }
    });
  });

  // return Object.create({
  //     generateToken,
  //     decodeToken
  // });
  return { generateToken, decodeToken };
};
