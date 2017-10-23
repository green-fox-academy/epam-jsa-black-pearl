'use strict';

function isLoggedIn() {
  if (!localStorage.token) {
    return false;
  }
  let decoded = JSON.parse(atob(localStorage.token.split('.')[1]));

  return decoded.exp > Date.now();
}

export default isLoggedIn;
