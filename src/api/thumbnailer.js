import apiHelper from './api_helpers';
import authToken from '../auth/locals';
const { loginUser, createImageThumbnail, jsonPatch } = apiHelper;

export default (app) => {
    app.post('/login', loginUser);
    app.post('/create-thumbnail', authToken, createImageThumbnail);
    app.patch('/apply-json-patch', authToken, jsonPatch);
}