const CryptoJS = require('crypto-js');

/**
 * Encrypts the password using PBKDF2 encryption algorithm.
 * @param {string} password the password to be encrypted.
 * @returns the encrypted password.
 */
export const encryptPassword = password => {
  const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.hex);
  return {
    salt: salt,
    hash: CryptoJS.PBKDF2(password, salt, 1000, 64, 'sha512').toString(
      CryptoJS.enc.hex,
    ),
  };
};

/**
 * Compares the given password against the given hash.
 * @param {string} password the password to be compared.
 * @param {string} salt the salt used to encrypt the password.
 * @param {string} hash the hash of the password.
 * @returns if the hashed password is equal to the given hash.
 */
export const comparePassword = (password, salt, hash) => {
  return (
    CryptoJS.PBKDF2(password, salt, 1000, 64, 'sha512').toString(
      CryptoJS.enc.hex,
    ) === hash
  );
};
