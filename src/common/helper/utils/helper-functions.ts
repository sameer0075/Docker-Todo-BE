import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';


/**
 * Asynchronously hashes a password using the bcrypt algorithm.
 * 
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
async function encryptPassword(password) {
    // The number of rounds used to hash the password.
    const SALT_ROUNDS = 10;

    // Hash the password using bcrypt and return the hashed password.
    return await bcrypt.hash(password, SALT_ROUNDS);
}


/**
 * Asynchronously compares a given password with a saved password
 * using the bcrypt algorithm.
 *
 * @param {string} password - The password to be compared.
 * @param {string} savedPassword - The saved password to be compared with.
 * @return {Promise<boolean>} - A promise that resolves to a boolean indicating
 * whether the passwords match.
 */
async function comparePassword(password: string, savedPassword: string) {
    // Compare the given password with the saved password using bcrypt.
    // The function returns a promise that resolves to a boolean indicating
    // whether the passwords match.
    return await bcrypt.compare(password, savedPassword);
}

/**
 * Generates a JSON Web Token (JWT) using the given data object.
 * 
 * @param {Object} data - The data to be encoded in the JWT.
 * @return {string} - The generated JWT.
 */
function generateToken(data: object) {
    // Sign the data object using the JWT_SECRET environment variable as the secret key.
    // The JWT_EXPIRATION_TIME environment variable specifies the expiration time of the token.
    // The sign method returns a signed JSON web token.
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      })
}

export { encryptPassword, comparePassword, generateToken }