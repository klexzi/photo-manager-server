import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';

/**
 * function to hash password
 * @param {string} password password to hash
 */
export const hashPassword = async password => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * function to upload image stream to cloudinary
 * @param {*} stream file stream
 * @param {string} filename file name
 */
export const uploadToCloudinary = async (stream, filename) => {
  const cldV2 = cloudinary.v2;
  return new Promise((resolve, reject) => {
    const upload = cldV2.uploader.upload_stream((error, result) => {
      resolve(result);
    });
    new Promise((resolve, reject) => {
      stream
        .pipe(upload)
        .on('finish', resolve)
        .on('error', reject);
    });
  });
};

/**
 * function to delete file from cloudinary
 * @param {string} publicId file public id
 */
export const deleteFileFromCloudinary = async publicId => {
  const cldV2 = cloudinary.v2;
  return cldV2.uploader
    .destroy(publicId)
    .then(value => value)
    .catch(reason => {
      console.log(reason);
      throw reason;
    });
};
