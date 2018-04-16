
export default (tokenSigner) => {

    const generateToken = (payload) => {

        return new Promise((resolve, reject) => {
            if (payload) {
                const token = tokenSigner.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "24h"
                });

                resolve(token);
            } else {
                reject(new Error('Payload is not provided'));
            }
        });
    };

    const decodeToken = (token) => {

        return new Promise((resolve, reject) => {
            if (token) {
                tokenSigner.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        reject(new Error('Invalid or Expired token'));
                    } else {
                        resolve(decoded);
                    }
                })
            } else {
                reject(new Error('Token must be given'));
            }
        })
    }
}