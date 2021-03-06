import axios from "axios";
import {
  getSessionCookie,
  clearSessionCookie,
  setSessionCookie,
} from "../utils/utils";
var jwtDecode = require("jwt-decode");
// var jwtDecode = require('jwt-decode');
const rapicUrl = "https://rapicapi.herokuapp.com/";
const loginUrl = rapicUrl + "api/token/";

function Api() {
  this.getMyUser = async function() {
    if (!this.access) {
      await this.getAccessToken();
    }
    return new Promise((resolve, reject) => {
      axios({
        url: rapicUrl + "users/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.access}`,
        },
        method: "GET",
      }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
          reject("Failed to get user");
        }
        if (!response.data.length) {
          reject("Failed to get user");
          return;
        }
        setSessionCookie(
          { refresh: this.refresh, username: response.data[0].username },
          null
        );
        resolve(this.username);
      });
    });
  };

  this.register = async function(username, email, password, registerOnly) {
    let data = {
      username: username,
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
          console.log(response, "hi");
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
  };
  // observe that using e-mail as username !!!
  this.login = async function(email, password) {
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
            reject("failed to login");
          }

          this.refresh = data.refresh;
          this.access = data.access;
          setSessionCookie({ refresh: data.refresh }, null);
          this.getMyUser();
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };

  this.getAccessToken = async function getAccessToken(ctx) {
    const session = getSessionCookie(ctx);
    if (session) {
      const refreshToken = session.refresh;
      if (refreshToken) {
        var refreshDecoded = jwtDecode(refreshToken);
        let now = Date.now() / 1000;
        // if refreshtoken is 1 hours away from expiry, force logout
        if (refreshDecoded.exp - now <= 1 * 60 * 60) {
          this.access = null;
          this.logout();
          return;
        }
      }
      let body = {
        refresh: refreshToken,
      };
      return new Promise((resolve, reject) => {
        fetch(loginUrl + "refresh/", {
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
        })
          .then((response) => {
            if (response.status < 200 || response.status >= 300) {
              if (response.status == 401) {
                this.logout();
              }
              reject("failed to getAccessToken");
            }
            return response.json();
          })
          .then(async (data) => {
            this.access = data.access;
            resolve("success");
          })
          .catch((err) => console.log({ err }));
      });
    }
  };

  this.logout = function(ctx) {
    clearSessionCookie(ctx);
  };

  this.getRapicProjects = async function(ctx) {
    if (!this.access) {
      await this.getAccessToken(ctx);
    }

    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: rapicUrl + "rapicapp/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.access}`,
        },
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            reject("failed to get projects");
          }
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };

  this.getRapicProjectById = async function(ctx, id) {
    if (!this.access) {
      await this.getAccessToken(ctx);
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${rapicUrl}rapicapp/${id}/`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.access}`,
        },
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            console.log("failed to get projects");
            reject();
          }
          resolve(data);
        })
        .catch((err) => {
          console.log(err.message);
          reject();
        });
    });
  };

  this.createProject = async function(project) {
    if (!this.access) {
      await this.getAccessToken(null);
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: rapicUrl + "rapicapp/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.access}`,
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
  };

  this.deleteRapicProject = async function(ctx, id) {
    if (!this.access) {
      await this.getAccessToken(ctx);
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: rapicUrl + `rapicapp/${id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.access}`,
        },
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            reject("failed to delete project");
          }
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  this.updateRapicProject = async function(ctx, id, payload) {
    if (!this.access) {
      await this.getAccessToken(ctx);
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: rapicUrl + `rapicapp/${id}/`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.access}`,
        },
        data: JSON.stringify(payload),
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            reject("failed to update project");
          }
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  this.createRapicEndpoint = async function(ctx, endpoint) {
    if (!this.access) {
      await this.getAccessToken(ctx);
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: rapicUrl + "rapicmodel/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.access}`,
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
        .catch((err) => reject("Enpoint name must be a unique set."));
    });
  };

  this.updateRapicEndpoint = async function(ctx, id, payload) {
    if (!this.access) {
      await this.getAccessToken(ctx);
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "PATCH",
        url: rapicUrl + `rapicmodel/${id}/`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.access}`,
        },
        data: JSON.stringify(payload),
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            reject("failed to update enpoint");
          }
          resolve(data);
        })
        .catch((err) => reject(JSON.stringify(err.response)));
    });
  };

  this.deleteRapicEndpoint = async function(ctx, id) {
    if (!this.access) {
      await this.getAccessToken(ctx);
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: rapicUrl + `rapicmodel/${id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.access}`,
        },
      })
        .then((response) => {
          let data = response.data;
          if (response.status < 200 || response.status >= 300) {
            reject("failed to delete endpoint");
          }
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };
}

const exportApi = new Api();

export default exportApi;
