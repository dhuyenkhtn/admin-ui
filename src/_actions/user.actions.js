import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
  login,
  logout,
  add,
  register,
  getAll,
  delete: _delete,
  update,
  changeQuota,
  getMe
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success(user));
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function add(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        history.push('/users');
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function update(user) {
  return dispatch => {
    dispatch(request(user));

    userService.update(user).then(
      user => {
        dispatch(success(user));
        history.push('/users');
        dispatch(alertActions.success('Updated successful'));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService
      .getAll()
      .then(users => dispatch(success(users)), error => dispatch(failure(error.toString())));
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService
      .delete(id)
      .then(user => dispatch(success(id)), error => dispatch(failure(id, error.toString())));
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}

function changeQuota(userId, quantity) {
  return dispatch => {
    dispatch(request(quantity));

    userService.changeQuota(userId, quantity).then(
      () => {
        dispatch(success());
        history.push(`/users`);
        dispatch(alertActions.success(`Success!`));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(quantity) {
    return { type: userConstants.ASSIGN_TOKEN_REQUEST, quantity };
  }
  function success() {
    return { type: userConstants.ASSIGN_TOKEN_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.ASSIGN_TOKEN_FAILURE, error };
  }
}

function getMe() {
  return dispatch => {
    dispatch(request());
    userService.getMe().then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.UPDATE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, user };
  }
}
