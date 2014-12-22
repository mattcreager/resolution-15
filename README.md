# Resolution-15

[![Build Status](https://travis-ci.org/mattcreager/resolution-15.svg?branch=master)](https://travis-ci.org/mattcreager/resolution-15)

A holiday twist, on the classic todo example. What will you accomplish in 2015?

Check it out at [https://resolution-15.herokuapp.com/](https://resolution-15.herokuapp.com/)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/mattcreager/resolution-15)

## Local dependencies

- [Postgres](http://www.postgresql.org/) for data

## Installing

1. Download and install http://postgresapp.com/
2. Click on the Postgres icon, click 'Open psql' & run `CREATE DATABASE resolution15;`
3. Run `npm install`
4. Run `npm run migrations`
5. Update `app/api/config/config.json`

## Running

1. With live-reload: `npm run dev` or easy-mode: `npm start`
2. [http://localhost:5200](http://localhost:5200)