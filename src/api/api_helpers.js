const status = require('http-status');

export default {

    loginUser: (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(status.BAD_REQUEST)
                .json({
                    message: 'Invalid Username & Password: Username or Password cannot be empty',
                    success: false
            });
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