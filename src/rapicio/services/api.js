import axios from "axios";

// var jwtDecode = require('jwt-decode');
const rapicUrl = "https://rapicapi.herokuapp.com/";
const loginUrl = rapicUrl + "api/token/";
const valideteUrl = rapicUrl + "users/"; // check it!
const refreshUrl = rapicUrl + "refresh/"; // learn the related url!
const faketoken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkyMTMzNTgyLCJqdGkiOiJiNGRmOGFkNmJkMmI0ZDA5YTMyMGYwMDk3ZmM2ZmFhYSIsInVzZXJfaWQiOjUxOH0.gje8xpkBz2vnDz7VKKKjMR-_HEB8RYhTtOiVMmxdRFo";

class Api {
  // observe that using e-mail as username !!!
  async register(username, email, password, registerOnly) {
    let data = {
      username: email,
      email: email,
      password: password,
    };
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: rapicUrl + "register/",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            if (response.status === 500) {
              reject("failed to register");
            }
            reject(response.json());
          } else {
            if (!registerOnly) {
              this.login(username, password).then((res) => {
                resolve(res);
              });
            } else {
              resolve(response);
            }
          }
        })
        .catch(function(error) {
          reject("failed to register" + error);
        });
    });
  }
  // observe that using e-mail as username !!!
  async login(email, password) {
    let data = {
      username: email,
      password: password,
    };
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: loginUrl,
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            if (response.status === 500) {
              reject("failed to login");
            }
            reject(response.json());
          }
          resolve(data);
        })
        .catch(function(error) {
          reject("failed to login" + error);
        });
    });
  }
  async validateToken() {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: valideteUrl,
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + document.cookie.access,
        },
      })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return true;
          } else {
            return refreshToken();
          }
        })
        .catch(function(error) {
          reject("failed to access" + error);
        });
    });
  }

  async refreshToken() {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: refreshUrl,
        headers: {
          "Content-type": "application/json",
        },
        // add some stuff with JWT and document.cookies.refresh
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            reject("Failed to get access token");
          }
          return response.json();
        })
        .then(async (data) => {
          this.access = data.access;
          resolve("success");
        })
        .catch(function(error) {
          reject("failed to access" + error);
        });
    });
  }

  async getRapicProjects() {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: rapicUrl + "rapicapp/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${faketoken}`,
        },
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            console.log("failed to get projects");
            reject([]);
          }
          resolve(data);
        })
        .catch((err) => {
          console.log(err.message);
          reject([]);
        });
    });
  }

  async createProject(project) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: rapicUrl + "rapicapp/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${faketoken}`,
        },
        data: JSON.stringify(project),
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            reject("failed to create enpoint");
          }
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  async createRapicEndpoint(endpoint) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: rapicUrl + "rapicmodel/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${faketoken}`,
        },
        data: JSON.stringify(endpoint),
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            reject("failed to create enpoint");
          }
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  getEndpointsByProjeId(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${rapicUrl}rapicapp/${id}/models/`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${faketoken}`,
        },
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            console.log("failed to create enpoint");
            reject([]);
          }
          resolve(data);
        })
        .catch((err) => reject([]));
    });
  }
}

const exportApi = new Api();
export default exportApi;
