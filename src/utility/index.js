import image2Base64 from 'image-to-base64';

export default (resizer) => {

    const createThumbnail = (imageUrl, options= {
      width: 50, height:50 }) => {
        
       return new Promise((resolve, reject) => {

        // We will only handle HTTP or HTTPS request
        if (/^http*/.test(imageUrl)) {
          const { width, height } = options;
          resizer.read(imageUrl)
            .then(image => {
              image.resize(width, height)
              resolve(image);
            })
            .catch(err => {
              console.error(err); // Use DEBUG here
            })
         } else {
           reject(new Error('Only URLs starting with HTTP or HTTPS are accepted'));
         }
       })
    };

    return createThumbnail;
}