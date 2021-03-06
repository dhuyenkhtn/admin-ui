import { customerConstants } from '../_constants';
import { customerService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const customerActions = {
  create,
  register,
  update,
  getAll,
  assignLicense,
  checkToken
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

function register(customer) {
  return dispatch => {
    dispatch(request(customer));

    customerService.register(customer).then(
      customer => {
        dispatch(success(customer));
        dispatch(alertActions.success(`Your account has just been created.`));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(customer) {
    return { type: customerConstants.REGISTER_REQUEST, customer };
  }
  function success(customer) {
    return { type: customerConstants.REGISTER_SUCCESS, customer };
  }
  function failure(error) {
    return { type: customerConstants.REGISTER_FAILURE, error };
  }
}

function checkToken(token) {
  return dispatch => {
    dispatch(request());

    customerService.checkToken(token).then(
      data => {
        dispatch(validToken(data));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(customer) {
    return { type: customerConstants.REGISTER_REQUEST, customer };
  }
  function validToken(data) {
    return { type: customerConstants.REGISTER_VALID_TOKEN, data };
  }
  function failure(error) {
    return { type: customerConstants.REGISTER_INVALID_TOKEN, error };
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

function assignLicense(id) {
  function request(customer) {
    return { type: customerConstants.UPDATE_REQUEST, customer };
  }
  function success(customer) {
    return { type: customerConstants.UPDATE_SUCCESS, customer };
  }
  function failure(error) {
    return { type: customerConstants.UPDATE_FAILURE, error };
  }
  
  return dispatch => {
    dispatch(request(id));
    
    customerService.assignLicense(id).then(
      updatedCustomer => {
        dispatch(success(updatedCustomer));
        dispatch(getAll());
        dispatch(alertActions.success(`Successfully assigned licenses for ${updatedCustomer.userPrincipalName}`));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
