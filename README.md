Movie-api
Sample movie listing Application

Features
User login,Signup and User CRUD
Movie CRUD
Document level Tenant
Tech
Movie-api uses a number of open source projects to work properly:

[Express]
[MongoDb]
Installation
Movie-api requires Node.js v8+ to run. Install the dependencies and devDependencies and start the server.

$ cd movie-api
Create a config.json file inside src/config like config.example.json

$ npm install
$ npm run seed
$ npm start
For production environments...

$ NODE_ENV=production
