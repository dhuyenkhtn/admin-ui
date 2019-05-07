import { customerConstants } from '../_constants';
import { customerService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const customerActions = {
  create,
  update,
  getAll
};

function create(customer) {
  return dispatch => {
    dispatch(request(customer));

    customerService.create(customer).then(
      customer => {
        dispatch(success(customer));
        history.push('/customers');
        dispatch(alertActions.success(`User ${customer.userPrincipalName} just been created. Password: ${customer.password}`));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(customer) {
    return { type: customerConstants.CREATE_REQUEST, customer };
  }
  function success(customer) {
    return { type: customerConstants.CREATE_SUCCESS, customer };
  }
  function failure(error) {
    return { type: customerConstants.CREATE_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    customerService
      .getAll()
      .then(
        customers => dispatch(success(customers)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return { type: customerConstants.GET_ALL_REQUEST };
  }
  function success(customers) {
    return { type: customerConstants.GET_ALL_SUCCESS, customers };
  }
  function failure(error) {
    return { type: customerConstants.GET_ALL_FAILURE, error };
  }
}

function update(data) {
  function request(customer) {
    return { type: customerConstants.CREATE_REQUEST, customer };
  }
  function success(customer) {
    return { type: customerConstants.CREATE_SUCCESS, customer };
  }
  function failure(error) {
    return { type: customerConstants.CREATE_FAILURE, error };
  }
  
  return dispatch => {
    dispatch(request(data));
    
    customerService.update(data).then(
      updatedCustomer => {
        dispatch(success(updatedCustomer));
        history.push('/customers');
        dispatch(alertActions.success(`User ${updatedCustomer.userPrincipalName} has been updated.`));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
