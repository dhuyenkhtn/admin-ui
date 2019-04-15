import config from '../config';
import { authHeader } from '../_helpers';
import { handleResponse } from './user.service';

export const domainsService = {
  create,
  getAll,
  getByDomain,
  update
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/domains`, requestOptions).then(handleResponse);
}

function getByDomain(domain) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/domains/${domain}`, requestOptions).then(handleResponse);
}

function create(domain) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(domain)
  };

  return fetch(`${config.apiUrl}/domains/create`, requestOptions).then(handleResponse);
}

function update(domain) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(domain)
  };

  return fetch(`${config.apiUrl}/domains/${domain.domain}`, requestOptions).then(handleResponse);
}
