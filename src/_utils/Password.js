// import generatePassword from 'password-generator';
// import {generate} from 'generate-password';

const maxLength = 12;
const minLength = 12;
const uppercaseMinCount = 3;
const lowercaseMinCount = 3;
const numberMinCount = 2;
const specialMinCount = 2;
const UPPERCASE_RE = /([A-Z])/g;
const LOWERCASE_RE = /([a-z])/g;
const NUMBER_RE = /([\d])/g;
const SPECIAL_CHAR_RE = /([\?\-])/g;
const NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

function isStrongEnough(password) {
  const uc = password.match(UPPERCASE_RE);
  const lc = password.match(LOWERCASE_RE);
  const n = password.match(NUMBER_RE);
  const sc = password.match(SPECIAL_CHAR_RE);
  const nr = password.match(NON_REPEATING_CHAR_RE);
  return password.length >= minLength &&
    !nr &&
    uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount &&
    sc && sc.length >= specialMinCount;
}

function generateStrongPassword() {
  let password = "";
  // const randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  while (!isStrongEnough(password)) {
    // password = generatePassword(randomLength, false, /[\w\d\?\-]/);
    // password = generate({length: randomLength, numbers: true});
    password = `${Math.random().toString(36).slice(2)}#`;
  }
  return password;
}


function generateSimpleStrongPassword() {
  return `${Math.random().toString(36).slice(2).toUpperCase()}#`;
}

const PasswordUtils = {
  generateStrongPassword,
  generateSimpleStrongPassword,
};

export default PasswordUtils;
