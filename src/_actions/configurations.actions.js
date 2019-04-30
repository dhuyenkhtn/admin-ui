import { configurationService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { configurationConstants } from '../_constants';

export const configurationActions = {
  create,
  getAll,
  update
};

function create(params) {
  return dispatch => {
    dispatch(request(params));

    configurationService.create(params).then(
      config => {
        dispatch(success(config));
        history.push('/configurations');
        dispatch(alertActions.success('Added successfully!'));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: configurationConstants.CREATE_REQUEST };
  }
  function success(configuration) {
    return { type: configurationConstants.CREATE_SUCCESS, configuration };
  }
  function failure(error) {
    return { type: configurationConstants.CREATE_FAILURE, error };
  }
}

function update(params) {
  return dispatch => {
    dispatch(request(params));

    configurationService.update(params).then(
      () => {
        dispatch(success());
        history.push('/configurations');
        dispatch(alertActions.success('Updated successful'));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: configurationConstants.UPDATE_REQUEST };
  }
  function success() {
    return { type: configurationConstants.UPDATE_SUCCESS };
  }
  function failure(error) {
    return { type: configurationConstants.UPDATE_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    configurationService
      .getAll()
      .then(configurations => dispatch(success(configurations)), error => dispatch(failure(error.toString())));
  };

  function request() {
    return { type: configurationConstants.GET_ALL_REQUEST };
  }
  function success(configurations) {
    return { type: configurationConstants.GET_ALL_SUCCESS, configurations };
  }
  function failure(error) {
    return { type: configurationConstants.GET_ALL_FAILURE, error };
  }
}
