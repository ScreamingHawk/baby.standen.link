# NewBaby.Standen.link

This website is for crowd sourcing names and voting on them.

Live at [http://newbaby.standen.link](http://newbaby.standen.link)!

## Development

### Set Up

Install dependencies

```sh
yarn && cd client && yarn
```

[Install postgres](https://www.postgresql.org/download/)

Create database, user and grants

```sh
psql -U postgres
CREATE DATABASE baby;
CREATE USER baby WITH PASSWORD 'baby';
GRANT ALL PRIVILEGES ON DATABASE baby TO baby;
```

The above user and credentials are the defaults for this app

### Start

Single command, this enables *watching*

```sh
yarn run dev
```

### Test

```sh
yarn test
```

### Deploy

Set up heroku

```sh
heroku login
```

Create a database

```sh
heroku addons:create heroku-postgresql:hobby-dev
```

Do the deployment

```sh
git push heroku master
```

## Credits

[Michael Standen](https://michael.standen.link)

This software is provided under the [MIT License](https://tldrlegal.com/license/mit-license) so it's free to use so long as you give me credit.
