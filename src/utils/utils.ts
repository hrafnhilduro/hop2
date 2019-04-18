import { IError } from '../api/types';

// Localstorage - get jwt token
const getToken = () => {
  return localStorage.getItem('jwt');
}

/**
 * Check if error is coming from field, for css purposes, to style with
 * invalid
 * @param arr
 * @param field
 */
const checkField = (arr: IError[], field: string) => {
  return arr.find(err => err.field === field || err.field === 'all');
}

/**
 * Asynchronous forEach loop
 *
 * @param array
 * @param callback
 */
const asyncForEach = async (array: [], callback: Function) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const http = async (request: RequestInfo) => {
  return await fetch(request, {
      method: 'GET',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
      .then(async (response) => {
        return {
          data: await response.json(),
          status: response.ok
        };
      })
};

const httpPost = async (request: RequestInfo, data: any) => {
  return await fetch(request, {
      method: 'POST',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data)
    })
      .then(async (response) => {
        return {
          data: await response.json(),
          status: response.ok
        };
      })
}

const httpPatch = async (request: RequestInfo, data: any) => {
  return await fetch(request, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data)
    })
      .then(async (response) => {
        return {
          data: await response.json(),
          status: response.ok
        };
      })
}

const httpDelete = async (request: RequestInfo) => {
  return await fetch(request, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
      .then(async (response) => {
        return response;
      })
};

export {
  http,
  httpPost,
  httpPatch,
  httpDelete,
  checkField,
  asyncForEach,
}
