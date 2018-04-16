
export default (jsonPatcher) => {
    // NOT IMPLEMENTED YET

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