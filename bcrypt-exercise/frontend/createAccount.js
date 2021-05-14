const usernameElem = document.querySelector('#username');
const passwordElem = document.querySelector('#password');
const emailElem = document.querySelector('#email');
const firstnameElem = document.querySelector('#firstname');
const lastnameElem = document.querySelector('#lastname');
const buttonElem = document.querySelector('button');


async function createAccount(account) {
  const response = await fetch('http://localhost:8000/api/create', {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data.success;
}


buttonElem.addEventListener('click', () => {
  let account = {
    username: usernameElem.value,
    password: passwordElem.value,
    email: emailElem.value,
    firstname: firstnameElem.value,
    lastname: lastnameElem.value
  }

  const createdAccount = createAccount(account);

  if (createdAccount) {
    location.href = 'http://localhost:8000';
  }
});