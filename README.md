# Movie-api
Sample movie listing Application
# Features
  - User login,Signup and User CRUD
  - Movie CRUD
  - Document level Tenant
### Tech
Movie-api uses a number of open source projects to work properly:
* [Express] 
* [MongoDb]

### Installation
Movie-api requires [Node.js](https://nodejs.org/) v8+ to run.
Install the dependencies and devDependencies and start the server.
```sh
$ cd movie-backend
```
Create a config.json file inside src/config like config.example.json

```sh
$ npm install
$ npm run seed
$ npm start
```
For production environments...
```sh
$ NODE_ENV=production
```
