import jwt from 'jsonwebtoken';
import status from 'http-status';
import authToken from '../auth';

const { generateToken, decodeToken } = authToken(jwt);

export default {

    loginUser: (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(status.BAD_REQUEST)
                .json({
                    message: 'Invalid Username & Password: Username or Password cannot be empty',
                    success: false
            });
        } else {
            const payload = {
                admin: true
            };

            generateToken(payload)
             .then(token => {
                 res.status(status.OK)
                  .json({
                     message: 'Accepted: Here\'s your token',
                     success: true,
                     token
                 });
             })
             .catch(err => {
                 res.status(status.BAD_REQUEST)
                  .json({
                      message: err.message,
                      success: false
                  });
             })
        }
    },

    createImageThumbnail: (req, res, next) => {
        res.json({
            message: 'Image Thumbnail Creation successful',
            success: true
        });
    },

    jsonPatch: (req, res, next) => {
        res.json({
            message: 'JSON patched object',
            success: true
        });
    },
}