import config from '../config';
import { authHeader } from '../_helpers';
import { handleResponse } from './user.service';

export const configurationService = {
  create,
  getAll,
  update,
  synchronize
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/configurations`, requestOptions).then(handleResponse);
}

function create(params) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };

  return fetch(`${config.apiUrl}/configurations/create`, requestOptions).then(handleResponse);
}

function update(params) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };

  return fetch(`${config.apiUrl}/configurations/update/${params.clientId}`, requestOptions).then(handleResponse);
}

function synchronize(params) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };

  return fetch(`${config.apiUrl}/customers/synchronize`, requestOptions).then(handleResponse);
}
