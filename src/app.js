// Configuracao do servidor express
import express from 'express';
import path from 'path';
import routes from './routes';

// Chama o arquivo
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // Metodos
  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
