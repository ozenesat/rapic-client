import axios from 'axios';

// var jwtDecode = require('jwt-decode');

const rapicUrl = 'https://rapicapi.herokuapp.com/';
const loginUrl = rapicUrl + 'api/token/';
const valideteUrl = rapicUrl + 'users/'; // check it!
const refreshUrl = rapicUrl + 'refresh/'; // learn the related url!

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
          document.cookie = `refresh = ${response.data.refresh}`;
          document.cookie = `access = ${response.data.access}`;
        })
        .catch(function(error) {
          reject('failed to login' + error);
        });
    });
  }
  async validateToken() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: valideteUrl,
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + document.cookie.access,
        },
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return true;
          } else {
            return refreshToken();
          }
        })
        .catch(function(error) {
          reject('failed to access' + error);
        });
    });
  }
  async refreshToken() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: refreshUrl,
        headers: {
          'Content-type': 'application/json',
        },
        // add some stuff with JWT and document.cookies.refresh
      })
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            reject('Failed to get access token');
          }
          return response.json();
        })
        .then(async data => {
          this.access = data.access;
          resolve('success');
        })
        .catch(function(error) {
          reject('failed to access' + error);
        });
    });
  }
}

const exportApi = new Api();
export default exportApi;
