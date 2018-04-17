import apiHelper from './api_helpers';
import authToken from '../auth/locals';

const { loginUser, createImageThumbnail, jsonPatch } = apiHelper;

/**
 * The Image Thumbnailer API module
 * @module
 * @param {Object} app - Express top level object
 */
export default (app) => {
  app.post('/api/login', loginUser);
  app.post('/api/create-thumbnail', authToken, createImageThumbnail);
  app.patch('/api/apply-json-patch', authToken, jsonPatch);
};
