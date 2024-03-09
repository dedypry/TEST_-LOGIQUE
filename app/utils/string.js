require('dotenv').config();
const bcrypt = require('bcrypt');
const salt = Number.parseInt(process.env.BCRYPT_SALT);
const InvalidData = require('../exceptions/InvalidData');

function generatePassword(password) {
  return bcrypt.hashSync(password, salt);
}

function randomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function comparePassword(password1, password2) {
  let hashedPass = `$2a$${password1.slice(4)}`;
  if (/^\$2y\$/.test(password1)) hashedPass = password1;
  if (!await bcrypt.compareSync(password2, hashedPass)) {
    throw new InvalidData('Kata sandi salah');
  }
  return true;
}

module.exports={
  generatePassword,
  randomString,
  comparePassword,
};
