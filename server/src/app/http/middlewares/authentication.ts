import * as express from 'express';
import { Verify } from 'jsonwebtoken';

import {LoggerService} from '../../shared/services/logger.service';
import {ResponseToken} from '../response.token';

export default (server: express.Application, definitions: ResponseToken, protectedRoutes: Array<string>) => {
    server.use((req, res, next) => {
        LoggerService.logger(`Rota requisitada: ${req.path}`, 'info');
        if (!protectedRoutes.includes(req.path)) {
            next();
            return;
        }

        LoggerService.logger(`Rota protegida`, 'info');
        // check header or url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers['authorization'];
        if (!token) {
            res.status(401).send('Nenhum token fornecido.');
            return;
        }

        // verifies secret and checks exp
        Verify(token, definitions.secret, (err, decoded) => {
            if (err) {
                res.status(403).send('Falha ao autenticar o token.');
                return;
            }

            // if everything is good, save to request for use in other routes
            req['decoded'] = decoded;
            next();
        });
    });
}
