# Photo Manager Server

[![Build Status](https://travis-ci.org/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate.svg?branch=master)](https://travis-ci.org/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate.svg)](https://greenkeeper.io/)

Photo manager server built with Node, Graphql, Express, Apollo, and Postgres.

## Installation

- `git clone git@github.com:klexzi/photo-manager-server.git`
- `cd photo-manager-server`
- `touch .env`
- `npm install`
- fill out _.env file_ (see below)
- start PostgreSQL database
- `npm run dev`
- visit `http://localhost:8000` for GraphQL playground

### .env file

Since this project is using PostgreSQL, you have to install it for your machine and get a database up and running. After you have created a database and a database user, you can fill out the environment variables in the _.env_ file following the example in the _.env.example_ file.

```
DATABASE_PASSWORD=DATABASE_PASSWORD
DATABASE_USER=DATABASE_USER
DATABASE=DATABASE
SECRET=SECRET
CLOUDINARY_URL=CLOUDINARY_URL
```

The `SECRET` is just a random string for your authentication. Keep all these information secure by adding the _.env_ file to your _.gitignore_ file. No third-party should have access to this information.
