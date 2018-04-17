# thumbnailer
A simple, stateless microservice that provides authentication, json patching and image thumbnail creation features. It's a microservice built using [Node.js](https://nodejs.org/) and the popular web framework [express](https://expressjs.com).

[![Build Status](https://travis-ci.org/emrys8/thumbnailer.svg?branch=develop)](https://travis-ci.org/emrys8/thumbnailer)
[![Coverage Status](https://coveralls.io/repos/github/emrys8/thumbnailer/badge.svg?branch=develop)](https://coveralls.io/github/emrys8/thumbnailer?branch=develop)

## Installation
Thumbnailer requires the Node.js, [download and install](https://nodejs.org/en/download/)

Installation is done using the npm install command:
$ npm install

This will install all dependencies

## Usage
Then start the application, by using the npm start command:
$ npm start

This will start the application on the port 3000
Use PORT=<port> to assign a different port

$ PORT=7888 npm start

## API Endpoints
* Login: /api/login
* Image Thumbnail Generation: /api/create-thumbnail
* JSON Patching: /api/apply-json-patch


