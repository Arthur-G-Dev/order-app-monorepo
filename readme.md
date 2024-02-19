# Installation
Project uses lerna for monorepo environment and consists of 4 main directories:
1. client-app - react with typescript
2. kitchen-app - react with typescript
3. server - overnight.js
4. database - typeORM with postgres

if you don't have `typescript` and `ts-node` please install globally
You will need `docker` in order to run the `docker-compose.yml` file

`
npm install ts-node -g
npm install typescript -g
`

run `docker compose up -d` to run database container instance
run `npm install` in project root directory and lerna will install everything you need.

To start frontends run `npm run start:front`
To start server run `npm run start:server`
To start all at once run `npm rstart`

To start web: move into web directory and run `npm start`


# Info
overnight js is simple and clear type definitions with decorator support for express js
typeORM is good ORM for type definitions, quick integration and usage
react is obvious choice for building quick,custom and agile client environment

Simple diagram for project https://drive.google.com/file/d/1tBnba82jucq9Yy7pKHwyEvugdwowcdLl/view?usp=sharing