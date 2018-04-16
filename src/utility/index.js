import image2Base64 from 'image-to-base64';

export default (resizer) => {

<<<<<<< HEAD
    const createThumbnail = (imageUrl) => {
      // NOT IMPLEMENTED YET: Image Resizer service
    }
=======
    const createThumbnail = (imageUrl, options= {
      width: 50, height:50 }) => {
        
       return new Promise((resolve, reject) => {

        // We will only handle HTTP or HTTPS request
        if (/^http*/.test(imageUrl)) {
          const { width, height } = options;
          resizer.read(imageUrl)
            .resize(width, height)
            .then(image2Base64)
            .then(base64Image => resolve(base64Image))
            .catch(err => {
              console.error(err); // Use DEBUG here
            })
         } else {
           reject(new Error('Only URLs starting with HTTP or HTTPS are accepted'));
         }
       })
    };

    return createThumbnail;
>>>>>>> api-dev
}