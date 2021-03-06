import image2Base64 from 'image-to-base64';
import debug from 'debug';

debug('image-resizer');

/**
 * The Image resizer logic
 * @module
 * @param {Object} resizer - Any Image resizer that supports the interface
 * @return {Function}
 */
export default (resizer) => {
  /**
   * @function createThumbnail
   * @param {String} imageUrl - an http/https image url
   * @param {Object} options - an object specifying, image height, and width
   * @return {Promise}
   */
  const createThumbnail = (imageUrl, options = {
    width: 50, height: 50 }) => 
    new Promise((resolve, reject) => {

      // We will only handle HTTP or HTTPS request
      if (/^http*/.test(imageUrl) &&

             // can only service .jpeg, .jpg, .png image format
             (imageUrl.includes('png') || imageUrl.includes('jpeg') ||
             imageUrl.includes('jpg'))) {

        const { width, height } = options;
        resizer.read(imageUrl)
          .then((image) => {
            image.resize(width, height);
            resolve(image);
          })
          .catch((err) => {
            debug(err);
          });
      } else {
        reject(new Error('Only image(.jpeg, .png, .jpg) URLs starting with HTTP or HTTPS are accepted '));
      }
    });

  return createThumbnail;
};
