# Palkkaa koodari (Full Stack App with React.js, TypeScript, Express.js and TypeORM)

### Build up database with Docker

In the root there is a [`docker-compose.yml`](./docker-compose.yml) description with 3 services.

1. postgres (Postgresql server)
2. appserver (Our application wrapped to a Express.js -server)
3. e2e (Serenity.js tests with CUcumber and Playwright)

Run only database (**postgres**) service:

```shell
docker network create e2e || true
docker-compose up postgres -d
```

Now we have an empty database named `palkkaakoodari` with settings in the `docker-compose.yml`.
It is running in Docker and exposed to local host with port 5433 (accessible as localhost:5433).
We have also created explicitly a network with name e2e, this makes the docker-compose workable also in Gitlab pipeline environment (Docker in Docker=DinD).

(Further reading: [Docker-in-Docker: Containerized CI Workflows](https://www.docker.com/resources/docker-in-docker-containerized-ci-workflows-dockercon-2023))

When you are ready and want to stop service, wrap up the database:

```shell
docker-compose down
```

This will stop the running postgres service and remove the container (destroy also the database).

### Add an `.env`-file to backend-directory

Same settings are set in `docker-compose.yml`.

> ! The port is 5433, not the default 5432 not to interfere desktop installed database.

```env
POSTGRES_HOST="localhost"
POSTGRES_USER="pk"
POSTGRES_PASSWORD="pk"
POSTGRES_DB="palkkaakoodari"
POSTGRES_PORT=5433
PG_SSL=false
PORT=3000
APPLICATION_MODE="development"
```

Because APPLICATION_MODE="development" will create the database tables.

### Run backend

```shell
cd backend
npm run dev
```

If everything is OK, we have appserver running with backend in address: `http:localhost:3000`.
(Configured by `.env`-file. Port with value 3000 is also hard-coded default.)

### Run frontend

```shell
cd frontend
npm run dev
```

If everything is OK, we have frontend running in address: `http:localhost:5173`.
(Configured by vite)

Vite also configured to proxy all request to `/api` to `http:localhost:3000`, not using port 5173.
(Configured in [`vite.config.ts`](./frontend/vite.config.ts)).

## Run tests

Tests are implemented by Jest either on frontend or backend.
Tests are also written in TypeScript.
`npm run test` executes only unit tests and meant to be fast and separated well.

If you want only integration tests or all use these scripts:

```shell
npm run test:integration
```

```shell
npm run test:all
```

Coverage data always taken and awailable throw the main report.

### Directory structure

All tests are separated to own directory `tests`.
Unit and integration tests are separated to own directory.
Reports are printed to upper level directory `reports`.

```txt
+---tests
 +--helpers
 +--integration
 +--unit
+---reports
```

### Frontend

> Config: [`jest.config.cjs`](./frontend/jest.config.cjs)

```shell
cd frontend
npm install
npm run test
```

### Backend

> Config: [`jest.config.js`](./backend/jest.config.js)

```shell
cd backend
npm install
npm run test
```

> Integration test using the same `.env` file used at development.
> It also empties database, be careful, If you want to store own test / development data content.
