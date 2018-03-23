require('dotenv').config()

const env = process.env.NODE_ENV;
  // Initialize Firebase for the application
var config = {
  db: {
        type: 'mongodb',
        host: process.env.DB_HOST,
        dbname: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PWD
    },
    auth: {
      google :{
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.clientSecret,
        callbackURL: 'http://localhost:3000/auth/google/callback'
      }
    }
};
if(env==='production'){
  config.auth.google.callbackURL = 'https://mullencountdown.herokuapp.com/auth/google/callback';
}
module.exports = config;
