import jwt from 'jsonwebtoken';
import jsonpatch from 'jsonpatch';
import status from 'http-status';
import authToken from '../auth';
import jsonPatcher from '../utility/patcher';


const applyJSONPatch = jsonPatcher(jsonpatch);

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
        if (/^http*/.test(imageUrl)) {
            res.status(status.OK)
             .json({
                 message: 'Here\'s your thumbnailed image',
                 success: true
            });
        } else {
            res.status(status.BAD_REQUEST)
              .json({
                  message: 'Invalid URL: please provide a well-formed URL startiing with http or https',
                  success: false
              });
        }
    },

    jsonPatch: (req, res, next) => {
        const { patch, document } = req.body;
        applyJSONPatch(document, patch)
         .then(patchedDoc => {
             console.log(`inside jsonPatch...`);
             console.log(patchedDoc);
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