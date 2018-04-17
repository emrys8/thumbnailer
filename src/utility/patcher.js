
/**
 * Handling JSON Patching logic
 * @module
 * @param {Object} jsonPatcher - a viable, JSON patcher
 * @return {Function}
 */
export default (jsonPatcher) => {

    /**
     * Patches document using patch
     * @function applyJSONPatch
     * @param {JSON} document - the document to be patched
     * @param {Array<Object>} patch - the patch
     * @return {Promise}
     */
    const applyJSONPatch = (document, patch) => {
        return new Promise((resolve, reject) => {
            if (!document || !patch) {
              reject(new Error('No document to patch, please provide a document'));
            } else {
              const patchedObject = jsonPatcher.apply_patch(document, patch);
              resolve(patchedObject);
            }
        });
    }

    return applyJSONPatch;
}