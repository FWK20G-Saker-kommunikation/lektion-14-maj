const { nanoid } = require('nanoid');

const { getUserById, checkPassword, 
  addCookieId, createAccount } = require('../model/operations');

function login(request, response) {
  const credentials = request.body;

  const user = checkPassword(credentials);

  let result = { success: false };

  if (user) {
    result.success = true;
    const cookieId = nanoid();

    addCookieId(credentials, cookieId);

    response.cookie('loggedIn', cookieId);
  }

  response.json(result);
}

function getLoginStatus(request, response) {
  //request.cookies visar alla cookies som följer med i ett request
  console.log('cookies', request.cookies);
  const loggedInId = request.cookies.loggedIn;

  const isLoggedIn = getUserById(loggedInId);

  let result = { loggedIn: false };

  if (isLoggedIn) {
    result.loggedIn = true;
  }

  response.json(result);
}

function createNewAccount(request, response) {
  const account = request.body
  account.role = 'user'; //Skapar egenskapen role och sätter till user
  console.log('Account to add:', account);
  const createdAccount = createAccount(account);

  let result = { success: false }

  if (createdAccount) {
    result.success = true;
  }

  response.json(result);
}

exports.login = login;
exports.getLoginStatus = getLoginStatus;
exports.createNewAccount = createNewAccount;