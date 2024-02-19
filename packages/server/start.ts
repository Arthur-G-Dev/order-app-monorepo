import * as path from 'path';
import * as fs from 'fs';


// Import and start Server. Remember, server must
// be imported after configuring env variables
import RouterServer from './router-server';

const server = new RouterServer();

server.initPostgres()
  .then(res => console.log("POSTGRES RESPONSE", res))
  .catch(err => console.log("POSTGRES ERR", err))

server.start(4000);