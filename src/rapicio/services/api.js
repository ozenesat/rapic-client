import axios from 'axios';

// var jwtDecode = require('jwt-decode');

const rapicUrl = 'https://rapicapi.herokuapp.com/';
const loginUrl = rapicUrl + 'api/token/';

class Api {
  async register(username, email, password, registerOnly) {
    let data = {
      username: username,
      email: email,
      password: password,
    };
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: rapicUrl + 'register/',
        data: data,
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            if (response.status === 500) {
              reject('failed to register');
            }
            reject(response.json());
          } else {
            if (!registerOnly) {
              this.login(username, password).then(res => {
                resolve(res);
              });
            } else {
              resolve(response);
            }
          }
        })
        .catch(function(error) {
          reject('failed to register' + error);
        });
    });
  }
  async login(username, password) {
    let data = {
      username: username,
      password: password,
    };
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: loginUrl,
        data: data,
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            if (response.status === 500) {
              reject('failed to login');
            }
            reject(response.json());
          }
        })
        .catch(function(error) {
          reject('failed to login' + error);
        });
    });
  }
}

const exportApi = new Api();
export default exportApi;
