const serverless = require('serverless-http');
const express = require('express');

let app;
let handler;

module.exports.handler = async (event, context) => {
  if (!app) {
    const { createApp } = await import('./src/netlify');
    const nestApp = await createApp();
    app = nestApp.getHttpAdapter().getInstance();
    handler = serverless(app, {
      binary: ['image/*', 'application/octet-stream'],
    });
  }
  return handler(event, context);
};
