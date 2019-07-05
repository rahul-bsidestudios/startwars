import {
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../constants';
import { userService } from '../services/user.services';
import { history } from '../helpers/history';

export default {
  login,
  logout
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      user => {
        console.log(user);
        dispatch(success(user));
        history.push('/dashboard');
      },
      error => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: LOGIN_FAILURE, error };
  }
}

function logout() {
  console.log(111)
  userService.logout();
  return { type: LOGOUT };
}
