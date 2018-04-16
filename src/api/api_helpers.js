import jwt from 'jsonwebtoken';
import jsonpatch from 'jsonpatch';
import status from 'http-status';
import Jimp from 'jimp';
import authToken from '../auth';
import jsonPatcher from '../utility/patcher';
import imageResizer from '../utility';

const applyJSONPatch = jsonPatcher(jsonpatch);
const createThumbnail = imageResizer(Jimp);

console.log(`in api_helpers ${typeof applyJSONPatch}`);
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

        // we want to service http|https requests ONLY
        const { imageUrl } = req.body;
        if(imageUrl) {
            createThumbnail(imageUrl)
             .then(resizedImage => {
                 res.status(status.OK)
                  .json({
                      message: `Image ${imageUrl} was resized to a 50px by 50px image`,
                      payload: resizedImage,
                      success: true
                  });
             })
             .catch(err => {
                 res.status(status.BAD_REQUEST)
                  .json({
                      message: err.message,
                      success: false
                  })
             }); 
        } else {
            res.status(status.BAD_REQUEST)
              .json({
                  message: 'Please provide a URL of an image in the format (.jpg, .jpeg, .png, or .bmp)',
                  success: false
              });
        }
    },

    jsonPatch: (req, res, next) => {
        const { patch, document } = req.body;
        applyJSONPatch(document, patch)
         .then(patchedDoc => {
             res.status(status.OK)
               .json({
                   success: true,
                   patchedDoc
               });
         })
         .catch(err => {
             res.json({
                 success: false,
                 message: err.message
             });
         });
    },
}