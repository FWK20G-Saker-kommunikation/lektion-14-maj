const lowdb = require('lowdb');
const bcrypt = require('bcrypt');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('users.json');
const database = lowdb(adapter);

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

function getUserById(cookieId) {
  return database.get('accounts').find({ id: cookieId }).value();
}

async function checkPassword(credentials) {
  const user = database.get('accounts')
          .find({ username: credentials.username })
          .value();
  
  if (user) {
    return await comparePassword(credentials.password, user.password);
  } else {
    return false;
  }
}

function getUserByRole(role) {
  return database.get('accounts').filter({ role: role }).value();
}

function addCookieId(credentials, cookieId) {
  return database.get('accounts')
          .find({ username: credentials.username })
          .assign({ 'id': cookieId })
          .write();
}

function changePassword(cookieId, pass) {
  return database.get('accounts')
          .find({ id: cookieId })
          .assign({ password: pass })
          .write();
}

function removeUser(cookieId) {
  return database.get('accounts').remove({ id: cookieId }).write();
}

async function createAccount(account) {
  account.password = await hashPassword(account.password);

  return database.get('accounts').push(account).write();
}

exports.getUserById = getUserById;
exports.checkPassword = checkPassword;
exports.getUserByRole = getUserByRole;
exports.addCookieId = addCookieId;
exports.changePassword = changePassword;
exports.removeUser = removeUser;
exports.createAccount = createAccount;