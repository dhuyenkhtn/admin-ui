import config from '../config';
import { authHeader } from '../_helpers';
import { handleResponse } from './user.service';

export const customerService = {
  create,
  update,
  getAll,
  assignLicense,
  checkToken,
  register
};

function create(params) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };

  return fetch(`${config.apiUrl}/customers/create`, requestOptions).then(handleResponse);
}

function register(params) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };

  return fetch(`${config.apiUrl}/customers/register`, requestOptions).then(handleResponse);
}

function update(params) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };

  return fetch(`${config.apiUrl}/customers/update/${params._id}`, requestOptions).then(
    handleResponse
  );
}

function assignLicense(id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  };

  return fetch(`${config.apiUrl}/customers/assignLicenses/${id}`, requestOptions).then(
    handleResponse
  );
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/customers`, requestOptions).then(handleResponse);
}

function checkToken(code) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  };

  return fetch(`${config.apiUrl}/customers/check-token`, requestOptions).then(handleResponse);
}
