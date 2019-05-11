import { tokenService } from '../_services';
import { alertActions } from './';
import { tokenConstants } from '../_constants';

export const tokenActions = {
  generate,
  getAll,
  lock,
  deleteToken
};

function generate(quantity) {
  return dispatch => {
    dispatch(request());

    tokenService.generate(quantity).then(
      () => {
        dispatch(success());
        dispatch(getAll());
        dispatch(alertActions.success(`${quantity} more tokens was successfully added to your quota!`));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(getAll());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: tokenConstants.GENERATE_REQUEST };
  }
  function success() {
    return { type: tokenConstants.GENERATE_SUCCESS };
  }
  function failure(error) {
    return { type: tokenConstants.GENERATE_FAILURE, error };
  }
}


function lock(id) {
  return dispatch => {
    tokenService.lock(id).then(
      () => {
        dispatch(getAll());
        dispatch(alertActions.success(`The token has been locked!`));
      },
      error => {
        dispatch(getAll());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function deleteToken(id) {
  return dispatch => {
    tokenService.deleteToken(id).then(
      () => {
        dispatch(getAll());
        dispatch(alertActions.success(`The token has been deleted!`));
      },
      error => {
        dispatch(getAll());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function getAll(filter) {
  return dispatch => {
    dispatch(request());

    tokenService
      .getAll(filter)
      .then(tokens => dispatch(success(tokens)), error => dispatch(failure(error.toString())));
  };

  function request() {
    return { type: tokenConstants.GET_ALL_REQUEST };
  }
  function success(tokens) {
    return { type: tokenConstants.GET_ALL_SUCCESS, tokens };
  }
  function failure(error) {
    return { type: tokenConstants.GET_ALL_FAILURE, error };
  }
}
