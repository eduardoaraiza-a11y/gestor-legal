const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  let html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
  html = html
    .replace('__FIREBASE_API_KEY__',             process.env.FIREBASE_API_KEY)
    .replace('__FIREBASE_AUTH_DOMAIN__',         process.env.FIREBASE_AUTH_DOMAIN)
    .replace('__FIREBASE_PROJECT_ID__',          process.env.FIREBASE_PROJECT_ID)
    .replace('__FIREBASE_STORAGE_BUCKET__',      process.env.FIREBASE_STORAGE_BUCKET)
    .replace('__FIREBASE_MESSAGING_SENDER_ID__', process.env.FIREBASE_MESSAGING_SENDER_ID)
    .replace('__FIREBASE_APP_ID__',              process.env.FIREBASE_APP_ID)
    .replace('__FIREBASE_MEASUREMENT_ID__',      process.env.FIREBASE_MEASUREMENT_ID);
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
};