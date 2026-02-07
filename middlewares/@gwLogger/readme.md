# Welcome to the @gwLogger Middleware version 1.0 user guide !

## Description:

  The [@gwLogger] v1.0 middleware is used to generate logs of an incomming request in a NodeJS ExpressJS application in real time.

## Usage:

  **IMPORTANT:** make sure to uncomment the `next()` function in the `index.js` file found at 
  
  `{projectDirectory}/@gwLogger/index.js`

  Import and use the middleware as follows: 

  ```js

  import gwLogger from '{projectDirectory}/@gwLogger/index.js';

  import express from 'express';

  const app = express();

  app.use(gwLogger);

  app.listen(5000, () => { console.log('server running'); });

  ```