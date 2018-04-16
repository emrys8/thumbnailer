import apiHelper from './api_helpers';
const { loginUser, createImageThumbnail, jsonPatch } = apiHelper;

export default (app) => {
    app.get('/login', loginUser);
    app.get('/create-thumbnail', createImageThumbnail);
    app.get('/apply-json-patch', jsonPatch);
}