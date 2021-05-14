const { getUserById } = require('../model/operations');

function admin(request, response, next) {
  const loggedInId = request.cookies.loggedIn;
  console.log('admin cookies', loggedInId);
  try {
    const user = getUserById(loggedInId);
    console.log('admin middleware', user);
    if (!user) {
      throw new Error(); //Kommer istället att hoppa in i catchen nedan
    } else if (user.role !== 'admin') {
      throw new Error(); //Kommer istället att hoppa in i catchen nedan
    } else {
      next(); //Gå vidare till nästa callback i endpoint:en
    }
  } catch (error) {
    response.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

function user(request, response, next) {
  const loggedInId = request.cookies.loggedIn;
  console.log('user cookies', loggedInId);
  try {
    const user = getUserById(loggedInId);
    console.log('user middleware', user);
    if (!user) {
      throw new Error(); //Kommer istället att hoppa in i catchen nedan
    } else if (user.role !== 'user') {
      throw new Error(); //Kommer istället att hoppa in i catchen nedan
    } else {
      next(); //Gå vidare till nästa callback i endpoint:en
    }
  } catch (error) {
    response.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

exports.admin = admin;
exports.user = user;