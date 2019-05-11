import config from '../config';
import { authHeader } from '../_helpers';
import { handleResponse } from './user.service';

export const tokenService = {
  generate,
  getAll,
  lock,
  deleteToken
};

function getAll(filter) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  let query = '';
  if (filter) {
    console.log(filter);
    query = Object.keys(filter)
      .map(key => key + '=' + filter[key])
      .join('&');
  }
  return fetch(`${config.apiUrl}/tokens?${query}`, requestOptions).then(handleResponse);
}

function lock(id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  };

  return fetch(`${config.apiUrl}/tokens/lock/${id}`, requestOptions).then(handleResponse);
}

function deleteToken(id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  };

  return fetch(`${config.apiUrl}/tokens/delete/${id}`, requestOptions).then(handleResponse);
}

function generate(quantity) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity })
  };

  return fetch(`${config.apiUrl}/tokens/generate`, requestOptions).then(handleResponse);
}
