# thumbnailer
A simple, stateless microservice that provides authentication, json patching and image thumbnail creation features. It's a microservice built using [Node.js](https://nodejs.org/) and the popular web framework [express](https://expressjs.com).

[![Build Status](https://travis-ci.org/emrys8/thumbnailer.svg?branch=develop)](https://travis-ci.org/emrys8/thumbnailer)
[![Coverage Status](https://coveralls.io/repos/github/emrys8/thumbnailer/badge.svg?branch=develop)](https://coveralls.io/github/emrys8/thumbnailer?branch=develop)

## Installation
Thumbnailer requires the Node.js, [download and install](https://nodejs.org/en/download/)

Installation is done using the npm install command:
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):
```bash
$ npm install
```

This will install all dependencies

## Usage
Then start the application, by using the npm start command:
$ npm start

This will start the application on the port 3000
Use PORT=<port> to assign a different port
```bash
$ PORT=7888 npm start
```

## API Endpoints
* **Login**: POST /api/login
* **Image Thumbnail Generation**: POST /api/create-thumbnail
* **JSON Patching**: PATCH /api/apply-json-patch

### Examples
NOTE: You have to be `logged in` to be able to access the image thumbnail and json patching services.

To Login, specify any username, and password in the request body object
Using Postman, enter:
* username: String
* password: String

Upon a successful login, a token will be issued to you, protected routes will need this token.

To create an image thumbnail, using curl:
```bash
$ curl -H "x-access-token: <token>" -d imageUrl='<http|https image URL> localhost:3000/api/create-thumbnail"
```
Using An HTTP Client like Postman, you can apply JSON patch to a document:
Provide body parameters:
* document: the object to be patched
* patch: the patch to be made on the object
