import { tokenService } from '../_services';
import { alertActions } from './';
import { tokenConstants } from '../_constants';

export const tokenActions = {
  generate,
  getAll
};

function generate() {
  return dispatch => {
    dispatch(request());

    tokenService.generate().then(
      data => {
        dispatch(success());
        dispatch(getAll());
        dispatch(alertActions.success('Successful!'));
      },
      error => {
        dispatch(failure(error.toString()));
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

function getAll() {
  return dispatch => {
    dispatch(request());

    tokenService
      .getAll()
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
