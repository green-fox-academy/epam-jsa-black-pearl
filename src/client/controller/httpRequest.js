'use strict';

function formHttpGetRequest(path) {
  let httpHeaders = {
    'Content-Type': 'application/json',
    'token': localStorage.token,
  };
  let myHeaders = new Headers(httpHeaders);
  let myRequest = new Request(path, {
    'method': 'GET',
    'headers': myHeaders,
  });

  return myRequest;
}

export function sendGetHttpRequest(path) {
  return fetch(formHttpGetRequest(path)).then(function(res) {
    return res.json();
  });
}

function formHttpPostRequest(path, reqBody) {
  let httpHeaders = {
    'Content-Type': 'application/json',
    'token': localStorage.token,
  };
  let myHeaders = new Headers(httpHeaders);
  let myRequest = new Request(path, {
    'method': 'POST',
    'headers': myHeaders,
    'body': JSON.stringify(reqBody),
  });

  return myRequest;
}

export function sendPostHttpRequest(path, reqBody) {
  return fetch(formHttpPostRequest(path, reqBody));
}

function formHttpDeleteRequest(path) {
  let httpHeaders = {
    'Content-Type': 'application/json',
    'token': localStorage.token,
  };
  let myHeaders = new Headers(httpHeaders);
  let myRequest = new Request(path, {
    'method': 'DELETE',
    'headers': myHeaders,
  });

  return myRequest;
}

export function sendDeleteHttpRequest(path) {
  return fetch(formHttpDeleteRequest(path));
}

function formHttpPutRequest(path, reqBody) {
  let httpHeaders = {
    'Content-Type': 'application/json',
    'token': localStorage.token,
  };
  let myHeaders = new Headers(httpHeaders);
  let myRequest = new Request(path, {
    'method': 'PUT',
    'headers': myHeaders,
    'body': JSON.stringify(reqBody),
  });

  return myRequest;
}

export function sendPutHttpRequest(path, reqBody) {
  return fetch(formHttpPutRequest(path, reqBody));
}
