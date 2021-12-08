const pwdLib = require("../modules/password_schema.js")

const minPassword = '1111'
const maxPassword = '11111111111111111111111111111111111111111'

test('validate password length: 4', () => {
  expect(pwdLib.validatePassword(minPassword)).toBe(false);
});

test('password requirement length: 40', () => {
  expect(pwdLib.validatePassword(maxPassword)).toBe(false);
});

test('password uppercase requirement', () => {
  expect(pwdLib.validatePassword('hello')).toBe(false);
});

test('password special case requirement', () => {
  expect(pwdLib.validatePassword('Nocase')).toBe(false);
});

