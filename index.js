const express = require('express')
const app = express()
const swaggerTools = require('swagger-tools');
const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const http = require('http');
const db = require('./models/index.js')

serverPort = 3099

// The Swagger document
const spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

// swaggerRouter configuration
const options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './api/controllers'),
    useStubs: process.env.NODE_ENV === 'development', 
  };

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
    // Interpret Swagger resources and attach metadata to request - must be first in
    // swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());
  
    // Validate Swagger requests
    app.use(middleware.swaggerValidator());
  
    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));
  
    // Serve the Swagger documents and Swagger UI
    app.use('/serverCheckService', middleware.swaggerUi());
  
    // Start the server
    const server = http.createServer(app).listen(serverPort, () => {
      const checkDate = new Date();
    //   console.log(`Environment : ${environment}`);
      console.log(
        `Your server is listening on port %d (http://localhost:%d) date time ${checkDate}`,
        serverPort,
        serverPort,
      );
      console.log(
        'Swagger-ui is available on http://localhost:%d/serverCheckService/docs/#',
        serverPort,
      );
    });
  
    server.keepAliveTimeout = 310 * 10000;
    server.headersTimeout = 320 * 10000;
    server.timeout = 320 * 10000;
  });
  
