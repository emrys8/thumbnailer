
export default (resizer) => {

    const createThumbnail = (imageUrl) => {
      // NOT IMPLEMENTED YET: Image Resizer service
    },

    const applyJsonPatch = (patcher, patch, document) => {
      // NOT IMPLEMENTED YET
      return new Promise((resolve, reject) => {
        if (!document || !patch) {
          reject(new Error('No document to patch, please provide a document'));
        } else {
          const patchedObject = patcher.apply_patch(document, patch);
          resolve(patchedObject);
        }
      });
    }

    return { createThumbnail, applyJsonPatch };
}