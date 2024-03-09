require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const {randomString} = require('./string');
const STORAGE = process.env.FIREBASE_STORAGE;
const LINK = process.env.FIREBASE_LINK;
const {v4} =require('uuid');


async function uploadFile(file) {
  const storage = new Storage({
    keyFilename: process.env.FIREBASE_KEY_FILE,
  });

  const uuid = v4();

  const donloadPath =`${LINK}${STORAGE}/o/`;
  const name = randomString(10)+'.'+file.mimetype.split('/')[1];
  const bucket = storage.bucket('gs://'+STORAGE);
  const result = await bucket.upload(file.filepath, {
    destination: `files/${name}`,
    resumable: true,
    metadata: {
      contentType: file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    },
  });


  return donloadPath + encodeURIComponent(result[0].name) +'?alt=media&token=' +uuid;
}


module.exports = {uploadFile};
