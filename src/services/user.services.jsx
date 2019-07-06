import config from '../config/index.jsx';

export const userService = {
  login,
  logout
};

function login(userName, password) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`${config.apiUrl}people/?search=${userName}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      console.log(data);
      if(data.results.length === 0) {
        return Promise.reject('Invalid User');
      }
      else if (data.results[0].birth_year === password) {
        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', data.results[0].name);
        return data.results[0].name;
      }
      else {
        return Promise.reject('Invalid User');
      }
      
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    if (!response.ok) {
      const error = text || response.statusText;
      return Promise.reject(error);
    }
    const data = text && JSON.parse(text);
    return data;
  })
  .catch(error => {
    return Promise.reject(error);
  });
}
