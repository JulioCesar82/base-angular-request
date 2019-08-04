import { locate, app } from './../config/environment';
import 'reflect-metadata';

// dependencies
import * as express from 'express';
import * as rest from 'typescript-rest';
import * as configs from '../config/environment';

import {LoggerService} from './app/shared/services/logger.service';
import {FileService} from './app/shared/services/file.service';

// modules
import setSwagger from './bootstrap/swagger';
import setDatabase from './bootstrap/database';

import setMiddleware from './bootstrap/middleware';
import setAuthentication from './app/http/middlewares/authentication';

export class Server {
  private express: express.Application;
  private dirRoot: string;

  constructor() {
    this.express = express();
    this.dirRoot = configs.locate.root;
  }

  public async run() {
    try {
      console.log('aqui');
      if (!await FileService.mkdir(configs.locate.logs)) {
        console.log('aqui');
        throw new ErrorEvent('failed to create log directory');
      }
      
      console.log('aa');
      LoggerService.configure(configs.locate.logs, configs.app.production);
      LoggerService.logger('###  ###  ###   ###  ###  ###', 'info');
      LoggerService.logger('###  Started Application  ###', 'info');
      LoggerService.logger('###  ###  ###   ###  ###  ###', 'info');

      /* loadSwagger */
      if (await FileService.exists(`${this.dirRoot}/documentation-api`)) {
        LoggerService.logger('set router to swagger', 'info');
        const swaggerDoc: object = require(`${this.dirRoot}/documentation-api/swagger.json`);
        const swaggerCss: string = await FileService.open('./node_modules/swagger-ui-themes/themes/3.x/theme-material.css');
        const swaggerEnd = '/swagger';

        setSwagger(this.express, swaggerDoc, swaggerCss, swaggerEnd);
      }

      
      /* loadMiddleware */
      LoggerService.logger('set middlewares to cors', 'info');
      setMiddleware(this.express);


      /* loadDatabase */
      const dirDb = `${this.dirRoot}/src/database/orpak.db`;
      if (!await FileService.exists(dirDb)) {
        LoggerService.logger('database will be created', 'info');
        await FileService.save(dirDb, '');
      }
      LoggerService.logger('database settings', 'info');
      const definitions = require(`${this.dirRoot}/config/database.json`);
      setDatabase(definitions);
      
      
      /* loadRoutes */
      LoggerService.logger('set routes application', 'info');
      const protectedRoutes = [
        '/api/example',
        '/api/user'
      ];
      setAuthentication(this.express, configs.system.auth, protectedRoutes);

      const routes: express.Router = express.Router();
      rest.Server.loadServices(routes, 'src/app/http/controllers/*', '/');
      this.express.use('/api', routes);
      

      /* loadViews */
      if (await FileService.exists(configs.locate.front)) {
        LoggerService.logger('loading files build views', 'info');
        this.express.use(express.static(configs.locate.front));
        this.express.get('/*', (req, res) => {
          res.sendFile(`${configs.locate.front}/index.html`);
        });
      } else {
        this.express.get('/', (req, res) => {
          res.send(`Application version ${configs.app.version}`);
        });
      }


      /* loadApp */
      this.express.listen(configs.app.port, () => {
        LoggerService.logger(`server is running on port ${configs.app.port}`, 'info');
      });
    } catch(error) {
      console.error(error);
    }
  }

}

const server = new Server();
server.run();