import Jwt from 'jwt-simple';

const jwtTokenSecret = 'black_pearl';

function isLoggedIn() {
  if (!localStorage.token) {
    return false;
  }
  try {
    let decoded = Jwt.decode(localStorage.token, jwtTokenSecret);

    return decoded.exp > Date.now();
  } catch (err) {
    return false;
  }
}

export default isLoggedIn;
