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
