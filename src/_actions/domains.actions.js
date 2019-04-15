import { domainsService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { domainsConstants } from '../_constants';

export const domainsActions = {
  create,
  getAll,
  update
};

function create(domain) {
  return dispatch => {
    dispatch(request(domain));

    domainsService.create(domain).then(
      domain => {
        dispatch(success());
        history.push('/domains');
        dispatch(alertActions.success('Successful!'));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(domain) {
    return { type: domainsConstants.CREATE_REQUEST, domain };
  }
  function success(domain) {
    return { type: domainsConstants.CREATE_SUCCESS, domain };
  }
  function failure(error) {
    return { type: domainsConstants.CREATE_FAILURE, error };
  }
}

function update(domain) {
  return dispatch => {
    dispatch(request(domain));

    domainsService.update(domain).then(
      domain => {
        dispatch(success());
        history.push('/domains');
        dispatch(alertActions.success('Updated successful'));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(domain) {
    return { type: domainsConstants.UPDATE_REQUEST, domain };
  }
  function success(domain) {
    return { type: domainsConstants.UPDATE_SUCCESS, domain };
  }
  function failure(error) {
    return { type: domainsConstants.UPDATE_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    domainsService
      .getAll()
      .then(domains => dispatch(success(domains)), error => dispatch(failure(error.toString())));
  };

  function request() {
    return { type: domainsConstants.GET_ALL_REQUEST };
  }
  function success(domains) {
    return { type: domainsConstants.GET_ALL_SUCCESS, domains };
  }
  function failure(error) {
    return { type: domainsConstants.GET_ALL_FAILURE, error };
  }
}
