import Jwt from 'jwt-simple';

const jwtTokenSecret = 'black_pearl';

function isLoggedIn() {
  if (localStorage.token) {
    try {
      let decoded = Jwt.decode(localStorage.token, jwtTokenSecret);

      if (decoded.exp <= Date.now()) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
}

export default isLoggedIn;
