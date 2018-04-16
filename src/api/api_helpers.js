const status = require('http-status');

export default {

    loginUser: (req, res, next) => {
        res.json({
            message: 'User logged in',
            success: true
        })
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