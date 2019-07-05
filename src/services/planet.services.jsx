import config from '../config/index.jsx';

export const planetService = {
  search
};

function search(name) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`${config.apiUrl}planets/?search=${name}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    if (!response.ok) {
      const error = text || response.statusText;
      return Promise.reject(error);
    }
    const data = text && JSON.parse(text);
    return data.results;
  });
}
