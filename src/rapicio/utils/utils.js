// Use this file for common utility functions

export const validateEmail = email => {
  const emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRe.test(String(email).toLowerCase());
};
export const validatePassword = password => {
  if (password.length >= 8) {
    return true;
  } else {
    return false;
  }
};
