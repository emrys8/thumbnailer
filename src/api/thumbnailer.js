import apiHelper from './api_helpers';
const { loginUser, createImageThumbnail, jsonPatch } = apiHelper;

export default (app) => {
    app.post('/login', loginUser);
    app.post('/create-thumbnail', createImageThumbnail);
    app.post('/apply-json-patch', jsonPatch);
}