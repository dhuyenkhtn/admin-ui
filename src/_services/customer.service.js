import config from '../config';
import { authHeader } from '../_helpers';
import { handleResponse } from './user.service';

export const customerService = {
  create,
  getAll,
};


function create(params) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };
  
  return fetch(`${config.apiUrl}/customers/create`, requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/customers`, requestOptions).then(handleResponse);
}
