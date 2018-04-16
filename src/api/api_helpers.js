const status = require('http-status');

export default () => {

    const loginUser = (req, res, next) => {
        res.json({
            message: 'User logged in',
            success: true
        })
    };

    const createImageThumbnail = (req, res, next) => {
        res.json({
            message: 'Image Thumbnail Creation successful',
            success: true
        });
    };

    const jsonPatch = (req, res, next) => {
        res.json({
            message: 'JSON patched object',
            success: true
        });
    }

    return Object.create({
        loginUser,
        createImageThumbnail,
        jsonPatch
    });
}