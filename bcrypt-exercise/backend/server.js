const express = require('express');
const cookieParser = require('cookie-parser');
const { nanoid } = require('nanoid');

const { admin, user } = require('./middleware/auth');
const { getUserById, checkPassword, getUserByRole, 
        addCookieId, changePassword, removeUser,
        createAccount } = require('./database/operations');

const app = express();

app.use(express.json());
app.use(express.static('../frontend'));
app.use(cookieParser());

app.post('/api/login', (request, response) => {
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
});

app.get('/api/loggedin', (request, response) => {
  //request.cookies visar alla cookies som följer med i ett request
  console.log('cookies', request.cookies);
  const loggedInId = request.cookies.loggedIn;

  const isLoggedIn = getUserById(loggedInId);

  let result = { loggedIn: false };

  if (isLoggedIn) {
    result.loggedIn = true;
  }

  response.json(result);
});

app.get('/api/user', (request, response) => {
  const loggedInId = request.cookies.loggedIn;

  const user = getUserById(loggedInId);

  let result = { success: false };
  
  if (user) {
    result.success = true;
    result.user = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role
    }
  }

  response.json(result);
});

app.get('/api/user/all', admin, (request, response) => {
  const allUsers = getUserByRole('user');

  response.json(allUsers);
});

app.post('/api/user/change', admin, (request, response) => {
  const password = request.body.password;
  const loggedInId = request.cookies.loggedIn;

  const changedPassword = changePassword(loggedInId, password);

  let result = { success: false }

  if (changedPassword) {
    result.success = true;
  }

  response.json(result);
});

app.delete('/api/user/remove', user, (request, response) => {
  const loggedInId = request.cookies.loggedIn;

  const removedUser = removeUser(loggedInId);

  let result = { success: false }

  if (removedUser) {
    result.success = true;
  }

  response.json(result);
});

app.post('/api/create', (request, response) => {
  const account = request.body
  account.role = 'user'; //Skapar egenskapen role och sätter till user
  console.log('Account to add:', account);
  const createdAccount = createAccount(account);

  let result = { success: false }

  if (createdAccount) {
    result.success = true;
  }

  response.json(result);
});

app.listen(8000, () => {
  console.log('Server started');
});