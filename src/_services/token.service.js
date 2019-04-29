import config from '../config';
import { authHeader } from '../_helpers';
import { handleResponse } from './user.service';

export const tokenService = {
  generate,
  getAll,
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/tokens`, requestOptions).then(handleResponse);
}

function generate(domain) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(domain)
  };

  return fetch(`${config.apiUrl}/tokens/generate`, requestOptions).then(handleResponse);
}
