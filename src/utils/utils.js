// Use this file for common utility functions
import { getCookies, setCookies, removeCookies } from "cookies-next";
import Router from "next/router";

export const validateEmail = (email) => {
  const emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRe.test(String(email).toLowerCase());
};
export const validatePassword = (password) => {
  if (password.length >= 8) {
    return true;
  } else {
    return false;
  }
};

export const setSessionCookie = (session, ctx) => {
  clearSessionCookie(ctx);
  setCookies(ctx, "rapic_session", session);
};

export const clearSessionCookie = (ctx) => {
  removeCookies(ctx, "rapic_session");
};

export const getSessionCookie = (ctx) => {
  const sessionCookie = getCookies(ctx, "rapic_session");

  if (sessionCookie === undefined) {
    return {};
  } else {
    return JSON.parse(sessionCookie);
  }
};

export const splitText = (text, count) => {
  if (text.length > count) {
    return text.slice(0, count + 2) + "...";
  }
  return text;
};

export const redirect = (ctx, target) => {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    Router.replace(target);
  }
};
